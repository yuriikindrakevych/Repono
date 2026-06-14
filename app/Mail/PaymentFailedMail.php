<?php

namespace App\Mail;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentFailedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Subscription $subscription)
    {
        $this->subscription->loadMissing('plan.product');
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Payment failed — update your card to keep updates');
    }

    public function content(): Content
    {
        return new Content(markdown: 'emails.payment-failed', with: [
            'product' => $this->subscription->plan->product->name,
            'graceUntil' => $this->subscription->grace_until?->format('M j, Y'),
            'nextChargeAt' => $this->subscription->next_charge_at?->format('M j, Y'),
        ]);
    }
}
