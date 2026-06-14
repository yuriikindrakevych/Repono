<?php

namespace App\Services\Payments;

use App\Enums\BillingPeriod;
use App\Enums\LicenseStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Order;
use App\Models\Plan;
use App\Models\User;
use App\Services\Fiscal\FiscalProvider;
use App\Services\Licensing\LicenseKeyGenerator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PurchaseService
{
    public function __construct(
        private readonly FiscalProvider $fiscal,
        private readonly LicenseKeyGenerator $keys,
    ) {
    }

    /**
     * Create a pending order for a plan + billing period.
     */
    public function startCheckout(User $user, Plan $plan, BillingPeriod $period, string $gateway = 'fake'): Order
    {
        $amount = $period === BillingPeriod::Yearly ? $plan->price_yearly : $plan->price_monthly;

        abort_if($amount === null, 422, 'This plan is not available for the selected billing period.');

        return $user->orders()->create([
            'plan_id' => $plan->id,
            'billing_period' => $period,
            'amount' => $amount,
            'currency' => $plan->currency,
            'status' => OrderStatus::Pending,
            'accepted_terms_at' => Carbon::now(),
            'gateway' => $gateway,
            'gateway_reference' => 'RPN-ORD-'.strtoupper(Str::random(12)),
        ]);
    }

    /**
     * Fulfil a paid order: record the payment, start the subscription, issue the
     * license and the fiscal receipt. Idempotent — a replayed gateway callback
     * never double-issues (ТЗ §5.4 idempotency).
     */
    public function fulfill(Order $order, string $transactionId): Order
    {
        return DB::transaction(function () use ($order, $transactionId) {
            /** @var Order $order */
            $order = Order::whereKey($order->id)->lockForUpdate()->firstOrFail();

            if ($order->status === OrderStatus::Paid) {
                return $order;
            }

            $order->load('plan');
            $period = $order->billing_period;
            $start = Carbon::now();
            $end = $period->addTo($start);

            $payment = $order->payments()->create([
                'amount' => $order->amount,
                'currency' => $order->currency,
                'status' => PaymentStatus::Succeeded,
                'gateway' => $order->gateway ?? 'fake',
                'gateway_payment_id' => $transactionId,
                'processed_at' => $start,
            ]);

            $subscription = $order->user->subscriptions()->create([
                'plan_id' => $order->plan_id,
                'status' => SubscriptionStatus::Active,
                'billing_period' => $period,
                'current_period_start' => $start,
                'current_period_end' => $end,
                'next_charge_at' => $end,
                'last_charged_at' => $start,
                'gateway' => $order->gateway,
                // Only the tokenized card (rectoken) is stored — never card data.
                'gateway_token' => 'rectok_'.Str::random(24),
                'gateway_reference' => $order->gateway_reference,
            ]);

            $license = $order->user->licenses()->create([
                'key' => $this->keys->key(),
                'product_id' => $order->plan->product_id,
                'plan_id' => $order->plan_id,
                'subscription_id' => $subscription->id,
                'status' => LicenseStatus::Active,
                'expires_at' => $end,
                'repo_token' => $this->keys->repoToken(),
            ]);

            $order->update([
                'status' => OrderStatus::Paid,
                'paid_at' => $start,
                'subscription_id' => $subscription->id,
                'license_id' => $license->id,
            ]);

            // Fiscal receipt on every successful charge (ТЗ §5.5).
            $this->fiscal->issue($order->fresh(), $payment);

            return $order->fresh();
        });
    }

    /**
     * Record a declined charge and mark the order failed.
     */
    public function fail(Order $order, string $reason): Order
    {
        if ($order->status === OrderStatus::Paid) {
            return $order;
        }

        $order->payments()->create([
            'amount' => $order->amount,
            'currency' => $order->currency,
            'status' => PaymentStatus::Failed,
            'gateway' => $order->gateway ?? 'fake',
            'error' => $reason,
            'processed_at' => Carbon::now(),
        ]);

        $order->update(['status' => OrderStatus::Failed]);

        return $order;
    }
}
