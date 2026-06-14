<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 8);
            $table->string('group', 16)->default('ui'); // ui | content
            $table->text('key');                          // UI: source string · content: table:id:field
            $table->char('key_hash', 40)->index();        // sha1(key) for uniqueness
            $table->text('value')->nullable();
            $table->boolean('reviewed')->default(false);  // human-checked vs machine-translated
            $table->timestamps();

            $table->unique(['locale', 'group', 'key_hash']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
