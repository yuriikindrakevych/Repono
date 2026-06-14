<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Models\Translation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TranslationController extends Controller
{
    public function index(Request $request): Response
    {
        $default = Language::defaultCode();
        $locale = $request->query('locale');
        $targets = Language::where('is_default', false)->where('enabled', true)->pluck('code')->all();
        if (! in_array($locale, $targets, true)) {
            $locale = $targets[0] ?? $default;
        }

        $group = $request->query('group'); // ui | content | null

        $sources = Translation::query()
            ->where('locale', $default)
            ->when($group, fn ($q) => $q->where('group', $group))
            ->whereNotNull('value')->where('value', '!=', '')
            ->orderBy('group')->orderBy('key')
            ->paginate(40)->withQueryString();

        $hashes = collect($sources->items())->pluck('key_hash');
        $values = Translation::where('locale', $locale)->whereIn('key_hash', $hashes)
            ->get()->keyBy('key_hash');

        $sources->getCollection()->transform(fn (Translation $s) => [
            'key' => $s->key,
            'key_hash' => $s->key_hash,
            'group' => $s->group,
            'source' => $s->value,
            'value' => $values[$s->key_hash]->value ?? null,
            'reviewed' => (bool) ($values[$s->key_hash]->reviewed ?? false),
        ]);

        return Inertia::render('Admin/Translations/Strings', [
            'strings' => $sources,
            'locale' => $locale,
            'group' => $group,
            'locales' => Language::where('is_default', false)->where('enabled', true)
                ->get(['code', 'native_name']),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'locale' => ['required', 'string', 'exists:languages,code'],
            'group' => ['required', 'in:ui,content'],
            'key' => ['required', 'string'],
            'value' => ['nullable', 'string'],
        ]);

        Translation::put($data['locale'], $data['group'], $data['key'], $data['value'], reviewed: true);

        return back()->with('flash', 'Translation saved.');
    }
}
