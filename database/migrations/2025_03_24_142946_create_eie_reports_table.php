<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('eie_reports', function (Blueprint $table) {
            $table->id('eie_report_id');
            $table->string('program');
            $table->string('semester');
            $table->string('year_level');
            $table->string('department');
            $table->string('assigned_poc')->nullable();
            $table->string('course_title');
            $table->string('course_code');
            $table->integer('enrolled_students')->nullable();
            $table->integer('active_students')->nullable();
            $table->decimal('completion_rate', 5, 2)->nullable();
            $table->string('completion_rate_expectation');
            $table->decimal('epgf_average', 4, 2)->nullable();
            $table->string('proficiency_level')->nullable();
            $table->integer('submitted')->nullable();
            $table->string('champion')->nullable(); // Champion's full name
            $table->integer('champion_id')->nullable();
            $table->string('champion_student_id')->nullable();
            $table->decimal('champion_epgf_average', 4, 2)->nullable(); // Champion's EPGF average
            $table->string('champion_proficiency_level')->nullable(); // Champion's proficiency level
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('eie_reports');
    }
};
