<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = ['code', 'name', 'native_name', 'is_default', 'enabled', 'sort'];

    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
            'enabled' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public static function default(): ?self
    {
        return static::where('is_default', true)->first();
    }

    public static function defaultCode(): string
    {
        return static::default()?->code ?? config('app.fallback_locale', 'en');
    }
}
