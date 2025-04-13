<?php

namespace App\Http\Controllers;

use App\Models\EieDiagnosticReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\MasterClassList;
use Carbon\Carbon;

class EieDiagnosticReportController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate the incoming data
            $data = $request->validate([
                'name' => 'required|string',
                'student_id' => 'nullable|string',
                'date_of_interview' => 'nullable|date',
                'time_of_interview' => 'nullable',
                'venue' => 'nullable|string',
                'department' => 'required|string',
                'program' => 'nullable|string',
                'interviewer' => 'nullable|string',
                'year_level' => 'nullable|string',
                // Ratings fields
                'consistency_descriptor' => 'nullable|string',
                'consistency_rating' => 'nullable|numeric',
                'clarity_descriptor' => 'nullable|string',
                'clarity_rating' => 'nullable|numeric',
                'articulation_descriptor' => 'nullable|string',
                'articulation_rating' => 'nullable|numeric',
                'intonation_and_stress_descriptor' => 'nullable|string',
                'intonation_and_stress_rating' => 'nullable|numeric',
                'pronunciation_average' => 'nullable|numeric',
                'accuracy_descriptor' => 'nullable|string',
                'accuracy_rating' => 'nullable|numeric',
                'clarity_of_thought_descriptor' => 'nullable|string',
                'clarity_of_thought_rating' => 'nullable|numeric',
                'syntax_descriptor' => 'nullable|string',
                'syntax_rating' => 'nullable|numeric',
                'grammar_average' => 'nullable|numeric',
                'quality_of_response_descriptor' => 'nullable|string',
                'quality_of_response_rating' => 'nullable|numeric',
                'detail_of_response_descriptor' => 'nullable|string',
                'detail_of_response_rating' => 'nullable|numeric',
                'fluency_average' => 'nullable|numeric',
                'average_pgf_rating' => 'nullable|numeric',
                'pgf_specific_remarks' => 'nullable|string',
                'school_year_highlight' => 'nullable|string',
                'school_year_lowlight' => 'nullable|string',
                'spark_highlight' => 'nullable|string',
                'spark_lowlight' => 'nullable|string',
                'usage_in_school_online' => 'nullable|string',
                'usage_offline' => 'nullable|string',
                'support_needed' => 'nullable|string',
                'show_status' => 'nullable|string|max:50',
            ]);

            // Create the report using validated data
            $report = EieDiagnosticReport::create($data);

            // If student_id and show_status are provided, update MasterClassList
            if (!empty($data['student_id']) && isset($data['show_status'])) {
                MasterClassList::where('student_id', $data['student_id'])
                ->update(['status' => $data['show_status']]);
            }

            return response()->json([
                'message' => 'Report saved successfully.',
                'report' => $report,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error saving diagnostic report: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to save report.',
                'error' => $e->getMessage(),
                                    'error_code' => $e->getCode(),
            ], 500);
        }
    }

    public function getFirstYearReports(Request $request)
    {
        try {
            \Log::info('Received request:', $request->all());

            [$startYear, $endYear] = explode('/', $request->school_year);
            $startDate = Carbon::createFromDate($startYear, 1, 1)->startOfDay();
            $endDate = Carbon::createFromDate($endYear, 12, 31)->endOfDay();

            // Fetch reports from the same table using 'year_level'
            $reports = EieDiagnosticReport::where('show_status', $request->status)
            ->where('department', $request->department)
            ->where('year_level', '1st Year')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

            // Format time_of_interview to 12-hour format
            $reports->each(function ($report) {
                if ($report->time_of_interview) {
                    $report->time_of_interview = Carbon::parse($report->time_of_interview)->format('g:i A');
                }
            });

            \Log::info('Fetched reports:', $reports->toArray());

            return response()->json($reports);
        } catch (\Throwable $e) {
            \Log::error('Error fetching reports:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Server error.'], 500);
        }
    }


    // Fetch 4th Year reports
    public function getFourthYearReports(Request $request)
    {
        try {
            \Log::info('Received request:', $request->all());

            [$startYear, $endYear] = explode('/', $request->school_year);
            $startDate = Carbon::createFromDate($startYear, 1, 1)->startOfDay();
            $endDate = Carbon::createFromDate($endYear, 12, 31)->endOfDay();

            // Fetch reports from the same table using 'year_level'
            $reports = EieDiagnosticReport::where('show_status', $request->status)
            ->where('department', $request->department)
            ->where('year_level', '4th Year')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

            // Format time_of_interview to 12-hour format
            $reports->each(function ($report) {
                if ($report->time_of_interview) {
                    $report->time_of_interview = Carbon::parse($report->time_of_interview)->format('g:i A');
                }
            });

            \Log::info('Fetched reports:', $reports->toArray());

            return response()->json($reports);
        } catch (\Throwable $e) {
            \Log::error('Error fetching reports:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Server error.'], 500);
        }
    }
}
