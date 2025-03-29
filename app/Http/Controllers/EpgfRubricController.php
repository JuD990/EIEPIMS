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

    public function getSyntax($majorVersion)
    {
        try {
            $syntax = EpgfGrammar::where('epgf_grammar_id', $majorVersion)
            ->where('grammar', 'Syntax')
            ->get();

            if ($syntax->isEmpty()) {
                return response()->json(['message' => 'No Syntax found'], 404);
            }

            return response()->json($syntax, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Syntax: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getQualityOfResponse($majorVersion)
    {
        try {
            $qualityOfResponse = EpgfFluency::where('epgf_fluency_id', $majorVersion)
            ->where('fluency', 'Quality Of Response')
            ->get();

            if ($qualityOfResponse->isEmpty()) {
                return response()->json(['message' => 'No Quality Of Response found'], 404);
            }

            return response()->json($qualityOfResponse, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Quality Of Response: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getDetailOfResponse($majorVersion)
    {
        try {
            $detailOfResponse = EpgfFluency::where('epgf_fluency_id', $majorVersion)
            ->where('fluency', 'Detail Of Response')
            ->get();

            if ($detailOfResponse->isEmpty()) {
                return response()->json(['message' => 'No Detail Of Response found'], 404);
            }

            return response()->json($detailOfResponse, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Detail Of Response: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function displayEpgfRubric()
    {
        // Step 1: Find the active rubric
        $activeRubric = EpgfRubric::where('status', 'active')->first();

        // Check if active rubric exists
        if (!$activeRubric) {
            return response()->json(['error' => 'No active rubric found'], 404);
        }

        // Get the epgf_rubric_id
        $epgfRubricId = $activeRubric->epgf_rubric_id;

        // Step 2: Retrieve data from the related tables
        $pronunciations = EpgfPronunciation::where('epgf_pronunciation_id', $epgfRubricId)->get();
        $grammars = EpgfGrammar::where('epgf_grammar_id', $epgfRubricId)->get();
        $fluencies = EpgfFluency::where('epgf_fluency_id', $epgfRubricId)->get();

        // Step 3: Return the data as JSON response
        return response()->json([
            'pronunciations' => $pronunciations,
            'grammars' => $grammars,
            'fluencies' => $fluencies,
        ]);
    }
    public function updatePronunciation(Request $request, $id)
    {
        $request->validate([
            'pronunciation' => 'nullable|string',
            'descriptor' => 'nullable|string',
            'rating' => 'nullable|numeric',
        ]);

        $pronunciation = EpgfPronunciation::findOrFail($id);
        $pronunciation->update($request->only(['pronunciation', 'descriptor', 'rating']));

        return response()->json(['message' => 'Updated successfully', 'data' => $pronunciation]);
    }

    public function updateGrammar(Request $request, $id)
    {
        $request->validate([
            'grammar' => 'nullable|string',
            'descriptor' => 'nullable|string',
            'rating' => 'nullable|numeric',
        ]);

        $grammar = EpgfGrammar::findOrFail($id);
        $grammar->update($request->only(['grammar', 'descriptor', 'rating']));

        return response()->json(['message' => 'Grammar updated successfully', 'data' => $grammar]);
    }

    public function updateFluency(Request $request, $id)
    {
        $request->validate([
            'fluency' => 'nullable|string',
            'descriptor' => 'nullable|string',
            'rating' => 'nullable|numeric',
        ]);

        $fluency = EpgfFluency::findOrFail($id);
        $fluency->update($request->only(['fluency', 'descriptor', 'rating']));

        return response()->json(['message' => 'Fluency updated successfully', 'data' => $fluency]);
    }
}
