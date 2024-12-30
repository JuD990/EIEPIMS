<?php

namespace App\Http\Controllers;

use App\Models\ClassLists;
use App\Models\ImplementingSubjects;
use Illuminate\Http\Request;

class EpgfScoreCardController extends Controller
{
    public function getCourseDetails(Request $request)
    {
        $course_code = $request->input('course_code'); // Get course_code from the request

        // Fetch the course details based on course_code from ImplementingSubjects table
        $course = ImplementingSubjects::where('course_code', $course_code)->first();

        if ($course) {
            return response()->json([
                'success' => true,
                'course_title' => $course->course_title,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }
    }

    public function getActiveStudents(Request $request)
    {
        $request->validate([
            'course_code' => 'required|string|exists:implementing_subjects,course_code',
        ]);

        $course_code = $request->input('course_code');

        // Fetch students with "Active" status and the provided course_code
        $students = ClassLists::where('status', 'Active')
        ->where('course_code', $course_code)
        ->get(['student_id', 'firstname', 'lastname', 'year_level', 'epgf_average', 'proficiency_level']);

        if ($students->isNotEmpty()) {
            return response()->json([
                'success' => true,
                'active_student_count' => $students->count(),
                                    'students' => $students,
            ]);
        } else {
            \Log::info("No active students found for course code: {$course_code}");
            return response()->json([
                'success' => false,
                'message' => 'No active students found',
            ], 404);
        }
    }


}
