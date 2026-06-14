<?php

namespace App\Http\Controllers;

use App\Enums\BillingPeriod;
use App\Enums\OrderStatus;
use App\Enums\ProductStatus;
use App\Models\Order;
use App\Models\Plan;
use App\Services\Payments\PaymentGateway;
use App\Services\Payments\PurchaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class CheckoutController extends Controller
{
    public function __construct(private readonly PurchaseService $purchases)
    {
    }

    public function show(Request $request, Plan $plan): Response
    {
        $plan->load('product');
        abort_unless($plan->is_active && $plan->product->status === ProductStatus::Published, 404);

        $period = $this->resolvePeriod($request->query('period'));
        $amount = $period === BillingPeriod::Yearly ? $plan->price_yearly : $plan->price_monthly;
        abort_if($amount === null, 404);

        return Inertia::render('Checkout/Show', [
            'plan' => [
                'id' => $plan->id,
                'name' => $plan->name,
                'product' => $plan->product->name,
                'product_slug' => $plan->product->slug,
                'package' => 'repono/'.$plan->product->slug,
            ],
            'period' => $period->value,
            'amount' => $amount,
            'currency' => $plan->currency,
        ]);
    }

    public function store(Request $request, Plan $plan, PaymentGateway $gateway): HttpResponse
    {
        $plan->load('product');
        abort_unless($plan->is_active && $plan->product->status === ProductStatus::Published, 404);

        $validated = $request->validate([
            'period' => ['required', 'in:monthly,yearly'],
            'accept_terms' => ['accepted'],
        ]);

        $order = $this->purchases->startCheckout(
            user: $request->user(),
            plan: $plan,
            period: BillingPeriod::from($validated['period']),
            gateway: $gateway->name(),
        );

        try {
            $url = $gateway->createCheckout(
                order: $order,
                returnUrl: route('checkout.success', $order),
                callbackUrl: route('webhooks.payment'),
            );
        } catch (\Throwable $e) {
            report($e);

            return back()->with('flash', 'Could not start the payment. Please try again.');
        }

        // Full-page redirect to the (possibly external) gateway checkout.
        return Inertia::location($url);
    }

    public function success(Request $request, Order $order): Response
    {
        abort_unless($order->user_id === $request->user()->id, 403);

        // The gateway callback may not have landed yet — show a pending state.
        if ($order->status !== OrderStatus::Paid) {
            return Inertia::render('Checkout/Success', [
                'order' => ['pending' => true, 'reference' => $order->gateway_reference],
            ]);
        }

        $order->load(['plan.product', 'license', 'receipt']);

        return Inertia::render('Checkout/Success', [
            'order' => [
                'pending' => false,
                'reference' => $order->gateway_reference,
                'product' => $order->plan->product->name,
                'plan' => $order->plan->name,
                'amount' => $order->amount,
                'currency' => $order->currency,
                'license_key' => $order->license?->key,
                'receipt' => $order->receipt ? [
                    'fiscal_number' => $order->receipt->fiscal_number,
                    'type_label' => $order->receipt->type->label(),
                    'url' => $order->receipt->url,
                ] : null,
            ],
        ]);
    }

    private function resolvePeriod(?string $value): BillingPeriod
    {
        return $value === 'yearly' ? BillingPeriod::Yearly : BillingPeriod::Monthly;
    }
}
