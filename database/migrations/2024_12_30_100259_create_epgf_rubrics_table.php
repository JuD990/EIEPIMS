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
        Schema::create('epgf_rubrics', function (Blueprint $table) {
            $table->id('epgf_rubric_id');
            $table->integer('epgf_pronunciation_id')->nullable();
            $table->integer('epgf_grammar_id')->nullable();
            $table->integer('epgf_fluency_id')->nullable();
            $table->string('version')->unique()->nullable();
            $table->string('status')->default('inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('epgf_rubrics');
    }
};
