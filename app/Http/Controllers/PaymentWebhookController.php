<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\Payments\PaymentGateway;
use App\Services\Payments\PurchaseService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Receives the gateway's server callback (webhook). The signature is verified
 * inside the gateway driver; fulfilment is idempotent by order reference so a
 * replayed callback never double-issues (ТЗ §5.4, §6).
 */
class PaymentWebhookController extends Controller
{
    public function __invoke(Request $request, PaymentGateway $gateway, PurchaseService $purchases): Response
    {
        $result = $gateway->parseCallback($request->all());

        // Invalid / forged signature.
        if ($result === null) {
            return response('invalid signature', 400);
        }

        $order = Order::where('gateway_reference', $result->reference)->first();

        // Unknown order — acknowledge so the gateway stops retrying.
        if ($order === null) {
            return response('ok');
        }

        if ($result->isApproved()) {
            $purchases->fulfill($order, $result->transactionId ?? $gateway->name(), $result->token);
        } elseif ($result->isDeclined()) {
            $purchases->fail($order, 'Declined by payment gateway.');
        }

        return response('ok');
    }
}
