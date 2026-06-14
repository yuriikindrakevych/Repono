<?php

namespace App\Services\Payments;

use App\Models\Subscription;

/**
 * Server-to-server recurring charge against a tokenized card (rectoken).
 * Real implementations wrap WayForPay / Fondy recurring APIs; we persist only
 * the card token, never card data (ТЗ §5.4).
 */
interface PaymentGateway
{
    public function chargeRecurring(Subscription $subscription, int $amount, string $reference): ChargeOutcome;
}
