<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BillingPeriod;
use App\Enums\LicenseStatus;
use App\Enums\PaymentStatus;
use App\Enums\ProductStatus;
use App\Enums\SubscriptionStatus;
use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\License;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $entitled = [SubscriptionStatus::Active, SubscriptionStatus::PastDue, SubscriptionStatus::Grace];

        $mrr = Subscription::query()
            ->whereIn('status', $entitled)
            ->with('plan')
            ->get()
            ->sum(fn (Subscription $s) => $s->billing_period === BillingPeriod::Yearly
                ? (int) round(($s->plan->price_yearly ?? 0) / 12)
                : ($s->plan->price_monthly ?? 0));

        $since = Carbon::now()->subDays(30);

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'mrr' => $mrr,
                'currency' => 'UAH',
                'active_subscriptions' => Subscription::whereIn('status', $entitled)->count(),
                'active_licenses' => License::whereIn('status', [LicenseStatus::Active, LicenseStatus::Grace])->count(),
                'customers' => User::where('is_admin', false)->count(),
                'products' => Product::where('status', ProductStatus::Published)->count(),
                'revenue_30d' => Payment::where('status', PaymentStatus::Succeeded)->where('created_at', '>=', $since)->sum('amount'),
                'failed_payments_30d' => Payment::where('status', PaymentStatus::Failed)->where('created_at', '>=', $since)->count(),
                'receipts' => Receipt::count(),
            ],
            'audit' => AuditLog::with('user:id,name')->latest()->limit(12)->get()->map($this->mapAudit(...)),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function mapAudit(AuditLog $log): array
    {
        return [
            'id' => $log->id,
            'category' => $log->category,
            'action' => $log->action,
            'description' => $log->description,
            'actor' => $log->user?->name ?? 'system',
            'at' => $log->created_at?->diffForHumans(),
        ];
    }
}
