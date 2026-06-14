<?php

namespace App\Services\Updates;

use App\Models\License;
use App\Models\Product;
use App\Models\Release;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class UpdateService
{
    /**
     * Expiring signed URL to a release artifact (ТЗ §6).
     */
    public function distUrl(Release $release, License $license): string
    {
        return URL::temporarySignedRoute('repo.dist', Carbon::now()->addMinutes(15), [
            'release' => $release->id,
            'license' => $license->id,
        ]);
    }

    /**
     * Build a Composer v1 packages.json for everything the license entitles.
     *
     * @return array<string, mixed>
     */
    public function composerPackages(License $license): array
    {
        $product = $license->product;
        $packageName = 'repono/'.$product->slug;
        $versions = [];

        foreach ($product->releases()->where('is_published', true)->get() as $release) {
            $versions[$release->version] = [
                'name' => $packageName,
                'version' => $release->version,
                'type' => 'drupal-module',
                'require' => $this->requireFor($product),
                'dist' => array_filter([
                    'type' => 'zip',
                    'url' => $this->distUrl($release, $license),
                    'reference' => $release->version,
                    'shasum' => $this->shasum($release),
                ]),
            ];
        }

        return ['packages' => [$packageName => $versions]];
    }

    /**
     * The newest published release strictly newer than $currentVersion, or null.
     */
    public function latestUpdate(Product $product, ?string $currentVersion): ?Release
    {
        $latest = $product->releases()
            ->where('is_published', true)
            ->orderByDesc('released_at')
            ->get()
            ->sortByDesc(fn (Release $r) => $r->version)
            ->first();

        if ($latest === null) {
            return null;
        }

        if ($currentVersion && version_compare($latest->version, $currentVersion, '<=')) {
            return null;
        }

        return $latest;
    }

    private function shasum(Release $release): ?string
    {
        if (! $release->artifact_path || ! Storage::disk('local')->exists($release->artifact_path)) {
            return null;
        }

        return sha1_file(Storage::disk('local')->path($release->artifact_path));
    }

    /**
     * @return array<string, string>
     */
    private function requireFor(Product $product): array
    {
        $php = $product->compatibility['php'] ?? null;

        return $php ? ['php' => $php] : [];
    }
}
