<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEIEHeads extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('eie_heads', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id');
            $table->string('firstname', 50);
            $table->string('middlename', 50)->nullable();
            $table->string('lastname', 50);
            $table->string('password');
            $table->string('email', 50)->unique();
            $table->string('department', 20);
            $table->string('role')->default('EIE Head');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eie_heads');
    }
};
