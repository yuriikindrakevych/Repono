<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Enums\ProductType;
use App\Models\Product;
use App\Models\Release;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Map plan feature slugs to human labels shown on pricing cards.
     */
    private const FEATURE_LABELS = [
        'priority-support' => 'Priority support, same business day',
        'white-label' => 'White-label — remove Repono branding',
    ];

    public function show(Product $product): Response
    {
        if ($product->status !== ProductStatus::Published) {
            throw new NotFoundHttpException();
        }

        $product->load([
            'plans' => fn ($q) => $q->where('is_active', true)->orderBy('sort_order'),
            'releases' => fn ($q) => $q->where('is_published', true)->orderByDesc('released_at'),
        ]);

        $plans = $product->plans->values();
        // Emphasise the middle tier (the agency sweet spot) when there are 3+.
        $featuredIndex = $plans->count() >= 3 ? 1 : ($plans->count() === 2 ? 1 : -1);

        $latest = $product->releases->first();

        return Inertia::render('Products/Show', [
            'product' => [
                'name' => $product->name,
                'slug' => $product->slug,
                'package' => 'repono/'.$product->slug,
                'type' => $product->type->value,
                'type_label' => $product->type->label(),
                'tagline' => $product->tagline,
                'description' => $product->description,
                'compatibility' => $product->compatibility,
                'latest_version' => $latest?->version,
                'install_command' => $this->installCommand($product),
                'currency' => $product->currency,
            ],
            'plans' => $plans->map(fn ($plan, $i) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'slug' => $plan->slug,
                'activation_limit' => $plan->activation_limit,
                'price_monthly' => $plan->price_monthly,
                'price_yearly' => $plan->price_yearly,
                'currency' => $plan->currency,
                'is_featured' => $i === $featuredIndex,
                'features' => $this->planFeatures($plan),
            ])->values(),
            'releases' => $product->releases->map($this->mapRelease(...))->values(),
        ]);
    }

    private function installCommand(Product $product): string
    {
        return match ($product->type) {
            ProductType::WordPress => 'Download the .zip and paste your license key in the plugin settings.',
            default => 'composer require repono/'.$product->slug,
        };
    }

    /**
     * @return array<int, string>
     */
    private function planFeatures(\App\Models\Plan $plan): array
    {
        $domains = $plan->activation_limit === null
            ? 'Unlimited active domains'
            : $plan->activation_limit.' active domain'.($plan->activation_limit === 1 ? '' : 's');

        $features = [
            $domains,
            'Automatic updates on the stable channel',
            'License API + activation dashboard',
            'Staging activations don’t count',
        ];

        foreach ((array) ($plan->features ?? []) as $slug) {
            $features[] = self::FEATURE_LABELS[$slug] ?? $slug;
        }

        return $features;
    }

    /**
     * @return array<string, mixed>
     */
    private function mapRelease(Release $release): array
    {
        return [
            'version' => $release->version,
            'channel' => $release->channel->value,
            'summary' => $release->changelog,
            'date' => $release->released_at?->format('M j, Y'),
            'changes' => $release->changelog
                ? [['type' => 'changed', 'text' => $release->changelog]]
                : [],
        ];
    }
}
