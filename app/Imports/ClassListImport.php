<?php

namespace App\Imports;

use App\Models\ClassLists;
use App\Models\Students;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\DB;

class ClassListImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        DB::transaction(function () use ($row) {
            // ✅ Allow duplicate entries in ClassLists
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

            // ✅ Check for student_id
            $existingStudent = Students::where('student_id', $row['student_id'])->first();

            if ($existingStudent) {
                // ✅ Prevent email duplication errors
                $updateData = [
                    'firstname'  => $row['firstname'],
                    'middlename' => $row['middlename'] ?? null,
                    'lastname'   => $row['lastname'],
                    'department' => $row['department'],
                    'year_level' => $row['year_level'],
                    'program'    => $row['program'],
                ];

                // Only update email if it's unique (avoiding duplicate constraint violation)
                $emailExists = Students::where('email', $row['email'])
                ->where('student_id', '!=', $row['student_id'])
                ->exists();

                if (!$emailExists) {
                    $updateData['email'] = $row['email'];
                }

                // Update the student record
                $existingStudent->update($updateData);
            } else {
                // ✅ Insert new student if student_id does not exist
                Students::create([
                    'student_id'  => $row['student_id'],
                    'firstname'   => $row['firstname'],
                    'middlename'  => $row['middlename'] ?? null,
                    'lastname'    => $row['lastname'],
                    'email'       => $row['email'], // Insert email if it's unique
                    'department'  => $row['department'],
                    'year_level'  => $row['year_level'],
                    'program'     => $row['program'],
                ]);
            }
        });
    }
}
