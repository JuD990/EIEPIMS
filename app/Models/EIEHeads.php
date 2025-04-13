<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EIEHeads extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'eie_heads';
    protected $primaryKey = 'id';

    protected $fillable = [
        'employee_id',
        'firstname',
        'middlename',
        'lastname',
        'email',
        'department',
        'full_department',
        'password',
        'role',
    ];
}
