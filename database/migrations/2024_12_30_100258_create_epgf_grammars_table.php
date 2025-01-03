<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('epgf_grammars', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('epgf_grammar_id')->nullable();
            $table->string('grammar')->nullable();
            $table->text('descriptor')->nullable();
            $table->decimal('rating', 5, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('epgf_grammars');
    }
};
