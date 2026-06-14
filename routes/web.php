<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\CabinetController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\MockGatewayController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\Updates\ArtifactController;
use App\Http\Controllers\Updates\ComposerRepositoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('/legal/{doc}', [LegalController::class, 'show'])->name('legal');

// Payment gateway server callback (signature-verified, CSRF-exempt).
Route::post('/webhooks/payment', PaymentWebhookController::class)->name('webhooks.payment');

// Private Composer repository for Drupal (http-basic token) + signed artifacts.
Route::get('/repo/packages.json', [ComposerRepositoryController::class, 'packages'])->name('repo.packages');
Route::get('/repo/dist/{release}/{license:id}', [ArtifactController::class, 'download'])
    ->middleware('signed')->withoutScopedBindings()->name('repo.dist');

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

/*
|--------------------------------------------------------------------------
| Admin (ТЗ §5.10)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('audit', [Admin\AuditController::class, 'index'])->name('audit');

    // Multilingual: languages + mass translation (OpenRouter)
    Route::get('languages', [Admin\LanguageController::class, 'index'])->name('languages.index');
    Route::post('languages', [Admin\LanguageController::class, 'store'])->name('languages.store');
    Route::put('languages/{language}', [Admin\LanguageController::class, 'update'])->name('languages.update');
    Route::delete('languages/{language}', [Admin\LanguageController::class, 'destroy'])->name('languages.destroy');
    Route::post('languages/sync', [Admin\LanguageController::class, 'sync'])->name('languages.sync');
    Route::post('languages/translate', [Admin\LanguageController::class, 'translate'])->name('languages.translate');
    Route::get('translations', [Admin\TranslationController::class, 'index'])->name('translations.index');
    Route::put('translations', [Admin\TranslationController::class, 'update'])->name('translations.update');

    Route::get('products', [Admin\ProductController::class, 'index'])->name('products.index');
    Route::post('products', [Admin\ProductController::class, 'store'])->name('products.store');
    Route::get('products/{product}/edit', [Admin\ProductController::class, 'edit'])->name('products.edit');
    Route::put('products/{product}', [Admin\ProductController::class, 'update'])->name('products.update');

    Route::post('products/{product}/plans', [Admin\PlanController::class, 'store'])->name('plans.store');
    Route::put('plans/{plan}', [Admin\PlanController::class, 'update'])->name('plans.update');
    Route::delete('plans/{plan}', [Admin\PlanController::class, 'destroy'])->name('plans.destroy');

    Route::post('products/{product}/releases', [Admin\ReleaseController::class, 'store'])->name('releases.store');
    Route::post('releases/{release}/publish', [Admin\ReleaseController::class, 'publish'])->name('releases.publish');
    Route::post('releases/{release}/unpublish', [Admin\ReleaseController::class, 'unpublish'])->name('releases.unpublish');
    Route::delete('releases/{release}', [Admin\ReleaseController::class, 'destroy'])->name('releases.destroy');

    Route::get('customers', [Admin\CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/{customer}', [Admin\CustomerController::class, 'show'])->name('customers.show');

    Route::post('subscriptions/{subscription}/extend', [Admin\SubscriptionController::class, 'extend'])->name('subscriptions.extend');
    Route::post('subscriptions/{subscription}/suspend', [Admin\SubscriptionController::class, 'suspend'])->name('subscriptions.suspend');
    Route::post('subscriptions/{subscription}/reactivate', [Admin\SubscriptionController::class, 'reactivate'])->name('subscriptions.reactivate');

    Route::post('licenses/{license:id}/regenerate-key', [Admin\LicenseController::class, 'regenerateKey'])->name('licenses.regenerate-key');
    Route::post('licenses/{license:id}/regenerate-token', [Admin\LicenseController::class, 'regenerateToken'])->name('licenses.regenerate-token');

    Route::delete('activations/{activation}', [Admin\ActivationController::class, 'destroy'])->name('activations.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
