<?php

namespace App\Enums;

enum DocumentType: string
{
    case FiscalReceipt = 'fiscal_receipt'; // ПРРО — Ukrainian sales (UAH)
    case Invoice = 'invoice';              // international sales (USD/EUR/…)

    public function label(): string
    {
        return match ($this) {
            self::FiscalReceipt => 'Fiscal receipt',
            self::Invoice => 'Invoice',
        };
    }
}
