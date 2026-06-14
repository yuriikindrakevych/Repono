<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Language;
use App\Models\Translation;
use App\Services\Translation\TranslationManager;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LanguageController extends Controller
{
    public function index(): Response
    {
        $default = Language::defaultCode();
        $sourceTotal = Translation::where('locale', $default)->count();

        $languages = Language::orderByDesc('is_default')->orderBy('sort')->orderBy('name')->get()
            ->map(function (Language $l) use ($default, $sourceTotal) {
                $translated = $l->code === $default
                    ? $sourceTotal
                    : Translation::where('locale', $l->code)->whereNotNull('value')->where('value', '!=', '')->count();

                return [
                    'id' => $l->id,
                    'code' => $l->code,
                    'name' => $l->name,
                    'native_name' => $l->native_name,
                    'is_default' => $l->is_default,
                    'enabled' => $l->enabled,
                    'translated' => $translated,
                    'total' => $sourceTotal,
                ];
            });

        return Inertia::render('Admin/Translations/Index', [
            'languages' => $languages,
            'driver' => config('services.openrouter.key') ? 'OpenRouter ('.config('services.openrouter.model').')' : 'Fake (set OPENROUTER_API_KEY)',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'max:8', 'regex:/^[a-z]{2}(-[A-Za-z]{2,4})?$/', Rule::unique('languages', 'code')],
            'name' => ['required', 'string', 'max:64'],
            'native_name' => ['required', 'string', 'max:64'],
        ]);

        Language::create($data + ['enabled' => true, 'sort' => Language::max('sort') + 1]);
        AuditLog::record('i18n', 'language.added', "Language {$data['name']} ({$data['code']}) added");

        return back()->with('flash', "Language {$data['name']} added.");
    }

    public function update(Request $request, Language $language): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:64'],
            'native_name' => ['sometimes', 'string', 'max:64'],
            'enabled' => ['sometimes', 'boolean'],
            'is_default' => ['sometimes', 'boolean'],
        ]);

        if (($data['is_default'] ?? false) === true) {
            Language::where('id', '!=', $language->id)->update(['is_default' => false]);
            $data['enabled'] = true;
        }

        $language->update($data);
        AuditLog::record('i18n', 'language.updated', "Language {$language->name} updated", $language);

        return back()->with('flash', 'Language updated.');
    }

    public function destroy(Language $language): RedirectResponse
    {
        abort_if($language->is_default, 422, 'Cannot delete the default language.');

        Translation::where('locale', $language->code)->delete();
        $name = $language->name;
        $language->delete();
        AuditLog::record('i18n', 'language.removed', "Language {$name} removed");

        return back()->with('flash', "Language {$name} removed.");
    }

    public function sync(TranslationManager $manager): RedirectResponse
    {
        $r = $manager->sync();
        AuditLog::record('i18n', 'translations.synced', "Synced {$r['ui']} UI + {$r['content']} content strings");

        return back()->with('flash', "Synced {$r['ui']} UI + {$r['content']} source strings.");
    }

    public function translate(Request $request, TranslationManager $manager): RedirectResponse
    {
        $code = $request->input('code');

        if ($code) {
            $n = $manager->translateMissing($code);
            AuditLog::record('i18n', 'translations.translated', "Translated {$n} strings to {$code}");

            return back()->with('flash', "Translated {$n} strings to {$code}.");
        }

        $total = array_sum($manager->translateAll());
        AuditLog::record('i18n', 'translations.translated', "Auto-translated {$total} strings across all languages");

        return back()->with('flash', "Auto-translated {$total} missing strings.");
    }
}
