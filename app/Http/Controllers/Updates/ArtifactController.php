<?php

namespace App\Http\Controllers\Updates;

use App\Http\Controllers\Controller;
use App\Models\License;
use App\Models\Release;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Storage;

/**
 * Serves release artifacts behind expiring signed URLs (ТЗ §6). Entitlement is
 * re-checked at download time so a leaked URL stops working the moment the
 * license is suspended or revoked.
 */
class ArtifactController extends Controller
{
    public function download(Request $request, Release $release, License $license): StreamedResponse
    {
        abort_unless($license->status->grantsUpdates(), 403, 'License is not active.');
        abort_unless($release->product_id === $license->product_id, 403);
        abort_unless($release->is_published && $release->artifact_path, 404);

        if (! Storage::disk('local')->exists($release->artifact_path)) {
            throw new NotFoundHttpException('Artifact not found.');
        }

        $filename = $license->product->slug.'-'.$release->version.'.zip';

        return Storage::disk('local')->download($release->artifact_path, $filename);
    }
}
