<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ProductStatus;
use App\Enums\ProductType;
use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->withCount(['plans', 'releases', 'licenses'])
            ->orderBy('name')
            ->get()
            ->map(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'type' => $p->type->value,
                'type_label' => $p->type->label(),
                'status' => $p->status->value,
                'plans' => $p->plans_count,
                'releases' => $p->releases_count,
                'licenses' => $p->licenses_count,
            ]);

        return Inertia::render('Admin/Products/Index', ['products' => $products]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateProduct($request);
        $product = Product::create($this->payload($data));

        AuditLog::record('catalog', 'product.created', "Product {$product->name} created", $product);

        return redirect()->route('admin.products.edit', $product)->with('flash', 'Product created.');
    }

    public function edit(Product $product): Response
    {
        $product->load(['plans' => fn ($q) => $q->orderBy('sort_order'), 'releases' => fn ($q) => $q->orderByDesc('released_at')]);

        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'type' => $product->type->value,
                'tagline' => $product->tagline,
                'description' => $product->description,
                'compat_cms' => implode(', ', $product->compatibility['cms'] ?? []),
                'compat_php' => $product->compatibility['php'] ?? '',
                'status' => $product->status->value,
            ],
            'plans' => $product->plans->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'activation_limit' => $p->activation_limit,
                'price_monthly' => $p->price_monthly,
                'price_yearly' => $p->price_yearly,
                'features' => implode(', ', $p->features ?? []),
                'is_active' => $p->is_active,
            ]),
            'releases' => $product->releases->map(fn ($r) => [
                'id' => $r->id,
                'version' => $r->version,
                'channel' => $r->channel->value,
                'changelog' => $r->changelog,
                'is_published' => $r->is_published,
                'has_artifact' => (bool) $r->artifact_path,
                'released_at' => $r->released_at?->format('M j, Y'),
            ]),
            'types' => collect(ProductType::cases())->map(fn ($t) => ['value' => $t->value, 'label' => $t->label()]),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $this->validateProduct($request, $product);
        $wasPublished = $product->status === ProductStatus::Published;
        $product->update($this->payload($data));

        if (! $wasPublished && $product->status === ProductStatus::Published) {
            AuditLog::record('catalog', 'product.published', "Product {$product->name} published", $product);
        } else {
            AuditLog::record('catalog', 'product.updated', "Product {$product->name} updated", $product);
        }

        return back()->with('flash', 'Product saved.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validateProduct(Request $request, ?Product $product = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9-]+$/', Rule::unique('products', 'slug')->ignore($product)],
            'type' => ['required', new Enum(ProductType::class)],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'compat_cms' => ['nullable', 'string', 'max:255'],
            'compat_php' => ['nullable', 'string', 'max:32'],
            'status' => ['required', new Enum(ProductStatus::class)],
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function payload(array $data): array
    {
        $cms = array_values(array_filter(array_map('trim', explode(',', (string) ($data['compat_cms'] ?? '')))));

        return [
            'name' => $data['name'],
            'slug' => $data['slug'],
            'type' => $data['type'],
            'tagline' => $data['tagline'] ?? null,
            'description' => $data['description'] ?? null,
            'compatibility' => array_filter([
                'cms' => $cms ?: null,
                'php' => $data['compat_php'] ?? null,
            ]),
            'status' => $data['status'],
        ];
    }
}
