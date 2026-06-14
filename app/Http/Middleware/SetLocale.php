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

        // ?lang= switches and persists the choice.
        if (($pick = $request->query('lang')) && in_array($pick, $enabled, true)) {
            $request->session()->put('locale', $pick);
        }

        $locale = $request->session()->get('locale');
        if (! in_array($locale, $enabled, true)) {
            $locale = Language::defaultCode();
        }

        App::setLocale($locale);

        return $next($request);
    }
}
