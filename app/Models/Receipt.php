<?php

namespace App\Models;

use App\Enums\ReceiptStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'payment_id',
        'type',
        'provider',
        'fiscal_number',
        'status',
        'total',
        'currency',
        'url',
        'payload',
        'issued_at',
    ];

    protected function casts(): array
    {
        return [
            'type' => \App\Enums\DocumentType::class,
            'status' => ReceiptStatus::class,
            'total' => 'integer',
            'payload' => 'array',
            'issued_at' => 'datetime',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}
