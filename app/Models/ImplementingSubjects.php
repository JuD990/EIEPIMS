<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImplementingSubjects extends Model
{
    use HasFactory;

    protected $table = 'implementing_subjects';
    protected $primaryKey = 'implementing_subject_id';
    protected $fillable = [
        'course_code', 'code', 'course_title',
        'semester', 'year_level', 'program', 
        'department', 'employee_id', 'assigned_poc', 'email',
        'epgf_average', 'completion_rate', 'proficiency_level',
        'active_students', 'enrolled_students',
    ];
}
