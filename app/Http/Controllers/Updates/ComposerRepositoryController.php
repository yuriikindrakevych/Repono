<?php

namespace App\Http\Controllers\Updates;

use App\Http\Controllers\Controller;
use App\Models\License;
use App\Services\Updates\UpdateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Private Composer repository for Drupal modules (Satis-style). Clients
 * authenticate with http-basic using their per-license repo token
 * (auth.json). A suspended/canceled license token stops serving new
 * versions — i.e. it is revoked (ТЗ §5.8).
 */
class ComposerRepositoryController extends Controller
{
    public function __construct(private readonly UpdateService $updates)
    {
    }

    public function packages(Request $request): JsonResponse
    {
        $token = $this->bearerToken($request);

        $license = $token
            ? License::with('product.releases')->where('repo_token', $token)->first()
            : null;

        if ($license === null) {
            return response()->json(['error' => 'Unauthorized'], 401)
                ->header('WWW-Authenticate', 'Basic realm="Repono"');
        }

        // Token revocation: suspended/canceled licenses get an empty repository.
        if (! $license->status->grantsUpdates()) {
            return response()->json([
                'packages' => [],
                'warning' => 'Your license is not active — updates are paused. Renew to restore them.',
            ], 403);
        }

        return response()->json($this->updates->composerPackages($license));
    }

    private function bearerToken(Request $request): ?string
    {
        // http-basic: the password carries the repo token (username is ignored).
        if ($request->getPassword()) {
            return $request->getPassword();
        }

        $header = $request->header('Authorization', '');
        if (str_starts_with($header, 'Basic ')) {
            $decoded = base64_decode(substr($header, 6), true);
            if ($decoded !== false && str_contains($decoded, ':')) {
                return explode(':', $decoded, 2)[1];
            }
        }

        return null;
    }
}
