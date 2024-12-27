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
        Schema::create('class_lists', function (Blueprint $table) {
            $table->id();
            $table->string('student_id');
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('program');
            $table->string('department');
            $table->string('year_level');
            $table->string('gender');
            $table->string('status');
            $table->string('classification');
            $table->string('reason_for_shift_or_drop', 255)->nullable();
            $table->decimal('pronunciation', 5, 2)->nullable();
            $table->decimal('grammar', 5, 2)->nullable();
            $table->decimal('fluency', 5, 2)->nullable();
            $table->decimal('epgf_average', 5, 2)->nullable();
            $table->decimal('completion_rate', 5, 2)->nullable();
            $table->string('proficiency_level', 50)->nullable();
            $table->string('course_code');
            $table->timestamps();
    
            $table->unique(['student_id', 'course_code']);
        });
    }    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_lists');
    }
};
