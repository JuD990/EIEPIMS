<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
                // Invalidate the token and logout
                auth()->logout();
                return response()->json(['error' => 'Unauthenticated'], 401);
            }

            $employeeId = $request->user()->id;

            // Fetch implementing subjects for this employee
            $implementingSubjects = ImplementingSubjects::where('employee_id', $employeeId)->get();

            if ($implementingSubjects->isEmpty()) {
                return response()->json(['message' => 'No Class Available'], 404);
            }

            // Return the data as JSON
            return response()->json($implementingSubjects);

        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error fetching classes: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}

