<?php

use App\Http\Controllers\Render\AboutController;
use App\Http\Controllers\Render\EntitiesController;
use App\Http\Controllers\Render\IndexController;
use Illuminate\Support\Facades\Route;

Route::get('/', [IndexController::class, 'index']);
Route::get('/about', [AboutController::class, 'index']);
Route::get('/entities', [EntitiesController ::class, 'index']);
Route::get('/entities/{id}', [EntitiesController::class, 'show'])->where('id', '[1-9]\d*');
