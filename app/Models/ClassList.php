<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassList extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'class_lists';

    // Define fillable attributes to allow mass assignment
    protected $fillable = [
        'class_list_id',
        'class_id',
        'firstname',
        'middlename',
        'lastname',
        'status',
        'email',
        'department',
        'program',
        'year_level',
        'gender',
        'classification',
        'pronunciation_average',
        'grammar_average',
        'fluency_average',
        'pgf_average',
        'proficiency_level',
    ];

    // Define relationships
    public function implementingSubjects()
    {
        return $this->hasMany(ImplementingSubject::class, 'class_list_id');
    }
}
