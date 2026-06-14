<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Subscription;

/**
 * A payment gateway. The first (tokenizing) payment runs through a hosted
 * checkout page; later renewals are charged server-to-server against the
 * stored card token (rectoken). We persist only the token, never card data
 * (ТЗ §5.4). Callbacks are signature-verified (ТЗ §6).
 */
interface PaymentGateway
{
    public function name(): string;

    /**
     * Start a hosted checkout for the order and return the URL to redirect the
     * buyer to. The gateway will POST the result to $callbackUrl and send the
     * buyer back to $returnUrl.
     */
    public function createCheckout(Order $order, string $returnUrl, string $callbackUrl): string;

    /**
     * Verify and normalise an incoming callback payload. Returns null when the
     * signature is invalid (the request must then be rejected).
     *
     * @param  array<string, mixed>  $payload
     */
    public function parseCallback(array $payload): ?CallbackResult;

    /**
     * Charge a recurring renewal against the subscription's stored token.
     */
    public function chargeRecurring(Subscription $subscription, int $amount, string $reference): ChargeOutcome;
}
