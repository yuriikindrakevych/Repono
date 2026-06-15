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
     * Translate source strings into the given locale. By default only missing
     * (and machine-translated, non-reviewed) strings are filled; with $force,
     * every string is re-translated except ones a human has reviewed/edited.
     */
    public function translateMissing(string $locale, bool $force = false): int
    {
        $lang = Language::where('code', $locale)->first();
        if (! $lang || $locale === Language::defaultCode()) {
            return 0;
        }

        $default = Language::defaultCode();
        $sources = Translation::where('locale', $default)->whereNotNull('value')->where('value', '!=', '')->get();

        // Never overwrite human-reviewed/edited translations, even on re-translate.
        $existing = Translation::where('locale', $locale)
            ->get()->keyBy(fn ($t) => $t->group.'|'.$t->key_hash);

        $todo = $sources->reject(function ($s) use ($existing, $force) {
            $current = $existing->get($s->group.'|'.$s->key_hash);
            if ($current && $current->reviewed) {
                return true; // keep human edits
            }

            return $force ? false : ($current && $current->value !== null && $current->value !== '');
        });

        $count = 0;
        foreach ($todo->groupBy('group') as $group => $rows) {
            $context = $group === 'ui'
                ? 'short interface labels, buttons and messages'
                : 'product descriptions and legal/marketing copy (full sentences)';
            // Smaller batches reduce the chance of a truncated response.
            foreach ($rows->chunk(20) as $chunk) {
                $chunk = $chunk->values();
                $translated = $this->safeTranslate($chunk->pluck('value')->all(), $lang->native_name, $context);
                foreach ($chunk as $i => $src) {
                    Translation::put($locale, $group, $src->key, $translated[$i] ?? $src->value, false);
                    $count++;
                }
            }
        }

        return $count;
    }

    /**
     * Translate a batch resiliently: on any failure (e.g. a truncated response
     * or a length mismatch) split the batch in half and retry, down to single
     * strings — a single un-translatable string falls back to its source so the
     * run never aborts.
     *
     * @param  array<int, string>  $texts
     * @return array<int, string>
     */
    private function safeTranslate(array $texts, string $languageName, ?string $context): array
    {
        if ($texts === []) {
            return [];
        }

        try {
            return $this->translator->translate($texts, $languageName, $context);
        } catch (\Throwable $e) {
            if (count($texts) === 1) {
                return [$texts[0]]; // keep the source; don't lose the string
            }
            $half = intdiv(count($texts), 2);

            return array_merge(
                $this->safeTranslate(array_slice($texts, 0, $half), $languageName, $context),
                $this->safeTranslate(array_slice($texts, $half), $languageName, $context),
            );
        }
    }

    /**
     * Translate for every enabled non-default language.
     *
     * @return array<string, int>
     */
    public function translateAll(bool $force = false): array
    {
        $result = [];
        foreach (Language::where('enabled', true)->where('is_default', false)->pluck('code') as $code) {
            $result[$code] = $this->translateMissing($code, $force);
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
