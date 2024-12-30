<?php

namespace App\Imports;

use App\Models\EpgfRubric;
use Maatwebsite\Excel\Concerns\ToModel;

class EpgfRubricImport implements ToModel
{
    public function model(array $row)
    {
        return new EpgfRubric([
            'epgf_pronunciation_id' => $row[0],
            'epgf_grammar_id' => $row[1],
            'epgf_fluency_id' => $row[2],
            'version' => $row[3],
            'status' => $row[4],
        ]);
    }
}
