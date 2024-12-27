<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ImplementingSubjects;
use App\Models\ClassLists;
use Illuminate\Support\Facades\Log;

class ClassController extends Controller
{
    /**
     * Fetch classes for the authenticated user.
     */
    public function index(Request $request)
    {
        try {
            // Ensure the user is authenticated
            if (!$request->user()) {
                return response()->json(['error' => 'Unauthenticated'], 401);
            }
    
            \Log::info('API Request for classes', ['user' => $request->user()]);
    
            $employeeId = $request->user()->id;
        
            // Fetch implementing subjects for this employee
            $implementingSubjects = ImplementingSubjects::where('employee_id', $employeeId)->get();
        
            // Check if there are no subjects found
            if ($implementingSubjects->isEmpty()) {
                return response()->json(['message' => 'No Class Available'], 404);
            }
    
        
            // Return the data as JSON
            return response()->json($classes);
        
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error fetching classes: ' . $e->getMessage());
        
            // Return an error message if something goes wrong
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
