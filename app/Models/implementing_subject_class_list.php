<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class implementing_subject_class_list extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if it follows Laravel's convention)
    protected $table = 'implementing_subject_class_lists';

    // Define the fillable fields (optional but helps protect against mass-assignment vulnerabilities)
    protected $fillable = [
        'implementing_subject_id',
        //'employee_id',
        'class_list_id',
        'course_code',
    ];

    // Define the relationships with ImplementingSubject and ClassList
    public function implementingSubject()
    {
        return $this->belongsTo(ImplementingSubject::class);
    }

    public function classList()
    {
        return $this->belongsTo(ClassList::class);
    }
}
