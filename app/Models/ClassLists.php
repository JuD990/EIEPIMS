<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLists extends Model
{
    use HasFactory;

    protected $primaryKey = 'class_lists_id';

    protected $table = 'class_lists';

    protected $fillable = [
        'class_lists_id',
        'student_id', 'firstname', 'middlename', 'lastname',
        'email', 'program', 'department', 'year_level', 'gender', 'status',
        'classification', 'reason_for_shift_or_drop', 'pronunciation',
        'grammar', 'fluency', 'epgf_average',
        'proficiency_level', 'course_code'
    ];

    public function implementingSubjectClassLists()
    {
        return $this->hasMany(ImplementingSubjectClassList::class);
    }
}
