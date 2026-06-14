<?php

namespace App\Enums;

enum LicenseStatus: string
{
    case Active = 'active';
    case Grace = 'grace';
    case Suspended = 'suspended';

    /**
     * Whether the license currently grants updates and premium features.
     * A suspended license keeps the product core working but blocks both.
     */
    public function grantsUpdates(): bool
    {
        return in_array($this, [self::Active, self::Grace], true);
    }
}
