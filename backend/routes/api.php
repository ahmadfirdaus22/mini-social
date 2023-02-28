<?php

use App\Http\Controllers\StatusController;
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

require __DIR__.'/auth.php';

Route::middleware(['auth:sactum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:api'])->group(
    function () {
        //Status Route
        Route::get('/status', [StatusController::class, 'index'])->name('status.index');
        Route::get('/status/{id}', [StatusController::class, 'show'])->name('status.show');
        Route::post('/status', [StatusController::class, 'store'])->name('status.store');
        Route::post('/status/{id}', [StatusController::class, 'update'])->name('status.update');
        Route::delete('/status/{id}', [StatusController::class, 'destroy'])->name('status.destroy');
    }
);