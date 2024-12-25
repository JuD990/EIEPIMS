<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImplementingSubjects extends Model
{
    use HasFactory;

    protected $table = 'implementing_subjects';

    protected $fillable = [
        'course_code',
        'course_title',
        'description',
        'semester',
        'year_level',
        'program',
        'department',
        'employee_id',
        'assigned_poc',
        'epgf_average',
        'completion_rate',
        'proficiency_level',
    ];

    // If the fields 'epgf_average', 'completion_rate', and 'proficiency_level' have default values in your database,
    // there is no need to explicitly set them in the model unless they are missing in the import data.
    
    // Relationship with ImplementingSubjectClassList (1 to many)
    public function implementingSubjectClassLists()
    {
        return $this->hasMany(ImplementingSubjectClassList::class);
    }

    // Relationship with Employee (College POC)
    public function employee()
    {
        return $this->belongsTo(CollegePOCs::class, 'employee_id');
    }
}
