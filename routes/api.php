<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImplementingSubjectController;
use App\Http\Controllers\CollegePOCController;
use App\Http\Controllers\ClassListController;
use App\Http\Controllers\MasterClassListController;
use App\Http\Controllers\EpgfScoreCardController;
use App\Http\Controllers\EpgfRubricController;
use App\Http\Controllers\UserManagement;
use App\Http\Controllers\HistoricalScorecardController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EieReportController;
use App\Http\Controllers\EieDiagnosticReportController;

Route::get('/reports/first-year-diagnostic-report', [EieDiagnosticReportController::class, 'getFirstYearReports']);
Route::get('/reports/fourth-year-diagnostic-report', [EieDiagnosticReportController::class, 'getFourthYearReports']);

Route::post('/eie-diagnostic-reports', [EieDiagnosticReportController::class, 'store']);

Route::post('/eie-reports/store-or-update', [EieReportController::class, 'storeOrUpdatePrograms']);
Route::get('/dashboard-report', [EieReportController::class, 'getDashboardReport']);
Route::get('/eie-report', [EieReportController::class, 'getEieReporting']);

Route::get('/performance-summary-rating', [StudentController::class, 'getPerformanceSummaryRatings']);
Route::get('/current-subjects/{student_id}', [StudentController::class, 'getCurrentSubjects']);
Route::get('/student-year-level-options', [StudentController::class, 'getYearLevelOptions']);
Route::get('/get-monthly-performance-data', [StudentController::class, 'getMonthlyPerformanceSummary']);
Route::get('/get-performance-summary', [StudentController::class, 'getPerformanceSummary']);

Route::get('/certificate/{id}', [CertificateController::class, 'getCertificateData']);
Route::get('/diagnostics-students', [CertificateController::class, 'getDiagnosticsStudents']);

//Student
Route::get('/get-courses', [HistoricalScorecardController::class, 'getCoursesByStudent']);
Route::get('/get-course-details', [HistoricalScorecardController::class, 'getCourseDetails']);


// User Management
Route::get('/students', [UserManagement::class, 'getStudents']);
Route::post('/store-students', [UserManagement::class, 'storeStudents']);
Route::post('/store-college-poc', [UserManagement::class, 'storeCollegePOCs']);
Route::post('/store-lead-poc', [UserManagement::class, 'storeLeadPOCs']);
Route::post('/store-head-poc', [UserManagement::class, 'storeEIEHeads']);
Route::put('/update-students/{student_id}', [UserManagement::class, 'updateStudents']);
Route::put('/update-collge-poc/{employee_id}', [UserManagement::class, 'updateCollegePOCs']);
Route::put('/update-lead-poc/{employee_id}', [UserManagement::class, 'updateLeadPOCs']);
Route::put('/update-head-poc/{employee_id}', [UserManagement::class, 'updateHeadPOCs']);
Route::post('/import-students', [UserManagement::class, 'importStudents']);
Route::post('/import-college-poc', [UserManagement::class, 'importCollegePOCs']);
Route::post('/import-lead-poc', [UserManagement::class, 'importLeadPOCs']);
Route::post('/import-head-poc', [UserManagement::class, 'importHeadPOCs']);
Route::delete('/delete-students/{student_id}', [UserManagement::class, 'deleteStudent']);
Route::delete('/delete-college-pocs/{employee_id}', [UserManagement::class, 'deleteCollegePOC']);
Route::delete('/delete-lead-pocs/{employee_id}', [UserManagement::class, 'deleteLeadPOC']);
Route::delete('/delete-head-pocs/{employee_id}', [UserManagement::class, 'deleteHeadPOC']);

// User Management (Profile Management)
Route::get('/get-user', [UserManagement::class, 'fetchUserProfile']);
Route::middleware('auth:sanctum')->post('/upload-profile-picture', [UserManagement::class, 'uploadProfilePicture']);
Route::middleware('auth:sanctum')->put('/update-user', [UserManagement::class, 'updateUser']);

// User Management (Reset Password)
Route::put('/students/{student_id}/reset-password', [UserManagement::class, 'resetPassword']);
Route::put('/college-poc/{employee_id}/reset-password', [UserManagement::class, 'resetPasswordCollegePOC']);
Route::put('/lead-poc/{employee_id}/reset-password', [UserManagement::class, 'resetPasswordLeadPOC']);
Route::put('/head-poc/{employee_id}/reset-password', [UserManagement::class, 'resetPasswordEIEHeadPOC']);

//EPGF Setup
Route::post('/import', [EpgfRubricController::class, 'import']);
Route::get('/rubric-versions', [EpgfRubricController::class, 'getRubricVersions']);
Route::post('/set-default', [EpgfRubricController::class, 'setDefault']);
Route::post('/get-rubric-details', [EpgfRubricController::class, 'getRubricDetails']);
Route::get('/rubric/active-version', [EpgfRubricController::class, 'getActiveVersion']);
Route::get('/display-epgf-rubric', [EpgfRubricController::class, 'displayEpgfRubric']);

//Update EPGF Rubric
Route::put('/pronunciation/update/{id}', [EpgfRubricController::class, 'updatePronunciation']);
Route::put('/grammar/update/{id}', [EpgfRubricController::class, 'updateGrammar']);
Route::put('/fluency/update/{id}', [EpgfRubricController::class, 'updateFluency']);

//Pronunciation
Route::get('/consistency/{majorVersion}', [EpgfRubricController::class, 'getConsistency']);
Route::get('/clarity/{majorVersion}', [EpgfRubricController::class, 'getClarity']);
Route::get('/articulation/{majorVersion}', [EpgfRubricController::class, 'getArticulation']);
Route::get('/intonationStress/{majorVersion}', [EpgfRubricController::class, 'getIntonationStress']);

//Grammar
Route::get('/accuracy/{majorVersion}', [EpgfRubricController::class, 'getAccuracy']);
Route::get('/clarityOfThought/{majorVersion}', [EpgfRubricController::class, 'getClarityOfThought']);
Route::get('/syntax/{majorVersion}', [EpgfRubricController::class, 'getSyntax']);

//Fluency
Route::get('/qualityOfResponse/{majorVersion}', [EpgfRubricController::class, 'getQualityOfResponse']);
Route::get('/detailOfResponse/{majorVersion}', [EpgfRubricController::class, 'getDetailOfResponse']);

// EpgfScoreCard routes
Route::get('/epgf-scorecard', [EpgfScoreCardController::class, 'getCourseDetails']);
Route::get('/epgf-scorecard/students', [EpgfScoreCardController::class, 'getActiveStudents']);
Route::get('/active-students', [EpgfScoreCardController::class, 'getActiveStudents']);
Route::post('/eie-scorecard-class-reports', [EpgfScoreCardController::class, 'storeStudentDataReports']);
Route::get('/get-student-count', [EpgfScoreCardController::class, 'getStudentCountByCourseCode']);
Route::get('/get-student-count-active', [EpgfScoreCardController::class, 'getStudentCountByCourseCodeAndActive']);
Route::get('/get-class-average', [EpgfScoreCardController::class, 'getClassAverageByCourseCode']);
Route::get('/get-evaluated-count', [EpgfScoreCardController::class, 'getEvaluatedCount']);
Route::post('/store-class-data', [EpgfScoreCardController::class, 'storeClassData']);

// ClassList routes
Route::get('/class-list', [ClassListController::class, 'getClassListByDepartment']);
Route::post('/upload-class-list', [ClassListController::class, 'uploadClassList']);
Route::get('/manage-class-list', [ClassListController::class, 'ManageClassList']);
Route::put('/update-student/{studentId}', [ClassListController::class, 'updateStudent']);
Route::get('/class-lists', [ClassListController::class, 'fetchMonthlyChamps']);
Route::get('/get-courses-by-department', [ClassListController::class, 'getCoursesByDepartment']);
Route::get('/get-courses-by-department-poc', [ClassListController::class, 'getCoursesPOC']);

// ImplementingSubject routes
Route::get('/implementing-subject/{employee_id}', [ImplementingSubjectController::class, 'getClassData']);
Route::post('/upload-subjects', [ImplementingSubjectController::class, 'upload'])->name('subjects.upload');
Route::get('/esl-implementing-subjects', [ImplementingSubjectController::class, 'index']);
Route::put('/esl-update-implementing-subjects/{courseCode}', [ImplementingSubjectController::class, 'update']);
Route::get('/implementing-subjects', [ImplementingSubjectController::class, 'fetchImplementingSubjects']);
Route::put('/update-implementing-subjects/{courseCode}', [ImplementingSubjectController::class, 'updateImplementingSubject'])->name('subjects.updateImplementingSubject');
Route::get('/employee-department/{userType}/{employeeId}',
           [ImplementingSubjectController::class, 'getEmployeeDepartment']
)->where('userType', '.*');
Route::get('/getDepartmentsOptions', [ImplementingSubjectController::class, 'getDepartments']);
Route::get('/getDepartmentsOptionsForPOCs', [ImplementingSubjectController::class, 'getDepartmentForPOCs']);
Route::get('/getSchoolYears', [ImplementingSubjectController::class, 'getSchoolYears']);
Route::get('/getUserDepartment/{employee_id}', [ImplementingSubjectController::class, 'getUserDepartment']);


// Route to get the programs for a department
Route::get('/programs/{department}', [ImplementingSubjectController::class, 'getProgramsForDepartment']);
Route::get('/programs-with-enrollment-first-semester/{department}', [ImplementingSubjectController::class, 'getProgramsWithEnrollmentCountFirstSemester']);
Route::get('/programs-with-enrollment-second-semester/{department}', [ImplementingSubjectController::class, 'getProgramsWithEnrollmentCountSecondSemester']);
Route::get('/implementing-subjects/dropdown', [ImplementingSubjectController::class, 'getDropdownData']);
Route::get('/implementing-subjects/specific-dropdown', [ImplementingSubjectController::class, 'getDropdownSpecificData']);

// CollegePOC routes
Route::get('/pocs', [CollegePOCController::class, 'getPocs'])->name('college.pocs');
Route::get('/filtered-pocs', [CollegePOCController::class, 'getFilteredPocs'])->name('college.filtered_pocs');
Route::get('/college-pocs', [CollegePOCController::class, 'getPocs']);
Route::get('/lead-pocs', [CollegePOCController::class, 'getLeadPOCs']);
Route::get('/eie-head-pocs', [CollegePOCController::class, 'getEIEHeads']);

// MasterClassList routes
Route::post('/import-master-class-list', [MasterClassListController::class, 'import']);
Route::get('/master-class-list', [MasterClassListController::class, 'index']);
Route::get('/master-class-list-students', [MasterClassListController::class, 'getStudents']);
Route::get('/master-class-list-department', [MasterClassListController::class, 'getDepartments']);
Route::get('/master-class-list-school-year', [MasterClassListController::class, 'getSchoolYears']);
Route::put('/master-class-list/{id}', [MasterClassListController::class, 'updateMasterClassList']);

// Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::middleware('auth:sanctum')->get('/user-info', [AuthController::class, 'getUserInfo']);
Route::middleware('auth:sanctum')->delete('/logout', [AuthController::class, 'logout']);
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF token set']);
});

