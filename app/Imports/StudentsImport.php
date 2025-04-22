<?php

namespace App\Imports;

use App\Models\Students;
use App\Models\ClassLists;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;

class StudentsImport implements ToModel, WithHeadingRow, SkipsEmptyRows
{
    public function model(array $row)
    {
        if (!isset(
            $row['student_id'], $row['firstname'], $row['middlename'],
            $row['lastname'], $row['email'], $row['department'],
            $row['year_level'], $row['program']
        )) {
            \Log::error('CSV missing required columns: ' . json_encode($row));
            return null;
        }

        $student = Students::updateOrCreate(
            ['student_id' => $row['student_id']],
            [
                'firstname'    => $row['firstname'],
                'middlename'   => $row['middlename'],
                'lastname'     => $row['lastname'],
                'email'        => $row['email'],
                'department'   => $row['department'],
                'year_level'   => $row['year_level'],
                'program'      => $row['program'],
            ]
        );

        ClassLists::updateOrCreate(
            ['student_id' => $row['student_id']],
            [
                'firstname'                 => $row['firstname'],
                'middlename'                => $row['middlename'],
                'lastname'                  => $row['lastname'],
                'email'                     => $row['email'],
                'program'                   => $row['program'],
                'department'                => $row['department'],
                'year_level'                => $row['year_level'],
                'gender'                    => $row['gender'] ?? null,
                'status'                    => 'Active',
                'classification'            => $row['classification'] ?? null,
                'reason_for_shift_or_drop'  => $row['reason_for_shift_or_drop'] ?? null,
                'pronunciation'             => $row['pronunciation'] ?? null,
                'grammar'                   => $row['grammar'] ?? null,
                'fluency'                   => $row['fluency'] ?? null,
                'epgf_average'              => $row['epgf_average'] ?? null,
                'proficiency_level'         => $row['proficiency_level'] ?? null,
                'course_code'               => $row['course_code'] ?? null,
            ]
        );

        return $student;
    }
}
