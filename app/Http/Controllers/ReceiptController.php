<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReceiptController extends Controller
{
    public function show(Request $request, Receipt $receipt): Response
    {
        $receipt->load('order.plan.product', 'order.user');
        abort_unless($receipt->order->user_id === $request->user()->id, 403);

        return Inertia::render('Receipt', [
            'receipt' => [
                'fiscal_number' => $receipt->fiscal_number,
                'type' => $receipt->type->value,
                'type_label' => $receipt->type->label(),
                'note' => $receipt->payload['note'] ?? null,
                'provider' => $receipt->provider,
                'status' => $receipt->status->value,
                'total' => $receipt->total,
                'currency' => $receipt->currency,
                'issued_at' => $receipt->issued_at?->format('M j, Y H:i'),
                'reference' => $receipt->order->gateway_reference,
                'product' => $receipt->order->plan->product->name,
                'plan' => $receipt->order->plan->name,
                'billing_period' => $receipt->order->billing_period->value,
                'buyer' => $receipt->order->user->email,
            ],
        ]);
    }
}
