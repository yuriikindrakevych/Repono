<?php

namespace App\Enums;

enum ReleaseChannel: string
{
    case Stable = 'stable';
    case Beta = 'beta';
}
