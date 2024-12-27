<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\MasterClassListImport;
use App\Models\MasterClassList;
use Maatwebsite\Excel\Facades\Excel;

class MasterClassListController extends Controller
{
    public function index()
    {
        // Fetch all records from the master_class_list table
        $data = MasterClassList::all();

        // Return the data as a JSON response
        return response()->json($data);
    }
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',
        ]);

        Excel::import(new MasterClassListImport, $request->file('file'));

        return response()->json(['message' => 'CSV data imported successfully']);
    }
}
