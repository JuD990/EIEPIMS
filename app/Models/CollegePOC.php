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
        'password',
        'department',
        'email',
        'role',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

}
