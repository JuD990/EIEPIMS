<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfRubric extends Model
{
    use HasFactory;

    // Specify the table if it's not the plural of the model name
    protected $table = 'epgf_rubrics';

    // In the EpgfRubric model
    protected $primaryKey = 'epgf_rubric_id';

    // Define the fillable attributes
    protected $fillable = [
        'epgf_pronunciation_id',
        'epgf_grammar_id',
        'epgf_fluency_id',
        'version',
        'status'
    ];
}
