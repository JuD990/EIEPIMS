<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ImplementingSubjects;
use App\Models\EieReport;
use App\Models\ClassLists;
use App\Models\EieScorecardClassReport;
use App\Models\HistoricalClassLists;
use App\Models\HistoricalScorecard;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
            'completionRate' => array_fill_keys($months, null),
            'epgfAverage' => array_fill_keys($months, null),
            'proficiencyLevel' => array_fill_keys($months, null),
            'champion' => array_fill_keys($months, null),
        ];

        $groupedData = $reports->groupBy('year_level')->map(function ($yearLevelReports) use ($months, &$grandTotals) {
            $yearTotals = [
                'expectedSubmissions' => 0,
                'submitted' => array_fill_keys($months, 0),
                'completionRate' => array_fill_keys($months, null),
                'epgfAverage' => array_fill_keys($months, null),
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

            //Compute proficiency level for grand totals
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

    public function destroy($id)
    {
        $classList = ClassLists::findOrFail($id);

        // Only delete the class list, don't delete users
        $classList->delete();

        return response()->json(['message' => 'Class list deleted.']);
    }

    public function nullifyScores($id)
    {
        $students = Student::where('class_list_id', $id)->get();

        foreach ($students as $student) {
            $student->update([
                'pronunciation' => null,
                'grammar' => null,
                'fluency' => null,
                'epgf_average' => null,
                'proficiency_level' => null,
            ]);
        }

        return response()->json(['message' => 'Student scores nullified.']);
    }

    // Method to delete class lists
    public function deleteClassLists()
    {
        try {
            // Assumes ClassList model is not directly tied to the User accounts
            ClassLists::truncate(); // or ->delete() if you need to preserve some constraints

            return response()->json(['message' => 'Class lists deleted successfully.'], 200);
        } catch (\Exception $e) {
            \Log::error("Error deleting class lists: " . $e->getMessage());
            return response()->json(['error' => 'Failed to delete class lists.'], 500);
        }
    }

    // Nullify specific score columns in ClassLists
    public function nullifyClassListScores()
    {
        try {
            ClassLists::query()->update([
                'pronunciation' => null,
                'grammar' => null,
                'fluency' => null,
                'epgf_average' => null,
                'proficiency_level' => null,
            ]);

            return response()->json(['message' => 'Student score columns nullified successfully.'], 200);
        } catch (\Exception $e) {
            \Log::error("Error nullifying class list scores: " . $e->getMessage());
            return response()->json(['error' => 'Failed to nullify student scores.'], 500);
        }
    }

    // Nullify specific score columns in Implementing Subjects
    public function nullifyImplementingSubjectScores()
    {
        try {
            ImplementingSubjects::query()->update([
                'epgf_average' => null,
                'proficiency_level' => null,
                'completion_rate' => null,
            ]);

            return response()->json(['message' => 'Implementing subject scores nullified successfully.'], 200);
        } catch (\Exception $e) {
            \Log::error("Error nullifying implementing subject scores: " . $e->getMessage());
            return response()->json(['error' => 'Failed to nullify subject scores.'], 500);
        }
    }

    // Delete all Scorecard entries without affecting Implementing Subject scores
    public function deleteScorecard()
    {
        try {
            EieScorecardClassReport::truncate(); // Only clears the scorecards table

            return response()->json(['message' => 'Scorecards deleted successfully.'], 200);
        } catch (\Exception $e) {
            \Log::error("Error deleting scorecards: " . $e->getMessage());
            return response()->json(['error' => 'Failed to delete scorecards.'], 500);
        }
    }

    public function fetchFilteredReports(Request $request)
    {
        // Validate the request parameters
        $request->validate([
            'course_code' => 'required|string',
            'semester' => 'required|string',
            'school_year' => 'required|string',
        ]);

        // Split the school year into start and end years
        [$startYear, $endYear] = explode('/', $request->school_year);

        // Define months for each semester
        $semesterMonths = [
            '1st Semester' => ['August', 'September', 'October', 'November', 'December'],
            '2nd Semester' => ['January', 'February', 'March', 'April', 'May'],
        ];

        // Get the months based on the semester
        $months = $semesterMonths[$request->semester];

        try {
            // Array to hold data for each month
            $monthlyReports = [];

            // Loop over each month and get the data
            foreach ($months as $month) {
                // Get the first and last day of the month
                $startDate = "$startYear-" . array_search($month, $months) + 1 . "-01";
                $endDate = "$startYear-" . array_search($month, $months) + 1 . "-31"; // Example for the end of the month

                // If the month is in January to May, change to next year for the second semester
                if ($month == 'January') {
                    $startDate = "$endYear-01-01";  // Adjust for the 2nd Semester
                    $endDate = "$endYear-01-31";
                }

                // Fetch data for the month
                $reports = EieReport::where('course_code', $request->course_code)
                ->where('semester', $request->semester)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get([
                    'eie_report_id',
                    'course_code',
                    'course_title',
                    'program',
                    'year_level',
                    'department',
                    'assigned_poc',
                    'completion_rate',
                    'epgf_average',
                    'created_at',
                    'updated_at',
                ]);

                // Store the data for each month
                $monthlyReports[] = [
                    'month' => $month,
                    'data' => $reports,
                ];
            }

            // Return the results
            return response()->json([
                'success' => true,
                'data' => $monthlyReports,
            ]);
        } catch (\Exception $e) {
            // Catch any exceptions and log the error message
            \Log::error("Error fetching reports: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getDashboardReportGrandTotals(Request $request)
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

        // Initialize grandTotals with arrays instead of null
        $grandTotals = [
            'completionRate' => array_fill_keys($months, []),
            'epgfAverage' => array_fill_keys($months, []),
        ];

        $groupedData = $reports->groupBy('year_level')->map(function ($yearLevelReports) use ($months, &$grandTotals) {
            $yearLevelData = [
                'completionRate' => array_fill_keys($months, []),
                'epgfAverage' => array_fill_keys($months, []),
            ];

            foreach ($yearLevelReports as $report) {
                $monthName = \Carbon\Carbon::parse($report->created_at)->format('F');
                if (in_array($monthName, $months)) {
                    $reportCompletionRate = (!is_null($report->completion_rate)) ? $report->completion_rate : null;
                    $reportEpgfAverage = (!is_null($report->epgf_average)) ? $report->epgf_average : null;

                    if (!is_null($reportCompletionRate)) {
                        $yearLevelData['completionRate'][$monthName][] = $reportCompletionRate;
                        $grandTotals['completionRate'][$monthName][] = $reportCompletionRate;
                    }

                    if (!is_null($reportEpgfAverage)) {
                        $yearLevelData['epgfAverage'][$monthName][] = $reportEpgfAverage;
                        $grandTotals['epgfAverage'][$monthName][] = $reportEpgfAverage;
                    }
                }
            }

            // Calculate monthly averages
            foreach ($months as $month) {
                $yearLevelData['completionRate'][$month] = !empty($yearLevelData['completionRate'][$month])
                ? round(array_sum($yearLevelData['completionRate'][$month]) / count($yearLevelData['completionRate'][$month]), 2)
                : null;

                $yearLevelData['epgfAverage'][$month] = !empty($yearLevelData['epgfAverage'][$month])
                ? round(array_sum($yearLevelData['epgfAverage'][$month]) / count($yearLevelData['epgfAverage'][$month]), 2)
                : null;
            }

            return $yearLevelData;
        });

        // Calculate grand monthly averages
        foreach ($months as $month) {
            $grandTotals['completionRate'][$month] = !empty($grandTotals['completionRate'][$month])
            ? round(array_sum($grandTotals['completionRate'][$month]) / count($grandTotals['completionRate'][$month]), 2)
            : null;

            $grandTotals['epgfAverage'][$month] = !empty($grandTotals['epgfAverage'][$month])
            ? round(array_sum($grandTotals['epgfAverage'][$month]) / count($grandTotals['epgfAverage'][$month]), 2)
            : null;
        }

        return response()->json([
            'success' => true,
            'grandTotals' => $grandTotals,
        ]);
    }

    public function getDashboardReportYearTotals(Request $request)
    {
        $department = $request->input('department');       // e.g., "CIT"
        $semester = $request->input('semester');           // "1st Semester" or "2nd Semester"
        $schoolYear = $request->input('school_year');      // format: "2025/2026"

        // Parse school year string into integers
        [$startYear, $endYear] = explode('/', $schoolYear);

        // Determine semester date range based on input
        if ($semester == '1st Semester') {
            $startDate = Carbon::create($startYear, 8, 1);   // August
            $endDate   = Carbon::create($startYear, 12, 31); // December
        } else {
            $startDate = Carbon::create($endYear, 1, 1);     // January
            $endDate   = Carbon::create($endYear, 5, 31);    // May
        }

        // Fetch total population grouped by program and year level
        $population = HistoricalClassLists::where('department', $department)
        ->whereBetween('created_at', [$startDate, $endDate])
        ->select('program', 'year_level', DB::raw('count(*) as total_students'))
        ->groupBy('program', 'year_level')
        ->get();

        // Fetch scorecard completion counts
        $completed = HistoricalScorecard::where('department', $department)
        ->whereBetween('created_at', [$startDate, $endDate])
        ->select('program', 'year_level', DB::raw('count(*) as completed'))
        ->groupBy('program', 'year_level')
        ->get();

        // Fetch EPGF average for each program and year level
        $epgfAvg = HistoricalClassLists::where('department', $department)
        ->whereBetween('created_at', [$startDate, $endDate])
        ->select('program', 'year_level', DB::raw('avg(epgf) as epgf_average'))
        ->groupBy('program', 'year_level')
        ->get();

        // Index completed and EPGF averages for easy access
        $completedMap = $completed->keyBy(function ($item) {
            return $item->program . '-' . $item->year_level;
        });

        $epgfAvgMap = $epgfAvg->keyBy(function ($item) {
            return $item->program . '-' . $item->year_level;
        });

        // Combine data and calculate completion rates, including EPGF average
        $report = $population->map(function ($item) use ($completedMap, $epgfAvgMap) {
            $key = $item->program . '-' . $item->year_level;
            $completed = $completedMap[$key]->completed ?? 0;
            $epgfAverage = $epgfAvgMap[$key]->epgf_average ?? 0;

            // Calculate the completion rate
            $rate = $item->total_students > 0
            ? round(($completed / $item->total_students) * 100, 2)
            : 0;

            return [
                'program' => $item->program,
                'year_level' => $item->year_level,
                'completion_rate' => $rate,
                'epgf_average' => round($epgfAverage, 2), // Round to 2 decimal places
            ];
        });

        // Group by program first, then by year_level within each program
        $groupedReport = $report->groupBy('program')->map(function ($programGroup) {
            return $programGroup->groupBy('year_level')->map(function ($yearGroup) {
                // Average completion rate and EPGF average for each year level within a program
                $totalCompletionRate = $yearGroup->sum('completion_rate');
                $totalEpgfAverage = $yearGroup->sum('epgf_average');
                $count = $yearGroup->count();

                return [
                    'completion_rate' => round($totalCompletionRate / $count, 2), // Average completion rate for the year level
                                                             'epgf_average' => round($totalEpgfAverage / $count, 2), // Average EPGF for the year level
                ];
            });
        });

        // Reindex to provide a clean list with grouped programs and year levels
        $groupedReport = $groupedReport->values();

        return response()->json([
            'data' => $groupedReport,
        ]);
    }

}
