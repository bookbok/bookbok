<?php

use App\Http\Controllers\App\SpaController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SpaController::class, 'top']);
Route::get('/about', [SpaController::class, 'about']);
