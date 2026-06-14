<?php

namespace Database\Seeders;

use App\Enums\ActivationStatus;
use App\Enums\BillingPeriod;
use App\Enums\LicenseStatus;
use App\Enums\ProductStatus;
use App\Enums\ProductType;
use App\Enums\ReleaseChannel;
use App\Enums\SubscriptionStatus;
use App\Models\License;
use App\Models\Product;
use App\Models\Subscription;
use App\Models\User;
use App\Services\Licensing\LicenseKeyGenerator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $keys = app(LicenseKeyGenerator::class);

        $admin = User::factory()->create([
            'name' => 'Repono Admin',
            'email' => 'admin@repono.test',
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        $customer = User::factory()->create([
            'name' => 'Olena Buyer',
            'email' => 'buyer@repono.test',
            'email_verified_at' => now(),
        ]);

        $catalog = [
            [
                'name' => 'Acme Commerce',
                'slug' => 'acme-commerce',
                'type' => ProductType::Drupal,
                'tagline' => 'Headless commerce for Drupal, kept current on your release schedule.',
                'compatibility' => ['cms' => ['Drupal 10', 'Drupal 11'], 'php' => '>=8.2'],
                'plans' => [
                    ['name' => 'Single site', 'slug' => 'single', 'activation_limit' => 1, 'price_monthly' => 49000, 'price_yearly' => 490000],
                    ['name' => '5 sites', 'slug' => 'team', 'activation_limit' => 5, 'price_monthly' => 99000, 'price_yearly' => 990000, 'features' => ['priority-support']],
                    ['name' => 'Unlimited', 'slug' => 'agency', 'activation_limit' => null, 'price_monthly' => 199000, 'price_yearly' => 1990000, 'features' => ['priority-support', 'white-label']],
                ],
                'releases' => [
                    ['version' => '2.3.0', 'changelog' => 'Stripe 2025 API, order export.'],
                    ['version' => '2.4.1', 'changelog' => 'Fix tax rounding on partial refunds.'],
                ],
            ],
            [
                'name' => 'Pulse Analytics',
                'slug' => 'pulse-analytics',
                'type' => ProductType::WordPress,
                'tagline' => 'Privacy-first analytics plugin with automatic updates behind your key.',
                'compatibility' => ['cms' => ['WordPress 6.4+'], 'php' => '>=8.1'],
                'plans' => [
                    ['name' => 'Single site', 'slug' => 'single', 'activation_limit' => 1, 'price_monthly' => 29000, 'price_yearly' => 290000],
                    ['name' => '5 sites', 'slug' => 'team', 'activation_limit' => 5, 'price_monthly' => 59000, 'price_yearly' => 590000, 'features' => ['priority-support']],
                ],
                'releases' => [
                    ['version' => '1.8.2', 'changelog' => 'GDPR consent mode v2.'],
                    ['version' => '1.9.0', 'changelog' => 'Realtime dashboard widget.'],
                ],
            ],
        ];

        $firstLicense = null;

        foreach ($catalog as $row) {
            $product = Product::create([
                'name' => $row['name'],
                'slug' => $row['slug'],
                'type' => $row['type'],
                'tagline' => $row['tagline'],
                'description' => $row['tagline'],
                'compatibility' => $row['compatibility'],
                'status' => ProductStatus::Published,
            ]);

            foreach ($row['plans'] as $i => $plan) {
                $product->plans()->create([
                    'name' => $plan['name'],
                    'slug' => $plan['slug'],
                    'activation_limit' => $plan['activation_limit'],
                    'price_monthly' => $plan['price_monthly'],
                    'price_yearly' => $plan['price_yearly'],
                    'currency' => 'UAH',
                    'features' => $plan['features'] ?? [],
                    'sort_order' => $i,
                ]);
            }

            foreach ($row['releases'] as $i => $release) {
                $product->releases()->create([
                    'version' => $release['version'],
                    'channel' => ReleaseChannel::Stable,
                    'changelog' => $release['changelog'],
                    'is_published' => true,
                    'released_at' => Carbon::now()->subDays((count($row['releases']) - $i) * 21),
                ]);
            }

            // Give the demo customer a live license for the first product's mid plan.
            if ($firstLicense === null) {
                $plan = $product->plans()->where('slug', 'team')->first();

                $periodEnd = Carbon::now()->addMonths(10);
                $subscription = Subscription::create([
                    'user_id' => $customer->id,
                    'plan_id' => $plan->id,
                    'status' => SubscriptionStatus::Active,
                    'billing_period' => BillingPeriod::Yearly,
                    'current_period_start' => Carbon::now()->subMonths(2),
                    'current_period_end' => $periodEnd,
                    'next_charge_at' => $periodEnd,
                    'last_charged_at' => Carbon::now()->subMonths(2),
                    'gateway' => 'fake',
                    'gateway_token' => 'rectok_demo',
                ]);

                $firstLicense = License::create([
                    'key' => $keys->key(),
                    'user_id' => $customer->id,
                    'product_id' => $product->id,
                    'plan_id' => $plan->id,
                    'subscription_id' => $subscription->id,
                    'status' => LicenseStatus::Active,
                    'expires_at' => $subscription->current_period_end,
                    'repo_token' => $keys->repoToken(),
                ]);

                $firstLicense->activations()->create([
                    'domain' => 'shop.example.com',
                    'ip_address' => '203.0.113.10',
                    'last_version' => '2.4.1',
                    'last_heartbeat_at' => Carbon::now()->subMinutes(12),
                    'status' => ActivationStatus::Active,
                ]);
            }
        }

        $this->command?->info('Seeded admin@repono.test and buyer@repono.test (password: "password").');
        if ($firstLicense) {
            $this->command?->info("Demo license key: {$firstLicense->key}");
        }
    }
}
