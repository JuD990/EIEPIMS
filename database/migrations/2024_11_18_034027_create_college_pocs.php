<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollegePOCsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('college_pocs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id')->nullable();
            $table->string('firstname', 100);
            $table->string('middlename', 100)->nullable();
            $table->string('lastname', 100);
            $table->string('email', 100)->unique();
            $table->string('department', 100);
            $table->string('program', 100);
            $table->unsignedBigInteger('implementing_subject_id'); // Foreign key to implementing_subjects table
            $table->string('assigned_poc', 200); // Combination of firstname and lastname
            $table->timestamps();
        });

        // Foreign key constraints
        Schema::table('college_pocs', function (Blueprint $table) {
            $table->foreign('implementing_subject_id')->references('id')->on('implementing_subjects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('college_pocs');
    }
}
