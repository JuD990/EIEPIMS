<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DummyUserSeeder extends Seeder
{
    public function run()
    {
        // Dummy data for each role

        // Student Role
        $students = [
            [
                'student_id' => 'STU001',
                'firstname' => 'John',
                'middlename' => 'Doe',
                'lastname' => 'Student',
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

        // College POC Role
        $college_pocs = [
            [
                'firstname' => 'Jane',
                'middlename' => 'Marie',
                'lastname' => 'College',
                'password' => Hash::make('password123'),
                'email' => 'collegepoc@unc.edu.ph',
                'department' => 'Computer Science',
                'role' => 'College POC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // EIE Head Role
        $eie_heads = [
            [
                'employee_id' => 'EIEHEAD001',
                'firstname' => 'Michael',
                'middlename' => 'Alan',
                'lastname' => 'EIEHead',
                'password' => Hash::make('password123'),
                'email' => 'eiehead@unc.edu.ph',
                'department' => 'Administration',
                'role' => 'EIE Head',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // ESL Prime Role
        $esl_prime = [
            [
                'employee_id' => 'ESLPRIME001',
                'firstname' => 'Sarah',
                'middlename' => 'Lynn',
                'lastname' => 'Prime',
                'password' => Hash::make('password123'),
                'email' => 'eslprime@unc.edu.ph',
                'role' => 'ESL Prime',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // ESL Champion Role
        $esl_champion = [
            [
                'employee_id' => 'ESLCHAMP001',
                'firstname' => 'David',
                'middlename' => 'Carter',
                'lastname' => 'Champion',
                'password' => Hash::make('password123'),
                'email' => 'eslchampion@unc.edu.ph',
                'role' => 'ESL Champion',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Lead POC Role
        $lead_pocs = [
            [
                'employee_id' => 'LEADPOC001',
                'firstname' => 'Emily',
                'middlename' => 'Grace',
                'lastname' => 'LeadPOC',
                'password' => Hash::make('password123'),
                'email' => 'leadpoc@unc.edu.ph',
                'department' => 'Science',
                'role' => 'Lead POC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert dummy users into the respective tables
        DB::table('students')->insert($students);
        DB::table('college_pocs')->insert($college_pocs);
        DB::table('eie_heads')->insert($eie_heads);
        DB::table('esl_champion')->insert($esl_champion);
        DB::table('esl_prime')->insert($esl_prime);
        DB::table('lead_pocs')->insert($lead_pocs);
    }
}
