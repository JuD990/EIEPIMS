<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivedImplementingSubject extends Model
{
    use HasFactory;

    protected $primaryKey = 'archived_implementing_subject_id';

    protected $fillable = [
        'course_code',
        'code',
        'course_title',
        'semester',
        'year_level',
        'program',
        'department',
        'employee_id',
        'assigned_poc',
        'email',
        'epgf_average',
        'completion_rate',
        'proficiency_level',
        'enrolled_students',
        'active_students',
        'status',
    ];
}
