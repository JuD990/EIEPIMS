<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudents extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id');
            $table->string('firstname', 50);
            $table->string('middlename', 50)->nullable();
            $table->string('lastname', 50);
            $table->string('password');
            $table->string('email', 50)->unique();
            $table->string('department', 50);
            $table->string('year_level');
            $table->string('program', 20);
            $table->string('role')->default('Student');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}
