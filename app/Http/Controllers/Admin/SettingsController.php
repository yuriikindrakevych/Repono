<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $keySet = Setting::has('openrouter_api_key') || (bool) config('services.openrouter.key');

        return Inertia::render('Admin/Settings', [
            'openrouter' => [
                'key_set' => $keySet,
                'model' => Setting::get('openrouter_model', config('services.openrouter.model')),
                'source' => Setting::has('openrouter_api_key') ? 'database' : ((bool) config('services.openrouter.key') ? 'env' : 'none'),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'openrouter_api_key' => ['nullable', 'string', 'max:255'],
            'openrouter_model' => ['nullable', 'string', 'max:128'],
            'clear_key' => ['boolean'],
        ]);

        if (($data['clear_key'] ?? false) === true) {
            Setting::set('openrouter_api_key', null);
            AuditLog::record('i18n', 'settings.openrouter_key_cleared', 'OpenRouter API key removed');
        } elseif (! empty($data['openrouter_api_key'])) {
            Setting::set('openrouter_api_key', trim($data['openrouter_api_key']));
            AuditLog::record('i18n', 'settings.openrouter_key_set', 'OpenRouter API key updated');
        }

        if (! empty($data['openrouter_model'])) {
            Setting::set('openrouter_model', trim($data['openrouter_model']));
        }

        return back()->with('flash', 'Settings saved.');
    }
}
