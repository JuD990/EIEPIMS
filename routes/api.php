<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImplementingSubjectController;
use App\Http\Controllers\CollegePOCController;
use App\Http\Controllers\ClassListController;
use App\Http\Controllers\MasterClassListController;

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
