<?php

namespace App\Services\Payments;

use App\Enums\BillingPeriod;
use App\Enums\LicenseStatus;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use App\Mail\PaymentFailedMail;
use App\Mail\PaymentSucceededMail;
use App\Mail\SubscriptionSuspendedMail;
use App\Models\Subscription;
use App\Services\Fiscal\FiscalProvider;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

/**
 * Recurring billing engine: charges due subscriptions on the stored card token,
 * extends the period and issues a fiscal receipt on success, and runs the
 * dunning schedule (retries → grace → suspension) on failure (ТЗ §5.4).
 */
class BillingService
{
    public function __construct(
        private readonly PaymentGateway $gateway,
        private readonly FiscalProvider $fiscal,
    ) {
    }

    /**
     * Attempt the scheduled recurring charge for a subscription.
     */
    public function renew(Subscription $subscription): bool
    {
        $subscription->loadMissing('plan', 'license', 'user');
        $anchor = $subscription->next_charge_at ?? Carbon::now();
        $amount = $this->amountFor($subscription);
        $reference = 'RPN-REN-'.strtoupper(Str::random(12));

        $outcome = $this->gateway->chargeRecurring($subscription, $amount, $reference);

        if ($outcome->success) {
            $this->markRenewed($subscription, $amount, $reference, $outcome->transactionId);

            return true;
        }

        $this->enterDunning($subscription, $anchor, $outcome->error ?? 'Charge failed.');

        return false;
    }

    /**
     * Expire a canceled subscription once its paid period has elapsed.
     */
    public function expire(Subscription $subscription): void
    {
        $subscription->update([
            'status' => SubscriptionStatus::Expired,
            'next_charge_at' => null,
        ]);
        $this->syncLicense($subscription->fresh());
    }

    private function markRenewed(Subscription $subscription, int $amount, string $reference, ?string $transactionId): void
    {
        DB::transaction(function () use ($subscription, $amount, $reference, $transactionId) {
            $start = Carbon::now();
            $end = $subscription->billing_period->addTo($start);

            $order = $subscription->user->orders()->create([
                'plan_id' => $subscription->plan_id,
                'billing_period' => $subscription->billing_period,
                'amount' => $amount,
                'currency' => $subscription->plan->currency,
                'status' => OrderStatus::Paid,
                'accepted_terms_at' => $subscription->created_at,
                'paid_at' => $start,
                'gateway' => $subscription->gateway ?? 'fake',
                'gateway_reference' => $reference,
                'subscription_id' => $subscription->id,
                'license_id' => $subscription->license?->id,
            ]);

            $payment = $order->payments()->create([
                'amount' => $amount,
                'currency' => $order->currency,
                'status' => PaymentStatus::Succeeded,
                'gateway' => $order->gateway,
                'gateway_payment_id' => $transactionId,
                'processed_at' => $start,
            ]);

            $subscription->update([
                'status' => SubscriptionStatus::Active,
                'current_period_start' => $start,
                'current_period_end' => $end,
                'next_charge_at' => $end,
                'last_charged_at' => $start,
                'payment_attempts' => 0,
                'grace_until' => null,
            ]);

            $receipt = $this->fiscal->issue($order->fresh(), $payment);
            $this->syncLicense($subscription->fresh());

            \App\Models\AuditLog::record('payment', 'payment.succeeded',
                "Renewal charge {$amount} {$order->currency} for subscription #{$subscription->id}", $payment);
            \App\Models\AuditLog::record('receipt', 'receipt.issued',
                "Fiscal receipt {$receipt->fiscal_number} issued on renewal", $receipt);
        });

        Mail::to($subscription->user->email)->send(new PaymentSucceededMail($subscription->fresh()));
    }

    private function enterDunning(Subscription $subscription, Carbon $anchor, string $reason): void
    {
        $retryDays = config('billing.retry_days', [1, 3, 5]);
        $graceDays = (int) config('billing.grace_days', 7);
        $attempts = $subscription->payment_attempts + 1;

        // Record the failed charge against a lightweight order for the audit trail.
        $order = $subscription->user->orders()->create([
            'plan_id' => $subscription->plan_id,
            'billing_period' => $subscription->billing_period,
            'amount' => $this->amountFor($subscription),
            'currency' => $subscription->plan->currency,
            'status' => OrderStatus::Failed,
            'gateway' => $subscription->gateway ?? 'fake',
            'gateway_reference' => 'RPN-REN-'.strtoupper(Str::random(12)),
            'subscription_id' => $subscription->id,
        ]);
        $order->payments()->create([
            'amount' => $order->amount,
            'currency' => $order->currency,
            'status' => PaymentStatus::Failed,
            'gateway' => $order->gateway,
            'error' => $reason,
            'processed_at' => Carbon::now(),
        ]);

        $graceUntil = $subscription->grace_until ?? $anchor->copy()->addDays($graceDays);

        // Retries exhausted or grace elapsed → suspend.
        if ($attempts > count($retryDays) || Carbon::now()->gte($graceUntil)) {
            $subscription->update([
                'status' => SubscriptionStatus::Expired,
                'payment_attempts' => $attempts,
                'grace_until' => $graceUntil,
                'next_charge_at' => null,
            ]);
            $this->syncLicense($subscription->fresh());
            \App\Models\AuditLog::record('subscription', 'subscription.suspended',
                "Subscription #{$subscription->id} suspended after {$attempts} failed charges", $subscription);
            Mail::to($subscription->user->email)->send(new SubscriptionSuspendedMail($subscription->fresh()));

            return;
        }

        $subscription->update([
            'status' => $attempts === 1 ? SubscriptionStatus::PastDue : SubscriptionStatus::Grace,
            'payment_attempts' => $attempts,
            'grace_until' => $graceUntil,
            'next_charge_at' => $anchor->copy()->addDays($retryDays[$attempts - 1]),
        ]);
        $this->syncLicense($subscription->fresh());
        \App\Models\AuditLog::record('payment', 'payment.failed',
            "Charge failed for subscription #{$subscription->id} (attempt {$attempts})", $subscription, ['reason' => $reason]);
        Mail::to($subscription->user->email)->send(new PaymentFailedMail($subscription->fresh()));
    }

    /**
     * License status is derived from the subscription (ТЗ §5.6). During grace
     * the license keeps working (updates available); once suspended, the verify
     * endpoint blocks updates/premium but the product core still runs.
     */
    public function syncLicense(Subscription $subscription): void
    {
        $license = $subscription->license;
        if ($license === null) {
            return;
        }

        [$status, $expiresAt] = match ($subscription->status) {
            SubscriptionStatus::Active => [LicenseStatus::Active, $subscription->current_period_end],
            SubscriptionStatus::PastDue, SubscriptionStatus::Grace => [LicenseStatus::Grace, $subscription->grace_until ?? $subscription->current_period_end],
            SubscriptionStatus::Canceled => $subscription->current_period_end?->isFuture()
                ? [LicenseStatus::Active, $subscription->current_period_end]
                : [LicenseStatus::Suspended, $subscription->current_period_end],
            SubscriptionStatus::Expired => [LicenseStatus::Suspended, Carbon::now()],
        };

        $license->update(['status' => $status, 'expires_at' => $expiresAt]);
    }

    private function amountFor(Subscription $subscription): int
    {
        return $subscription->billing_period === BillingPeriod::Yearly
            ? $subscription->plan->price_yearly
            : $subscription->plan->price_monthly;
    }
}
