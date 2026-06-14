<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\VerifyLicenseRequest;
use App\Services\Licensing\LicenseVerifier;
use Illuminate\Http\JsonResponse;

class LicenseVerifyController extends Controller
{
    public function __construct(private readonly LicenseVerifier $verifier)
    {
    }

    public function __invoke(VerifyLicenseRequest $request): JsonResponse
    {
        $result = $this->verifier->verify(
            key: (string) $request->input('key'),
            domain: (string) $request->input('domain'),
            productSlug: $request->input('product'),
            version: $request->input('version'),
            ip: $request->ip(),
        );

        // Always 200: the client treats the JSON `status` as authoritative and
        // must keep working even when the license is invalid/suspended.
        return response()->json($result);
    }
}
