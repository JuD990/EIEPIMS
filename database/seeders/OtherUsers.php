<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OtherUsers extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('college_pocs')->insert([
            [
                'id' => 2001,
                'employee_id' => 'EMP-001',
                'firstname' => 'Alice',
                'middlename' => 'F.',
                'lastname' => 'Carter',
                'email' => 'alicecarter@unc.edu.ph',
                'password' => Hash::make('password123'),
                'department' => 'SCIS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2002,
                'employee_id' => 'EMP-002',
                'firstname' => 'Bob',
                'middlename' => 'G.',
                'lastname' => 'Williams',
                'email' => 'bobwilliams@unc.edu.ph',
                'password' => Hash::make('password123'),
                'department' => 'SCIS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2003,
                'employee_id' => 'EMP-003',
                'firstname' => 'Carol',
                'middlename' => 'H.',
                'lastname' => 'Martinez',
                'email' => 'carolmartinez@unc.edu.ph',
                'password' => Hash::make('password123'),
                'department' => 'SCIS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2004,
                'employee_id' => 'EMP-004',
                'firstname' => 'David',
                'middlename' => 'I.',
                'lastname' => 'Johnson',
                'email' => 'davidjohnson@unc.edu.ph',
                'password' => Hash::make('password123'),
                'department' => 'CJE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2005,
                'employee_id' => 'EMP-005',
                'firstname' => 'Eve',
                'middlename' => 'J.',
                'lastname' => 'Brown',
                'email' => 'evebrown@unc.edu.ph',
                'password' => Hash::make('password123'),
                'department' => 'CJE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2006,
                'employee_id' => 'EMP-006',
                'firstname' => 'Frank',
                'middlename' => 'K.',
                'lastname' => 'Miller',
                'email' => 'frankmiller@unc.edu.ph',
                'password' => Hash::make('password123'),
                'department' => 'CJE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
