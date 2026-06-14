<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('releases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('version'); // semver, e.g. 2.4.1
            $table->string('channel')->default('stable'); // App\Enums\ReleaseChannel
            $table->text('changelog')->nullable();
            // path to the stored .zip / git tag artifact
            $table->string('artifact_path')->nullable();
            $table->string('checksum')->nullable(); // sha256 of the artifact
            $table->unsignedBigInteger('artifact_size')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamp('released_at')->nullable();
            $table->timestamps();

            $table->unique(['product_id', 'version']);
            $table->index(['product_id', 'is_published']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('releases');
    }
};
