<?php

namespace App\Services\Translation;

use App\Http\Controllers\LegalController;
use App\Models\Language;
use App\Models\Plan;
use App\Models\Product;
use App\Models\Translation;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

/**
 * Builds the source-string registry (UI keys scanned from the frontend +
 * translatable DB content) and mass-translates missing target-locale values.
 */
class TranslationManager
{
    public function __construct(private readonly Translator $translator)
    {
    }

    /**
     * Scan the frontend for t('…') / t("…") calls and the DB for translatable
     * content, then store the source strings under the default locale.
     *
     * @return array{ui: int, content: int}
     */
    public function sync(): array
    {
        $default = Language::defaultCode();

        $ui = $this->extractUiKeys();
        foreach ($ui as $key) {
            Translation::put($default, 'ui', $key, $key, true);
        }

        $content = $this->contentSources();
        foreach ($content as $key => $source) {
            Translation::put($default, 'content', $key, $source, true);
        }

        return ['ui' => count($ui), 'content' => count($content)];
    }

    /**
     * Translate every source string missing in the given locale. Returns the
     * number of strings translated.
     */
    public function translateMissing(string $locale): int
    {
        $lang = Language::where('code', $locale)->first();
        if (! $lang || $locale === Language::defaultCode()) {
            return 0;
        }

        $default = Language::defaultCode();
        $sources = Translation::where('locale', $default)->whereNotNull('value')->where('value', '!=', '')->get();

        $existing = Translation::where('locale', $locale)->whereNotNull('value')->where('value', '!=', '')
            ->get()->keyBy(fn ($t) => $t->group.'|'.$t->key_hash);

        $todo = $sources->reject(fn ($s) => $existing->has($s->group.'|'.$s->key_hash));

        $count = 0;
        foreach ($todo->groupBy('group') as $group => $rows) {
            $context = $group === 'ui' ? 'UI strings for a software licensing platform' : 'product & legal content';
            foreach ($rows->chunk(40) as $chunk) {
                $chunk = $chunk->values();
                $translated = $this->translator->translate(
                    $chunk->pluck('value')->all(),
                    $lang->native_name,
                    $context,
                );
                foreach ($chunk as $i => $src) {
                    Translation::put($locale, $group, $src->key, $translated[$i] ?? $src->value, false);
                    $count++;
                }
            }
        }

        return $count;
    }

    /**
     * Translate missing strings for every enabled non-default language.
     *
     * @return array<string, int>
     */
    public function translateAll(): array
    {
        $result = [];
        foreach (Language::where('enabled', true)->where('is_default', false)->pluck('code') as $code) {
            $result[$code] = $this->translateMissing($code);
        }

        return $result;
    }

    /**
     * @return Collection<int, string>
     */
    private function extractUiKeys(): Collection
    {
        $keys = collect();
        $dir = resource_path('js');
        if (! File::isDirectory($dir)) {
            return $keys;
        }

        foreach (File::allFiles($dir) as $file) {
            if (! in_array($file->getExtension(), ['js', 'jsx'], true)) {
                continue;
            }
            preg_match_all('/\bt\(\s*([\'"])(.+?)\1/s', $file->getContents(), $m);
            foreach ($m[2] as $raw) {
                // Unescape \' and \" from the captured literal.
                $keys->push(str_replace(["\\'", '\\"'], ["'", '"'], $raw));
            }
        }

        return $keys->unique()->values();
    }

    /**
     * @return array<string, string>
     */
    private function contentSources(): array
    {
        $out = [];

        foreach (Product::all() as $product) {
            foreach ($product->translatableFields() as $field) {
                if ($value = $product->getAttribute($field)) {
                    $out[$product->translationKey($field)] = (string) $value;
                }
            }
        }

        foreach (Plan::all() as $plan) {
            foreach ($plan->translatableFields() as $field) {
                if ($value = $plan->getAttribute($field)) {
                    $out[$plan->translationKey($field)] = (string) $value;
                }
            }
        }

        foreach (LegalController::docs() as $slug => $doc) {
            $out["legal:{$slug}:title"] = $doc['title'];
            foreach ($doc['body'] as $i => $para) {
                $out["legal:{$slug}:p{$i}"] = $para;
            }
        }

        return $out;
    }
}
