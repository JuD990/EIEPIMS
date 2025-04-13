<?php

namespace App\Http\Controllers;

use App\Models\ImplementingSubjects;
use App\Models\EieReport;
use App\Models\ClassLists;
use App\Models\Students;
use App\Models\CollegePOCs;
use App\Models\LeadPOCs;
use App\Models\EIEHeads;
use App\Models\HistoricalImplementingSubjects;
use App\Models\EieScorecardClassReport;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ImplementingSubjectController extends Controller
{
    public function index()
    {
        $subjects = ImplementingSubjects::all();
        return response()->json($subjects);
    }

    public function update(Request $request, $courseCode)
    {
        // Validate incoming data
        $validated = $request->validate([
            'courseTitle' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'courseCode' => 'required|string|max:50',
            'semester' => 'required|string|max:50',
            'department' => 'required|string|max:100',
            'program' => 'required|string|max:100',
            'activeStudents' => 'nullable|integer',
            'enrolledStudents' => 'nullable|integer',
        ]);

        // Find the subject by courseCode
        $subject = ImplementingSubjects::where('course_code', $courseCode)->first();

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        // Update the subject
        $subject->update([
            'course_title' => $validated['courseTitle'],
            'code' => $validated['code'],
            'course_code' => $validated['courseCode'],
            'semester' => $validated['semester'],
            'department' => $validated['department'],
            'program' => $validated['program'],
            'active_students' => $validated['activeStudents'] ?? $subject->active_students,
            'enrolled_students' => $validated['enrolledStudents'] ?? $subject->enrolled_students,
        ]);

        return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject]);
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

                // Read each row and insert into both ImplementingSubjects and HistoricalImplementingSubjects tables
                while (($row = fgetcsv($handle)) !== false) {
                    // Insert into ImplementingSubjects table
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

                    // Insert into HistoricalImplementingSubjects table
                    HistoricalImplementingSubjects::create([
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
                        // You can add more historical-specific fields if needed
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
            // Define user type mappings to corresponding models
            $userTypeModelMap = [
                'College POC' => CollegePOCs::class,
                'Lead EIE POC' => LeadPOCs::class,
                'Head EIE POC' => EIEHeads::class,
            ];

            // If userType is not in the mapping, return success false (but no error)
            if (!isset($userTypeModelMap[$userType])) {
                return response()->json(['success' => false, 'message' => 'User type not recognized. Skipping...'], 200);
            }

            // Get the appropriate model
            $model = $userTypeModelMap[$userType];

            // Find employee by ID
            $employee = $model::where('employee_id', $employeeId)->first();

            // If employee not found, log error and return response
            if (!$employee) {
                \Log::error("Employee not found: ID = $employeeId, Type = $userType");
                return response()->json(['success' => false, 'message' => 'Employee not found.'], 404);
            }

            // Return department if found
            return response()->json(['success' => true, 'department' => $employee->department]);
        }

        public function updateImplementingSubject(Request $request, $courseCode)
        {
            $subject = ImplementingSubjects::where('course_code', $courseCode)->first();

            if (!$subject) {
                return response()->json(['message' => 'Subject not found'], 404);
            }

            // Validate input fields
            $validated = $request->validate([
                'assigned_poc' => 'nullable|string|max:255',
                'employee_id' => 'nullable|string|max:50',
                'email' => 'nullable|email|max:255',
            ]);

            // Ensure all three fields are null if either employee_id or email is missing
            if (!filled($validated['employee_id']) && !filled($validated['email'])) {
                $validated = [
                    'assigned_poc' => null,
                    'employee_id' => null,
                    'email' => null,
                ];
            }

            // Check if updates are necessary
            if ($subject->only(['assigned_poc', 'employee_id', 'email']) == $validated) {
                return response()->json(['message' => 'No changes detected'], 200);
            }

            $subject->update($validated);

            return response()->json(['message' => 'Assigned POC updated successfully', 'subject' => $subject]);
        }

        public function getDropdownData()
        {
            try {
                $programs = ImplementingSubjects::distinct()->pluck('program');
                $semesters = ImplementingSubjects::distinct()->pluck('semester');
                $yearLevels = ImplementingSubjects::distinct()->pluck('year_level');
                $departments = ImplementingSubjects::distinct()->pluck('department');

                return response()->json([
                    'programs' => $programs,
                    'semesters' => $semesters,
                    'departments' => $departments,
                    'year_levels' => $yearLevels,
                ]);
            } catch (\Exception $e) {
                \Log::error('Error fetching data: ' . $e->getMessage());
                return response()->json(['error' => 'Unable to fetch data'], 500);
            }
        }

        public function getDropdownSpecificData(Request $request)
        {
            try {
                $employeeId = $request->query('employee_id');

                // Fetch the department from EIEHeads
                $department = EIEHeads::where('employee_id', $employeeId)->value('department');

                if (!$department) {
                    return response()->json(['error' => 'Department not found for employee'], 404);
                }

                // Fetch programs, semesters, and year levels based on the department
                $programs = ImplementingSubjects::where('department', $department)->distinct()->pluck('program');
                $semesters = ImplementingSubjects::where('department', $department)->distinct()->pluck('semester');
                $yearLevels = ImplementingSubjects::where('department', $department)->distinct()->pluck('year_level');

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

        public function getDepartments()
        {
            $departments = EieReport::pluck('department')->unique()->values();

            // Ensure it's an array before returning
            return response()->json($departments->toArray());
        }

        public function getDepartmentForStudents()
        {
            $departments = Students::pluck('department')->unique()->values();

            // Ensure it's an array before returning
            return response()->json($departments->toArray());
        }


        public function getDepartmentForPOCs()
        {
            $departments = EIEHeads::pluck('department')->unique()->values();

            // Ensure it's an array before returning
            return response()->json($departments->toArray());
        }

        public function getSchoolYears()
        {
            // Extract unique years from the created_at column using Eloquent
            $schoolYears = EieReport::selectRaw("DISTINCT CONCAT(YEAR(created_at), '/', YEAR(created_at) + 1) AS school_year")
            ->orderBy('school_year', 'desc')
            ->pluck('school_year');

            // Fallback if no records are found
            if ($schoolYears->isEmpty()) {
                $currentYear = date('Y');
                $schoolYears = collect(["$currentYear/" . ($currentYear + 1)]);
            }

            return response()->json($schoolYears);
        }
}
