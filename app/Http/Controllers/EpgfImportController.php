<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EpgfImportController extends Controller
{
    public function importPronunciation(Request $request)
    {
        Excel::import(new EpgfPronunciationImport, $request->file('file'));
        return redirect()->back()->with('success', 'EpgfPronunciation Imported Successfully!');
    }

    public function importGrammar(Request $request)
    {
        Excel::import(new EpgfGrammarImport, $request->file('file'));
        return redirect()->back()->with('success', 'EpgfGrammar Imported Successfully!');
    }

    public function importFluency(Request $request)
    {
        Excel::import(new EpgfFluencyImport, $request->file('file'));
        return redirect()->back()->with('success', 'EpgfFluency Imported Successfully!');
    }

    public function importRubric(Request $request)
    {
        Excel::import(new EpgfRubricImport, $request->file('file'));
        return redirect()->back()->with('success', 'EpgfRubric Imported Successfully!');
    }
}
