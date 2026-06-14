<?php

namespace App\Services\Translation;

/**
 * Offline stand-in used until an OpenRouter key is configured. Prefixes each
 * string with the language tag so the whole pipeline (mass translate → store →
 * switch locale → render) is verifiable without external calls.
 */
class FakeTranslator implements Translator
{
    public function translate(array $texts, string $targetLanguageName, ?string $context = null): array
    {
        $tag = mb_strtoupper(mb_substr($targetLanguageName, 0, 2));

        return array_map(fn (string $t) => "[{$tag}] {$t}", array_values($texts));
    }
}
