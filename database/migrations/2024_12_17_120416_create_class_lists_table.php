<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassListTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('class_lists', function (Blueprint $table) {
            $table->id();
            $table->string('class_list_id')->unique(); // Unique identifier for the student list
            $table->string('student_id')->unique(); // Unique student ID
            $table->string('firstname', 100);
            $table->string('middlename', 100)->nullable();
            $table->string('lastname', 100);
            $table->string('status', 50); // e.g., 'active', 'graduated', etc.
            $table->string('email', 100)->unique();
            $table->string('department', 50);
            $table->string('program', 50);
            $table->string('year_level', 10);
            $table->string('gender', 10);
            $table->string('classification', 50);
            $table->decimal('pronunciation_average', 5, 2)->default(0.00)->unsigned();
            $table->decimal('grammar_average', 5, 2)->default(0.00)->unsigned();
            $table->decimal('fluency_average', 5, 2)->default(0.00)->unsigned();
            $table->decimal('pgf_average', 5, 2)->default(0.00)->unsigned();
            $table->string('proficiency_level', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_lists');
    }
}
