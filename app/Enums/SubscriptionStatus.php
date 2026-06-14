<?php

namespace App\Enums;

enum SubscriptionStatus: string
{
    case Active = 'active';
    case PastDue = 'past_due';
    case Grace = 'grace';
    case Canceled = 'canceled';
    case Expired = 'expired';

    /**
     * Statuses under which the subscription still entitles the customer to
     * updates and premium features.
     */
    public function isEntitled(): bool
    {
        return in_array($this, [self::Active, self::PastDue, self::Grace], true);
    }
}
