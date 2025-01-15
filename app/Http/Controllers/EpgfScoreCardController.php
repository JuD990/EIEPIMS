<?php

namespace App\Http\Controllers;

use App\Models\ClassLists;
use App\Models\ImplementingSubjects;
use Illuminate\Http\Request;
use App\Models\EieScorecardClassReport;
use Illuminate\Support\Facades\DB;

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
                'department'=> $course->department,
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
        ->get(['firstname', 'lastname', 'year_level', 'student_id', 'department', 'program']);

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

    public function storeStudentDataReports(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'course_code' => 'required|string',
            'epgf_rubric_id' => 'required|integer',
            'student_id' => 'required|string',
            'department' => 'required|string',
            'task_title' => 'required|string',
            'type' => 'required|string',
            'comment' => 'nullable|string',
            'epgf_average' => 'required|numeric',
            'proficiency_level' => 'required|string',
            'program' => 'required|string',
            'active_students' => 'required|numeric',

            // Pronunciation
            'consistency_descriptor' => 'nullable|string',
            'consistency_rating' => 'nullable|numeric',
            'clarity_descriptor' => 'nullable|string',
            'clarity_rating' => 'nullable|numeric',
            'articulation_descriptor' => 'nullable|string',
            'articulation_rating' => 'nullable|numeric',
            'intonation_and_stress_descriptor' => 'nullable|string',
            'intonation_and_stress_rating' => 'nullable|numeric',
            'pronunciation_average' => 'nullable|numeric',

            // Grammar
            'accuracy_descriptor' => 'nullable|string',
            'accuracy_rating' => 'nullable|numeric',
            'clarity_of_thought_descriptor' => 'nullable|string',
            'clarity_of_thought_rating' => 'nullable|numeric',
            'syntax_descriptor' => 'nullable|string',
            'syntax_rating' => 'nullable|numeric',
            'grammar_average' => 'nullable|numeric',

            // Fluency
            'quality_of_response_descriptor' => 'nullable|string',
            'quality_of_response_rating' => 'nullable|numeric',
            'detail_of_response_descriptor' => 'nullable|string',
            'detail_of_response_rating' => 'nullable|numeric',
            'fluency_average' => 'nullable|numeric',
        ]);

        try {
            // Create a new record in the database
            $scorecard = EieScorecardClassReport::create($validatedData);

            return response()->json([
                'message' => 'Scorecard successfully stored',
                'scorecard' => $scorecard
            ], 201); // 201 status code for resource creation
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error storing scorecard', ['error' => $e->getMessage()]);

            // Return a 500 error with the exception message
            return response()->json([
                'message' => 'Failed to store scorecard',
                'error' => $e->getMessage()
            ], 500); // 500 status code for server errors
        }
    }

    public function getStudentCountByCourseCode(Request $request)
    {
        // Get the course_code from the request
        $course_code = $request->input('course_code');

        // Query to count students enrolled in the course with the given course_code
        $studentCount = ClassLists::where('course_code', $course_code)->count();

        return response()->json(['student_count' => $studentCount]);
    }

    public function getStudentCountByCourseCodeAndActive(Request $request)
    {
        // Get the course_code from the request
        $course_code = $request->input('course_code');

        if (!$course_code) {
            return response()->json(['error' => 'Course code is required'], 400);
        }

        // Query to count only active students enrolled in the course with the given course_code
        $studentCount = ClassLists::where('course_code', $course_code)
        ->where('status', 'active') // Assuming 'status' field marks students as active or inactive
        ->count();

        return response()->json(['student_count' => $studentCount]);
    }


    public function getClassAverageByCourseCode(Request $request)
    {
        $course_code = $request->input('course_code');

        // Query to get all the epgf_average values for the given course_code
        $averages = EieScorecardClassReport::where('course_code', $course_code)
        ->pluck('epgf_average'); // Assuming 'epgf_average' is the column storing the average

        if ($averages->isEmpty()) {
            return response()->json(['average' => 0, 'message' => 'No averages available for this course']);
        }

        // Calculate the average of the 'epgf_average' column
        $classAverage = $averages->avg(); // Get the average of the 'epgf_average'

        return response()->json(['average' => $classAverage]);
    }

    public function getEvaluatedCount(Request $request)
    {
        $course_code = $request->input('course_code');

        // Count students with evaluated status for the given course_code
        $evaluatedCount = DB::table('eie_scorecard_class_reports') // Corrected this part
        ->where('course_code', $course_code)
        ->count();

        return response()->json(['evaluated_count' => $evaluatedCount]);
    }

    public function storeClassData(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'course_code' => 'required|string',
            'average' => 'required|numeric',
            'completionRate' => 'required|numeric',
            'proficiencyLevel' => 'required|string',
            'enrolled_students' => 'required|integer',  // Add validation for enrolled_students
            'active_students' => 'required|integer',    // Add validation for active_students
        ]);

        // Find the ImplementingSubject by course_code
        $subject = ImplementingSubjects::where('course_code', $validated['course_code'])->first();

        if ($subject) {
            // Update the existing subject with the new values
            $subject->update([
                'epgf_average' => $validated['average'],
                'completion_rate' => $validated['completionRate'],
                'proficiency_level' => $validated['proficiencyLevel'],
                'enrolled_students' => $validated['enrolled_students'], // Store enrolled_students
                'active_students' => $validated['active_students'],   // Store active_students
            ]);
        } else {
            // If no record exists, create a new one
            $subject = ImplementingSubjects::create([
                'course_code' => $validated['course_code'],
                'epgf_average' => $validated['average'],
                'completion_rate' => $validated['completionRate'],
                'proficiency_level' => $validated['proficiencyLevel'],
                'enrolled_students' => $validated['enrolled_students'], // Store enrolled_students
                'active_students' => $validated['active_students'],   // Store active_students
            ]);
        }

        // Return a success response
        return response()->json([
            'success' => true,
            'message' => 'Class data successfully saved or updated!',
            'data' => $subject,
        ]);
    }


}
