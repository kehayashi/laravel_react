<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FipeApiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/brands/{type}/brands',  [FipeApiController::class, 'getBrands']);
Route::get('/api/models/{type}/brands/{brand}/models', [FipeApiController::class, 'getModels']);
Route::get('/api/years/{type}/brands/{brand}/models/{model}/years',    [FipeApiController::class, 'getYears']);
Route::get('/api/vehicles/{type}/brands/{brand}/models/{model}/years/{year}', [FipeApiController::class, 'getVehicle']);
