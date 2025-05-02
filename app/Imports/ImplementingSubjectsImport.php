<?php

namespace App\Imports;

use App\Models\ImplementingSubjects;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImplementingSubjectsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return ImplementingSubjects::updateOrCreate(
            ['course_code' => $row['course_code']], // Unique identifier
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
                'enrolled_students' => $row['enrolled_students'],
            ]
        );
    }
}
