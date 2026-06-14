<?php

namespace App\Models;

use App\Enums\LicenseStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class License extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'user_id',
        'product_id',
        'plan_id',
        'subscription_id',
        'status',
        'expires_at',
        'repo_token',
    ];

    protected $hidden = [
        'repo_token',
    ];

    protected function casts(): array
    {
        return [
            'status' => LicenseStatus::class,
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function activations(): HasMany
    {
        return $this->hasMany(Activation::class);
    }

    public function getRouteKeyName(): string
    {
        return 'key';
    }

    /**
     * Active activation slots currently consumed.
     */
    public function activeActivationsCount(): int
    {
        return $this->activations()
            ->where('status', \App\Enums\ActivationStatus::Active)
            ->count();
    }

    /**
     * Whether another domain can still be activated under this license's plan.
     */
    public function hasFreeActivationSlot(): bool
    {
        $limit = $this->plan->activation_limit;

        if ($limit === null) {
            return true; // unlimited
        }

        return $this->activeActivationsCount() < $limit;
    }
}
