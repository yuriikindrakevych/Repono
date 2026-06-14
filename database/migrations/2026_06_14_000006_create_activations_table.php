<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('license_id')->constrained()->cascadeOnDelete();
            $table->string('domain');
            $table->string('ip_address', 45)->nullable();
            $table->string('last_version')->nullable();
            $table->timestamp('last_heartbeat_at')->nullable();
            $table->string('status')->default('active'); // App\Enums\ActivationStatus
            $table->timestamps();

            // one slot per (license, domain)
            $table->unique(['license_id', 'domain']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activations');
    }
};
