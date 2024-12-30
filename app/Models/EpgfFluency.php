<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfFluency extends Model
{
    use HasFactory;

    protected $primaryKey = 'epgf_fluency_id';

    protected $fillable = ['version', 'fluency', 'descriptor', 'rating'];
}
