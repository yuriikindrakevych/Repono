<?php

use App\Http\Controllers\CabinetController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cabinet', [CabinetController::class, 'index'])->name('cabinet');
    Route::post('/cabinet/subscriptions/{subscription}/cancel', [CabinetController::class, 'cancelSubscription'])
        ->name('cabinet.subscriptions.cancel');
    Route::delete('/cabinet/activations/{activation}', [CabinetController::class, 'deactivate'])
        ->name('cabinet.activations.deactivate');

    // Legacy Breeze route — the buyer cabinet is the authenticated home.
    Route::get('/dashboard', fn () => redirect()->route('cabinet'))->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
