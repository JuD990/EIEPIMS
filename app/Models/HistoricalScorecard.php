<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HistoricalScorecard extends Model
{
    use HasFactory;

    protected $table = 'historical_scorecards';
    protected $primaryKey = 'historical_scorecards_id';
    protected $fillable = [
        'course_code',
        'epgf_rubric_id',
        'student_id',
        'department',
        'task_title',
        'type',
        'comment',
        'epgf_average',
        'proficiency_level',
        'program',
        'active_students',
        'course_title',
        'year_level',

        // Pronunciation
        'consistency_descriptor',
        'consistency_rating',
        'clarity_descriptor',
        'clarity_rating',
        'articulation_descriptor',
        'articulation_rating',
        'intonation_and_stress_descriptor',
        'intonation_and_stress_rating',
        'pronunciation_average',

        // Grammar
        'accuracy_descriptor',
        'accuracy_rating',
        'clarity_of_thought_descriptor',
        'clarity_of_thought_rating',
        'syntax_descriptor',
        'syntax_rating',
        'grammar_average',

        // Fluency
        'quality_of_response_descriptor',
        'quality_of_response_rating',
        'detail_of_response_descriptor',
        'detail_of_response_rating',
        'fluency_average',
    ];
}
