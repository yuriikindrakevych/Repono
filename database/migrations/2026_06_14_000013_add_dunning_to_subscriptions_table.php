<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            // Next scheduled recurring charge / dunning retry.
            $table->timestamp('next_charge_at')->nullable()->after('current_period_end');
            $table->timestamp('last_charged_at')->nullable()->after('next_charge_at');
            $table->index(['status', 'next_charge_at']);
        });
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropIndex(['status', 'next_charge_at']);
            $table->dropColumn(['next_charge_at', 'last_charged_at']);
        });
    }
};
