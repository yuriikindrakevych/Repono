<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Plan;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PlanController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        $data = $this->validatePlan($request, $product);
        $product->plans()->create($this->payload($data, $product));

        AuditLog::record('catalog', 'plan.created', "Plan {$data['name']} added to {$product->name}", $product);

        return back()->with('flash', 'Plan added.');
    }

    public function update(Request $request, Plan $plan): RedirectResponse
    {
        $data = $this->validatePlan($request, $plan->product, $plan);
        $plan->update($this->payload($data, $plan->product));

        AuditLog::record('catalog', 'plan.updated', "Plan {$plan->name} updated", $plan->product);

        return back()->with('flash', 'Plan saved.');
    }

    public function destroy(Plan $plan): RedirectResponse
    {
        $name = $plan->name;
        $product = $plan->product;
        $plan->delete();

        AuditLog::record('catalog', 'plan.deleted', "Plan {$name} removed from {$product->name}", $product);

        return back()->with('flash', 'Plan removed.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validatePlan(Request $request, Product $product, ?Plan $plan = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9-]+$/',
                Rule::unique('plans', 'slug')->where('product_id', $product->id)->ignore($plan)],
            'activation_limit' => ['nullable', 'integer', 'min:1'],
            'price_monthly' => ['nullable', 'integer', 'min:0'],
            'price_yearly' => ['nullable', 'integer', 'min:0'],
            'features' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function payload(array $data, Product $product): array
    {
        return [
            'name' => $data['name'],
            'slug' => $data['slug'],
            'activation_limit' => $data['activation_limit'] ?? null,
            'price_monthly' => $data['price_monthly'] ?? null,
            'price_yearly' => $data['price_yearly'] ?? null,
            'currency' => 'UAH',
            'features' => array_values(array_filter(array_map('trim', explode(',', (string) ($data['features'] ?? ''))))),
            'is_active' => (bool) ($data['is_active'] ?? true),
        ];
    }
}
