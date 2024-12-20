<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class OtherUsers extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert College POC first (this ensures the foreign key constraint is respected)
        DB::table('college_pocs')->insert([
            [
                'id' => 1,
                'employee_id' => 1234, // Use the correct employee ID
                'firstname' => 'Alice',
                'middlename' => null,
                'lastname' => 'Johnson',
                'email' => 'collegepoc@example.com',
                'password' => Hash::make('password123'),
                'department' => 'Engineering',
                'program' => 'Computer Science',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Insert students into class_lists
        DB::table('class_lists')->insert([
            [
                'id' => 1,
                'class_list_id' => Str::uuid(),
                'student_id' => 'STU001',
                'firstname' => 'John',
                'middlename' => 'D',
                'lastname' => 'Doe',
                'email' => 'johndoe@example.com',
                'program' => 'Computer Science',
                'department' => 'Engineering',
                'year_level' => '1',
                'gender' => 'Male',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'class_list_id' => Str::uuid(),
                'student_id' => 'STU002',
                'firstname' => 'Jane',
                'middlename' => 'E',
                'lastname' => 'Smith',
                'email' => 'janesmith@example.com',
                'program' => 'Information Technology',
                'department' => 'Engineering',
                'year_level' => '2',
                'gender' => 'Female',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Insert an implementing subject (make sure the employee_id of the CollegePOC exists)
        DB::table('implementing_subjects')->insert([
            [
                'id' => 1,
                'course_code' => 'CS101',
                'course_title' => 'Introduction to Computer Science',
                'description' => 'Fundamentals of computer science.',
                'semester' => 'First',
                'year_level' => '1',
                'program' => 'Computer Science',
                'department' => 'Engineering',
                'employee_id' => 1, // Now the employee with ID 1 exists in college_pocs table
                'assigned_poc' => 'Alice Johnson',
                'epgf_average' => 3.5,
                'completion_rate' => 90.0,
                'proficiency_level' => 'Intermediate',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Insert relationships into the pivot table
        DB::table('implementing_subject_class_lists')->insert([
            [
                'id' => 1,
                'implementing_subject_id' => 1, // Subject ID 1 exists
                'class_list_id' => 1, // Class list ID 1 exists
                'course_code' => 'CS101',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'implementing_subject_id' => 1,
                'class_list_id' => 2,
                'course_code' => 'CS101',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
