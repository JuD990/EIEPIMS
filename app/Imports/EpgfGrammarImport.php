<?php

namespace App\Imports;

use App\Models\EpgfGrammar;
use Maatwebsite\Excel\Concerns\ToModel;

class EpgfGrammarImport implements ToModel
{
    public function model(array $row)
    {
        return new EpgfGrammar([
            'version' => $row[0],
            'grammar' => $row[1],
            'descriptor' => $row[2],
            'rating' => $row[3],
        ]);
    }
}
