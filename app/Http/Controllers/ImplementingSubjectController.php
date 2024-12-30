<?php

namespace App\Http\Controllers;

use App\Models\ImplementingSubjects;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class ImplementingSubjectController extends Controller
{
    public function index()
    {
        $subjects = ImplementingSubjects::all();
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
                    'department', 'employee_id', 'assigned_poc', 'email'
                ];

                // Validate the CSV header
                if ($header !== $expectedColumns) {
                    fclose($handle);
                    return response()->json(['message' => 'Invalid CSV format.'], 400);
                }

                // Read each row and insert into the database
                while (($row = fgetcsv($handle)) !== false) {
                    ImplementingSubjects::create([
                        'course_code'  => $row[0],
                        'code'         => $row[1],
                        'course_title' => $row[2],
                        'semester'     => $row[3],
                        'year_level'   => $row[4],
                        'program'      => $row[5],
                        'department'   => $row[6],
                        'employee_id'  => $row[7],
                        'assigned_poc' => $row[8],
                        'email'        => $row[9],
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
        // Get class data based on employee_id
        public function getClassData($employee_id)
        {
            Log::info('Employee ID: ' . $employee_id);
            // Query for all subjects associated with the given employee_id
            $classData = ImplementingSubjects::where('employee_id', $employee_id)->get();
        
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
        }
        
}
