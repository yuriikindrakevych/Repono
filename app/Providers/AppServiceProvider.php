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

        // Select the recurring gateway via billing.gateway.
        $this->app->bind(\App\Services\Payments\PaymentGateway::class, function () {
            return match (config('billing.gateway')) {
                'fondy' => new \App\Services\Payments\FondyGateway(config('billing.fondy')),
                default => new \App\Services\Payments\FakePaymentGateway(),
            };
        });

        // Use OpenRouter when a key is configured (admin Settings overrides env);
        // otherwise the offline stub.
        $this->app->bind(\App\Services\Translation\Translator::class, function () {
            $config = config('services.openrouter');
            try {
                $config['key'] = \App\Models\Setting::get('openrouter_api_key', $config['key']);
                $config['model'] = \App\Models\Setting::get('openrouter_model', $config['model']);
            } catch (\Throwable) {
                // settings table not migrated yet — fall back to env/config
            }

            return $config['key']
                ? new \App\Services\Translation\OpenRouterTranslator($config)
                : new \App\Services\Translation\FakeTranslator();
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
