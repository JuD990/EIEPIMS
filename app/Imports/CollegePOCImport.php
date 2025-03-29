<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Models\CollegePOCs;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;

class CollegePOCImport implements ToCollection, WithHeadingRow, SkipsEmptyRows
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Ensure required columns exist
            if (!isset($row['employee_id'], $row['firstname'], $row['middlename'], $row['lastname'], $row['email'], $row['department'])) {
                \Log::error('CSV missing required columns: ' . json_encode($row));
                continue; // Skip invalid rows
            }

            // Insert or update the record
            CollegePOCs::updateOrCreate(
                ['employee_id' => $row['employee_id']], // Search condition
                [
                    'firstname' => $row['firstname'],
                    'middlename' => $row['middlename'] ?? null,
                    'lastname' => $row['lastname'],
                    'email' => $row['email'],
                    'department' => $row['department'],
                ]
            );
        }
    }
}
