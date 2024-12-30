<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImplementingSubjectController;
use App\Http\Controllers\CollegePOCController;
use App\Http\Controllers\ClassListController;
use App\Http\Controllers\MasterClassListController;
use App\Http\Controllers\EpgfScoreCardController;
use App\Http\Controllers\EpgfImportController;

Route::post('/import-pronunciation', [ImportController::class, 'importPronunciation'])->name('import.pronunciation');
Route::post('/import-grammar', [ImportController::class, 'importGrammar'])->name('import.grammar');
Route::post('/import-fluency', [ImportController::class, 'importFluency'])->name('import.fluency');
Route::post('/import-rubric', [ImportController::class, 'importRubric'])->name('import.rubric');


Route::get('/epgf-scorecard', [EpgfScoreCardController::class, 'getCourseDetails']);
Route::get('/epgf-scorecard/students', [EpgfScoreCardController::class, 'getActiveStudents']);
Route::get('/active-students', [EpgfScoreCardController::class, 'getActiveStudents']);

Route::get('filter-students', [ClassListController::class, 'filterStudentsByCourseAndEmployee']);

Route::get('/implementing-subject/{employee_id}', [ImplementingSubjectController::class, 'getClassData']);

Route::post('/import-master-class-list', [MasterClassListController::class, 'import']);
Route::get('/master-class-list', [MasterClassListController::class, 'index']);

// Authentication route
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

// Routes for implementing subjects
Route::post('/upload-subjects', [ImplementingSubjectController::class, 'upload'])->name('subjects.upload');
Route::get('/implementing-subjects', [ImplementingSubjectController::class, 'index'])->name('subjects.index');

// Route to fetch College POCs
Route::get('/pocs', [CollegePOCController::class, 'getPocs'])->name('college.pocs');
Route::post('upload-class-list', [ClassListController::class, 'uploadClassList']);

Route::get('/class-list', [ClassListController::class, 'getClassList']);

Route::middleware('auth:sanctum')->get('/user-info', [AuthController::class, 'getUserInfo']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF token set']);
});
