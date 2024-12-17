<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DummyUserSeeder extends Seeder
{
    public function run()
    {
        // ================= Student Role =================
        $students = [
            [
                'student_id' => 'STU001',
                'firstname' => 'Christine Joy',
                'middlename' => '',
                'lastname' => 'Cleofe',
                'password' => Hash::make('password123'),
                'email' => 'student@unc.edu.ph',
                'department' => 'Engineering',
                'year_level' => '1st Year',
                'program' => 'BSCS',
                'role' => 'Student',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('students')->insert($students);

        // ================= Implementing Subjects =================
        $implementing_subject_id = DB::table('implementing_subjects')->insertGetId([
            'course_title' => 'Object Oriented Programming',
            'code' => 'OOP101',
            'course_code' => 'CS123',
            'description' => 'Introduction to OOP concepts',
            'semester' => '1st',
            'year_level' => 2,
            'assigned_poc' => 'Dennis Ignacio',
            'employee_id' => 1001,
            'email' => 'collegepoc@unc.edu.ph',
            'program' => 'BSCS',
            'department' => 'Computer Science',
            'epgf_average' => 88.50,
            'completion_rate' => 90.00,
            'proficiency_level' => 'Advanced',
            'student_list_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ================= College POC Role =================
        $college_pocs = [
            [
                'employee_id' => 1001,
                'firstname' => 'Dennis',
                'middlename' => '',
                'lastname' => 'Ignacio',
                'password' => Hash::make('password123'),
                'email' => 'collegepoc@unc.edu.ph',
                'department' => 'Computer Science',
                'program' => 'BSCS',
                'implementing_subject_id' => $implementing_subject_id,
                'role' => 'College POC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('college_pocs')->insert($college_pocs);

        // ================= Student List =================
        $student_lists = [
            [
                'student_list_id' => 1,
                'student_id' => 'STU001',
                'firstname' => 'John',
                'middlename' => 'A.',
                'lastname' => 'Doe',
                'status' => 'Active',
                'email' => 'john.doe@student.unc.edu.ph',
                'department' => 'Computer Science',
                'program' => 'BSCS',
                'year_level' => 2,
                'gender' => 'Male',
                'classification' => 'Regular',
                'pronunciation_average' => 85.00,
                'grammar_average' => 88.00,
                'fluency_average' => 87.50,
                'pgf_average' => 86.83,
                'proficiency_level' => 'Intermediate',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('student_lists')->insert($student_lists);

        // ================= EIE Head Role =================
        $eie_heads = [
            [
                'employee_id' => 'EIEHEAD001',
                'firstname' => 'Agnes',
                'middlename' => '',
                'lastname' => 'Reyes',
                'password' => Hash::make('password123'),
                'email' => 'eiehead@unc.edu.ph',
                'department' => 'Administration',
                'role' => 'EIE Head',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('eie_heads')->insert($eie_heads);

        // ================= ESL Prime Role =================
        $esl_primes = [
            [
                'employee_id' => 'ESLPRIME001',
                'firstname' => 'Chin',
                'middlename' => '',
                'lastname' => 'Borela',
                'password' => Hash::make('password123'),
                'email' => 'eslprime@unc.edu.ph',
                'role' => 'ESL Prime',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('esl_prime')->insert($esl_prime);

        // ================= ESL Champion Role =================
        $esl_champion = [
            [
                'employee_id' => 'ESLCHAMP001',
                'firstname' => 'Mia',
                'middlename' => '',
                'lastname' => 'Tajim',
                'password' => Hash::make('password123'),
                'email' => 'eslchampion@unc.edu.ph',
                'role' => 'ESL Champion',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('esl_champion')->insert($esl_champion);

        // ================= Lead POC Role =================
        $lead_pocs = [
            [
                'employee_id' => 'LEADPOC001',
                'firstname' => 'June',
                'middlename' => '',
                'lastname' => 'Danila',
                'password' => Hash::make('password123'),
                'email' => 'leadpoc@unc.edu.ph',
                'department' => 'Science',
                'role' => 'Lead POC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('lead_pocs')->insert($lead_pocs);
    }
}
