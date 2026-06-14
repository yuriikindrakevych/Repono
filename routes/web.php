<?php

use App\Http\Controllers\CabinetController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\MockGatewayController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceiptController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('/legal/{doc}', [LegalController::class, 'show'])->name('legal');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cabinet', [CabinetController::class, 'index'])->name('cabinet');
    Route::post('/cabinet/subscriptions/{subscription}/cancel', [CabinetController::class, 'cancelSubscription'])
        ->name('cabinet.subscriptions.cancel');
    Route::delete('/cabinet/activations/{activation}', [CabinetController::class, 'deactivate'])
        ->name('cabinet.activations.deactivate');

    // Checkout + one-time payment + fiscal receipt
    Route::get('/checkout/{plan}', [CheckoutController::class, 'show'])->name('checkout.show');
    Route::post('/checkout/{plan}', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/pay/{order}', [MockGatewayController::class, 'show'])->name('checkout.gateway');
    Route::post('/pay/{order}', [MockGatewayController::class, 'callback'])->name('checkout.gateway.callback');
    Route::get('/orders/{order}/done', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/receipts/{receipt}', [ReceiptController::class, 'show'])->name('receipts.show');

    // Legacy Breeze route — the buyer cabinet is the authenticated home.
    Route::get('/dashboard', fn () => redirect()->route('cabinet'))->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
