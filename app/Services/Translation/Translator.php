<?php

namespace App\Services\Translation;

interface Translator
{
    /**
     * Translate a batch of strings into the target language. Returns the
     * translations in the same order as the input.
     *
     * @param  array<int, string>  $texts
     * @return array<int, string>
     */
    public function translate(array $texts, string $targetLanguageName, ?string $context = null): array;
}
