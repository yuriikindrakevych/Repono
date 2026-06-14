<?php

namespace App\Enums;

enum ProductType: string
{
    case Drupal = 'drupal';
    case WordPress = 'wordpress';
    case App = 'app';

    public function label(): string
    {
        return match ($this) {
            self::Drupal => 'Drupal module',
            self::WordPress => 'WordPress plugin',
            self::App => 'Web app',
        };
    }
}
