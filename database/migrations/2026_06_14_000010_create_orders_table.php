<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();
            $table->string('billing_period'); // App\Enums\BillingPeriod
            $table->unsignedInteger('amount'); // minor units (kopiykas)
            $table->string('currency', 3)->default('UAH');
            $table->string('status')->default('pending'); // App\Enums\OrderStatus
            $table->timestamp('accepted_terms_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->string('gateway')->nullable();
            $table->string('gateway_reference')->unique()->nullable(); // orderReference (idempotency)
            // set once the order is fulfilled
            $table->foreignId('subscription_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('license_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
