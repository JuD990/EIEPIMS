<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateESLChampion extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('esl_champion', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id');
            $table->string('firstname', 50);
            $table->string('middlename', 50)->nullable();
            $table->string('lastname', 50);
            $table->string('password');
            $table->string('email', 50)->unique();
            $table->string('role')->default('ESL Champion');
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('esl_champion');
    }
};
