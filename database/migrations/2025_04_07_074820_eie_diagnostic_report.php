<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('eie_diagnostic_report', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('student_id');
            $table->date('date_of_interview')->nullable();
            $table->time('time_of_interview')->nullable();
            $table->string('venue')->nullable();
            $table->string('department');
            $table->string('program');
            $table->string('interviewer')->nullable();
            $table->string('year_level');

            // Pronunciation
            $table->text('consistency_descriptor')->nullable();
            $table->decimal('consistency_rating', 5, 2)->nullable();
            $table->text('clarity_descriptor')->nullable();
            $table->decimal('clarity_rating', 5, 2)->nullable();
            $table->text('articulation_descriptor')->nullable();
            $table->decimal('articulation_rating', 5, 2)->nullable();
            $table->text('intonation_and_stress_descriptor')->nullable();
            $table->decimal('intonation_and_stress_rating', 5, 2)->nullable();
            $table->decimal('pronunciation_average', 5, 2)->nullable();

            // Grammar
            $table->text('accuracy_descriptor')->nullable();
            $table->decimal('accuracy_rating', 5, 2)->nullable();
            $table->text('clarity_of_thought_descriptor')->nullable();
            $table->decimal('clarity_of_thought_rating', 5, 2)->nullable();
            $table->text('syntax_descriptor')->nullable();
            $table->decimal('syntax_rating', 5, 2)->nullable();
            $table->decimal('grammar_average', 5, 2)->nullable();

            // Fluency
            $table->text('quality_of_response_descriptor')->nullable();
            $table->decimal('quality_of_response_rating', 5, 2)->nullable();
            $table->text('detail_of_response_descriptor')->nullable();
            $table->decimal('detail_of_response_rating', 5, 2)->nullable();
            $table->decimal('fluency_average', 5, 2)->nullable();

            $table->decimal('average_pgf_rating', 5, 2)->nullable();
            $table->string('pgf_specific_remarks')->nullable();
            $table->string('school_year_highlight')->nullable();
            $table->string('school_year_lowlight')->nullable();
            $table->string('spark_highlight')->nullable();
            $table->string('spark_lowlight')->nullable();
            $table->string('usage_in_school_online')->nullable();
            $table->string('usage_offline')->nullable();
            $table->string('support_needed')->nullable();
            $table->string('show_status', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eie_diagnostic_report');
    }
};
