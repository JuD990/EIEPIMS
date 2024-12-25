<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImplementingSubjectController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/upload-subjects', [ImplementingSubjectController::class, 'upload']);
