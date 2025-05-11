<?php

namespace App\Imports;

use App\Models\ClassLists;
use App\Models\Students;
use App\Models\HistoricalClassLists;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\DB;

class ClassListImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        DB::transaction(function () use ($row) {
            // Check if email already exists before inserting
            $emailExists = Students::where('email', $row['email'])->exists();

            if ($emailExists) {
                // Skip insertion of ClassLists and Students if email already exists
                // Optional: log or notify the user about skipped entry
                return;
            }

            // Insert into ClassLists (as no email duplication found)
            ClassLists::create([
                'student_id'            => $row['student_id'],
                'firstname'             => $row['firstname'],
                'middlename'            => $row['middlename'] ?? null,
                'lastname'              => $row['lastname'],
                'email'                 => $row['email'],
                'program'               => $row['program'],
                'department'            => $row['department'],
                'year_level'            => $row['year_level'],
                'gender'                => $row['gender'],
                'status'                => $row['status'] ?? 'Active',
                'classification'        => $row['classification'],
                'reason_for_shift_or_drop' => $row['reason_for_shift_or_drop'] ?? null,
                'pronunciation'         => $row['pronunciation'] ?? null,
                'grammar'               => $row['grammar'] ?? null,
                'fluency'               => $row['fluency'] ?? null,
                'epgf_average'          => $row['epgf_average'] ?? null,
                'completion_rate'       => $row['completion_rate'] ?? null,
                'proficiency_level'     => $row['proficiency_level'] ?? null,
                'course_code'           => $row['course_code'],
            ]);

            HistoricalClassLists::create([
                'student_id'            => $row['student_id'],
                'firstname'             => $row['firstname'],
                'middlename'            => $row['middlename'] ?? null,
                'lastname'              => $row['lastname'],
                'email'                 => $row['email'],
                'program'               => $row['program'],
                'department'            => $row['department'],
                'year_level'            => $row['year_level'],
                'gender'                => $row['gender'],
                'status'                => $row['status'] ?? 'Active',
                'classification'        => $row['classification'],
                'reason_for_shift_or_drop' => $row['reason_for_shift_or_drop'] ?? null,
                'pronunciation'         => $row['pronunciation'] ?? null,
                'grammar'               => $row['grammar'] ?? null,
                'fluency'               => $row['fluency'] ?? null,
                'epgf_average'          => $row['epgf_average'] ?? null,
                'completion_rate'       => $row['completion_rate'] ?? null,
                'proficiency_level'     => $row['proficiency_level'] ?? null,
                'course_code'           => $row['course_code'],
            ]);

            // Check for student_id
            $existingStudent = Students::where('student_id', $row['student_id'])->first();

            if ($existingStudent) {
                // Update student data if student_id exists
                $updateData = [
                    'firstname'  => $row['firstname'],
                    'middlename' => $row['middlename'] ?? null,
                    'lastname'   => $row['lastname'],
                    'department' => $row['department'],
                    'year_level' => $row['year_level'],
                    'program'    => $row['program'],
                ];

                // Only update email if it's unique
                $emailExists = Students::where('email', $row['email'])
                ->where('student_id', '!=', $row['student_id'])
                ->exists();

                if (!$emailExists) {
                    $updateData['email'] = $row['email'];
                }

                $existingStudent->update($updateData);
            } else {
                // Insert new student only if email is unique
                Students::create([
                    'student_id' => $row['student_id'],
                    'firstname'  => $row['firstname'],
                    'middlename' => $row['middlename'] ?? null,
                    'lastname'   => $row['lastname'],
                    'email'      => $row['email'],
                    'department' => $row['department'],
                    'year_level' => $row['year_level'],
                    'program'    => $row['program'],
                ]);
            }
        });
    }
}
