<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfPronunciation extends Model
{
    use HasFactory;

    protected $primaryKey = 'epgf_pronunciation_id';

    protected $fillable = ['version', 'pronunciation', 'descriptor', 'rating'];
}
