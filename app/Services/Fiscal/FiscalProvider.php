<?php

namespace App\Services\Fiscal;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Receipt;

/**
 * Issues a fiscal receipt (ПРРО) for a successful charge. Real implementations
 * wrap checkbox / ДПС APIs (shift management, retries, error queue — ТЗ §5.5);
 * the contract stays the same so the provider can be swapped via config.
 */
interface FiscalProvider
{
    public function issue(Order $order, ?Payment $payment = null): Receipt;
}
