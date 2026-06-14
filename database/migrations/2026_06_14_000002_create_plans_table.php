<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            // null = unlimited activations
            $table->unsignedInteger('activation_limit')->nullable();
            // prices stored in minor units (kopiykas); null = period not offered
            $table->unsignedInteger('price_monthly')->nullable();
            $table->unsignedInteger('price_yearly')->nullable();
            $table->string('currency', 3)->default('UAH');
            // ["priority-support", "white-label"]
            $table->json('features')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['product_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
