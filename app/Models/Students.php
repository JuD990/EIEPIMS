<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasApiTokens;
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'id';

    // Mass-assignable attributes
    protected $fillable = [
        'student_id', 
        'firstname', 
        'middlename', 
        'lastname', 
        'password', 
        'email', 
        'department', 
        'year_level', 
        'program', 
        'role'
    ];

    // Password mutator to hash the password before saving
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}