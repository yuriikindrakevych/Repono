<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * App-managed settings (key → value). Values are encrypted at rest so secrets
 * like API keys are not stored in plaintext. Cached per key.
 */
class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    protected function casts(): array
    {
        return ['value' => 'encrypted'];
    }

    protected static function booted(): void
    {
        $flush = fn (Setting $s) => Cache::forget("setting:{$s->key}");
        static::saved($flush);
        static::deleted($flush);
    }

    public static function get(string $key, ?string $default = null): ?string
    {
        $value = Cache::rememberForever("setting:{$key}", fn () => static::where('key', $key)->value('value'));

        return ($value === null || $value === '') ? $default : $value;
    }

    public static function set(string $key, ?string $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    public static function has(string $key): bool
    {
        return static::get($key) !== null;
    }
}
