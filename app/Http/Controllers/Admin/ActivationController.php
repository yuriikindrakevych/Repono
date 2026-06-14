<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activation;
use App\Models\AuditLog;
use Illuminate\Http\RedirectResponse;

class ActivationController extends Controller
{
    public function destroy(Activation $activation): RedirectResponse
    {
        $domain = $activation->domain;
        $license = $activation->license;
        $activation->delete();

        AuditLog::record('activation', 'activation.reset',
            "Activation {$domain} reset by admin", $license);

        return back()->with('flash', "Activation {$domain} reset.");
    }
}
