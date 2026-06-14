<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Recurring billing: charge renewals + advance dunning, daily (ТЗ §5.4).
Schedule::command('subscriptions:charge-due')->dailyAt('06:00')->withoutOverlapping();
