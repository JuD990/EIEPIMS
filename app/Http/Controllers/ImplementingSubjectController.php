<?php

namespace App\Http\Controllers;

use App\Models\ImplementingSubjects;
use App\Models\ClassLists;
use App\Models\CollegePOCs;
use App\Models\LeadPOCs;
use App\Models\EIEHeads;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class ImplementingSubjectController extends Controller
{
    public function index()
    {
        $subjects = ImplementingSubjects::all();
        return response()->json($subjects);
    }

    public function fetchImplementingSubjects(Request $request)
    {
        // Get employee_id from the request headers
        $employeeId = $request->header('employee_id');

        if (!$employeeId) {
            return response()->json(['error' => 'Employee ID is required'], 400);
        }

        // Find the employee using the employee_id to get the department
        $employee = EIEHeads::where('employee_id', $employeeId)->first();

        if (!$employee) {
            Log::warning("Employee not found for employee_id: $employeeId");
            return response()->json(['error' => 'Employee not found'], 404);
        }

        // Get the department of the employee
        $department = $employee->department;

        // Log the department to verify it's correct
        Log::info("Employee found. Department: $department");

        // Filter the implementing subjects based on the department
        $subjects = ImplementingSubjects::where('department', $department)->get();

        // Return the filtered subjects
        return response()->json($subjects);
    }

    public function upload(Request $request)
    {
        Log::info('File upload attempt:', ['files' => $request->files]);

        // Validate the file
        $request->validate([
            'file' => 'required|mimes:csv|max:2048',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            Log::info('File details:', ['file_name' => $file->getClientOriginalName(), 'file_size' => $file->getSize()]);

            // Store the file
            $path = $file->storeAs('uploads', $file->getClientOriginalName());

            // Open and parse the CSV file
            if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
                // Skip the header row
                $header = fgetcsv($handle);

                // Expected CSV columns (excluding the removed ones)
                $expectedColumns = [
                    'course_code', 'code', 'course_title',
                    'semester', 'year_level', 'program',
                    'department', 'employee_id', 'assigned_poc', 'email', 'enrolled_students',
                ];

                // Validate the CSV header
                if ($header !== $expectedColumns) {
                    fclose($handle);
                    return response()->json(['message' => 'Invalid CSV format.'], 400);
                }

                // Read each row and insert into the database
                while (($row = fgetcsv($handle)) !== false) {
                    ImplementingSubjects::create([
                        'course_code'       => $row[0],
                        'code'              => $row[1],
                        'course_title'      => $row[2],
                        'semester'          => $row[3],
                        'year_level'        => $row[4],
                        'program'           => $row[5],
                        'department'        => $row[6],
                        'employee_id'       => $row[7],
                        'assigned_poc'      => $row[8],
                        'email'             => $row[9],
                        'enrolled_students' => $row[10],
                    ]);
                }

                fclose($handle);

                return response()->json(['message' => 'Data stored successfully!', 'path' => $path], 200);
            }

            return response()->json(['message' => 'Failed to read the file.'], 400);
        } else {
            Log::error('No file uploaded');
            return response()->json(['message' => 'No file uploaded.'], 400);
        }
    }
        // Get class data based on employee_id and subjects semester
        public function getClassData($employee_id)
        {
            try {
                Log::info('Employee ID: ' . $employee_id);

                // Determine the current semester based on the current month
                $currentMonth = now()->month;

                if ($currentMonth >= 1 && $currentMonth <= 5) {
                    $currentSemester = '2nd Semester'; // January to May
                } elseif ($currentMonth >= 8 && $currentMonth <= 12) {
                    $currentSemester = '1st Semester'; // August to December
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'No Classes Available'
                    ]);
                }

                // Query for subjects associated with the given employee_id and current semester
                $classData = ImplementingSubjects::where('employee_id', $employee_id)
                ->where('semester', $currentSemester)
                ->get();

                if ($classData->isNotEmpty()) {
                    return response()->json([
                        'success' => true,
                        'classData' => $classData
                    ]);
                }

                return response()->json([
                    'success' => false,
                    'message' => 'No Classes Available'
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Server error: ' . $e->getMessage()
                ], 500);
            }
        }


        public function getEmployeeDepartment($userType, $employeeId)
        {
            // Map user types to their respective models
            $userTypeModelMap = [
                'College POC' => CollegePOCs::class,
                'Lead EIE POC' => LeadPOCs::class,
                'Head EIE POC' => EIEHeads::class,
            ];

            // Validate user type
            if (!isset($userTypeModelMap[$userType])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid user type.',
                ], 400);
            }

            // Get the model based on user type
            $model = $userTypeModelMap[$userType];

            if (!$model) {
                return response()->json([
                    'success' => false,
                    'message' => 'User type not supported yet.',
                ], 400);
            }

            // Query the employee from the respective model
            $employee = $model::find($employeeId);

            if ($employee && $employee->department) {
                return response()->json([
                    'success' => true,
                    'department' => $employee->department,
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Department not found for the given employee ID.',
            ], 404);
        }

        public function getProgramsForDepartment($department)
        {
            // Fetch the programs for the specified department
            $programs = ImplementingSubjects::where('department', $department)
            ->whereIn('semester', ['1st Semester', '2nd Semester'])
            ->get();

            // Categorize the programs by semester and year level
            $programsBySemester = [
                '1st Semester' => [
                    '1st Year' => $programs->filter(fn($program) => $program->semester === '1st Semester' && $program->year_level === '1st Year'),
                    '2nd Year' => $programs->filter(fn($program) => $program->semester === '1st Semester' && $program->year_level === '2nd Year'),
                    '3rd Year' => $programs->filter(fn($program) => $program->semester === '1st Semester' && $program->year_level === '3rd Year'),
                    '4th Year' => $programs->filter(fn($program) => $program->semester === '1st Semester' && $program->year_level === '4th Year'),
                ],
                '2nd Semester' => [
                    '1st Year' => $programs->filter(fn($program) => $program->semester === '2nd Semester' && $program->year_level === '1st Year'),
                    '2nd Year' => $programs->filter(fn($program) => $program->semester === '2nd Semester' && $program->year_level === '2nd Year'),
                    '3rd Year' => $programs->filter(fn($program) => $program->semester === '2nd Semester' && $program->year_level === '3rd Year'),
                    '4th Year' => $programs->filter(fn($program) => $program->semester === '2nd Semester' && $program->year_level === '4th Year'),
                ],
            ];

            // Combine all programs into a single collection for each semester
            $flattenedPrograms = [
                '1st Semester' => $programsBySemester['1st Semester']['1st Year']
                ->merge($programsBySemester['1st Semester']['2nd Year'])
                ->merge($programsBySemester['1st Semester']['3rd Year'])
                ->merge($programsBySemester['1st Semester']['4th Year']),
                '2nd Semester' => $programsBySemester['2nd Semester']['1st Year']
                ->merge($programsBySemester['2nd Semester']['2nd Year'])
                ->merge($programsBySemester['2nd Semester']['3rd Year'])
                ->merge($programsBySemester['2nd Semester']['4th Year']),
            ];

            // Return a response only if there are programs to return
            if ($flattenedPrograms['1st Semester']->isEmpty() && $flattenedPrograms['2nd Semester']->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No programs found for the department in the selected semesters.',
                ]);
            }

            return response()->json([
                'success' => true,
                'programs' => $flattenedPrograms
            ]);
        }

        public function getProgramsWithEnrollmentCountFirstSemester($department)
        {
            try {
                // Fetch programs for the 2nd Semester only
                $programs = ImplementingSubjects::where('department', $department)
                ->where('semester', '1st Semester') // Filter only for the 2nd Semester
                ->get();

                if ($programs->isEmpty()) {
                    return response()->json(['success' => false, 'message' => 'No programs found for this department in the 2nd Semester.']);
                }

                // Initialize enrollment count structure
                $enrollmentCount = [];

                foreach ($programs as $program) {
                    $programKey = $program->program;
                    $yearLevel = $program->year_level;

                    // Initialize program and year level in the enrollment count array
                    if (!isset($enrollmentCount[$yearLevel][$programKey])) {
                        $enrollmentCount[$yearLevel][$programKey] = [
                            'total_enrolled' => 0,
                            'course_titles' => []
                        ];
                    }

                    // Add enrolled_students to the total count
                    $enrollmentCount[$yearLevel][$programKey]['total_enrolled'] += $program->enrolled_students;

                    // Add course title for the program
                    if (!in_array($program->course_title, $enrollmentCount[$yearLevel][$programKey]['course_titles'])) {
                        $enrollmentCount[$yearLevel][$programKey]['course_titles'][] = $program->course_title;
                    }
                }

                return response()->json([
                    'success' => true,
                    'programs' => $programs,
                    'enrollmentCount' => $enrollmentCount
                ]);
            } catch (Exception $e) {
                // Log the error message
                Log::error('Error fetching programs: ' . $e->getMessage());
                return response()->json(['success' => false, 'message' => 'Error fetching programs.']);
            }
        }

        public function getProgramsWithEnrollmentCountSecondSemester($department)
        {
            try {
                // Fetch programs for the 2nd Semester only
                $programs = ImplementingSubjects::where('department', $department)
                ->where('semester', '2nd Semester') // Filter only for the 2nd Semester
                ->get();

                if ($programs->isEmpty()) {
                    return response()->json(['success' => false, 'message' => 'No programs found for this department in the 2nd Semester.']);
                }

                // Initialize enrollment count structure
                $enrollmentCount = [];

                foreach ($programs as $program) {
                    $programKey = $program->program;
                    $yearLevel = $program->year_level;

                    // Initialize program and year level in the enrollment count array
                    if (!isset($enrollmentCount[$yearLevel][$programKey])) {
                        $enrollmentCount[$yearLevel][$programKey] = [
                            'total_enrolled' => 0,
                            'course_titles' => []
                        ];
                    }

                    // Add enrolled_students to the total count
                    $enrollmentCount[$yearLevel][$programKey]['total_enrolled'] += $program->enrolled_students;

                    // Add course title for the program
                    if (!in_array($program->course_title, $enrollmentCount[$yearLevel][$programKey]['course_titles'])) {
                        $enrollmentCount[$yearLevel][$programKey]['course_titles'][] = $program->course_title;
                    }
                }

                return response()->json([
                    'success' => true,
                    'programs' => $programs,
                    'enrollmentCount' => $enrollmentCount
                ]);
            } catch (Exception $e) {
                // Log the error message
                Log::error('Error fetching programs: ' . $e->getMessage());
                return response()->json(['success' => false, 'message' => 'Error fetching programs.']);
            }
        }

        public function updateImplementingSubject(Request $request, $courseCode)
        {

            $subject = ImplementingSubjects::where('course_code', $courseCode)->first();

            if (!$subject) {
                return response()->json(['message' => 'Subject not found'], 404);
            }

            // Validate incoming data
            $validated = $request->validate([
                'courseTitle' => 'required|string|max:255',
                'code' => 'required|string|max:50',
                'courseCode' => 'required|string|max:50',
                'semester' => 'required|string|max:50',
                'department' => 'required|string|max:100',
                'program' => 'required|string|max:100',
                'assigned_poc' => 'nullable|string|max:255',
                'employee_id' => 'nullable|string|max:50',
                'email' => 'nullable|email|max:255',
            ]);

            // If email or employee_id is null, set assigned_poc to null
            if (is_null($validated['employee_id']) || is_null($validated['email'])) {
                $validated['assigned_poc'] = null;
            }

            // Transform any empty strings to null
            $validated = array_map(function ($value) {
                return $value === '' ? null : $value;
            }, $validated);

            $subject->update($validated);

            return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject]);
        }

        public function getDropdownData()
        {
            try {
                $programs = ImplementingSubjects::distinct()->pluck('program');
                $semesters = ImplementingSubjects::distinct()->pluck('semester');
                $yearLevels = ImplementingSubjects::distinct()->pluck('year_level');

                \Log::info('Programs: ', $programs->toArray()); // Ensure it's logging the data properly
                \Log::info('Semesters: ', $semesters->toArray());
                \Log::info('Year Levels: ', $yearLevels->toArray());

                return response()->json([
                    'programs' => $programs,
                    'semesters' => $semesters,
                    'year_levels' => $yearLevels,
                ]);
            } catch (\Exception $e) {
                \Log::error('Error fetching data: ' . $e->getMessage());
                return response()->json(['error' => 'Unable to fetch data'], 500);
            }
        }

}
