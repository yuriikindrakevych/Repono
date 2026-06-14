<?php

namespace App\Services\Licensing;

use App\Models\License;

/**
 * Issues human-readable license keys (RPN-XXXX-XXXX-XXXX) and opaque repo
 * tokens. Keys use a Crockford-style alphabet with ambiguous characters
 * (0/O, 1/I) removed so they survive being read aloud or copied by hand.
 */
class LicenseKeyGenerator
{
    private const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    private const PREFIX = 'RPN';

    public function key(): string
    {
        do {
            $key = $this->compose();
        } while (License::where('key', $key)->exists());

        return $key;
    }

    public function repoToken(): string
    {
        do {
            $token = bin2hex(random_bytes(24));
        } while (License::where('repo_token', $token)->exists());

        return $token;
    }

    private function compose(): string
    {
        $groups = [];

        for ($g = 0; $g < 3; $g++) {
            $chunk = '';
            for ($i = 0; $i < 4; $i++) {
                $chunk .= self::ALPHABET[random_int(0, strlen(self::ALPHABET) - 1)];
            }
            $groups[] = $chunk;
        }

        return self::PREFIX.'-'.implode('-', $groups);
    }
}
