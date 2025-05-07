<?php
namespace App\Http\Controllers;

use App\Imports\ClassListImport;
use App\Models\ClassLists;
use App\Models\EIEHeads;
use App\Models\CollegePOCs;
use App\Models\ImplementingSubjects;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ClassListController extends Controller
{
    public function filterStudents(Request $request)
    {
        try {
            $courseCode = $request->query('course_code');
            $employeeId = $request->query('employee_id');

            // Validate if course_code and employee_id are provided
            if (!$courseCode || !$employeeId) {
                return response()->json(['error' => 'Course code and employee ID are required.'], 400);
            }

            // Query the database for all matching records
            $ImplementingSubjects = DB::table('implementing_subjects')
            ->where('course_code', $courseCode)
            ->where('employee_id', $employeeId)
            ->get();

            // Check if any students were found
            if ($ImplementingSubjects->isEmpty()) {
                return response()->json(['message' => 'No students'], 404);
            }

            // Return the students' data
            return response()->json($ImplementingSubjects, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }


    public function getClassListByDepartment(Request $request)
    {
        try {
            // Get employee_id from the request (or from auth if using authentication)
            $employeeId = $request->query('employee_id');

            if (!$employeeId) {
                return response()->json(['message' => 'Employee ID is required'], 400);
            }

            // Find the department of the employee
            $eieHead = EIEHeads::where('employee_id', $employeeId)->first();

            if (!$eieHead) {
                return response()->json(['message' => 'Employee not found in EIEHeads'], 404);
            }

            // Get class lists based on department
            $students = ClassLists::where('department', $eieHead->department)
            ->select('class_lists_id', 'student_id', 'firstname', 'middlename', 'lastname', 'status', 'year_level', 'classification', 'gender', 'reason_for_shift_or_drop', 'course_code', 'epgf_average', 'proficiency_level', 'pronunciation', 'grammar', 'fluency', 'program', 'candidate_for_graduating')
            ->get();

            return response()->json($students, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching class list by department: ' . $e->getMessage());
            return response()->json(['message' => 'Error fetching class list.'], 500);
        }
    }

    public function uploadClassList(Request $request)
    {
        // Validate file
        $request->validate([
            'file' => 'required|file|mimes:csv,xlsx,xls|max:10240',
        ]);

        try {
            // Import the class list using Laravel Excel
            Excel::import(new ClassListImport, $request->file('file'));

            return response()->json(['message' => 'Class List uploaded successfully!'], 200);
        } catch (\Exception $e) {
            // Log the exception for debugging
            Log::error('Error uploading file: ' . $e->getMessage());

            return response()->json(['message' => 'Error uploading file: ' . $e->getMessage()], 500);            
        }
    }

    public function ManageClassList(Request $request)
    {
        try {
            $employeeId = $request->query('employee_id');

            // Determine the current semester based on the current month
            $currentMonth = now()->month;

            if ($currentMonth >= 1 && $currentMonth <= 5) {
                $currentSemester = '2nd Semester'; // January to May
            } elseif ($currentMonth >= 8 && $currentMonth <= 12) {
                $currentSemester = '1st Semester'; // August to December
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No Classes Available for the current semester'
                ]);
            }

            // Get the course codes for the current semester and employee_id
            $excludedCourseCodes = ImplementingSubjects::where('employee_id', $employeeId)
            ->where('semester', $currentSemester)
            ->pluck('course_code')
            ->toArray();

            if (empty($excludedCourseCodes)) {
                return response()->json([], 200); // Return an empty array if no courses
            }

            // Fetch students excluding the courses in the current semester
            $students = ClassLists::select(
                'class_lists_id',
                'student_id',
                'firstname',
                'middlename',
                'lastname',
                'status',
                'year_level',
                'classification',
                'gender',
                'reason_for_shift_or_drop',
                'course_code',
                'epgf_average',
                'proficiency_level',
                'pronunciation',
                'grammar',
                'fluency',
            )
            ->whereIn('course_code', $excludedCourseCodes)
            ->get();

            return response()->json($students, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching class list: ' . $e->getMessage());
            return response()->json(['message' => 'Error fetching class list.'], 500);
        }
    }

    public function updateStudent(Request $request, $class_lists_id)
    {
        try {
            $request->validate([
                'firstName' => 'required|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'lastName' => 'required|string|max:255',
                'classification' => 'nullable|string',
                'yearLevel' => 'required|string',
                'status' => 'required|string',
                'gender' => 'nullable|string',
                'reason' => 'nullable|string', // This is fine
                'courseCode' => 'nullable|string',
                'candidate_for_graduating' => 'nullable|string',
            ]);

            $student = ClassLists::where('class_lists_id', $class_lists_id)->first();

            if (!$student) {
                return response()->json(['message' => 'Student not found.'], 404);
            }

            $student->firstname = $request->input('firstName');
            $student->middlename = $request->input('middleName');
            $student->lastname = $request->input('lastName');
            $student->classification = $request->input('classification');
            $student->year_level = $request->input('yearLevel');
            $student->gender = $request->input('gender');
            $student->status = $request->input('status');
            $student->reason_for_shift_or_drop = $request->input('reason');
            $student->course_code = $request->input('courseCode');
            $student->candidate_for_graduating = $request->input('candidate_for_graduating');

            $student->save();

            return response()->json(['message' => 'Student updated successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Update failed.', 'error' => $e->getMessage()], 500);
        }
    }

    public function fetchMonthlyChamps()
    {
        // Get the current month
        $currentMonth = Carbon::now()->month;

        // Fetch records where epgf_average is not null and greater than 0,
        // and where the created_at month matches the current month (ignoring the year)
        $classLists = ClassLists::whereNotNull('epgf_average')
        ->where('epgf_average', '>', 0)
        ->whereMonth('created_at', $currentMonth)
        ->orderByDesc('epgf_average')
        ->get();

        return response()->json($classLists);
    }
    public function getCoursesByDepartment(Request $request)
    {
        $employeeId = $request->header('X-Employee-ID');

        if (!$employeeId) {
            return response()->json(['error' => 'Employee ID is required'], 400);
        }

        $user = EIEHeads::where('employee_id', $employeeId)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $department = $user->department;

        // Step 1: Get distinct course_codes from ClassLists
        $courseCodes = ClassLists::where('department', $department)
        ->select('course_code')
        ->distinct()
        ->pluck('course_code');

        // Step 2: Get matching course_titles from ImplementingSubjects
        $courses = ImplementingSubjects::whereIn('course_code', $courseCodes)
        ->where('department', $department)
        ->select('course_code', 'course_title')
        ->distinct()
        ->get();

        // Optional: group by course_title if you want same structure as before
        $groupedCourses = $courses->groupBy('course_title')->map(function ($group) {
            return $group->pluck('course_code')->unique()->values();
        })->toArray();

        return response()->json($groupedCourses);
    }


    public function getCoursesByDepartmentStudent(Request $request)
    {
        $employeeId = $request->header('employee_id');

        if (!$employeeId) {
            return response()->json(['error' => 'Employee ID is required'], 400);
        }

        $employee = EIEHeads::where('employee_id', $employeeId)->first();

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        $department = $employee->department;

        // Determine current semester based on the current month
        $currentMonth = now()->month;
        $semester = ($currentMonth >= 8 && $currentMonth <= 12) ? '1st Semester' : '2nd Semester';

        // Fetch courses filtered by department and semester
        $courses = ImplementingSubjects::select('course_code', 'course_title')
        ->where('department', $department)
        ->where('semester', $semester)
        ->distinct()
        ->get();

        return response()->json($courses);
    }


    public function getCoursesPOC(Request $request)
    {
        // Get the employee_id from the request header
        $employeeId = $request->header('X-Employee-ID');

        if (!$employeeId) {
            return response()->json(['error' => 'Employee ID is required'], 400);
        }

        // Find the user by employee_id
        $user = CollegePOCs::where('employee_id', $employeeId)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Get the department of the user
        $department = $user->department;

        // Fetch courses related to the user's department and employee_id
        $courses = ImplementingSubjects::where('department', $department)
        ->where('employee_id', $employeeId)
        ->select('course_title', 'course_code', 'department')
        ->get();

        // Optional: group by course_title if you want same structure as before
        $groupedCourses = $courses->groupBy('course_title')->map(function ($group) {
            return $group->pluck('course_code')->unique()->values();
        })->toArray();

        return response()->json($groupedCourses);
    }

    public function getStudentStatistics(Request $request)
    {
        $employeeId = $request->query('employee_id');
        $department = EIEHeads::where('employee_id', $employeeId)->value('department');

        if (!$department) {
            return response()->json([
                'error' => 'Department not found for the provided employee ID.'
            ], 404);
        }

        $totalStudents = ClassLists::where('department', $department)->count();

        $activeStudents = ClassLists::where('department', $department)
        ->where('status', 'Active')
        ->count();

        $graduatingStudents = ClassLists::where('department', $department)
        ->where('candidate_for_graduating', 'Yes')
        ->where('status', 'Active')
        ->where(function ($query) {
            $query->where(function ($q) {
                return $q->where('program', 'ACT')
                ->where('year_level', '2nd Year');
            })->orWhere('year_level', '4th Year');
        })
        ->count();

        // Freshmen
        $freshmenTotal = ClassLists::where('department', $department)
        ->where('year_level', '1st Year')
        ->count();
        $freshmenActive = ClassLists::where('department', $department)
        ->where('year_level', '1st Year')
        ->where('status', 'Active')
        ->count();
        $freshmenPercentage = $freshmenTotal > 0 ? round(($freshmenActive / $freshmenTotal) * 100, 2) : 0;

        // Sophomores
        $sophomoreTotal = ClassLists::where('department', $department)
        ->where('year_level', '2nd Year')
        ->count();
        $sophomoreActive = ClassLists::where('department', $department)
        ->where('year_level', '2nd Year')
        ->where('status', 'Active')
        ->count();
        $sophomorePercentage = $sophomoreTotal > 0 ? round(($sophomoreActive / $sophomoreTotal) * 100, 2) : 0;

        // Juniors
        $juniorTotal = ClassLists::where('department', $department)
        ->where('year_level', '3rd Year')
        ->count();
        $juniorActive = ClassLists::where('department', $department)
        ->where('year_level', '3rd Year')
        ->where('status', 'Active')
        ->count();
        $juniorPercentage = $juniorTotal > 0 ? round(($juniorActive / $juniorTotal) * 100, 2) : 0;

        // Seniors
        $seniorTotal = ClassLists::where('department', $department)
        ->where('year_level', '4th Year')
        ->count();
        $seniorActive = ClassLists::where('department', $department)
        ->where('year_level', '4th Year')
        ->where('status', 'Active')
        ->count();
        $seniorPercentage = $seniorTotal > 0 ? round(($seniorActive / $seniorTotal) * 100, 2) : 0;

        // 🔸 Determine current semester based on current month
        $currentMonth = now()->month;
        $currentSemester = ($currentMonth >= 8 && $currentMonth <= 12) ? '1st Semester' : '2nd Semester';

        // Get subjects or course titles by year level from ImplementingSubjects
        $subjectsByYearLevel = ImplementingSubjects::whereIn('year_level', ['1st Year', '2nd Year', '3rd Year', '4th Year'])
        ->where('department', $department)
        ->where('semester', $currentSemester)
        ->get(['year_level', 'course_title']);

        $subjectsByYearLevelGrouped = $subjectsByYearLevel->groupBy('year_level');

        $activePercentage = $totalStudents > 0
        ? round(($activeStudents / $totalStudents) * 100, 2)
        : 0;

        return response()->json([
            'total_students' => $totalStudents,
            'active_students' => $activeStudents,
            'active_percentage' => $activePercentage,
            'graduating_students' => $graduatingStudents,

            'freshmen' => [
                'total' => $freshmenTotal,
                'active' => $freshmenActive,
                'active_percentage' => $freshmenPercentage,
                'subjects' => $subjectsByYearLevelGrouped['1st Year'] ?? [],
            ],
            'sophomores' => [
                'total' => $sophomoreTotal,
                'active' => $sophomoreActive,
                'active_percentage' => $sophomorePercentage,
                'subjects' => $subjectsByYearLevelGrouped['2nd Year'] ?? [],
            ],
            'juniors' => [
                'total' => $juniorTotal,
                'active' => $juniorActive,
                'active_percentage' => $juniorPercentage,
                'subjects' => $subjectsByYearLevelGrouped['3rd Year'] ?? [],
            ],
            'seniors' => [
                'total' => $seniorTotal,
                'active' => $seniorActive,
                'active_percentage' => $seniorPercentage,
                'subjects' => $subjectsByYearLevelGrouped['4th Year'] ?? [],
            ],
        ]);
    }


}
