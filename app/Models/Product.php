<?php

namespace App\Models;

use App\Enums\ProductStatus;
use App\Enums\ProductType;
use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory, HasTranslations;

    public function translatableFields(): array
    {
        return ['name', 'tagline', 'description'];
    }

    protected $fillable = [
        'name',
        'slug',
        'type',
        'currency',
        'tagline',
        'description',
        'compatibility',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'type' => ProductType::class,
            'status' => ProductStatus::class,
            'compatibility' => 'array',
        ];
    }

    public function plans(): HasMany
    {
        return $this->hasMany(Plan::class);
    }

    public function releases(): HasMany
    {
        return $this->hasMany(Release::class);
    }

    public function licenses(): HasMany
    {
        return $this->hasMany(License::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * The latest published, stable release for this product.
     */
    public function latestRelease(): ?Release
    {
        return $this->releases()
            ->where('is_published', true)
            ->orderByDesc('released_at')
            ->first();
    }
}
