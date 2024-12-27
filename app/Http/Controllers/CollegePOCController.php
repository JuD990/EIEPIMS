<?php

namespace App\Http\Controllers;

use App\Models\CollegePOCs; // Assuming CollegePoc is the model for POCs
use Illuminate\Http\Request;

class CollegePOCController extends Controller
{
    // Your other methods...

    /**
     * Get all the POCs.
     */
    public function getPocs()
    {
        // Assuming you are fetching all POCs from the database
        $pocs = CollegePOCs::all();

        // Return the POCs, either as a view or a JSON response
        return response()->json($pocs); // If you're using JSON
        // OR
        // return view('your_view', compact('pocs')); // If you're passing to a view
    }
}
