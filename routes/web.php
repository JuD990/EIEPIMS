<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome'); // Ensure 'app.blade.php' is your React entry point
})->where('any', '.*');
