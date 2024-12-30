<?php

namespace App\Imports;

use App\Models\EpgfFluency;
use Maatwebsite\Excel\Concerns\ToModel;

class EpgfFluencyImport implements ToModel
{
    public function model(array $row)
    {
        return new EpgfFluency([
            'version' => $row[0],
            'fluency' => $row[1],
            'descriptor' => $row[2],
            'rating' => $row[3],
        ]);
    }
}
