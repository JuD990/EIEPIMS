<?php

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/college-pocs', [CollegePOCController::class, 'index']);
