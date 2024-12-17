<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class CollegePOC extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;

    protected $table = 'college_pocs';
    protected $primaryKey = 'id';

    protected $fillable = [
        'employee_id',
        'firstname',
        'middlename',
        'lastname',
        'email',
        'department',
        'program',
        'implementing_subject_id',
        'assigned_poc',
    ];

    // Define relationships
    public function implementingSubject()
    {
        return $this->belongsTo(ImplementingSubject::class, 'implementing_subject_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

}
