<?php

namespace App\Services\Payments;

/**
 * Normalised result of a verified gateway callback (webhook).
 */
readonly class CallbackResult
{
    public function __construct(
        public string $reference,        // our order reference (gateway order_id)
        public string $status,           // approved | declined | pending
        public ?string $transactionId = null,
        public ?string $token = null,    // rectoken for future recurring charges
    ) {
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isDeclined(): bool
    {
        return $this->status === 'declined';
    }
}
