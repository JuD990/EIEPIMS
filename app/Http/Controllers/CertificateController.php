<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassLists;
use App\Models\EIEHeads;
use App\Models\ESLadmins;
use Illuminate\Support\Facades\Log;

class CertificateController extends Controller
{
    public function getCertificateData($id)
    {
        Log::info("✅ Fetching student with ID: " . $id);

        // Fetch student details
        $student = ClassLists::find($id);

        if (!$student) {
            Log::error("❌ No student found with ID: " . $id);
            return response()->json(['error' => 'Student not found'], 404);
        }

        Log::info("✅ Student found: " . json_encode($student));

        // 🏫 Find the Dean based on the student's department
        $dean = EIEHeads::where('department', $student->department)
        ->where('role', 'EIE Head')
        ->first();

        $deanName = $dean
        ? trim("{$dean->firstname} {$dean->middlename} {$dean->lastname}")
        : "Unknown Dean";

        Log::info("✅ Dean found: " . $deanName);

        // 🏆 Find the ESL Champion
        $eslChampion = ESLadmins::where('role', 'ESL Champion')->first();

        $eslChampionName = $eslChampion
        ? trim("{$eslChampion->firstname} {$eslChampion->middlename} {$eslChampion->lastname}")
        : "Unknown ESL Champion";

        Log::info("✅ ESL Champion found: " . $eslChampionName);

        // 👩‍🎓 Combine student's full name
        $fullName = trim("{$student->firstname} {$student->middlename} {$student->lastname}");

        // 📜 Prepare JSON response
        $data = [
            'name' => $fullName ?? "N/A",
            'year_level' => $student->year_level ?? "N/A",
            'department' => $student->department ?? "N/A",
            'dean_name' => $deanName ?? "N/A",
            'esl_champion' => $eslChampionName ?? "N/A", // Include ESL Champion
            'month' => now()->format('F'),
            'current_year' => now()->format('Y'),
            'next_year' => now()->addYear()->format('Y')
        ];

        Log::info("📄 Sending JSON data: " . json_encode($data));

        return response()->json($data);
    }

}
