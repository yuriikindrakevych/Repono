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

    // Default payment gateway driver: fake | fondy.
    'gateway' => env('BILLING_GATEWAY', 'fake'),

    // Fondy (cloudipsp) — multi-currency, recurring + tokenization.
    // Defaults are Fondy's public sandbox merchant so the flow works without
    // a real account; override with your own credentials in production.
    'fondy' => [
        'merchant_id' => env('FONDY_MERCHANT_ID', '1396424'),
        'secret_key' => env('FONDY_SECRET_KEY', 'test'),
        'api_url' => env('FONDY_API_URL', 'https://pay.fondy.eu/api'),
        'sandbox' => (bool) env('FONDY_SANDBOX', true),
    ],
];
