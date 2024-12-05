<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class ESLPrime extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    
    protected $table = 'esl_prime';
    protected $primaryKey = 'id';

    protected $fillable = [
        'employee_id',
        'firstname',
        'middlename',
        'lastname',
        'password',
        'email',
        'role',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

}
