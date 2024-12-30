<?php

namespace App\Imports;

use App\Models\ImplementingSubjects; // Correct model import
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImplementingSubjectsImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // Import the necessary fields and set default values for excluded fields
        return new ImplementingSubjects([
            'course_code' => $row['course_code'],
            'code' => $row['code'],
            'course_title' => $row['course_title'],
            'semester' => $row['semester'],
            'year_level' => $row['year_level'],
            'program' => $row['program'],
            'department' => $row['department'],
            'employee_id' => $row['employee_id'],
            'assigned_poc' => $row['assigned_poc'],
            'email' => $row['email'],
        ]);
    }
}
