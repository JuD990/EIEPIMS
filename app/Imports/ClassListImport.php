<?php

namespace App\Imports;

use App\Models\ClassLists;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\DB;  // For DB operations

class ClassListImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new ClassLists([
            'student_id'           => $row['student_id'],
            'firstname'            => $row['firstname'],
            'middlename'           => $row['middlename'] ?? null,
            'lastname'             => $row['lastname'],
            'email'                => $row['email'],
            'program'              => $row['program'],
            'department'           => $row['department'],
            'year_level'           => $row['year_level'],
            'gender'               => $row['gender'],
            'status'               => $row['status'] ?? 'Active',
            'classification'       => $row['classification'],
            'reason_for_shift_or_drop' => $row['reason_for_shift_or_drop'] ?? null,
            'pronunciation'        => $row['pronunciation'] ?? null,
            'grammar'              => $row['grammar'] ?? null,
            'fluency'              => $row['fluency'] ?? null,
            'epgf_average'         => $row['epgf_average'] ?? null,
            'completion_rate'      => $row['completion_rate'] ?? null,
            'proficiency_level'    => $row['proficiency_level'] ?? null,
            'course_code'          => $row['course_code'],
        ]);
    }

}
