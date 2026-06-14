<?php

namespace App\Services\Payments;

readonly class ChargeOutcome
{
    public function __construct(
        public bool $success,
        public ?string $transactionId = null,
        public ?string $error = null,
    ) {
    }

    public static function ok(string $transactionId): self
    {
        return new self(true, $transactionId);
    }

    public static function declined(string $error): self
    {
        return new self(false, null, $error);
    }
}
