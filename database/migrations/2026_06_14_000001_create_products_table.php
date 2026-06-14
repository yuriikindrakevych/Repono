<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type'); // App\Enums\ProductType
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            // { "cms": ["Drupal 10", "Drupal 11"], "php": ">=8.2" }
            $table->json('compatibility')->nullable();
            $table->string('status')->default('draft'); // App\Enums\ProductStatus
            $table->timestamps();

            $table->index('status');
            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
