<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImplementingSubjectController;
use App\Http\Controllers\CollegePOCController;
use App\Http\Controllers\ClassListController;
use App\Http\Controllers\MasterClassListController;
use App\Http\Controllers\EpgfScoreCardController;
use App\Http\Controllers\EpgfRubricController;
use App\Http\Controllers\UserManagement;

// User Management
Route::get('/students', [UserManagement::class, 'getStudents']);
Route::put('/students/{student_id}/reset-password', [UserManagement::class, 'resetPassword']);
Route::post('/store-students', [UserManagement::class, 'storeStudents']);
Route::put('/students/{student_id}', [UserManagement::class, 'updateStudents']);
Route::post('/import-students', [UserManagement::class, 'importCSV']);

//EPGF Setup
Route::post('/import', [EpgfRubricController::class, 'import']);
Route::get('/rubric-versions', [EpgfRubricController::class, 'getRubricVersions']);
Route::post('/set-default', [EpgfRubricController::class, 'setDefault']);
Route::post('/get-rubric-details', [EpgfRubricController::class, 'getRubricDetails']);
Route::get('/rubric/active-version', [EpgfRubricController::class, 'getActiveVersion']);

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
Route::get('/class-list', [ClassListController::class, 'getClassList']);
Route::post('/upload-class-list', [ClassListController::class, 'uploadClassList']);
Route::get('/manage-class-list', [ClassListController::class, 'ManageClassList']);
Route::put('/update-student/{studentId}', [ClassListController::class, 'updateStudent']);

// ImplementingSubject routes
Route::get('/implementing-subject/{employee_id}', [ImplementingSubjectController::class, 'getClassData']);
Route::post('/upload-subjects', [ImplementingSubjectController::class, 'upload'])->name('subjects.upload');
Route::get('/implementing-subjects', [ImplementingSubjectController::class, 'fetchImplementingSubjects']);
Route::put('/update-implementing-subjects/{courseCode}', [ImplementingSubjectController::class, 'updateImplementingSubject'])->name('subjects.updateImplementingSubject');
Route::get('/employee-department/{userType}/{employeeId}', [ImplementingSubjectController::class, 'getEmployeeDepartment']);

// Route to get the programs for a department
Route::get('/programs/{department}', [ImplementingSubjectController::class, 'getProgramsForDepartment']);
Route::get('/programs-with-enrollment-first-semester/{department}', [ImplementingSubjectController::class, 'getProgramsWithEnrollmentCountFirstSemester']);
Route::get('/programs-with-enrollment-second-semester/{department}', [ImplementingSubjectController::class, 'getProgramsWithEnrollmentCountSecondSemester']);
Route::get('/implementing-subjects/dropdown', [ImplementingSubjectController::class, 'getDropdownData']);

// CollegePOC routes
Route::get('/pocs', [CollegePOCController::class, 'getPocs'])->name('college.pocs');
Route::get('/filtered-pocs', [CollegePOCController::class, 'getFilteredPocs'])->name('college.filtered_pocs');

// MasterClassList routes
Route::post('/import-master-class-list', [MasterClassListController::class, 'import']);
Route::get('/master-class-list', [MasterClassListController::class, 'index']);

// Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::middleware('auth:sanctum')->get('/user-info', [AuthController::class, 'getUserInfo']);
Route::middleware('auth:sanctum')->delete('/logout', [AuthController::class, 'logout']);
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF token set']);
});

