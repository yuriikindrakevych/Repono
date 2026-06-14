<?php

namespace App\Mail;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentSucceededMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Subscription $subscription)
    {
        $this->subscription->loadMissing('plan.product');
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Payment received — your subscription renewed');
    }

    public function content(): Content
    {
        $order = $this->subscription->user->orders()
            ->where('subscription_id', $this->subscription->id)
            ->where('status', \App\Enums\OrderStatus::Paid)
            ->with('receipt')
            ->latest('paid_at')
            ->first();

        return new Content(markdown: 'emails.payment-succeeded', with: [
            'product' => $this->subscription->plan->product->name,
            'plan' => $this->subscription->plan->name,
            'periodEnd' => $this->subscription->current_period_end?->format('M j, Y'),
            'receiptUrl' => $order?->receipt?->url,
            'fiscalNumber' => $order?->receipt?->fiscal_number,
        ]);
    }
}
