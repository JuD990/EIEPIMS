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
use App\Models\MasterClassList;
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

    public function archived()
    {
        $subjects = HistoricalImplementingSubjects::all();
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
            'yearLevel' => 'required|string|max:100',
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
            'year_level' => $validated['yearLevel'],
            'active_students' => $validated['activeStudents'] ?? $subject->active_students,
            'enrolled_students' => $validated['enrolledStudents'] ?? $subject->enrolled_students,
        ]);

        return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject]);
    }

    public function updateArchive(Request $request, $courseCode)
    {
        // Validate incoming data
        $validated = $request->validate([
            'courseTitle' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'courseCode' => 'required|string|max:50',
            'semester' => 'required|string|max:50',
            'department' => 'required|string|max:100',
            'program' => 'required|string|max:100',
            'yearLevel' => 'required|string|max:100',
            'activeStudents' => 'nullable|integer',
            'enrolledStudents' => 'nullable|integer',
        ]);

        // Find the subject by courseCode
        $subject = HistoricalImplementingSubjects::where('course_code', $courseCode)->first();

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
            'year_level' => $validated['yearLevel'],
            'active_students' => $validated['activeStudents'] ?? $subject->active_students,
            'enrolled_students' => $validated['enrolledStudents'] ?? $subject->enrolled_students,
        ]);

        return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject]);
    }

    public function fetchImplementingSubjects(Request $request)
    {
        try {
            // Log all incoming headers for debugging
            Log::info("Received headers:", $request->headers->all());

            // Get employee_id from the request headers
            $employeeId = $request->header('X-Employee-ID');

            if (!$employeeId) {
                return response()->json(['error' => 'Employee ID is required'], 400);
            }

            // Log received employee_id to help with debugging
            Log::info("Received employee_id: $employeeId");

            // Find the employee using the employee_id to get the department
            $employee = EIEHeads::where('employee_id', $employeeId)->first();

            if (!$employee) {
                Log::warning("Employee not found for employee_id: $employeeId");
                return response()->json(['error' => 'Employee not found'], 404);
            }

            // Get the department of the employee
            $department = $employee->department;

            // Filter the implementing subjects based on the department
            $subjects = ImplementingSubjects::where('department', $department)->get();

            if ($subjects->isEmpty()) {
                Log::warning("No subjects found for department: $department");
                return response()->json(['error' => 'No subjects found for this department'], 404);
            }

            Log::info("Fetched subjects for department: $department", ['subjects' => $subjects]);

            return response()->json($subjects);
        } catch (\Exception $e) {
            Log::error("Error fetching implementing subjects: " . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred. Please try again later.'], 500);
        }
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->storeAs('uploads', $file->getClientOriginalName());

            if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
                $header = fgetcsv($handle);

                $expectedColumns = [
                    'course_code', 'code', 'course_title',
                    'semester', 'year_level', 'program',
                    'department', 'employee_id', 'assigned_poc',
                    'email', 'enrolled_students',
                ];

                if ($header !== $expectedColumns) {
                    fclose($handle);
                    Log::warning('CSV upload failed: invalid format.', ['header' => $header]);
                    return response()->json(['message' => 'Invalid CSV format.'], 400);
                }

                $csvCourseCodes = [];
                $rowCount = 0;

                while (($row = fgetcsv($handle)) !== false) {
                    $rowCount++;
                    $csvCourseCodes[] = $row[0]; // Track course_code for cleanup

                    ImplementingSubjects::updateOrCreate(
                        ['course_code' => $row[0]],
                        [
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
                        ]
                    );
                }

                fclose($handle);

                if ($rowCount > 0) {
                    ImplementingSubjects::whereNotIn('course_code', $csvCourseCodes)->delete();
                    Log::info("CSV sync complete. {$rowCount} rows processed. Old records removed.");
                } else {
                    ImplementingSubjects::truncate();
                    Log::info("CSV was empty. All records truncated.");
                }

                return response()->json(['message' => 'Data synced successfully!', 'path' => $path], 200);
            }

            return response()->json(['message' => 'Failed to read the file.'], 400);
        }

        return response()->json(['message' => 'No file uploaded.'], 400);
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

                // Order the year levels manually and convert to array
                $yearLevels = ImplementingSubjects::distinct()->pluck('year_level')->toArray();
                usort($yearLevels, function ($a, $b) {
                    $order = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
                    return array_search($a, $order) - array_search($b, $order);
                });

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

                // Order the year levels manually and convert to array
                $yearLevels = ImplementingSubjects::where('department', $department)
                ->distinct()
                ->pluck('year_level')
                ->toArray();

                usort($yearLevels, function ($a, $b) {
                    $order = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
                    return array_search($a, $order) - array_search($b, $order);
                });

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

        public function getDropdownSpecificDataMaster(Request $request)
        {
            try {
                $employeeId = $request->query('employee_id');

                // Fetch the department from EIEHeads
                $department = EIEHeads::where('employee_id', $employeeId)->value('department');

                if (!$department) {
                    return response()->json(['error' => 'Department not found for employee'], 404);
                }

                // Fetch programs, semesters, and year levels based on the department
                $programs = MasterClassList::where('department', $department)->distinct()->pluck('program');

                // Order the year levels manually and convert to array
                $yearLevels = MasterClassList::where('department', $department)
                ->distinct()
                ->pluck('year_level')
                ->toArray();

                usort($yearLevels, function ($a, $b) {
                    $order = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
                    return array_search($a, $order) - array_search($b, $order);
                });

                return response()->json([
                    'programs' => $programs,
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
            $departments = ImplementingSubjects::pluck('department')->unique()->values();

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

        public function archiveSubjects(Request $request)
        {
            // Get the selected subjects from the request
            $subjects = $request->input('subjects');

            // Loop through each subject and archive it
            foreach ($subjects as $subject) {
                // Archive the subject
                $archivedSubject = new HistoricalImplementingSubjects();
                $archivedSubject->course_title = $subject['course_title'];
                $archivedSubject->code = $subject['code'];
                $archivedSubject->course_code = $subject['course_code'];
                $archivedSubject->semester = $subject['semester'];
                $archivedSubject->year_level = $subject['year_level'];
                $archivedSubject->program = $subject['program'];
                $archivedSubject->department = $subject['department'];
                $archivedSubject->assigned_poc = $subject['assigned_poc'];
                $archivedSubject->employee_id = $subject['employee_id'];
                $archivedSubject->email = $subject['email'];
                $archivedSubject->epgf_average = $subject['epgf_average'];
                $archivedSubject->completion_rate = $subject['completion_rate'];
                $archivedSubject->proficiency_level = $subject['proficiency_level'];
                $archivedSubject->active_students = $subject['active_students'];
                $archivedSubject->enrolled_students = $subject['enrolled_students'];

                // Save to the archived table
                $archivedSubject->save();

                // After archiving, delete from the original table
                ImplementingSubjects::where('course_code', $subject['course_code'])->delete();
            }

            return response()->json(['message' => 'Subjects archived and deleted successfully']);
        }

        public function restoreSubjects(Request $request)
        {
            // Get the selected archived subjects from the request
            $subjects = $request->input('subjects');

            // Loop through each subject and restore it
            foreach ($subjects as $subject) {
                // Restore the subject to the original table
                $restoredSubject = new ImplementingSubjects();
                $restoredSubject->course_title = $subject['course_title'];
                $restoredSubject->code = $subject['code'];
                $restoredSubject->course_code = $subject['course_code'];
                $restoredSubject->semester = $subject['semester'];
                $restoredSubject->year_level = $subject['year_level'];
                $restoredSubject->program = $subject['program'];
                $restoredSubject->department = $subject['department'];
                $restoredSubject->assigned_poc = $subject['assigned_poc'];
                $restoredSubject->employee_id = $subject['employee_id'];
                $restoredSubject->email = $subject['email'];
                $restoredSubject->epgf_average = $subject['epgf_average'];
                $restoredSubject->completion_rate = $subject['completion_rate'];
                $restoredSubject->proficiency_level = $subject['proficiency_level'];
                $restoredSubject->active_students = $subject['active_students'];
                $restoredSubject->enrolled_students = $subject['enrolled_students'];

                // Save to the original table
                $restoredSubject->save();

                // After restoring, delete from the archive table
                HistoricalImplementingSubjects::where('course_code', $subject['course_code'])->delete();
            }

            return response()->json(['message' => 'Subjects restored successfully']);
        }

        public function deleteSubjects(Request $request)
        {
            // Get the selected subjects from the request
            $subjects = $request->input('subjects');

            // Loop through each subject and permanently delete it
            foreach ($subjects as $subject) {
                HistoricalImplementingSubjects::where('course_code', $subject['course_code'])->delete();
            }

            return response()->json(['message' => 'Subjects permanently deleted']);
        }
}
