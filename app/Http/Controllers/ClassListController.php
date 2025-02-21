<?php
namespace App\Http\Controllers;

use App\Imports\ClassListImport;
use App\Models\ClassLists;
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

            // Log the received values
            Log::info('Received filter request:', [
                'course_code' => $courseCode,
                'employee_id' => $employeeId,
            ]);

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


    public function getClassList()
    {
        try {
            $students = ClassLists::select('class_lists_id', 'student_id', 'firstname', 'middlename', 'lastname', 'status', 'year_level', 'classification', 'gender', 'reason_for_shift_or_drop', 'course_code')
                ->get();
    
            return response()->json($students, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching class list: ' . $e->getMessage());
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
                'course_code'
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
            // Validate incoming data
            $request->validate([
                'firstName' => 'required|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'lastName' => 'required|string|max:255',
                'classification' => 'required|string',
                'yearLevel' => 'required|string',
                'status' => 'required|string',
                'reason' => 'nullable|string',
                'courseCode' => 'nullable|string',
            ]);

            // Find the student by class_lists_id instead of student_id
            $student = ClassLists::where('class_lists_id', $class_lists_id)->first();

            if (!$student) {
                return response()->json(['message' => 'Student not found.'], 404);
            }

            // Update student details
            $student->firstname = $request->input('firstName');
            $student->middlename = $request->input('middleName');
            $student->lastname = $request->input('lastName');
            $student->classification = $request->input('classification');
            $student->year_level = $request->input('yearLevel');
            $student->status = $request->input('status');
            $student->reason_for_shift_or_drop = $request->input('reason');
            $student->course_code = $request->input('courseCode');

            // Save the updated student record
            $student->save();

            return response()->json(['message' => 'Student information updated successfully.'], 200);

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update student information.', 'error' => $e->getMessage()], 500);
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

}
