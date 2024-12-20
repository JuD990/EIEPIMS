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
        Schema::create('implementing_subject_class_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('implementing_subject_id'); // Foreign key to implementing_subjects table
            $table->unsignedBigInteger('class_list_id'); // Foreign key to class_lists table
            $table->string('course_code', 50); // To identify sections within the same subject
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('implementing_subject_id')->references('id')->on('implementing_subjects')->onDelete('cascade');
            $table->foreign('class_list_id')->references('id')->on('class_lists')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('implementing_subject_class_lists');
    }
};
