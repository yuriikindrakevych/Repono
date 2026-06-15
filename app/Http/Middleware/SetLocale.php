<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /** Storefront routes whose locale lives in the URL path (/{locale}). */
    private const PATH_LOCALIZED = ['home', 'products.show', 'legal'];

    public function handle(Request $request, Closure $next): Response
    {
        $enabled = Language::where('enabled', true)->pluck('code')->all();
        $default = Language::defaultCode();

        // Storefront: the locale is the URL prefix (/uk/...). The default language
        // has no prefix. We also remember the choice in the session so the cabinet,
        // checkout and emails keep the same language afterwards.
        if (in_array($request->route()?->getName(), self::PATH_LOCALIZED, true)) {
            $locale = $request->route('locale');
            $locale = ($locale && in_array($locale, $enabled, true)) ? $locale : $default;

            $request->session()->put('locale', $locale);
            App::setLocale($locale);
            // So route() / Ziggy regenerate prefixed URLs for the active locale.
            URL::defaults(['locale' => $locale === $default ? null : $locale]);

            return $next($request);
        }

        // Everything else is session-based. The admin area keeps its own locale,
        // independent of the storefront; ?lang= switches and persists the choice.
        $sessionKey = $request->is('admin', 'admin/*') ? 'admin_locale' : 'locale';

        if (($pick = $request->query('lang')) && in_array($pick, $enabled, true)) {
            $request->session()->put($sessionKey, $pick);
        }

        $locale = $request->session()->get($sessionKey);
        if (! in_array($locale, $enabled, true)) {
            $locale = $default;
        }

        App::setLocale($locale);

        return $next($request);
    }
}
