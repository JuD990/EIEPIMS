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
        Schema::create('implementing_subjects', function (Blueprint $table) {
            $table->id('implementing_subject_id');
            $table->string('course_code', 50);
            $table->string('code', 10);
            $table->string('course_title', 100);
            $table->string('semester', 20);
            $table->string('year_level', 10);
            $table->string('program', 50);
            $table->string('department', 50);
            $table->string('employee_id')->nullable();
            $table->string('assigned_poc', 200)->nullable();
            $table->string('email', 50)->nullable();
            $table->decimal('epgf_average', 5, 2)->nullable();
            $table->decimal('completion_rate', 5, 2)->nullable();
            $table->string('proficiency_level', 50)->nullable();
            $table->integer('enrolled_students')->nullable();
            $table->integer('active_students')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('implementing_subjects');
    }
};
