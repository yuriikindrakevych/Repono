<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Models\Product;
use App\Models\Release;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __invoke(): Response
    {
        $products = Product::query()
            ->where('status', ProductStatus::Published)
            ->with([
                'plans' => fn ($q) => $q->where('is_active', true)->orderBy('sort_order'),
                'releases' => fn ($q) => $q->where('is_published', true)->orderByDesc('released_at'),
            ])
            ->orderBy('name')
            ->get()
            ->map(function (Product $product) {
                $activePlans = $product->plans;
                $latest = $product->releases->first();

                return [
                    'name' => $product->tr('name'),
                    'slug' => $product->slug,
                    'type' => $product->type->value,
                    'type_label' => $product->type->label(),
                    'tagline' => $product->tr('tagline'),
                    'compatibility' => $product->compatibility,
                    'currency' => $product->currency,
                    'price_from' => $activePlans->whereNotNull('price_monthly')->min('price_monthly'),
                    'latest_version' => $latest?->version,
                    'plans' => $activePlans->map(fn ($p) => [
                        'name' => $p->name,
                        'activation_limit' => $p->activation_limit,
                        'price_monthly' => $p->price_monthly,
                    ])->values(),
                ];
            });

        $releases = Release::query()
            ->where('is_published', true)
            ->with('product:id,name')
            ->orderByDesc('released_at')
            ->limit(4)
            ->get()
            ->map(fn (Release $r) => [
                'version' => $r->version,
                'channel' => $r->channel->value,
                'summary' => $r->changelog,
                'product' => $r->product->name,
                'date' => $r->released_at?->format('M j, Y'),
                'changes' => $r->changelog
                    ? [['type' => 'changed', 'text' => $r->changelog]]
                    : [],
            ]);

        return Inertia::render('Landing', [
            'products' => $products,
            'releases' => $releases,
            'stats' => [
                'year' => Carbon::now()->year,
            ],
        ]);
    }
}
