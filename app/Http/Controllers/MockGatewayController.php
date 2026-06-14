<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Services\Payments\PurchaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * A stand-in for the external payment gateway (WayForPay / Fondy). It renders a
 * hosted "pay" page and posts a signed outcome back to us — mirroring the real
 * redirect + signed-callback flow so the production gateway drops in cleanly.
 * The callback verifies an HMAC signature and is idempotent (ТЗ §5.4, §6).
 */
class MockGatewayController extends Controller
{
    public function __construct(private readonly PurchaseService $purchases)
    {
    }

    public function show(Request $request, Order $order): Response|RedirectResponse
    {
        abort_unless($order->user_id === $request->user()->id, 403);

        if ($order->status === OrderStatus::Paid) {
            return redirect()->route('checkout.success', $order);
        }
        abort_unless($order->status === OrderStatus::Pending, 404);

        $order->load('plan.product');

        return Inertia::render('Checkout/Gateway', [
            'order' => [
                'reference' => $order->gateway_reference,
                'product' => $order->plan->product->name,
                'plan' => $order->plan->name,
                'amount' => $order->amount,
                'currency' => $order->currency,
            ],
            'pay_url' => route('checkout.gateway.callback', $order),
            'signature' => $this->signature($order),
        ]);
    }

    public function callback(Request $request, Order $order): RedirectResponse
    {
        abort_unless($order->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'outcome' => ['required', 'in:success,decline'],
            'signature' => ['required', 'string'],
        ]);

        // Reject tampered/forged callbacks.
        abort_unless(hash_equals($this->signature($order), $data['signature']), 403, 'Invalid signature.');

        if ($data['outcome'] === 'success') {
            $this->purchases->fulfill($order, 'TX-'.strtoupper(Str::random(16)));

            return redirect()->route('checkout.success', $order);
        }

        $this->purchases->fail($order, 'Card declined by issuer.');

        return redirect()
            ->route('checkout.show', ['plan' => $order->plan_id, 'period' => $order->billing_period->value])
            ->with('flash', 'Payment was declined. Your modules are not charged — try another card.');
    }

    private function signature(Order $order): string
    {
        return hash_hmac('sha256', $order->gateway_reference.'|'.$order->amount, config('app.key'));
    }
}
