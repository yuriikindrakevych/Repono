<?php

namespace App\Models;

use App\Enums\ReleaseChannel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Release extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'version',
        'channel',
        'changelog',
        'artifact_path',
        'checksum',
        'artifact_size',
        'is_published',
        'released_at',
    ];

    protected function casts(): array
    {
        return [
            'channel' => ReleaseChannel::class,
            'is_published' => 'boolean',
            'artifact_size' => 'integer',
            'released_at' => 'datetime',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
