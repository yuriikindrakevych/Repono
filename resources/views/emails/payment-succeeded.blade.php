<x-mail::message>
# Payment received

Your subscription to **{{ $product }}** ({{ $plan }}) renewed{{ $periodEnd ? " through $periodEnd" : '' }}.

@if(!empty($fiscalNumber))
A fiscal receipt **{{ $fiscalNumber }}** has been issued.
@endif

@if(!empty($receiptUrl))
<x-mail::button :url="$receiptUrl">
View receipt
</x-mail::button>
@endif

— Repono
</x-mail::message>
