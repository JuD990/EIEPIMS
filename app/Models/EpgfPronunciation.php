<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfPronunciation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'epgf_pronunciations';

    protected $primaryKey = 'id';

    protected $fillable = [
        'epgf_pronunciation_id',
        'pronunciation',
        'descriptor',
        'rating'
    ];

    // Relationship to EpgfRubric
    public function rubrics()
    {
        return $this->hasMany(EpgfRubric::class, 'epgf_pronunciation_id');
    }
}
