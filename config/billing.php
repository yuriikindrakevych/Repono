<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Dunning
    |--------------------------------------------------------------------------
    | Retry offsets (in days) after a failed recurring charge, and the grace
    | window during which the license keeps working before suspension (ТЗ §5.4).
    */

    // Days after the first failed charge to retry. Length = max retry attempts.
    'retry_days' => [1, 3, 5],

    // Total grace window (days) from the first failed charge to suspension.
    'grace_days' => 7,

    // Default payment gateway driver.
    'gateway' => env('BILLING_GATEWAY', 'fake'),
];
