<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLists extends Model
{
    use HasFactory;

    protected $primaryKey = 'class_list_id';

    // Define the table associated with the model (optional if it follows Laravel's convention)
    protected $table = 'class_lists';

    // Define the fillable fields to allow mass assignment
    protected $fillable = [
        'class_list_id', 'student_id', 'firstname', 'middlename', 'lastname', 
        'email', 'program', 'department', 'year_level', 'gender', 'status', 
        'classification', 'reason_for_shift_or_drop', 'pronunciation', 
        'grammar', 'fluency', 'epgf_average', 'completion_rate', 
        'proficiency_level', 'course_code'
    ];    

    // Define the relationship with ImplementingSubjectClassList
    public function implementingSubjectClassLists()
    {
        return $this->hasMany(ImplementingSubjectClassList::class);
    }
}