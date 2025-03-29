<?php

namespace App\Imports;

use App\Models\Students;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;

class StudentsImport implements ToModel, WithHeadingRow, SkipsEmptyRows
{
    public function model(array $row)
    {
        if (!isset($row['student_id'], $row['firstname'], $row['middlename'], $row['lastname'], $row['email'], $row['department'], $row['year_level'], $row['program'])) {
            \Log::error('CSV missing required columns: ' . json_encode($row));
            return null;
        }

        // Find the student by student_id and update or create a new record
        return Students::updateOrCreate(
            ['student_id' => $row['student_id']], // Search
            [
                'firstname' => $row['firstname'],
                'middlename' => $row['middlename'],
                'lastname' => $row['lastname'],
                'email' => $row['email'],
                'department' => $row['department'],
                'year_level' => $row['year_level'],
                'program' => $row['program'],
            ]
        );
    }
}
