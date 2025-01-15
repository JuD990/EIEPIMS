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
        Schema::create('eie_reports', function (Blueprint $table) {
            $table->id("eie_report_id");
            $table->string("year_level")->nullable; // fetch from implementing_subjects
            $table->string("department")->nullable;
            $table->string("program")->nullable;
            $table->integer("enrolled_students")->nullable; // processed counted population per program in the class list
            $table->integer("active_students")->nullable; // from the scorecard
            $table->string("target")->default("100%");
            $table->string("implementing_subject")->nullable; // fetch from implementing_subjects or course_title
            $table->string("faculty")->nullable; // assigned_poc
            $table->string("submitted/participated")->nullable; // processed data entry per program in the scorecard
            $table->decimal('completion_rate', 5, 2)->nullable;
            $table->decimal('pgf_average', 5, 2)->nullable;
            $table->string("champion")->nullable; // eie champ
            $table->string("champ_pgf_average")->nullable; // eie champ average
            $table->string('semester')->nullable; // fetch from implementing_subjects
            $table->timestamps(); // will be used to display data based on the current data or for scheduling
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eie_reports');
    }
};
