<?php

namespace App\Imports;

use App\Models\ImplementingSubjects;
use App\Models\HistoricalImplementingSubjects;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImplementingSubjectsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Create or update the main record
        $implementing = ImplementingSubjects::updateOrCreate(
            ['course_code' => $row['course_code']],
            [
                'code' => $row['code'],
                'course_title' => $row['course_title'],
                'semester' => $row['semester'],
                'year_level' => $row['year_level'],
                'program' => $row['program'],
                'department' => $row['department'],
                'employee_id' => $row['employee_id'],
                'assigned_poc' => $row['assigned_poc'],
                'email' => $row['email'],
            ]
        );

        // Also store in the historical table
        HistoricalImplementingSubjects::updateOrCreate(
            ['course_code' => $row['course_code']],
            [
                'code' => $row['code'],
                'course_title' => $row['course_title'],
                'semester' => $row['semester'],
                'year_level' => $row['year_level'],
                'program' => $row['program'],
                'department' => $row['department'],
                'employee_id' => $row['employee_id'],
                'assigned_poc' => $row['assigned_poc'],
                'email' => $row['email'],
            ]
        );

        return $implementing;
    }
}
