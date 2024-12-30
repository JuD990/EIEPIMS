<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfGrammar extends Model
{
    use HasFactory;

    protected $primaryKey = 'epgf_grammar_id';

    protected $fillable = ['version', 'grammar', 'descriptor', 'rating'];
}
