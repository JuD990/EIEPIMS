<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\StudentsImport;

class UserManagement extends Controller
{
    public function getStudents()
    {
        try {
            $students = Students::all(); // Fetch all students
            return response()->json(['data' => $students], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch students', 'error' => $e->getMessage()], 500);
        }
    }

    public function resetPassword($student_id)
    {
        // Find the student by student_id
        $student = Students::where('student_id', $student_id)->first();

        // Check if the student exists
        if (!$student) {
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }

        // Log the current password for debugging purposes (optional)
        Log::info("Reset Password for Student {$student_id}: Current password will be deleted.");

        // Delete the password (set it to null)
        $student->password = null;
        $student->save();

        return response()->json([
            'message' => 'Password successfully deleted for the student.'
        ], 200);
    }

    public function storeStudents(Request $request)
    {
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'studentId' => 'required|unique:students,student_id',
                'firstName' => 'required|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|unique:students,email',
                'department' => 'required|string|max:255',
                'program' => 'required|string|max:255',
                'yearLevel' => 'required|string|max:255', // Added yearLevel validation
            ]);

            // Create and save the new student record
            $student = new Students();
            $student->student_id = $validated['studentId'];
            $student->firstname = $validated['firstName'];
            $student->middlename = $validated['middleName'] ?? null;
            $student->lastname = $validated['lastName'];
            $student->email = $validated['email'];
            $student->department = $validated['department'];
            $student->program = $validated['program'];
            $student->year_level = $validated['yearLevel']; // Save the yearLevel
            $student->save();

            return response()->json([
                'message' => 'Student added successfully',
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Log and return any other exception
            Log::error("Error adding student: " . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateStudents(Request $request, $student_id)
    {
        // Validate the incoming data without the unique constraint for email
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email',  // No unique check here
            'department' => 'required|string|max:255',
            'program' => 'required|string|max:255',
        ]);

        // Find the student by student_id
        $student = Students::where('student_id', $student_id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        // Update the student data
        $student->update($validatedData);

        // Return a success response
        return response()->json(['message' => 'Student data updated successfully']);
    }

    public function importCSV(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|mimes:csv,txt|max:10240',
        ]);

        try {
            \Log::info('Validating file...');
            // Import the CSV using the StudentsImport class
            Excel::import(new StudentsImport, $request->file('csv_file'));
            \Log::info('CSV import completed successfully');
            return response()->json(['message' => 'CSV Imported Successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('CSV Import Error: ' . $e->getMessage());
            return response()->json(['message' => 'Error importing CSV: ' . $e->getMessage()], 500);
        }
    }

}
