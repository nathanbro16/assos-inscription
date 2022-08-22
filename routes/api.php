<?php

use App\Http\Controllers\MembersFamiliesController;
use App\Http\Controllers\RegistrationsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/registrations/{slug}', [RegistrationsController::class, 'search']);
Route::get('/registrations', [RegistrationsController::class, 'index']);
Route::post('/Families', [MembersFamiliesController::class, 'store']);
Route::get('/Registr/{registrations}/Families', [MembersFamiliesController::class, 'indexoffamilies']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/registrations', [RegistrationsController::class, 'store']);
    //Route::get('/registrations/{slug}/Families/', [MembersFamiliesController::class, 'indexoffamilies']);

});

