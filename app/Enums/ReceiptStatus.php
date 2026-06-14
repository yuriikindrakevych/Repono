<?php

namespace App\Enums;

enum ReceiptStatus: string
{
    case Pending = 'pending';
    case Issued = 'issued';
    case Failed = 'failed';
}
