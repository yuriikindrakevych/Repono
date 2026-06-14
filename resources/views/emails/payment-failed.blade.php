<x-mail::message>
# Your payment didn’t go through

We couldn’t charge your card for **{{ $product }}**.{{ $graceUntil ? " Your modules keep working until $graceUntil while you fix this." : '' }}

Update your payment method to keep automatic updates running.

<x-mail::button :url="route('cabinet')">
Update payment method
</x-mail::button>

@if(!empty($nextChargeAt))
We’ll try again on **{{ $nextChargeAt }}**.
@endif

— Repono
</x-mail::message>
