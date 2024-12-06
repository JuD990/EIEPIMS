<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateESLPrime extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('esl_prime', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id');
            $table->string('firstname', 50);
            $table->string('middlename', 50)->nullable();
            $table->string('lastname', 50);
            $table->string('password');
            $table->string('email', 20)->unique();
            $table->string('role')->default('ESL Prime');
            $table->timestamps(); // created_at and updated_at
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('esl_prime');
    }
};
