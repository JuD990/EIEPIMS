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

    public function getActivePronunciationId()
    {
        try {
            // Fetch the active rubric
            $activeRubric = EpgfRubric::where('status', 'active')->first();

            // If an active rubric is found, get the pronunciation ID
            $pronunciationId = $activeRubric ? $activeRubric->epgf_pronunciation_id : null;

            // Return the pronunciation ID as JSON response
            return response()->json([
                'pronunciation_id' => $pronunciationId
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching active rubric: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

}
