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
        Schema::create('master_class_list', function (Blueprint $table) {
            $table->id('master_class_list_id');
            $table->string('student_id')->unique();
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('lastname');
            $table->string('email');
            $table->string('department');
            $table->string('program');
            $table->string('year_level');
            $table->string('gender');
            $table->string('classification');
            $table->string('candidate_for_graduating')->default("No");
            $table->string('status')->default("No Show");

            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_class_list');
    }
};
