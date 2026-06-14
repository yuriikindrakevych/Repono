<?php

namespace App\Services\Fiscal;

use App\Enums\ReceiptStatus;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Receipt;
use Illuminate\Support\Carbon;

/**
 * Development stand-in for a real ПРРО provider. Generates a plausible fiscal
 * number and a receipt record so the whole purchase → receipt flow works
 * end-to-end without external credentials. Always succeeds.
 */
class FakeFiscalProvider implements FiscalProvider
{
    public function issue(Order $order, ?Payment $payment = null): Receipt
    {
        $now = Carbon::now();
        $fiscalNumber = sprintf('FN-%s-%06d', $now->format('Ymd'), $order->id);

        $receipt = $order->receipt()->create([
            'payment_id' => $payment?->id,
            'type' => \App\Enums\DocumentType::FiscalReceipt,
            'provider' => 'fake',
            'fiscal_number' => $fiscalNumber,
            'status' => ReceiptStatus::Issued,
            'total' => $order->amount,
            'currency' => $order->currency,
            'payload' => [
                'simulated' => true,
                'issued_at' => $now->toIso8601String(),
            ],
            'issued_at' => $now,
        ]);

        $receipt->update(['url' => route('receipts.show', $receipt)]);

        return $receipt;
    }
}
