<?php

namespace App\Services\Licensing;

use App\Enums\ActivationStatus;
use App\Enums\LicenseStatus;
use App\Models\Activation;
use App\Models\License;
use Illuminate\Support\Carbon;

/**
 * Validates a license heartbeat and records the calling domain's activation.
 *
 * The contract (ТЗ §5.7): a suspended/invalid license blocks updates and
 * premium features, but never breaks the product core. The response is the
 * single source of truth the client caches for N hours.
 */
class LicenseVerifier
{
    /**
     * @return array{status: string, expires_at: ?string, features: array<int, string>, message: string}
     */
    public function verify(string $key, string $domain, ?string $productSlug, ?string $version, ?string $ip = null): array
    {
        $license = License::with(['plan', 'product'])
            ->where('key', $key)
            ->first();

        if ($license === null) {
            return $this->result('invalid', null, [], 'License key not recognized.');
        }

        if ($productSlug !== null && $license->product->slug !== $productSlug) {
            return $this->result('invalid', null, [], 'This license key is not valid for the requested product.');
        }

        $expired = $license->expires_at !== null && $license->expires_at->isPast();
        $effective = $expired ? LicenseStatus::Suspended : $license->status;

        $activation = $this->touchActivation($license, $domain, $version, $ip, $effective);

        $features = $effective->grantsUpdates()
            ? (array) ($license->plan->features ?? [])
            : [];

        $expiresAt = $license->expires_at?->toIso8601String();

        return match (true) {
            $activation === 'limit' => $this->result(
                'invalid',
                $expiresAt,
                [],
                "Activation limit reached for the {$license->plan->name} plan. Deactivate a domain or upgrade your plan."
            ),
            $effective === LicenseStatus::Active => $this->result(
                'active',
                $expiresAt,
                $features,
                'License active.'
            ),
            $effective === LicenseStatus::Grace => $this->result(
                'grace',
                $expiresAt,
                $features,
                'Payment is overdue — updates stay available during the grace period. Please update your card.'
            ),
            default => $this->result(
                'suspended',
                $expiresAt,
                [],
                $expired
                    ? 'Subscription expired. Renew to resume updates and premium features.'
                    : 'License suspended. Updates and premium features are paused; the product core keeps working.'
            ),
        };
    }

    /**
     * Upsert the activation row for this domain. Returns 'limit' when a new
     * domain cannot be activated because the plan's slot limit is reached.
     */
    private function touchActivation(License $license, string $domain, ?string $version, ?string $ip, LicenseStatus $effective): string
    {
        $activation = $license->activations()->where('domain', $domain)->first();

        if ($activation === null) {
            // Only consume a slot for licenses that currently grant updates.
            if ($effective->grantsUpdates() && ! $license->hasFreeActivationSlot()) {
                return 'limit';
            }

            $activation = new Activation(['domain' => $domain]);
            $activation->license()->associate($license);
        }

        $activation->fill([
            'last_version' => $version,
            'ip_address' => $ip,
            'last_heartbeat_at' => Carbon::now(),
            'status' => $effective === LicenseStatus::Suspended
                ? ActivationStatus::Inactive
                : ActivationStatus::Active,
        ])->save();

        return 'ok';
    }

    /**
     * @param  array<int, string>  $features
     * @return array{status: string, expires_at: ?string, features: array<int, string>, message: string}
     */
    private function result(string $status, ?string $expiresAt, array $features, string $message): array
    {
        return [
            'status' => $status,
            'expires_at' => $expiresAt,
            'features' => array_values($features),
            'message' => $message,
        ];
    }
}
