<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\MasterClassListImport;
use App\Models\MasterClassList;
use App\Models\EIEHeads;
use Maatwebsite\Excel\Facades\Excel;

class MasterClassListController extends Controller
{
    public function index(Request $request)
    {
        $employeeId = $request->query('employee_id');

        // Get the department for this employee
        $head = EIEHeads::where('employee_id', $employeeId)->first();

        if (!$head) {
            return response()->json(['error' => 'Department not found'], 404);
        }

        $department = $head->department;

        // Filter master class list by department
        $data = MasterClassList::where('department', $department)->get();

        return response()->json($data);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',
        ]);

        Excel::import(new MasterClassListImport, $request->file('file'));

        return response()->json(['message' => 'MasterClassList imported successfully']);
    }

    public function getStudents(Request $request)
    {
        $department = $request->input('department');
        $yearLevel = $request->input('yearLevel');

        // Validate the inputs
        $request->validate([
            'department' => 'required|string',
            'yearLevel' => 'required|string',
        ]);

        // Fetch students based on the department, year level, and status 'No Show'
        $students = MasterClassList::where('department', $department)
        ->where('year_level', $yearLevel)
        ->where('status', 'No Show')
        ->get();

        // Return the list of students as a JSON response
        return response()->json($students);
    }

    public function getDepartments()
    {
        $departments = MasterClassList::pluck('department')->unique()->values();

        // Ensure it's an array before returning
        return response()->json($departments->toArray());
    }

    public function getSchoolYears()
    {
        // Extract unique years from the created_at column using Eloquent
        $schoolYears = MasterClassList::selectRaw("DISTINCT CONCAT(YEAR(created_at), '/', YEAR(created_at) + 1) AS school_year")
        ->orderBy('school_year', 'desc')
        ->pluck('school_year');

        // Fallback if no records are found
        if ($schoolYears->isEmpty()) {
            $currentYear = date('Y');
            $schoolYears = collect(["$currentYear/" . ($currentYear + 1)]);
        }

        return response()->json($schoolYears);
    }

    public function updateMasterClassList(Request $request, $id)
    {
        $record = MasterClassList::findOrFail($id);

        $record->update([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'department' => $request->department,
            'program' => $request->program,
            'classification' => $request->classification,
            'year_level' => $request->year_level,
            'status' => $request->status,
            'gender' => $request->gender,
            'reason_for_shift_or_drop' => $request->reason_for_shift_or_drop,
        ]);

        return response()->json($record);
    }

}
