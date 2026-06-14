<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\License;
use App\Services\Licensing\LicenseKeyGenerator;
use Illuminate\Http\RedirectResponse;

class LicenseController extends Controller
{
    public function __construct(private readonly LicenseKeyGenerator $keys)
    {
    }

    public function regenerateKey(License $license): RedirectResponse
    {
        $old = $license->key;
        $license->update(['key' => $this->keys->key()]);

        AuditLog::record('license', 'license.key_reissued',
            "License key reissued ({$old} → {$license->key})", $license);

        return back()->with('flash', 'License key reissued.');
    }

    public function regenerateToken(License $license): RedirectResponse
    {
        $license->update(['repo_token' => $this->keys->repoToken()]);

        AuditLog::record('license', 'license.token_revoked',
            "Repo token revoked and reissued for license {$license->key}", $license);

        return back()->with('flash', 'Repository token reissued — the old token no longer works.');
    }
}
