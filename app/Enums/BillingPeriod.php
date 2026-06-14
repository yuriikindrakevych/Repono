<?php

namespace App\Enums;

enum BillingPeriod: string
{
    case Monthly = 'monthly';
    case Yearly = 'yearly';

    public function addTo(\DateTimeInterface $date): \Illuminate\Support\Carbon
    {
        $carbon = \Illuminate\Support\Carbon::instance(
            $date instanceof \DateTime ? $date : \DateTime::createFromInterface($date)
        );

        return match ($this) {
            self::Monthly => $carbon->addMonth(),
            self::Yearly => $carbon->addYear(),
        };
    }
}
