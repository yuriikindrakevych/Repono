<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Translation extends Model
{
    protected $fillable = ['locale', 'group', 'key', 'key_hash', 'value', 'reviewed'];

    protected function casts(): array
    {
        return ['reviewed' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::saving(function (Translation $t) {
            $t->key_hash = sha1($t->key);
        });

        $flush = fn (Translation $t) => Cache::forget("translations:{$t->locale}:{$t->group}");
        static::saved($flush);
        static::deleted($flush);
    }

    /**
     * Upsert a translation value.
     */
    public static function put(string $locale, string $group, string $key, ?string $value, bool $reviewed = false): self
    {
        return static::updateOrCreate(
            ['locale' => $locale, 'group' => $group, 'key_hash' => sha1($key)],
            ['key' => $key, 'value' => $value, 'reviewed' => $reviewed],
        );
    }

    /**
     * Cached key => value map for a locale + group.
     *
     * @return array<string, string>
     */
    public static function messages(string $locale, string $group = 'ui'): array
    {
        return Cache::rememberForever("translations:{$locale}:{$group}", fn () => static::query()
            ->where('locale', $locale)->where('group', $group)
            ->whereNotNull('value')->where('value', '!=', '')
            ->pluck('value', 'key')->all());
    }

    public static function content(string $locale, string $key): ?string
    {
        return static::messages($locale, 'content')[$key] ?? null;
    }
}
