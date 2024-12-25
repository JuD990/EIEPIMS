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
        return new ImplementingSubjects([ // Correct model usage
            'course_code' => $row['course_code'], 
            'course_title' => $row['course_title'],
            'description' => $row['description'],
            'semester' => $row['semester'],
            'year_level' => $row['year_level'],
            'program' => $row['program'],
            'department' => $row['department'],
            'employee_id' => $row['employee_id'],
            'assigned_poc' => $row['assigned_poc'],
            
            // Default values for excluded fields
            'epgf_average' => 0.00,  // Default value
            'completion_rate' => 0.00, // Default value
            'proficiency_level' => 'N/A', // Default value (can be adjusted based on your requirement)
        ]);
    }
}
