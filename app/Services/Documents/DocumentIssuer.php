<?php

namespace App\Services\Documents;

use App\Enums\DocumentType;
use App\Enums\ReceiptStatus;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Receipt;
use App\Services\Fiscal\FiscalProvider;
use Illuminate\Support\Carbon;

/**
 * Issues the right billing document for a charge based on currency:
 *  - UAH      → ПРРО fiscal receipt (Ukrainian law, ТЗ §5.5)
 *  - USD/EUR… → an invoice (international sales — no ПРРО)
 *
 * Both are stored as `receipts` rows distinguished by `type`.
 */
class DocumentIssuer
{
    public function __construct(private readonly FiscalProvider $fiscal)
    {
    }

    public function issue(Order $order, ?Payment $payment = null): Receipt
    {
        return strtoupper($order->currency) === 'UAH'
            ? $this->fiscal->issue($order, $payment)
            : $this->issueInvoice($order, $payment);
    }

    private function issueInvoice(Order $order, ?Payment $payment): Receipt
    {
        $now = Carbon::now();
        $number = sprintf('INV-%s-%06d', $now->format('Y'), $order->id);

        $receipt = $order->receipt()->create([
            'payment_id' => $payment?->id,
            'type' => DocumentType::Invoice,
            'provider' => 'invoice',
            'fiscal_number' => $number,
            'status' => ReceiptStatus::Issued,
            'total' => $order->amount,
            'currency' => $order->currency,
            'payload' => [
                'note' => 'Reverse charge — where applicable, VAT is accounted for by the recipient.',
            ],
            'issued_at' => $now,
        ]);

        $receipt->update(['url' => route('receipts.show', $receipt)]);

        return $receipt;
    }
}
