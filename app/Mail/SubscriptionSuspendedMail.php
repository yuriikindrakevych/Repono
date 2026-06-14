<?php

namespace App\Mail;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubscriptionSuspendedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Subscription $subscription)
    {
        $this->subscription->loadMissing('plan.product');
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Subscription suspended — updates are paused');
    }

    public function content(): Content
    {
        return new Content(markdown: 'emails.subscription-suspended', with: [
            'product' => $this->subscription->plan->product->name,
        ]);
    }
}
