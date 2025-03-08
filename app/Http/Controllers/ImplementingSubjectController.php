<?php

namespace App\Http\Controllers;

use App\Models\ImplementingSubjects;
use App\Models\ClassLists;
use App\Models\CollegePOCs;
use App\Models\LeadPOCs;
use App\Models\EIEHeads;
use App\Models\EieScorecardClassReport;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

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
            \Log::info("Received API Request: userType = $userType, employeeId = $employeeId");

            $userTypeModelMap = [
                'College POC' => CollegePOCs::class,
                'Lead EIE POC' => LeadPOCs::class,
                'Head EIE POC' => EIEHeads::class,
            ];

            if (!isset($userTypeModelMap[$userType])) {
                \Log::error("Invalid userType: $userType");
                return response()->json(['success' => false, 'message' => 'Invalid user type.'], 400);
            }

            $model = $userTypeModelMap[$userType];
            $employee = $model::where('employee_id', $employeeId)->first();

            if (!$employee) {
                \Log::error("Employee not found: ID = $employeeId, Type = $userType");
                return response()->json(['success' => false, 'message' => 'Employee not found.'], 404);
            }

            return response()->json(['success' => true, 'department' => $employee->department]);
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
            $programs = ImplementingSubjects::where('department', $department)
            ->where('semester', '1st Semester')
            ->get();

            if ($programs->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No programs found for this department in the selected semester.',
                    'enrollmentCount' => []
                ]);
            }

            // Initialize enrollment count structure
            $enrollmentCount = [];

            foreach ($programs as $program) {
                $programKey = $program->program;
                $yearLevel = $program->year_level;

                if (!isset($enrollmentCount[$yearLevel][$programKey])) {
                    $enrollmentCount[$yearLevel][$programKey] = [
                        'total_enrolled' => 0,
                        'course_titles' => []
                    ];
                }

                // Add total enrolled students
                $enrollmentCount[$yearLevel][$programKey]['total_enrolled'] += $program->enrolled_students;

                // Add unique course titles
                if (!in_array($program->course_title, $enrollmentCount[$yearLevel][$programKey]['course_titles'])) {
                    $enrollmentCount[$yearLevel][$programKey]['course_titles'][] = $program->course_title;
                }

                // Monthly data from January to May
                for ($month = 1; $month <= 5; $month++) {
                    $monthName = date("F", mktime(0, 0, 0, $month, 1));

                    // Get submitted count
                    $submittedCount = EieScorecardClassReport::whereYear('created_at', date('Y'))
                    ->whereMonth('created_at', $month)
                    ->where('program', $programKey)
                    ->where('year_level', $yearLevel)
                    ->count();

                    // Compute completion rate
                    $totalEnrolled = $enrollmentCount[$yearLevel][$programKey]['total_enrolled'];
                    $completionRate = $totalEnrolled > 0 ? (($submittedCount / $totalEnrolled) * 100) : 0;
                    $completionRateExpectation = $completionRate == 100 ? 'Meets Expectation' : 'Below Expectation';

                    // Compute EPGF Average
                    $epgfAverage = EieScorecardClassReport::whereYear('created_at', date('Y'))
                    ->whereMonth('created_at', $month)
                    ->where('program', $programKey)
                    ->where('year_level', $yearLevel)
                    ->avg('epgf_average') ?? 0;

                    // Determine proficiency level
                    $proficiencyLevels = [
                        ["threshold" => 0.00, "level" => "Beginning"],
                        ["threshold" => 0.50, "level" => "Low Acquisition"],
                        ["threshold" => 0.75, "level" => "High Acquisition"],
                        ["threshold" => 1.00, "level" => "Emerging"],
                        ["threshold" => 1.25, "level" => "Low Developing"],
                        ["threshold" => 1.50, "level" => "High Developing"],
                        ["threshold" => 1.75, "level" => "Low Proficient"],
                        ["threshold" => 2.00, "level" => "Proficient"],
                        ["threshold" => 2.25, "level" => "High Proficient"],
                        ["threshold" => 2.50, "level" => "Advanced"],
                        ["threshold" => 3.00, "level" => "High Advanced"],
                        ["threshold" => 4.00, "level" => "Native/Bilingual"]
                    ];

                    $proficiencyLevel = "Unknown";
                    foreach ($proficiencyLevels as $current) {
                        if ($epgfAverage <= $current["threshold"]) {
                            $proficiencyLevel = $current["level"];
                            break;
                        }
                    }

                    // Get champion (highest epgf_average student)
                    $champion = ClassLists::select('class_lists.*')
                    ->join('eie_scorecard_class_reports', 'class_lists.student_id', '=', 'eie_scorecard_class_reports.student_id')
                    ->where('class_lists.program', $programKey)
                    ->where('class_lists.year_level', $yearLevel)
                    ->whereYear('eie_scorecard_class_reports.created_at', date('Y'))
                    ->whereMonth('eie_scorecard_class_reports.created_at', $month)
                    ->orderByDesc('eie_scorecard_class_reports.epgf_average')
                    ->first();

                    // Format full name
                    $championName = 'N/A';
                    if ($champion) {
                        $middlename = $champion->middlename ? strtoupper(substr($champion->middlename, 0, 1)) . '.' : '';
                        $championName = trim("{$champion->firstname} $middlename {$champion->lastname}");
                    }

                    $enrollmentCount[$yearLevel][$programKey][$monthName] = [
                        'submitted' => $submittedCount,
                        'completion_rate' => round($completionRate, 2) . '%',
                        'completion_rate_expectation' => $completionRateExpectation,
                        'epgf_average' => round($epgfAverage, 2),
                        'proficiency_level' => $proficiencyLevel,
                        'champion' => $championName,
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'programs' => $programs,
                'enrollmentCount' => $enrollmentCount
            ]);
        }

        public function getProgramsWithEnrollmentCountSecondSemester($department)
        {
            $programs = ImplementingSubjects::where('department', $department)
            ->where('semester', '2nd Semester')
            ->get();

            if ($programs->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No programs found for this department in the selected semester.',
                    'enrollmentCount' => []
                ]);
            }

            // Initialize enrollment count structure
            $enrollmentCount = [];

            foreach ($programs as $program) {
                $programKey = $program->program;
                $yearLevel = $program->year_level;

                if (!isset($enrollmentCount[$yearLevel][$programKey])) {
                    $enrollmentCount[$yearLevel][$programKey] = [
                        'total_enrolled' => 0,
                        'course_titles' => []
                    ];
                }

                // Add total enrolled students
                $enrollmentCount[$yearLevel][$programKey]['total_enrolled'] += $program->enrolled_students;

                // Add unique course titles
                if (!in_array($program->course_title, $enrollmentCount[$yearLevel][$programKey]['course_titles'])) {
                    $enrollmentCount[$yearLevel][$programKey]['course_titles'][] = $program->course_title;
                }

                // Monthly data from January to May
                for ($month = 1; $month <= 5; $month++) {
                    $monthName = date("F", mktime(0, 0, 0, $month, 1));

                    // Get submitted count
                    $submittedCount = EieScorecardClassReport::whereYear('created_at', date('Y'))
                    ->whereMonth('created_at', $month)
                    ->where('program', $programKey)
                    ->where('year_level', $yearLevel)
                    ->count();

                    // Compute completion rate
                    $totalEnrolled = $enrollmentCount[$yearLevel][$programKey]['total_enrolled'];
                    $completionRate = $totalEnrolled > 0 ? (($submittedCount / $totalEnrolled) * 100) : 0;
                    $completionRateExpectation = $completionRate == 100 ? 'Meets Expectation' : 'Below Expectation';

                    // Compute EPGF Average
                    $epgfAverage = EieScorecardClassReport::whereYear('created_at', date('Y'))
                    ->whereMonth('created_at', $month)
                    ->where('program', $programKey)
                    ->where('year_level', $yearLevel)
                    ->avg('epgf_average') ?? 0;

                    // Determine proficiency level
                    $proficiencyLevels = [
                        ["threshold" => 0.00, "level" => "Beginning"],
                        ["threshold" => 0.50, "level" => "Low Acquisition"],
                        ["threshold" => 0.75, "level" => "High Acquisition"],
                        ["threshold" => 1.00, "level" => "Emerging"],
                        ["threshold" => 1.25, "level" => "Low Developing"],
                        ["threshold" => 1.50, "level" => "High Developing"],
                        ["threshold" => 1.75, "level" => "Low Proficient"],
                        ["threshold" => 2.00, "level" => "Proficient"],
                        ["threshold" => 2.25, "level" => "High Proficient"],
                        ["threshold" => 2.50, "level" => "Advanced"],
                        ["threshold" => 3.00, "level" => "High Advanced"],
                        ["threshold" => 4.00, "level" => "Native/Bilingual"]
                    ];

                    $proficiencyLevel = "Unknown";
                    foreach ($proficiencyLevels as $current) {
                        if ($epgfAverage <= $current["threshold"]) {
                            $proficiencyLevel = $current["level"];
                            break;
                        }
                    }

                    // Get champion (highest epgf_average student)
                    $champion = ClassLists::select('class_lists.*')
                    ->join('eie_scorecard_class_reports', 'class_lists.student_id', '=', 'eie_scorecard_class_reports.student_id')
                    ->where('class_lists.program', $programKey)
                    ->where('class_lists.year_level', $yearLevel)
                    ->whereYear('eie_scorecard_class_reports.created_at', date('Y'))
                    ->whereMonth('eie_scorecard_class_reports.created_at', $month)
                    ->orderByDesc('eie_scorecard_class_reports.epgf_average')
                    ->first();

                    // Format full name
                    $championName = 'N/A';
                    if ($champion) {
                        $middlename = $champion->middlename ? strtoupper(substr($champion->middlename, 0, 1)) . '.' : '';
                        $championName = trim("{$champion->firstname} $middlename {$champion->lastname}");
                    }

                    $enrollmentCount[$yearLevel][$programKey][$monthName] = [
                        'submitted' => $submittedCount,
                        'completion_rate' => round($completionRate, 2) . '%',
                        'completion_rate_expectation' => $completionRateExpectation,
                        'epgf_average' => round($epgfAverage, 2),
                        'proficiency_level' => $proficiencyLevel,
                        'champion' => $championName,
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'programs' => $programs,
                'enrollmentCount' => $enrollmentCount
            ]);
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

                \Log::info('Programs: ', $programs->toArray());
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

        public function getDepartments()
        {
            $departments = ImplementingSubjects::pluck('department')->unique()->values();
            return response()->json($departments);
        }

}
