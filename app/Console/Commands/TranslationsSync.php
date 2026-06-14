<?php

namespace App\Console\Commands;

use App\Services\Translation\TranslationManager;
use Illuminate\Console\Command;

class TranslationsSync extends Command
{
    protected $signature = 'translations:sync {--translate : Also machine-translate missing strings}';

    protected $description = 'Collect source UI keys + translatable content; optionally mass-translate';

    public function handle(TranslationManager $manager): int
    {
        $synced = $manager->sync();
        $this->info("Synced {$synced['ui']} UI + {$synced['content']} content source strings.");

        if ($this->option('translate')) {
            foreach ($manager->translateAll() as $code => $count) {
                $this->info("  {$code}: {$count} translated");
            }
        }

        return self::SUCCESS;
    }
}
