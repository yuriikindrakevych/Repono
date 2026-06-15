<?php

namespace App\Console\Commands;

use App\Services\Translation\TranslationManager;
use Illuminate\Console\Command;

class TranslationsSync extends Command
{
    protected $signature = 'translations:sync
        {--translate : Also machine-translate missing strings}
        {--force : Re-translate existing strings too (keeps human-reviewed edits)}';

    protected $description = 'Collect source UI keys + translatable content; optionally mass-translate';

    public function handle(TranslationManager $manager): int
    {
        $synced = $manager->sync();
        $this->info("Synced {$synced['ui']} UI + {$synced['content']} content source strings.");

        if ($this->option('translate') || $this->option('force')) {
            foreach ($manager->translateAll($this->option('force')) as $code => $count) {
                $this->info("  {$code}: {$count} translated");
            }
        }

        return self::SUCCESS;
    }
}
