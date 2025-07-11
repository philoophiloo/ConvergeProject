<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndustryController;

Route::apiResource('industries', IndustryController::class);
use App\Http\Controllers\OrganizationController;

Route::apiResource('organizations', OrganizationController::class);
use App\Http\Controllers\ContactController;

Route::apiResource('contacts', ContactController::class);
