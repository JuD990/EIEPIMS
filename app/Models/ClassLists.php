<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLists extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if it follows Laravel's convention)
    protected $table = 'class_lists';

    // Define the fillable fields (optional but helps protect against mass-assignment vulnerabilities)
    protected $fillable = [
        'class_list_id',
        'student_id',
        'firstname',
        'middlename',
        'lastname',
        'email',
        'program',
        'department',
        'year_level',
        'gender',
    ];

    // Define the relationship with ImplementingSubjectClassList
    public function implementingSubjectClassLists()
    {
        return $this->hasMany(ImplementingSubjectClassList::class);
    }
}