<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\EpgfRubricImport;
use App\Models\EpgfRubric;
use App\Models\EpgfFluency;
use App\Models\EpgfGrammar;
use App\Models\EpgfPronunciation;

class EpgfRubricController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,xlsx,xls',
        ]);

        try {
            // Import the CSV file
            Excel::import(new EpgfRubricImport, $request->file('file'));

            return response()->json(['message' => 'File uploaded and data processed successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function getRubricVersions()
    {
        // Fetch only the 'version' column and return as JSON
        $versions = EpgfRubric::select('version')->get();

        return response()->json($versions);
    }

    public function setDefault(Request $request)
    {
        $request->validate([
            'version' => 'required|string',
        ]);

        $version = $request->version;

        try {
            // Update all rows to 'inactive'
            EpgfRubric::query()->update([
                'status' => 'inactive',
                'version' => \DB::raw("REPLACE(version, '*', '')"), // Remove '*' if exists
            ]);

            // Update the selected row to 'active' and append '*'
            EpgfRubric::where('version', $version)->update([
                'status' => 'active',
                'version' => $version . '*',
            ]);

            return response()->json(['message' => 'Default set successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getRubricDetails(Request $request)
    {
        $request->validate([
            'version' => 'required|string',
        ]);

        try {
            $rubric = EpgfRubric::where('version', 'like', $request->version . '%')->first();

            if (!$rubric) {
                return response()->json(['message' => 'Rubric not found'], 404);
            }

            // Handle related records
            $pronunciation = EpgfPronunciation::whereIn('id', $rubric->epgf_pronunciation_id)->get();
            $grammar = EpgfGrammar::whereIn('id', $rubric->epgf_grammar_id)->get();
            $fluency = EpgfFluency::whereIn('id', $rubric->epgf_fluency_id)->get();

            return response()->json([
                'pronunciation' => $pronunciation,
                'grammar' => $grammar,
                'fluency' => $fluency,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching rubric details: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
    public function getActiveVersion()
    {
        try {
            $rubric = EpgfRubric::where('status', 'active')->first();

            if ($rubric && isset($rubric->version)) {
                $version = $rubric->version; // Assuming version is stored as 'v1.0' or similar

                return response()->json([
                    'version' => $version, // Return the version directly
                ]);
            } else {
                return response()->json([
                    'error' => 'No active version found',
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error fetching version: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function getConsistency($majorVersion)
    {
        try {
            $consistency= EpgfPronunciation::where('epgf_pronunciation_id', $majorVersion)
            ->where('pronunciation', 'Consistency')
            ->get();

            if ($consistency->isEmpty()) {
                return response()->json(['message' => 'No Consistency found'], 404);
            }

            return response()->json($consistency, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Consistency: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function getClarity($majorVersion)
    {
        try {
            $clarity = EpgfPronunciation::where('epgf_pronunciation_id', $majorVersion)
            ->where('pronunciation', 'Clarity')
            ->get();

            if ($clarity->isEmpty()) {
                return response()->json(['message' => 'No Clarity found'], 404);
            }

            return response()->json($clarity, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Clarity: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function getArticulation($majorVersion)
    {
        try {
            $articulation = EpgfPronunciation::where('epgf_pronunciation_id', $majorVersion)
            ->where('pronunciation', 'Articulation')
            ->get();

            if ($articulation->isEmpty()) {
                return response()->json(['message' => 'No Articulation found'], 404);
            }

            return response()->json($articulation, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Articulation: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getIntonationStress($majorVersion)
    {
        try {
            $intonationStress = EpgfPronunciation::where('epgf_pronunciation_id', $majorVersion)
            ->where('pronunciation', 'Intonation and Stress')
            ->get();

            if ($intonationStress->isEmpty()) {
                return response()->json(['message' => 'No Intonation and Stress found'], 404);
            }

            return response()->json($intonationStress, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Intonation and Stress: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getAccuracy($majorVersion)
    {
        try {
            $accuracy = EpgfGrammar::where('epgf_grammar_id', $majorVersion)
            ->where('grammar', 'Accuracy')
            ->get();

            if ($accuracy->isEmpty()) {
                return response()->json(['message' => 'No Accuracy found'], 404);
            }

            return response()->json($accuracy, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Accuracy: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function getClarityOfThought($majorVersion)
    {
        try {
            $clarityOfThought = EpgfGrammar::where('epgf_grammar_id', $majorVersion)
            ->where('grammar', 'Clarity Of Thought')
            ->get();

            if ($clarityOfThought->isEmpty()) {
                return response()->json(['message' => 'No Clarity Of Thought found'], 404);
            }

            return response()->json($clarityOfThought, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Clarity Of Thought: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
