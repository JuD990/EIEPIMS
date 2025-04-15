<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Models\ESLadmins;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;

class EslImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{
    public function collection(Collection $rows)
    {
        $successfulImports = 0;
        foreach ($rows as $row) {
            // Ensure required columns exist
            if (!isset($row['employee_id'], $row['firstname'], $row['middlename'], $row['lastname'], $row['email'], $row['role'])) {
                \Log::error('CSV missing required columns: ' . json_encode($row));
                continue; // Skip invalid rows
            }

            // Additional validation (email format check, etc.)
            if (!filter_var($row['email'], FILTER_VALIDATE_EMAIL)) {
                \Log::error('Invalid email format for employee_id ' . $row['employee_id']);
                continue; // Skip invalid rows
            }

            // Insert or update the record
            $eieHead = ESLadmins::updateOrCreate(
                ['employee_id' => $row['employee_id']], // Search condition
                [
                    'firstname' => $row['firstname'],
                    'middlename' => $row['middlename'] ?? null,
                    'lastname' => $row['lastname'],
                    'email' => $row['email'],
                    'role' => $row['role'],
                ]
            );

            // Track successful imports (optional)
            $successfulImports++;
        }

        // Log successful imports count
        \Log::info("Successfully imported $successfulImports records.");
    }
}
