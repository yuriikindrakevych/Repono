<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Subscription;
use Illuminate\Support\Facades\Http;

/**
 * Fondy (cloudipsp) gateway — hosted checkout with tokenization, signed
 * server callbacks, and server-to-server recurring charges.
 *
 * Amounts are in minor units (cents/kopiykas) — same as we store them.
 * Signature: sha1( password | <request values sorted by key, joined by "|"> ).
 */
class FondyGateway implements PaymentGateway
{
    /**
     * @param  array{merchant_id: string, secret_key: string, api_url: string, sandbox: bool}  $config
     */
    public function __construct(private readonly array $config)
    {
    }

    public function name(): string
    {
        return 'fondy';
    }

    public function createCheckout(Order $order, string $returnUrl, string $callbackUrl): string
    {
        $request = [
            'order_id' => $order->gateway_reference,
            'merchant_id' => $this->config['merchant_id'],
            'order_desc' => 'Repono order '.$order->gateway_reference,
            'amount' => (string) $order->amount,
            'currency' => $order->currency,
            'server_callback_url' => $callbackUrl,
            'response_url' => $returnUrl,
            'required_rectoken' => 'Y',          // get a token back for recurring
            'lang' => 'en',
        ];
        if ($this->config['sandbox']) {
            $request['sandbox'] = 'Y';
        }
        $request['signature'] = $this->sign($request);

        $response = Http::asJson()
            ->acceptJson()
            ->post($this->config['api_url'].'/checkout/url/', ['request' => $request])
            ->json('response', []);

        if (($response['response_status'] ?? null) !== 'success' || empty($response['checkout_url'])) {
            throw new \RuntimeException('Fondy checkout failed: '.($response['error_message'] ?? 'unknown error'));
        }

        return $response['checkout_url'];
    }

    public function parseCallback(array $payload): ?CallbackResult
    {
        if (! isset($payload['signature']) || ! $this->verify($payload)) {
            return null;
        }

        return new CallbackResult(
            reference: (string) ($payload['order_id'] ?? ''),
            status: $this->mapStatus($payload['order_status'] ?? ''),
            transactionId: isset($payload['payment_id']) ? (string) $payload['payment_id'] : null,
            token: $payload['rectoken'] ?? null,
        );
    }

    public function chargeRecurring(Subscription $subscription, int $amount, string $reference): ChargeOutcome
    {
        $request = [
            'order_id' => $reference,
            'merchant_id' => $this->config['merchant_id'],
            'order_desc' => 'Repono renewal '.$reference,
            'amount' => (string) $amount,
            'currency' => $subscription->plan->currency,
            'rectoken' => $subscription->gateway_token,
        ];
        $request['signature'] = $this->sign($request);

        $response = Http::asJson()
            ->post($this->config['api_url'].'/recurring/', ['request' => $request])
            ->json('response', []);

        return $this->mapStatus($response['order_status'] ?? '') === 'approved'
            ? ChargeOutcome::ok((string) ($response['payment_id'] ?? $reference))
            : ChargeOutcome::declined($response['error_message'] ?? ($response['response_description'] ?? 'Charge declined.'));
    }

    /**
     * @param  array<string, mixed>  $params
     */
    private function sign(array $params): string
    {
        // Fondy excludes these from the signature.
        unset($params['signature'], $params['response_signature_string'], $params['sandbox']);
        $params = array_filter($params, fn ($v) => $v !== '' && $v !== null);
        ksort($params);

        return sha1($this->config['secret_key'].'|'.implode('|', array_values($params)));
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function verify(array $payload): bool
    {
        return hash_equals($this->sign($payload), (string) $payload['signature']);
    }

    private function mapStatus(string $status): string
    {
        return match ($status) {
            'approved' => 'approved',
            'declined', 'expired', 'reversed', 'voided' => 'declined',
            default => 'pending',
        };
    }
}
