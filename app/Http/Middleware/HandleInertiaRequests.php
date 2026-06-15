<?php

namespace App\Http\Middleware;

use App\Models\Language;
use App\Models\Translation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('flash'),
            ],
            'i18n' => [
                'locale' => App::getLocale(),
                'default' => Language::defaultCode(),
                // The storefront carries the locale in the URL path (/uk/...);
                // elsewhere the switcher falls back to ?lang=.
                'path_localized' => in_array(
                    $request->route()?->getName(),
                    ['home', 'products.show', 'legal'],
                    true,
                ),
                // Source language needs no dictionary — t() returns the key itself.
                'messages' => fn () => App::getLocale() === Language::defaultCode()
                    ? (object) []
                    : Translation::messages(App::getLocale(), 'ui'),
                'locales' => fn () => Language::where('enabled', true)->orderBy('sort')
                    ->get(['code', 'name', 'native_name'])->toArray(),
            ],
        ];
    }
}
