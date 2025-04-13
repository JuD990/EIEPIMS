<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ImplementingSubjects;
use App\Models\EieReport;
use App\Models\ClassLists;
use App\Models\EieScorecardClassReport;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EieReportController extends Controller
{
    public function storeOrUpdatePrograms()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $programs = ImplementingSubjects::all();

        if ($programs->isEmpty()) {
            return response()->json(['error' => 'No programs found in ImplementingSubjects'], 404);
        }

        $updatedEntries = [];
        $newEntries = [];

        foreach ($programs as $program) {
            // Ensure course_code is not null
            if (empty($program->course_code)) {
                return response()->json([
                    'error' => "Course code is required for program: {$program->program}, year level: {$program->year_level}"
                ], 422);
            }

            $completionRate = $program->completion_rate ?? 0;
            // Add the completion_rate_expectation logic
            $completionRateExpectation = ($completionRate == 100) ? "Meets Expectation" : "Below Expectation";

            // Fetch Champion Student
            $champion = ClassLists::where([
                ['course_code', $program->course_code]
            ])
            ->where('epgf_average', '>', 0)
            ->orderByDesc('epgf_average')
            ->first();

            $championFullName = $champion ? "{$champion->firstname} {$champion->middlename} {$champion->lastname}" : null;
            $championId = $champion->class_lists_id ?? null;
            $championStudentId = $champion->student_id ?? null;
            $championEpgfAverage = $champion->epgf_average ?? null;
            $championProficiencyLevel = $champion->proficiency_level ?? null;

            // **Count the number of submitted reports for this course_code**
            $submittedCount = EieScorecardClassReport::where('course_code', $program->course_code)->count();

            // Check if record exists for the current month and year
            $existingRecord = EieReport::where([
                ['program', $program->program],
                ['year_level', $program->year_level],
                ['semester', $program->semester],
                ['course_code', $program->course_code],
            ])
            ->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->first();

            // Prepare Data for Update or Insert
            $reportData = [
                'program' => $program->program,
                'semester' => $program->semester,
                'year_level' => $program->year_level,
                'department' => $program->department,
                'assigned_poc' => $program->assigned_poc,
                'course_title' => $program->course_title,
                'course_code' => $program->course_code,
                'enrolled_students' => $program->enrolled_students,
                'active_students' => $program->active_students,
                'completion_rate' => $program->completion_rate ?? null,
                'completion_rate_expectation' => $completionRateExpectation ?? null,
                'epgf_average' => $program->epgf_average,
                'proficiency_level' => $program->proficiency_level,
                'champion' => $championFullName,
                'champion_id' => $championId,
                'champion_student_id' => $championStudentId,
                'champion_epgf_average' => $championEpgfAverage ?: null,
                'champion_proficiency_level' => $championProficiencyLevel,
                'submitted' => $submittedCount ?: null,
            ];

            if ($existingRecord) {
                // Update existing record
                $existingRecord->update($reportData);
                $updatedEntries[] = $existingRecord->fresh();
            } else {
                // Create new record
                $newEntries[] = EieReport::create($reportData);
            }
        }

        return response()->json([
            'message' => 'EIE Reports processed successfully',
            'updated_entries' => $updatedEntries,
            'new_entries' => $newEntries
        ]);
    }


    public function getDashboardReport(Request $request)
    {
        $department = $request->input('department');
        $semester = $request->input('semester');
        $schoolYear = $request->input('schoolYear');

        if (!$department || !$semester || !$schoolYear) {
            return response()->json(['success' => false, 'message' => 'Invalid parameters'], 400);
        }

        // Validate school year format
        $years = explode('/', $schoolYear);
        if (count($years) != 2 || !is_numeric($years[0]) || !is_numeric($years[1])) {
            return response()->json(['success' => false, 'message' => 'Invalid school year format'], 400);
        }
        list($startYear, $endYear) = $years;

        $reports = EieReport::where('department', $department)
        ->where('semester', $semester)
        ->whereYear('created_at', '>=', (int)$startYear)
        ->whereYear('created_at', '<=', (int)$endYear)
        ->get();

        if ($reports->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'No data found for the specified parameters'], 404);
        }

        $firstSem = ["August", "September", "October", "November", "December"];
        $secondSem = ["January", "February", "March", "April", "May"];
        $months = $semester === '1st Semester' ? $firstSem : $secondSem;

        $grandTotals = [
            'expectedSubmissions' => 0,
            'submitted' => array_fill_keys($months, 0),
            'completionRate' => array_fill_keys($months, null), // Ensure null for missing values
            'epgfAverage' => array_fill_keys($months, null), // Ensure null for missing values
            'proficiencyLevel' => array_fill_keys($months, null),
            'champion' => array_fill_keys($months, null),
        ];

        $groupedData = $reports->groupBy('year_level')->map(function ($yearLevelReports) use ($months, &$grandTotals) {
            $yearTotals = [
                'expectedSubmissions' => 0,
                'submitted' => array_fill_keys($months, 0),
                                                            'completionRate' => array_fill_keys($months, null), // Ensure null for missing values
                                                            'epgfAverage' => array_fill_keys($months, null), // Ensure null for missing values
                                                            'proficiencyLevel' => array_fill_keys($months, null),
                                                            'champion' => array_fill_keys($months, null),
            ];

            $yearLevelData = $yearLevelReports->groupBy('program')->map(function ($programReports) use ($months, &$yearTotals, &$grandTotals) {
                $monthData = [];

                foreach ($months as $month) {
                    $monthData[$month] = [
                        'submitted' => null,
                        'completionRate' => null,
                        'epgfAverage' => null,
                        'proficiencyLevel' => null,
                        'champion' => null,
                        'champion_epgf_average' => null,
                    ];
                }

                $firstReport = $programReports->first();
                $yearTotals['expectedSubmissions'] += $firstReport->enrolled_students;
                $grandTotals['expectedSubmissions'] += $firstReport->enrolled_students;

                foreach ($programReports as $report) {
                    $monthName = \Carbon\Carbon::parse($report->created_at)->format('F');
                    if (in_array($monthName, $months)) {
                        // Check for null or empty values and set them as null
                        $reportCompletionRate = ($report->completion_rate == 0 || is_null($report->completion_rate)) ? null : $report->completion_rate;
                        $reportEpgfAverage = ($report->epgf_average == 0 || is_null($report->epgf_average)) ? null : $report->epgf_average;

                        // Aggregate values for monthly data
                        $monthData[$monthName]['submitted'] += $report->submitted ?? null;
                        $monthData[$monthName]['completionRate'] += $reportCompletionRate;
                        $monthData[$monthName]['epgfAverage'] += $reportEpgfAverage;
                        $monthData[$monthName]['proficiencyLevel'] = $this->determineProficiencyLevel($reportEpgfAverage);

                        // Determine the champion per month
                        if ($report->champion_epgf_average > $monthData[$monthName]['champion_epgf_average']) {
                            $monthData[$monthName]['champion'] = $report->champion;
                            $monthData[$monthName]['champion_epgf_average'] = $report->champion_epgf_average;
                        }

                        // Aggregate values for year and grand totals
                        $yearTotals['submitted'][$monthName] += $report->submitted ?? null;
                        if (!is_null($reportCompletionRate)) {
                            $yearTotals['completionRate'][$monthName][] = $reportCompletionRate;
                        }
                        if (!is_null($reportEpgfAverage)) {
                            $yearTotals['epgfAverage'][$monthName][] = $reportEpgfAverage;
                        }

                        $grandTotals['submitted'][$monthName] += $report->submitted ?? null;
                        if (!is_null($reportCompletionRate)) {
                            $grandTotals['completionRate'][$monthName][] = $reportCompletionRate;
                        }
                        if (!is_null($reportEpgfAverage)) {
                            $grandTotals['epgfAverage'][$monthName][] = $reportEpgfAverage;
                        }
                    }
                }

                return [
                    'program' => $firstReport->program,
                    'courseTitle' => $firstReport->course_title,
                    'enrolledStudents' => $firstReport->enrolled_students,
                    'monthData' => $monthData,
                ];
            });

            foreach ($months as $month) {
                // Ensure missing values default to null or "-"
                $yearTotals['completionRate'][$month] = (!empty($yearTotals['completionRate'][$month]) && count($yearTotals['completionRate'][$month]) > 0)
                ? round(array_sum($yearTotals['completionRate'][$month]) / count($yearTotals['completionRate'][$month]), 2)
                : null;

                $yearTotals['epgfAverage'][$month] = (!empty($yearTotals['epgfAverage'][$month]) && count($yearTotals['epgfAverage'][$month]) > 0)
                ? round(array_sum($yearTotals['epgfAverage'][$month]) / count($yearTotals['epgfAverage'][$month]), 2)
                : null;

                $yearTotals['proficiencyLevel'][$month] = $yearTotals['epgfAverage'][$month] !== null
                ? $this->determineProficiencyLevel($yearTotals['epgfAverage'][$month])
                : null;

                // Determine Year Champion
                $monthlyChampions = $yearLevelReports->filter(function ($report) use ($month) {
                    return \Carbon\Carbon::parse($report->created_at)->format('F') === $month;
                });

                $yearTotals['champion'][$month] = $monthlyChampions
                ->sortByDesc('champion_epgf_average')
                ->first()?->champion ?? null;
            }

            $yearLevelData['totals'] = $yearTotals;
            return $yearLevelData;
        });

        foreach ($months as $month) {
            // Ensure missing grand totals default to null
            $grandTotals['completionRate'][$month] = !empty($grandTotals['completionRate'][$month]) && count($grandTotals['completionRate'][$month]) > 0
            ? round(array_sum($grandTotals['completionRate'][$month]) / count($grandTotals['completionRate'][$month]), 2)
            : null;

            $grandTotals['epgfAverage'][$month] = !empty($grandTotals['epgfAverage'][$month]) && count($grandTotals['epgfAverage'][$month]) > 0
            ? round(array_sum($grandTotals['epgfAverage'][$month]) / count($grandTotals['epgfAverage'][$month]), 2)
            : null;

            // 🛠 Compute proficiency level for grand totals
            $grandTotals['proficiencyLevel'][$month] = $this->determineProficiencyLevel($grandTotals['epgfAverage'][$month]);

            // Determine Grand Champion
            $monthlyChampions = $reports->filter(function ($report) use ($month) {
                return \Carbon\Carbon::parse($report->created_at)->format('F') === $month;
            });

            $grandTotals['champion'][$month] = $monthlyChampions
            ->sortByDesc('champion_epgf_average')
            ->first()?->champion ?? null;
        }

        return response()->json([
            'success' => true,
            'data' => $groupedData,
            'grandTotals' => $grandTotals,
        ]);
    }



    private function determineProficiencyLevel($epgfAverage)
    {
        $proficiencyLevels = [
            ["threshold" => 4.00, "level" => "Native/Bilingual"],
            ["threshold" => 3.00, "level" => "High Advanced"],
            ["threshold" => 2.50, "level" => "Advanced"],
            ["threshold" => 2.25, "level" => "High Proficient"],
            ["threshold" => 2.00, "level" => "Proficient"],
            ["threshold" => 1.75, "level" => "Low Proficient"],
            ["threshold" => 1.50, "level" => "High Developing"],
            ["threshold" => 1.25, "level" => "Low Developing"],
            ["threshold" => 1.00, "level" => "Emerging"],
            ["threshold" => 0.75, "level" => "High Acquisition"],
            ["threshold" => 0.50, "level" => "Low Acquisition"],
            ["threshold" => 0.00, "level" => "-"]
        ];

        foreach ($proficiencyLevels as $current) {
            if ($epgfAverage >= $current["threshold"]) {
                return $current["level"];
            }
        }

        return "-";
    }

    public function getEieReporting(Request $request)
    {
        $department = $request->input('department');
        $semester = $request->input('semester');
        $schoolYear = $request->input('schoolYear');

        \Log::info('EIE Report Request:', [
            'department' => $request->input('department'),
                   'semester' => $request->input('semester'),
                   'schoolYear' => $request->input('schoolYear')
        ]);

        if (!$department || !$semester || !$schoolYear) {
            return response()->json(['success' => false, 'message' => 'Invalid parameters'], 400);
        }

        // Validate school year format
        $years = explode('/', $schoolYear);
        if (count($years) != 2 || !is_numeric($years[0]) || !is_numeric($years[1])) {
            return response()->json(['success' => false, 'message' => 'Invalid school year format'], 400);
        }
        list($startYear, $endYear) = $years;

        $reports = EieReport::where('department', $department)
        ->where('semester', $semester)
        ->whereYear('created_at', '>=', (int)$startYear)
        ->whereYear('created_at', '<=', (int)$endYear)
        ->get();

        if ($reports->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'No data found for the specified parameters'], 404);
        }

        $firstSem = ["August", "September", "October", "November", "December"];
        $secondSem = ["January", "February", "March", "April", "May"];
        $months = $semester === '1st Semester' ? $firstSem : $secondSem;

        $groupedData = $reports->groupBy('year_level')->map(function ($yearLevelReports) use ($months) {
            return $yearLevelReports->groupBy('program')->map(function ($programReports) use ($months) {
                $monthData = [];

                foreach ($months as $month) {
                    $monthData[$month] = [
                        'submitted' => null,
                        'completionRate' => null,
                        'epgfAverage' => null,
                        'proficiencyLevel' => null,
                        'champion' => null,
                        'champion_epgf_average' => null,
                        'champion_proficiency_level' => null,
                    ];
                }

                $firstReport = $programReports->first();
                $enrolledStudents = $firstReport->enrolled_students;
                $assignedPOC = $firstReport->assigned_poc;

                foreach ($programReports as $report) {
                    $monthName = \Carbon\Carbon::parse($report->created_at)->format('F');
                    if (in_array($monthName, $months)) {
                        $monthData[$monthName]['submitted'] =
                        is_null($monthData[$monthName]['submitted'])
                        ? $report->submitted
                        : $monthData[$monthName]['submitted'] + $report->submitted;

                        $monthData[$monthName]['completionRate'] =
                        is_null($monthData[$monthName]['completionRate'])
                        ? $report->completion_rate
                        : $monthData[$monthName]['completionRate'] + $report->completion_rate;

                        $monthData[$monthName]['epgfAverage'] =
                        is_null($monthData[$monthName]['epgfAverage'])
                        ? $report->epgf_average
                        : $monthData[$monthName]['epgfAverage'] + $report->epgf_average;
                        $monthData[$monthName]['proficiencyLevel'] = $this->determineProficiencyLevel($report->epgf_average);

                        if ($report->champion_epgf_average > $monthData[$monthName]['champion_epgf_average']) {
                            $monthData[$monthName]['champion'] = $report->champion;
                            $monthData[$monthName]['champion_epgf_average'] = $report->champion_epgf_average;
                            $monthData[$monthName]['champion_proficiency_level'] = $this->determineProficiencyLevel($report->champion_epgf_average);
                        }
                    }
                }

                return [
                    'program' => $firstReport->program,
                    'courseTitle' => $firstReport->course_title,
                    'assignedPOC' => $assignedPOC,
                    'enrolledStudents' => $enrolledStudents,
                    'monthData' => $monthData,
                ];
            });
        });

        return response()->json([
            'success' => true,
            'data' => $groupedData,
        ]);
    }

}
