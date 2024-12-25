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
            $table->id();
            $table->string('course_code', 50);
            $table->string('course_title', 100);
            $table->string('description', 255);
            $table->string('semester', 20);
            $table->string('year_level', 10);
            $table->string('program', 50);
            $table->string('department', 50);
            $table->unsignedBigInteger('employee_id'); // Foreign key to employees table
            $table->string('assigned_poc', 200); // Firstname + Lastname of College POC
            $table->decimal('epgf_average', 5, 2)->nullable();
            $table->decimal('completion_rate', 5, 2)->nullable();
            $table->string('proficiency_level', 50)->nullable();            
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('employee_id')->references('id')->on('college_pocs')->onDelete('cascade');
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
