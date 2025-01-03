<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImplementingSubjectController;
use App\Http\Controllers\CollegePOCController;
use App\Http\Controllers\ClassListController;
use App\Http\Controllers\MasterClassListController;
use App\Http\Controllers\EpgfScoreCardController;
use App\Http\Controllers\EpgfRubricController;

Route::post('/import', [EpgfRubricController::class, 'import']);

// EpgfScoreCard routes
Route::get('/epgf-scorecard', [EpgfScoreCardController::class, 'getCourseDetails']);
Route::get('/epgf-scorecard/students', [EpgfScoreCardController::class, 'getActiveStudents']);
Route::get('/active-students', [EpgfScoreCardController::class, 'getActiveStudents']);

// ClassList routes
Route::get('filter-students', [ClassListController::class, 'filterStudentsByCourseAndEmployee']);
Route::get('/class-list', [ClassListController::class, 'getClassList']);
Route::post('/upload-class-list', [ClassListController::class, 'uploadClassList']);

// ImplementingSubject routes
Route::get('/implementing-subject/{employee_id}', [ImplementingSubjectController::class, 'getClassData']);
Route::post('/upload-subjects', [ImplementingSubjectController::class, 'upload'])->name('subjects.upload');
Route::get('/implementing-subjects', [ImplementingSubjectController::class, 'index'])->name('subjects.index');

// CollegePOC routes
Route::get('/pocs', [CollegePOCController::class, 'getPocs'])->name('college.pocs');

// MasterClassList routes
Route::post('/import-master-class-list', [MasterClassListController::class, 'import']);
Route::get('/master-class-list', [MasterClassListController::class, 'index']);

// Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::middleware('auth:sanctum')->get('/user-info', [AuthController::class, 'getUserInfo']);
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF token set']);
});
