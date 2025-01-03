<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpgfGrammar extends Model
{
    use HasFactory;

    public $timestamps = false;

    // Specify the table if it's not the plural of the model name
    protected $table = 'epgf_grammars';

    // Define the primary key if it's not the default 'id'
    protected $primaryKey = 'id';

    // Define the fillable attributes
    protected $fillable = [
        'epgf_grammar_id',
        'grammar',
        'descriptor',
        'rating'
    ];
}
