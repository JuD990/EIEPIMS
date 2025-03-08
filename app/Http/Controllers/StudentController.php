<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\EpgfRubric;
use App\Models\EpgfPronunciation;
use App\Models\EpgfGrammar;
use App\Models\EpgfFluency;
use App\Models\ClassLists;
use App\Models\ImplementingSubjects;

class StudentController extends Controller
{
    public function getPerformanceSummary()
    {
        // Get active epgf_rubric_id
        $rubric = EpgfRubric::where('status', 'active')->first();

        if (!$rubric) {
            return response()->json(['error' => 'No active rubric found'], 404);
        }

        $epgfRubricId = $rubric->epgf_rubric_id;

        // Fetch ratings from the three tables
        $pronunciationRatings = EpgfPronunciation::where('epgf_pronunciation_id', $epgfRubricId)->pluck('rating');
        $grammarRatings = EpgfGrammar::where('epgf_grammar_id', $epgfRubricId)->pluck('rating');
        $fluencyRatings = EpgfFluency::where('epgf_fluency_id', $epgfRubricId)->pluck('rating');

        // Merge all ratings
        $allRatings = $pronunciationRatings->merge($grammarRatings)->merge($fluencyRatings);

        if ($allRatings->isEmpty()) {
            return response()->json(['error' => 'No ratings found'], 404);
        }

        // Sort ratings from 4.0 to 0.0
        $sortedRatings = $allRatings->sortDesc()->values();

        return response()->json([
            'ratings' => $sortedRatings, // Send the sorted ratings
            'min' => $sortedRatings->last(), // Lowest rating
            'max' => $sortedRatings->first(), // Highest rating
            'stepSize' => 0.5, // You can calculate step size if necessary
        ]);

    }

    public function getCurrentSubjects($student_id)
    {
        try {
            // Fetch course_code and epgf_average from ClassLists based on student_id
            $classList = ClassLists::where('student_id', $student_id)->first();

            if (!$classList) {
                return response()->json(['message' => 'Class list not found for this student'], 404);
            }

            // Fetch subject based on course_code
            $subject = ImplementingSubjects::where('course_code', $classList->course_code)->first();

            if (!$subject) {
                return response()->json(['message' => 'No current Subject'], 404);
            }

            return response()->json([
                'course_code' => $classList->course_code,
                'epgf_average' => $classList->epgf_average,
                'course_title' => $subject->course_title,
            ]);
        } catch (\Exception $e) {
            // Return any errors that occur during the process
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

}
