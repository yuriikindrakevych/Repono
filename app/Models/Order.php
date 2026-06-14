<?php

namespace App\Models;

use App\Enums\BillingPeriod;
use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_id',
        'billing_period',
        'amount',
        'currency',
        'status',
        'accepted_terms_at',
        'paid_at',
        'gateway',
        'gateway_reference',
        'subscription_id',
        'license_id',
    ];

    protected function casts(): array
    {
        return [
            'status' => OrderStatus::class,
            'billing_period' => BillingPeriod::class,
            'amount' => 'integer',
            'accepted_terms_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function license(): BelongsTo
    {
        return $this->belongsTo(License::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function receipt(): HasOne
    {
        return $this->hasOne(Receipt::class);
    }

    public function isPaid(): bool
    {
        return $this->status === OrderStatus::Paid;
    }
}
