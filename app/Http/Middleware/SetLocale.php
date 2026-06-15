<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $enabled = Language::where('enabled', true)->pluck('code')->all();

        // The admin area keeps its own locale, independent of the storefront.
        $sessionKey = $request->is('admin', 'admin/*') ? 'admin_locale' : 'locale';

        // ?lang= switches and persists the choice for the current area.
        if (($pick = $request->query('lang')) && in_array($pick, $enabled, true)) {
            $request->session()->put($sessionKey, $pick);
        }

        $locale = $request->session()->get($sessionKey);
        if (! in_array($locale, $enabled, true)) {
            $locale = Language::defaultCode();
        }

        App::setLocale($locale);

        return $next($request);
    }
}
