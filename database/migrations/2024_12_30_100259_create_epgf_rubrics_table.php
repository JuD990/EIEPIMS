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
            $table->unsignedBigInteger('epgf_pronunciation_id');
            $table->unsignedBigInteger('epgf_grammar_id');
            $table->unsignedBigInteger('epgf_fluency_id');
            $table->string('version');
            $table->string('status');
            $table->timestamps();

            // Foreign keys
            $table->foreign('epgf_pronunciation_id')->references('epgf_pronunciation_id')->on('epgf_pronunciations')->onDelete('cascade');
            $table->foreign('epgf_grammar_id')->references('epgf_grammar_id')->on('epgf_grammars')->onDelete('cascade');
            $table->foreign('epgf_fluency_id')->references('epgf_fluency_id')->on('epgf_fluencies')->onDelete('cascade');
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
