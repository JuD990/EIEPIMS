<?php
namespace App\Http\Controllers;

use App\Imports\ClassListImport;
use App\Models\ClassLists;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class ClassListController extends Controller
{
    public function getClassList()
    {
        try {
            $students = ClassLists::select('id', 'student_id', 'firstname', 'middlename', 'lastname', 'status', 'year_level', 'classification', 'gender', 'reason_for_shift_or_drop')
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
