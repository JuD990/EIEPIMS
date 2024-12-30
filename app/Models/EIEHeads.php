<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class EIEHeads extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;

    protected $table = 'eie_heads';
    protected $primaryKey = 'eie_head_id';

    protected $fillable = [
        'employee_id',
        'firstname',
        'middlename',
        'lastname',
        'email',
        'department',
        'password',
        'role',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}