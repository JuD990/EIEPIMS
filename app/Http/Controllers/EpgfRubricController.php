<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\EpgfRubricImport;
use App\Models\EpgfRubric;

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
}
