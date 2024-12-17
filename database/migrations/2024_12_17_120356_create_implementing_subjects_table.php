<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImplementingSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('implementing_subjects', function (Blueprint $table) {
            $table->id();
            $table->string('implementing_subject_id')->unique(); // Unique identifier for the implementing subject
            $table->string('course_title', 100);
            $table->string('code', 50);
            $table->string('course_code', 50);
            $table->string('description', 255);
            $table->string('semester', 50);
            $table->string('year_level', 50);
            $table->string('assigned_poc', 200); // Concatenation of firstname and lastname from POC
            $table->unsignedBigInteger('employee_id'); // Foreign key to employee table
            $table->string('email', 100);
            $table->string('program', 100);
            $table->string('department', 100);
            $table->decimal('epgf_average', 5, 2)->default(0.00)->unsigned();
            $table->decimal('completion_rate', 5, 2)->default(0.00)->unsigned();
            $table->string('proficiency_level', 50);
            $table->unsignedBigInteger('student_list_id'); // Foreign key to student list table
            $table->timestamps();
        });

        // Foreign key constraints
        Schema::table('implementing_subjects', function (Blueprint $table) {
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('student_list_id')->references('id')->on('student_lists')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('implementing_subjects');
    }
}
