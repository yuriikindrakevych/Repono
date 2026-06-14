<?php

namespace App\Models;

use App\Enums\ActivationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activation extends Model
{
    use HasFactory;

    protected $fillable = [
        'license_id',
        'domain',
        'ip_address',
        'last_version',
        'last_heartbeat_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => ActivationStatus::class,
            'last_heartbeat_at' => 'datetime',
        ];
    }

    public function license(): BelongsTo
    {
        return $this->belongsTo(License::class);
    }
}
