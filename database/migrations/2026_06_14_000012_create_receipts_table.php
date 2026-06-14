<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('payment_id')->nullable()->constrained()->nullOnDelete();
            $table->string('provider'); // checkbox / dps / fake
            $table->string('fiscal_number'); // ПРРО fiscal number
            $table->string('status')->default('issued'); // App\Enums\ReceiptStatus
            $table->unsignedInteger('total');
            $table->string('currency', 3)->default('UAH');
            $table->string('url')->nullable(); // link to the receipt / PDF
            $table->json('payload')->nullable(); // raw provider response
            $table->timestamp('issued_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
