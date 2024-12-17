<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImplementingSubject extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'implementing_subjects';

    // Define fillable attributes to allow mass assignment
    protected $fillable = [
        'implementing_subject_id',
        'course_title',
        'code',
        'course_code',
        'description',
        'semester',
        'year_level',
        'assigned_poc',
        'employee_id',
        'email',
        'program',
        'department',
        'epgf_average',
        'completion_rate',
        'proficiency_level',
        'class_list_id',
    ];

    // Define relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function classList()
    {
        return $this->belongsTo(ClassList::class, 'class_list_id');
    }
}
