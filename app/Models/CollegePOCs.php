<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class CollegePOCs extends Authenticatable
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
        'password',
        'role',
    ];

    // Hash password automatically before saving
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    // Define the relationship with ImplementingSubject
    public function implementingSubjects()
    {
        return $this->hasMany(ImplementingSubjects::class, 'employee_id');
    }
}
