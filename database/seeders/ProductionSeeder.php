<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

/**
 * Minimal production seed — no demo catalog/customers. Seeds the source
 * language (+ Ukrainian); add more languages and the admin account after deploy.
 */
class ProductionSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            ['code' => 'en', 'name' => 'English', 'native_name' => 'English', 'is_default' => true, 'enabled' => true, 'sort' => 0],
            ['code' => 'uk', 'name' => 'Ukrainian', 'native_name' => 'Українська', 'is_default' => false, 'enabled' => true, 'sort' => 1],
        ];

        foreach ($languages as $lang) {
            Language::firstOrCreate(['code' => $lang['code']], $lang);
        }

        $this->command?->info('Seeded languages (en, uk).');
    }
}
