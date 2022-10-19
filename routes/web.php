<?php

use App\Http\Controllers\MayoristaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::resource('/mayorista', MayoristaController::class);
Route::get('/neighborhoods/{cp}', [MayoristaController::class, 'neighborhoods']);
Route::get('/ciudad/{cp}', [MayoristaController::class, 'ciudad']);
Route::get('/estado/{cp}', [MayoristaController::class, 'estado']);
Route::get('/cp/{cp}', [MayoristaController::class, 'cp']);

require __DIR__ . '/auth.php';
