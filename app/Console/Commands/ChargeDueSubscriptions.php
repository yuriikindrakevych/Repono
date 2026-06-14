<?php

namespace App\Console\Commands;

use App\Enums\SubscriptionStatus;
use App\Models\Subscription;
use App\Services\Payments\BillingService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class ChargeDueSubscriptions extends Command
{
    protected $signature = 'subscriptions:charge-due';

    protected $description = 'Charge subscriptions due for renewal and advance the dunning schedule';

    public function handle(BillingService $billing): int
    {
        $now = Carbon::now();

        // Due recurring charges and dunning retries.
        $due = Subscription::query()
            ->whereIn('status', [SubscriptionStatus::Active, SubscriptionStatus::PastDue, SubscriptionStatus::Grace])
            ->whereNotNull('next_charge_at')
            ->where('next_charge_at', '<=', $now)
            ->get();

        $charged = 0;
        $failed = 0;
        foreach ($due as $subscription) {
            $billing->renew($subscription) ? $charged++ : $failed++;
        }

        // Canceled subscriptions that have reached the end of the paid period.
        $expiring = Subscription::query()
            ->where('status', SubscriptionStatus::Canceled)
            ->whereNotNull('current_period_end')
            ->where('current_period_end', '<=', $now)
            ->get();

        foreach ($expiring as $subscription) {
            $billing->expire($subscription);
        }

        $this->info("Charged: {$charged}, failed: {$failed}, expired: {$expiring->count()}.");

        return self::SUCCESS;
    }
}
