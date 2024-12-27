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
            $table->string('status');
            $table->string('email')->unique();
            $table->string('department');
            $table->string('program');
            $table->integer('year_level');
            $table->string('gender');
            $table->string('reason_for_shift_or_drop')->nullable();
            $table->string('classification');
            $table->string('candidate_for_graduating');
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
