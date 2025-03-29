<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EieReport extends Model
{
    use HasFactory;

    protected $table = 'eie_reports';
    protected $primaryKey = 'eie_report_id';

    protected $fillable = [
        'program',
        'semester',
        'year_level',
        'department',
        'assigned_poc',
        'course_title',
        'course_code',
        'enrolled_students',
        'active_students',
        'completion_rate',
        'completion_rate_expectation',
        'epgf_average',
        'proficiency_level',
        'submitted',
        'champion',
        'champion_id',
        'champion_student_id',
        'champion_epgf_average',
        'champion_proficiency_level',
    ];
}
