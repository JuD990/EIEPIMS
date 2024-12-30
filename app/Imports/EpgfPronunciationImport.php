<?php

namespace App\Imports;

use App\Models\EpgfPronunciation;
use Maatwebsite\Excel\Concerns\ToModel;

class EpgfPronunciationImport implements ToModel
{
    public function model(array $row)
    {
        return new EpgfPronunciation([
            'version' => $row[0],
            'pronunciation' => $row[1],
            'descriptor' => $row[2],
            'rating' => $row[3],
        ]);
    }
}
