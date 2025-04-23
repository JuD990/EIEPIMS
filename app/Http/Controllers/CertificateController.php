<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassLists;
use App\Models\EIEHeads;
use App\Models\EieDiagnosticReport;
use App\Models\MasterClassList;
use App\Models\ESLadmins;
use App\Models\EpgfRubric;
use App\Models\EpgfPronunciation;
use App\Models\EpgfGrammar;
use App\Models\EpgfFluency;
use Illuminate\Support\Facades\Log;

class CertificateController extends Controller
{
    public function getCertificateData($id)
    {
        // Fetch student details
        $student = ClassLists::find($id);

        if (!$student) {
            Log::error("❌ No student found with ID: " . $id);
            return response()->json(['error' => 'Student not found'], 404);
        }

        //Find the full department from EIEHeads based on the student's department
        $departmentHead = EIEHeads::where('department', $student->department)->first();
        $fullDepartment = $departmentHead ? $departmentHead->full_department : "Unknown Department";

        //Find the Dean based on the student's department (EIEHeads)
        $dean = EIEHeads::where('department', $student->department)
        ->where('role', 'EIE Head')
        ->first();

        $deanName = $dean
        ? trim("{$dean->firstname} {$dean->middlename} {$dean->lastname}")
        : "Unknown Dean";

        // Find the ESL Champion
        $eslChampion = ESLadmins::where('role', 'ESL Champion')->first();
        $eslChampionName = $eslChampion
        ? trim("{$eslChampion->firstname} {$eslChampion->middlename} {$eslChampion->lastname}")
        : "Unknown ESL Champion";

        // Combine student's full name
        $fullName = trim("{$student->firstname} {$student->middlename} {$student->lastname}");

        //Prepare JSON response
        $data = [
            'student_id' => $student->id, // Student ID
            'name' => $fullName ?: "N/A",
            'year_level' => $student->year_level ?: "N/A",
            'department' => $student->department ?: "Unknown Department",
            'full_department' => $fullDepartment, // Full department name
            'dean_name' => $deanName,
            'esl_champion' => $eslChampionName, // Include ESL Champion
            'month' => now()->format('F'),
            'current_year' => now()->format('Y'),
            'next_year' => now()->addYear()->format('Y')
        ];

        Log::info("📄 Sending JSON data: " . json_encode($data));

        return response()->json($data);
    }

    public function getDiagnosticsStudents(Request $request)
    {
        $query = EieDiagnosticReport::query();

        // Filter by search query (name)
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by department
        if ($request->has('department')) {
            $department = $request->department;
            $query->where('department', $department);
        }

        // Filter by year level
        if ($request->has('year_level')) {
            $query->where('year_level', $request->year_level);
        }

        // Filter by school year (expects "2025/2026")
        if ($request->has('school_year')) {
            $years = explode('/', $request->school_year);

            if (count($years) === 2) {
                $startYear = (int) $years[0];
                $endYear = (int) $years[1];

                $query->whereYear('date_of_interview', '>=', $startYear)
                ->whereYear('date_of_interview', '<=', $endYear);
            }
        }

        // Filter by show status (Showed Up)
        if ($request->has('show_status')) {
            $query->where('show_status', 'Showed Up');
        }

        // Fetch filtered results
        $reports = $query->get();

        // Fetch the full department for each department listed in the reports
        foreach ($reports as $report) {
            $head = EIEHeads::where('department', $report->department)->first();
            if ($head) {
                $report->full_department = $head->full_department;
            }
        }

        // Fetch employee full name based on employee_id from ESLadmins
        if ($request->has('employee_id')) {
            $employee_id = $request->employee_id;

            $employee = ESLadmins::where('employee_id', $employee_id)->first();

            if ($employee) {
                $fullName = trim("{$employee->firstname} {$employee->lastname}");
                $employeeName = $fullName ?? "Unknown Evaluator";
            } else {
                $employeeName = "Employee Not Found";
            }

            // Optionally, you can add the employee's full name to the response
            return response()->json([
                'reports' => $reports,
                'employee_name' => $employeeName
            ]);
        }

        return response()->json($reports);
    }

    public function uploadDepartmentLogo(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['error' => 'No file uploaded'], 400);
        }

        $file = $request->file('file');
        $filename = $file->getClientOriginalName();

        // Define path
        $path = public_path('assets/department_logo');

        // Ensure the directory exists
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }

        // Move and overwrite if file exists
        $file->move($path, $filename);

        return response()->json(['success' => true, 'filename' => $filename]);
    }
}
