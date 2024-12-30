<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfRubric extends Model
{
    use HasFactory;

    protected $primaryKey = 'epgf_rubric_id';

    protected $fillable = ['epgf_pronunciation_id', 'epgf_grammar_id', 'epgf_fluency_id', 'version', 'status'];
}
