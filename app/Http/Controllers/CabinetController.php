<?php

namespace App\Http\Controllers;

use App\Enums\ActivationStatus;
use App\Enums\LicenseStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Activation;
use App\Models\Subscription;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class CabinetController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $subscriptions = $user->subscriptions()
            ->with('plan.product')
            ->latest()
            ->get()
            ->map(fn (Subscription $s) => [
                'id' => $s->id,
                'product' => 'repono/'.$s->plan->product->slug,
                'plan' => $s->plan->name,
                'status' => $s->status->value,
                'billing_period' => $s->billing_period->value,
                'renews' => $s->current_period_end?->format('M j, Y'),
                'can_cancel' => in_array($s->status, [SubscriptionStatus::Active, SubscriptionStatus::PastDue, SubscriptionStatus::Grace], true),
            ]);

        $licenses = $user->licenses()
            ->with(['product', 'plan', 'activations'])
            ->get()
            ->map(function ($license) {
                $latest = $license->product->latestRelease();
                $recent = $license->activations->sortByDesc('last_heartbeat_at')->first();

                return [
                    'key' => $license->key,
                    'product' => 'repono/'.$license->product->slug,
                    'plan' => $license->plan->name.' · '.($license->plan->activation_limit === null
                        ? 'unlimited domains'
                        : $license->plan->activation_limit.' domain'.($license->plan->activation_limit === 1 ? '' : 's')),
                    'version' => $latest ? 'v'.$latest->version : '—',
                    'status' => $license->status->grantsUpdates() ? 'active' : 'idle',
                    'meta' => $recent?->domain ?? $license->activations->count().' domains',
                    'heartbeat_meta' => $recent
                        ? $this->heartbeat($recent)['meta']
                        : 'no activations yet',
                ];
            });

        $activations = Activation::query()
            ->whereHas('license', fn ($q) => $q->where('user_id', $user->id))
            ->with('license.product')
            ->orderByDesc('last_heartbeat_at')
            ->get()
            ->map(function (Activation $a) {
                $hb = $this->heartbeat($a);

                return [
                    'id' => $a->id,
                    'domain' => $a->domain,
                    'license_key' => $a->license->key,
                    'product' => $a->license->product->name,
                    'version' => $a->last_version,
                    'heartbeat_status' => $hb['status'],
                    'heartbeat_meta' => $hb['meta'],
                ];
            });

        return Inertia::render('Cabinet', [
            'subscriptions' => $subscriptions,
            'licenses' => $licenses,
            'activations' => $activations,
            'counts' => [
                'subscriptions' => $subscriptions->count(),
                'licenses' => $licenses->count(),
                'activations' => $activations->count(),
            ],
        ]);
    }

    public function cancelSubscription(Request $request, Subscription $subscription): RedirectResponse
    {
        abort_unless($subscription->user_id === $request->user()->id, 403);

        // Cancellation runs to the end of the paid period (ТЗ §5.4): no proration,
        // the subscription stays usable until current_period_end.
        $subscription->update([
            'status' => SubscriptionStatus::Canceled,
            'canceled_at' => Carbon::now(),
        ]);

        return back()->with('flash', 'Subscription canceled — it stays active until the end of the paid period.');
    }

    public function deactivate(Request $request, Activation $activation): RedirectResponse
    {
        abort_unless($activation->license->user_id === $request->user()->id, 403);

        // Frees the activation slot for the license (ТЗ §5.6).
        $activation->delete();

        return back()->with('flash', 'Domain deactivated — the activation slot is now free.');
    }

    /**
     * Derive a heartbeat status + human label from an activation's last check-in.
     *
     * @return array{status: string, meta: string}
     */
    private function heartbeat(Activation $activation): array
    {
        if ($activation->status === ActivationStatus::Inactive || $activation->last_heartbeat_at === null) {
            return ['status' => 'down', 'meta' => $activation->last_heartbeat_at?->diffForHumans() ?? 'never'];
        }

        $minutes = $activation->last_heartbeat_at->diffInMinutes(Carbon::now());
        $status = match (true) {
            $minutes <= 10 => 'active',
            $minutes <= 1440 => 'stale',
            default => 'idle',
        };

        return ['status' => $status, 'meta' => $activation->last_heartbeat_at->diffForHumans()];
    }
}
