<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EieDiagnosticReport extends Model
{
    use HasFactory;

    protected $table = 'eie_diagnostic_report';

    protected $fillable = [
        'name',
        'student_id',
        'date_of_interview',
        'time_of_interview',
        'venue',
        'department',
        'program',
        'interviewer',
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

        'average_pgf_rating',
        'pgf_specific_remarks',
        'school_year_highlight',
        'school_year_lowlight',
        'spark_highlight',
        'spark_lowlight',
        'usage_in_school_online',
        'usage_offline',
        'support_needed',
        'show_status',
    ];
}
