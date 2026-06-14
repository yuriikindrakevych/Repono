<?php

namespace App\Models\Concerns;

use App\Models\Language;
use App\Models\Translation;
use Illuminate\Support\Facades\App;

/**
 * Lets a model expose translatable text fields. Source text lives in the
 * model's own column (default language); other locales are stored as content
 * translations keyed by "<table>:<id>:<field>".
 */
trait HasTranslations
{
    /**
     * Translatable field names.
     *
     * @return array<int, string>
     */
    abstract public function translatableFields(): array;

    public function translationKey(string $field): string
    {
        return $this->getTable().':'.$this->getKey().':'.$field;
    }

    /**
     * The field value in the active locale (falls back to the source column).
     */
    public function tr(string $field): ?string
    {
        $source = $this->getAttribute($field);
        $locale = App::getLocale();

        if ($locale === Language::defaultCode()) {
            return $source;
        }

        return Translation::content($locale, $this->translationKey($field)) ?? $source;
    }
}
