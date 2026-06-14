<x-mail::message>
# Your subscription is suspended

We couldn’t collect payment for **{{ $product }}** within the grace period, so
updates and premium features are now paused. The product core keeps working.

Reactivate any time — start a new subscription to restore updates.

<x-mail::button :url="route('cabinet')">
Reactivate
</x-mail::button>

— Repono
</x-mail::message>
