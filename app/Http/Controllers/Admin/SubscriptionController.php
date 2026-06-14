<?php

namespace App\Http\Controllers\Admin;

use App\Enums\SubscriptionStatus;
use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Subscription;
use App\Services\Payments\BillingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;

class SubscriptionController extends Controller
{
    public function __construct(private readonly BillingService $billing)
    {
    }

    public function extend(Subscription $subscription): RedirectResponse
    {
        $anchor = $subscription->current_period_end && $subscription->current_period_end->isFuture()
            ? $subscription->current_period_end
            : Carbon::now();
        $end = $subscription->billing_period->addTo($anchor);

        $subscription->update([
            'status' => SubscriptionStatus::Active,
            'current_period_end' => $end,
            'next_charge_at' => $end,
            'payment_attempts' => 0,
            'grace_until' => null,
        ]);
        $this->billing->syncLicense($subscription->fresh());

        AuditLog::record('subscription', 'subscription.extended',
            "Subscription #{$subscription->id} extended to {$end->format('M j, Y')}", $subscription);

        return back()->with('flash', 'Subscription extended.');
    }

    public function suspend(Subscription $subscription): RedirectResponse
    {
        $subscription->update([
            'status' => SubscriptionStatus::Expired,
            'next_charge_at' => null,
        ]);
        $this->billing->syncLicense($subscription->fresh());

        AuditLog::record('subscription', 'subscription.suspended',
            "Subscription #{$subscription->id} suspended by admin", $subscription);

        return back()->with('flash', 'Subscription suspended.');
    }

    public function reactivate(Subscription $subscription): RedirectResponse
    {
        $start = Carbon::now();
        $end = $subscription->billing_period->addTo($start);

        $subscription->update([
            'status' => SubscriptionStatus::Active,
            'current_period_start' => $start,
            'current_period_end' => $end,
            'next_charge_at' => $end,
            'payment_attempts' => 0,
            'grace_until' => null,
        ]);
        $this->billing->syncLicense($subscription->fresh());

        AuditLog::record('subscription', 'subscription.reactivated',
            "Subscription #{$subscription->id} reactivated by admin", $subscription);

        return back()->with('flash', 'Subscription reactivated.');
    }
}
