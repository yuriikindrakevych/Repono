<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Swap for a real ПРРО provider (checkbox / ДПС) via config when wired.
        $this->app->bind(
            \App\Services\Fiscal\FiscalProvider::class,
            \App\Services\Fiscal\FakeFiscalProvider::class,
        );

        // Swap for a real recurring gateway (WayForPay / Fondy) via billing.gateway.
        $this->app->bind(\App\Services\Payments\PaymentGateway::class, function () {
            return match (config('billing.gateway')) {
                default => new \App\Services\Payments\FakePaymentGateway(),
            };
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Heartbeat endpoint: high enough for legitimate per-site polling,
        // low enough to blunt key brute-forcing (ТЗ §5.7).
        RateLimiter::for('license-verify', function (Request $request) {
            return [
                Limit::perMinute(30)->by($request->input('key').'|'.$request->ip()),
                Limit::perMinute(120)->by($request->ip()),
            ];
        });
    }
}
