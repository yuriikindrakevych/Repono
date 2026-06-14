<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('amount');
            $table->string('currency', 3)->default('UAH');
            $table->string('status')->default('pending'); // App\Enums\PaymentStatus
            $table->string('gateway'); // wayforpay / fondy / fake
            // gateway transaction id; for recurring we store only the card token (rectoken)
            $table->string('gateway_payment_id')->nullable();
            $table->string('error')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
