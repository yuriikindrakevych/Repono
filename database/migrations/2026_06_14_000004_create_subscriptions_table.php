<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained()->restrictOnDelete();
            $table->string('status')->default('active'); // App\Enums\SubscriptionStatus
            $table->string('billing_period'); // App\Enums\BillingPeriod
            $table->timestamp('current_period_start')->nullable();
            $table->timestamp('current_period_end')->nullable();
            $table->timestamp('canceled_at')->nullable();
            // dunning bookkeeping for failed recurring charges
            $table->timestamp('grace_until')->nullable();
            $table->unsignedSmallInteger('payment_attempts')->default(0);
            // payment gateway: we persist only the card token (rectoken), never card data
            $table->string('gateway')->nullable(); // wayforpay / fondy
            $table->string('gateway_token')->nullable();
            $table->string('gateway_reference')->nullable();
            $table->timestamps();

            $table->index(['status', 'current_period_end']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
