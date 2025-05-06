<?php

namespace App\Http\Controllers;

use App\Models\CollegePOCs;
use App\Models\EIEHeads;
use App\Models\LeadPOCs;
use Illuminate\Http\Request;

class CollegePOCController extends Controller
{
    // Your other methods...

    /**
     * Get all the POCs.
     */
    public function getPocs()
    {
        $pocs = CollegePOCs::all();
        return response()->json(['data' => $pocs]);
    }

    public function getEIEHeads()
    {
        $pocs = EIEHeads::all();
        return response()->json(['data' => $pocs]);
    }

    public function getLeadPOCs()
    {
        $pocs = LeadPOCs::all();
        return response()->json(['data' => $pocs]);
    }

    public function getFilteredPocs(Request $request)
    {
        // Retrieve the employee_id from the request
        $employeeId = $request->input('employee_id');

        // Fetch the department of the given employee_id
        $employee = EIEHeads::where('employee_id', $employeeId)->first();

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        // Get the department
        $department = $employee->department;

        // Fetch POCs based on the department
        $pocs = CollegePOCs::where('department', $department)->get();

        return response()->json($pocs);
    }
    public function getFilteredDepartmentPOCs(Request $request)
    {
        $department = $request->query('department');

        if (!$department) {
            return response()->json(['error' => 'Department is required.'], 400);
        }

        $pocs = CollegePOCs::where('department', $department)->get();

        return response()->json($pocs);
    }
}
