<?php

namespace App\Services\Translation;

use Illuminate\Support\Facades\Http;

/**
 * Batch translation via OpenRouter (any chat model). Asks for a JSON array of
 * strings back, preserving placeholders/markup, so a whole UI/content batch is
 * translated in one call.
 */
class OpenRouterTranslator implements Translator
{
    /**
     * @param  array{key: ?string, model: string, app_url: ?string, app_name: ?string}  $config
     */
    public function __construct(private readonly array $config)
    {
    }

    public function translate(array $texts, string $targetLanguageName, ?string $context = null): array
    {
        if ($texts === []) {
            return [];
        }

        $system = "You are a professional software localizer. Translate each string in the JSON array "
            ."into {$targetLanguageName}. Keep the meaning natural and concise for a SaaS UI. "
            .'Preserve placeholders (:name, {x}, %s), HTML tags, markdown, code, brand names and URLs unchanged. '
            .($context ? "Context: {$context}. " : '')
            .'Return ONLY a JSON array of the translated strings, in the same order, same length.';

        $response = Http::withToken($this->config['key'])
            ->withHeaders(array_filter([
                'HTTP-Referer' => $this->config['app_url'] ?? null,
                'X-Title' => $this->config['app_name'] ?? null,
            ]))
            ->acceptJson()
            ->timeout(120)
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => $this->config['model'],
                'temperature' => 0.2,
                'response_format' => ['type' => 'json_object'],
                'messages' => [
                    ['role' => 'system', 'content' => $system],
                    ['role' => 'user', 'content' => json_encode(['strings' => array_values($texts)], JSON_UNESCAPED_UNICODE)],
                ],
            ]);

        $response->throw();
        $content = (string) $response->json('choices.0.message.content', '');

        $decoded = json_decode($content, true);
        // Accept either a bare array or {"strings":[...]} / {"translations":[...]}.
        $out = is_array($decoded)
            ? ($decoded['strings'] ?? $decoded['translations'] ?? (array_is_list($decoded) ? $decoded : []))
            : [];

        if (count($out) !== count($texts)) {
            throw new \RuntimeException('Translator returned '.count($out).' items, expected '.count($texts));
        }

        return array_map('strval', array_values($out));
    }
}
