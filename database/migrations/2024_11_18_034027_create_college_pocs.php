<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollegePOCs extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('college_pocs', function (Blueprint $table) {
            $table->id();
            $table->integer('employee_id')->nullable()->change();
            $table->string('firstname', 50);
            $table->string('middlename', 50)->nullable();
            $table->string('lastname', 50);
            $table->string('password');
            $table->string('email', 50)->unique();
            $table->string('department', 50);
            $table->string('role')->default('College POC');
            $table->timestamps(); // created_at and updated_at
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('college_pocs');
    }
};
