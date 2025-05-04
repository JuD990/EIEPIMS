<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterClassList extends Model
{
    use HasFactory;

    protected $table = 'master_class_list';

    protected $primaryKey = 'master_class_list_id';

    public $timestamps = true;

    protected $fillable = [
        'student_id',
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
        'candidate_for_graduating',
    ];
}
