<?php

namespace App\Imports;

use App\Models\MasterClassList;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MasterClassListImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return MasterClassList::updateOrCreate(
            ['student_id' => $row['student_id']], // Unique identifier
            [
                'firstname' => $row['firstname'],
                'middlename' => $row['middlename'],
                'lastname' => $row['lastname'],
                'email' => $row['email'],
                'department' => $row['department'],
                'program' => $row['program'],
                'year_level' => $row['year_level'],
                'gender' => $row['gender'],
                'classification' => $row['classification'],
            ]
        );
    }
}
