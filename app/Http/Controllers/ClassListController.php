<?php
namespace App\Http\Controllers;

use App\Imports\ClassListImport;
use App\Models\ClassLists;
use App\Models\ImplementingSubjects;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

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
                return response()->json(['message' => 'No students found for the given filters.'], 404);
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
            $students = ClassLists::select('class_lists_id', 'student_id', 'firstname', 'middlename', 'lastname', 'status', 'year_level', 'classification', 'gender', 'reason_for_shift_or_drop')
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
            'file' => 'required|file|mimes:csv,xlsx,xls|max:10240', // 10MB max file size
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
}
