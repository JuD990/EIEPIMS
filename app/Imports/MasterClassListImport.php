<?php

namespace App\Imports;

use App\Models\MasterClassList;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MasterClassListImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new MasterClassList([
            'student_id' => $row['student_id'],
            'firstname' => $row['firstname'],
            'middlename' => $row['middlename'],
            'lastname' => $row['lastname'],
            'email' => $row['email'],
            'department' => $row['department'],
            'program' => $row['program'],
            'year_level' => $row['year_level'],
            'gender' => $row['gender'],
            'classification' => $row['classification'],
        ]);
    }
}
