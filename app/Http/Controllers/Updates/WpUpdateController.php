<?php

namespace App\Http\Controllers\Updates;

use App\Http\Controllers\Controller;
use App\Models\License;
use App\Services\Updates\UpdateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * WordPress update endpoint consumed by `plugin-update-checker` (ТЗ §5.9).
 * Verifies the license, then returns update metadata + a signed temporary
 * download URL. An invalid/suspended license is offered no update.
 */
class WpUpdateController extends Controller
{
    public function __construct(private readonly UpdateService $updates)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:64'],
            'slug' => ['required', 'string', 'max:255'],
            'version' => ['nullable', 'string', 'max:32'],
        ]);

        $license = License::with('product.releases')
            ->where('key', $data['key'])
            ->first();

        $noUpdate = response()->json(['version' => $data['version'] ?? null, 'download_url' => '']);

        if ($license === null || $license->product->slug !== $data['slug'] || ! $license->status->grantsUpdates()) {
            return $noUpdate;
        }

        $release = $this->updates->latestUpdate($license->product, $data['version'] ?? null);
        if ($release === null) {
            return $noUpdate;
        }

        return response()->json([
            'slug' => $license->product->slug,
            'name' => $license->product->name,
            'version' => $release->version,
            'download_url' => $this->updates->distUrl($release, $license),
            'tested' => $license->product->compatibility['cms'][0] ?? null,
            'requires_php' => $license->product->compatibility['php'] ?? null,
            'last_updated' => $release->released_at?->toDateTimeString(),
            'sections' => [
                'changelog' => $release->changelog,
            ],
        ]);
    }
}
