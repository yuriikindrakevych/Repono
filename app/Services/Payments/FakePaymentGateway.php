<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Subscription;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Development gateway. The hosted checkout is our own simulated page
 * (MockGatewayController); recurring charges approve instantly so the whole
 * renewal → receipt flow runs without external credentials.
 *
 * Test hook: a subscription whose stored token is "DECLINE" always fails,
 * which lets the dunning flow be exercised deterministically.
 */
class FakePaymentGateway implements PaymentGateway
{
    public function name(): string
    {
        return 'fake';
    }

    public function createCheckout(Order $order, string $returnUrl, string $callbackUrl): string
    {
        // Our in-app simulated gateway page.
        return Route::has('checkout.gateway')
            ? route('checkout.gateway', $order)
            : $returnUrl;
    }

    public function parseCallback(array $payload): ?CallbackResult
    {
        return new CallbackResult(
            reference: (string) ($payload['order_id'] ?? ''),
            status: ($payload['outcome'] ?? 'approved') === 'decline' ? 'declined' : 'approved',
            transactionId: 'TX-'.strtoupper(Str::random(12)),
            token: 'rectok_'.Str::random(20),
        );
    }

    public function chargeRecurring(Subscription $subscription, int $amount, string $reference): ChargeOutcome
    {
        if ($subscription->gateway_token === 'DECLINE') {
            return ChargeOutcome::declined('Card declined by issuer.');
        }

        return ChargeOutcome::ok('TX-'.strtoupper(Str::random(16)));
    }
}
