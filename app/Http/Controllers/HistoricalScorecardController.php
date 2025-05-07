<?php

namespace App\Http\Controllers;

use App\Models\HistoricalScorecard;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HistoricalScorecardController extends Controller
{
    public function getCoursesByStudent(Request $request)
    {
        $studentId = $request->query('student_id');

        // Fetch course_title, task_title, type, and formatted date from created_at
        $records = HistoricalScorecard::where('student_id', $studentId)
        ->select('historical_scorecards_id', 'course_title', 'type', 'task_title', 'created_at')
        ->get()
        ->map(function ($record) {
            return [
                'historical_scorecards_id' => $record->historical_scorecards_id,
                'course_title' => $record->course_title,
                'type' => $record->type,
                'task_title' => $record->task_title,
                'date' => Carbon::parse($record->created_at)->format('d/m/Y'),
            ];
        });

        // Get unique course titles and make sure the response is an array
        $uniqueCourses = $records->pluck('course_title')->unique()->values()->all();

        return response()->json([
            'courses' => $uniqueCourses, // Array of unique course titles
            'records' => $records // Full detailed records
        ]);
    }

    public function getCourseDetails(Request $request)
    {
        $historicalScorecardId = $request->query('historical_scorecards_id');

        // Fetch detailed record by historical_scorecards_id
        $record = HistoricalScorecard::where('historical_scorecards_id', $historicalScorecardId)
        ->select(
            'task_title',
            'type',
            'comment',
            'epgf_average',
            'proficiency_level',
            'course_title',
            'consistency_descriptor',
            'consistency_rating',
            'clarity_descriptor',
            'clarity_rating',
            'articulation_descriptor',
            'articulation_rating',
            'intonation_and_stress_descriptor',
            'intonation_and_stress_rating',
            'pronunciation_average',
            'accuracy_descriptor',
            'accuracy_rating',
            'clarity_of_thought_descriptor',
            'clarity_of_thought_rating',
            'syntax_descriptor',
            'syntax_rating',
            'grammar_average',
            'quality_of_response_descriptor',
            'quality_of_response_rating',
            'detail_of_response_descriptor',
            'detail_of_response_rating',
            'fluency_average',
            'created_at',
        )
        ->first();

        // Check if the record exists
        if (!$record) {
            return response()->json(['error' => 'Score record not found'], 404);
        }

        // Format the date using Carbon
        $record->date = Carbon::parse($record->created_at)->format('d/m/Y');

        // Ensure the fields are numbers or set to null if they are not
        $record->epgf_average = is_numeric($record->epgf_average) ? (float)$record->epgf_average : null;
        $record->pronunciation_average = is_numeric($record->pronunciation_average) ? (float)$record->pronunciation_average : null;
        $record->grammar_average = is_numeric($record->grammar_average) ? (float)$record->grammar_average : null;
        $record->fluency_average = is_numeric($record->fluency_average) ? (float)$record->fluency_average : null;

        return response()->json($record);

    }


}
