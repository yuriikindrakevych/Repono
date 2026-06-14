<?php

namespace App\Services\Payments;

use App\Models\Subscription;
use Illuminate\Support\Str;

/**
 * Development gateway. Approves recurring charges instantly, so the whole
 * renewal → receipt flow runs without external credentials.
 *
 * Test hook: a subscription whose stored token is "DECLINE" always fails,
 * which lets the dunning flow be exercised deterministically.
 */
class FakePaymentGateway implements PaymentGateway
{
    public function chargeRecurring(Subscription $subscription, int $amount, string $reference): ChargeOutcome
    {
        if ($subscription->gateway_token === 'DECLINE') {
            return ChargeOutcome::declined('Card declined by issuer.');
        }

        return ChargeOutcome::ok('TX-'.strtoupper(Str::random(16)));
    }
}
