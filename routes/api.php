<?php

use App\Http\Controllers\Api\LicenseVerifyController;
use App\Http\Controllers\Updates\WpUpdateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public licensing API (v1)
|--------------------------------------------------------------------------
| Consumed by client-side modules/plugins. Stateless, rate limited and
| protected against key brute-forcing.
*/
Route::prefix('v1')->group(function () {
    Route::post('license/verify', LicenseVerifyController::class)
        ->middleware('throttle:license-verify')
        ->name('api.license.verify');
});

// WordPress update endpoint (plugin-update-checker) — ТЗ §5.9.
Route::get('wp/update', WpUpdateController::class)
    ->middleware('throttle:license-verify')
    ->name('api.wp.update');
