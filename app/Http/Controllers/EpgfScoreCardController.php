<?php

namespace App\Http\Controllers;

use App\Models\ClassLists;
use App\Models\ImplementingSubjects;
use Illuminate\Http\Request;
use App\Models\EieScorecardClassReport;
use App\Models\HistoricalScorecard;
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
        ->get(['class_lists_id', 'firstname', 'lastname', 'year_level', 'student_id', 'department', 'program']);

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
            'course_title' => 'required|string',
            'year_level' => 'required|string',

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
            // Step 1: Store the scorecard data in the EieScorecardClassReport
            $scorecard = EieScorecardClassReport::create([
                'course_code' => $validatedData['course_code'],
                'epgf_rubric_id' => $validatedData['epgf_rubric_id'],
                'student_id' => $validatedData['student_id'],
                'department' => $validatedData['department'],
                'task_title' => $validatedData['task_title'],
                'type' => $validatedData['type'],
                'comment' => $validatedData['comment'] ?? 'No Comment',
                'epgf_average' => $validatedData['epgf_average'],
                'proficiency_level' => $validatedData['proficiency_level'],
                'program' => $validatedData['program'],
                'active_students' => $validatedData['active_students'],
                'course_title' => $validatedData['course_title'],
                'year_level' => $validatedData['year_level'],
                'pronunciation_average' => $validatedData['pronunciation_average'] ?? null,
                'grammar_average' => $validatedData['grammar_average'] ?? null,
                'fluency_average' => $validatedData['fluency_average'] ?? null,

                // Pronunciation
                'consistency_descriptor' => $validatedData['consistency_descriptor'] ?? null,
                'consistency_rating' => $validatedData['consistency_rating'] ?? null,
                'clarity_descriptor' => $validatedData['clarity_descriptor'] ?? null,
                'clarity_rating' => $validatedData['clarity_rating'] ?? null,
                'articulation_descriptor' => $validatedData['articulation_descriptor'] ?? null,
                'articulation_rating' => $validatedData['articulation_rating'] ?? null,
                'intonation_and_stress_descriptor' => $validatedData['intonation_and_stress_descriptor'] ?? null,
                'intonation_and_stress_rating' => $validatedData['intonation_and_stress_rating'] ?? null,

                // Grammar
                'accuracy_descriptor' => $validatedData['accuracy_descriptor'] ?? null,
                'accuracy_rating' => $validatedData['accuracy_rating'] ?? null,
                'clarity_of_thought_descriptor' => $validatedData['clarity_of_thought_descriptor'] ?? null,
                'clarity_of_thought_rating' => $validatedData['clarity_of_thought_rating'] ?? null,
                'syntax_descriptor' => $validatedData['syntax_descriptor'] ?? null,
                'syntax_rating' => $validatedData['syntax_rating'] ?? null,

                // Fluency
                'quality_of_response_descriptor' => $validatedData['quality_of_response_descriptor'] ?? null,
                'quality_of_response_rating' => $validatedData['quality_of_response_rating'] ?? null,
                'detail_of_response_descriptor' => $validatedData['detail_of_response_descriptor'] ?? null,
                'detail_of_response_rating' => $validatedData['detail_of_response_rating'] ?? null,
            ]);

            // Step 2: Store the scorecard data in the HistoricalScorecard
            $historicalScorecard = HistoricalScorecard::create([
                'course_code' => $validatedData['course_code'],
                'epgf_rubric_id' => $validatedData['epgf_rubric_id'],
                'student_id' => $validatedData['student_id'],
                'department' => $validatedData['department'],
                'task_title' => $validatedData['task_title'],
                'type' => $validatedData['type'],
                'comment' => $validatedData['comment'] ?? 'No Comment',
                'epgf_average' => $validatedData['epgf_average'],
                'proficiency_level' => $validatedData['proficiency_level'],
                'program' => $validatedData['program'],
                'active_students' => $validatedData['active_students'],
                'course_title' => $validatedData['course_title'],
                'year_level' => $validatedData['year_level'],
                'pronunciation_average' => $validatedData['pronunciation_average'] ?? null,
                'grammar_average' => $validatedData['grammar_average'] ?? null,
                'fluency_average' => $validatedData['fluency_average'] ?? null,

                // Pronunciation
                'consistency_descriptor' => $validatedData['consistency_descriptor'] ?? null,
                'consistency_rating' => $validatedData['consistency_rating'] ?? null,
                'clarity_descriptor' => $validatedData['clarity_descriptor'] ?? null,
                'clarity_rating' => $validatedData['clarity_rating'] ?? null,
                'articulation_descriptor' => $validatedData['articulation_descriptor'] ?? null,
                'articulation_rating' => $validatedData['articulation_rating'] ?? null,
                'intonation_and_stress_descriptor' => $validatedData['intonation_and_stress_descriptor'] ?? null,
                'intonation_and_stress_rating' => $validatedData['intonation_and_stress_rating'] ?? null,

                // Grammar
                'accuracy_descriptor' => $validatedData['accuracy_descriptor'] ?? null,
                'accuracy_rating' => $validatedData['accuracy_rating'] ?? null,
                'clarity_of_thought_descriptor' => $validatedData['clarity_of_thought_descriptor'] ?? null,
                'clarity_of_thought_rating' => $validatedData['clarity_of_thought_rating'] ?? null,
                'syntax_descriptor' => $validatedData['syntax_descriptor'] ?? null,
                'syntax_rating' => $validatedData['syntax_rating'] ?? null,

                // Fluency
                'quality_of_response_descriptor' => $validatedData['quality_of_response_descriptor'] ?? null,
                'quality_of_response_rating' => $validatedData['quality_of_response_rating'] ?? null,
                'detail_of_response_descriptor' => $validatedData['detail_of_response_descriptor'] ?? null,
                'detail_of_response_rating' => $validatedData['detail_of_response_rating'] ?? null,
            ]);

            // Step 2: Store the summary data in the ClassLists table
            $classList = ClassLists::where('student_id', $validatedData['student_id'])
            ->where('course_code', $validatedData['course_code'])
            ->first();


            if ($classList) {
                $classList->update([
                    'pronunciation' => $validatedData['pronunciation_average'] ?? null,
                    'grammar' => $validatedData['grammar_average'] ?? null,
                    'fluency' => $validatedData['fluency_average'] ?? null,
                    'epgf_average' => $validatedData['epgf_average'],
                    'proficiency_level' => $validatedData['proficiency_level'],
                ]);
            } else {
                // If the ClassLists entry does not exist, create a new one
                $classList = ClassLists::create([
                    'pronunciation' => $validatedData['pronunciation_average'] ?? null,
                    'grammar' => $validatedData['grammar_average'] ?? null,
                    'fluency' => $validatedData['fluency_average'] ?? null,
                    'epgf_average' => $validatedData['epgf_average'],
                    'proficiency_level' => $validatedData['proficiency_level'],
                ]);
            }

            return response()->json([
                'message' => 'Scorecard and Class data successfully stored',
                'historicalScorecard' => $historicalScorecard,
                'scorecard' => $scorecard,
                'classList' => $classList
            ], 201); // 201 status code for resource creation

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error storing scorecard and class data', ['error' => $e->getMessage()]);

            // Return a 500 error with the exception message
            return response()->json([
                'message' => 'Failed to store scorecard and class data',
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
        $evaluatedCount = DB::table('eie_scorecard_class_reports')
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
            'enrolled_students' => 'required|integer',
            'active_students' => 'required|integer',
        ]);

        // Find the ImplementingSubject by course_code
        $subject = ImplementingSubjects::where('course_code', $validated['course_code'])->first();

        if ($subject) {
            // Update the existing subject with the new values
            $subject->update([
                'epgf_average' => $validated['average'],
                'completion_rate' => $validated['completionRate'],
                'proficiency_level' => $validated['proficiencyLevel'],
                'enrolled_students' => $validated['enrolled_students'],
                'active_students' => $validated['active_students'],
            ]);
        } else {
            // If no record exists, create a new one
            $subject = ImplementingSubjects::create([
                'course_code' => $validated['course_code'],
                'epgf_average' => $validated['average'],
                'completion_rate' => $validated['completionRate'],
                'proficiency_level' => $validated['proficiencyLevel'],
                'enrolled_students' => $validated['enrolled_students'],
                'active_students' => $validated['active_students'],
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
