<?php

namespace App\Imports;

use App\Models\EpgfPronunciation;
use App\Models\EpgfGrammar;
use App\Models\EpgfFluency;
use App\Models\EpgfRubric;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;

class EpgfRubricImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Insert pronunciation data (allow duplicates)
        if (!empty($row['epgf_pronunciation_id'])) {
            EpgfPronunciation::create([
                'epgf_pronunciation_id' => $row['epgf_pronunciation_id'], // Importing from CSV
                'pronunciation' => $row['pronunciation'] ?? null,
                'descriptor' => $row['pronunciation_descriptor'] ?? null,
                'rating' => $row['pronunciation_rating'] ?? null,
            ]);
        }

        // Insert grammar data (allow duplicates)
        if (!empty($row['epgf_grammar_id'])) {
            EpgfGrammar::create([
                'epgf_grammar_id' => $row['epgf_grammar_id'], // Importing from CSV
                'grammar' => $row['grammar'] ?? null,
                'descriptor' => $row['grammar_descriptor'] ?? null,
                'rating' => $row['grammar_rating'] ?? null,
            ]);
        }

        // Insert fluency data (allow duplicates)
        if (!empty($row['epgf_fluency_id'])) {
            EpgfFluency::create([
                'epgf_fluency_id' => $row['epgf_fluency_id'], // Importing from CSV
                'fluency' => $row['fluency'] ?? null,
                'descriptor' => $row['fluency_descriptor'] ?? null,
                'rating' => $row['fluency_rating'] ?? null,
            ]);
        }

        // Insert rubric entry if not already present
        if (!empty($row['epgf_pronunciation_id']) && !empty($row['epgf_grammar_id']) && !empty($row['epgf_fluency_id'])) {
            // Check if the combination of these IDs already exists in the rubric table
            $existingRubric = EpgfRubric::where('epgf_pronunciation_id', $row['epgf_pronunciation_id'])
            ->where('epgf_grammar_id', $row['epgf_grammar_id'])
            ->where('epgf_fluency_id', $row['epgf_fluency_id'])
            ->first();

            // Only insert if the combination does not exist
            if (!$existingRubric) {
                $importCount = EpgfRubric::count();  // Get count of existing rubrics for versioning

                $rubric = new EpgfRubric([
                    'epgf_pronunciation_id' => $row['epgf_pronunciation_id'],
                    'epgf_grammar_id' => $row['epgf_grammar_id'],
                    'epgf_fluency_id' => $row['epgf_fluency_id'],
                    'status' => 'inactive', // Mark the latest rubric as inactive
                    'version' => 'v' . ($importCount + 1) . '.0', // Auto-increment version based on current rubric count
                ]);

                $rubric->save();
            }
        }

        return null; // Return null as we're not using this method to return a model
    }
}
