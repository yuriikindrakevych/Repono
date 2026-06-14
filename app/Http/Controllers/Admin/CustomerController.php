<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $customers = User::query()
            ->where('is_admin', false)
            ->withCount(['subscriptions', 'licenses'])
            ->orderBy('name')
            ->get()
            ->map(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'verified' => $u->hasVerifiedEmail(),
                'subscriptions' => $u->subscriptions_count,
                'licenses' => $u->licenses_count,
            ]);

        return Inertia::render('Admin/Customers/Index', ['customers' => $customers]);
    }

    public function show(User $customer): Response
    {
        $customer->load([
            'subscriptions.plan.product',
            'licenses.product',
            'licenses.activations',
        ]);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
            ],
            'subscriptions' => $customer->subscriptions->map(fn ($s) => [
                'id' => $s->id,
                'product' => $s->plan->product->name,
                'plan' => $s->plan->name,
                'status' => $s->status->value,
                'period_end' => $s->current_period_end?->format('M j, Y'),
                'next_charge' => $s->next_charge_at?->format('M j, Y'),
            ]),
            'licenses' => $customer->licenses->map(fn ($l) => [
                'id' => $l->id,
                'key' => $l->key,
                'product' => $l->product->name,
                'status' => $l->status->value,
                'activations' => $l->activations->map(fn ($a) => [
                    'id' => $a->id,
                    'domain' => $a->domain,
                    'last_heartbeat' => $a->last_heartbeat_at?->diffForHumans(),
                ]),
            ]),
        ]);
    }
}
