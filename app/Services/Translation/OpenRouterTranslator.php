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

        $system = <<<PROMPT
        You are an expert native-speaker localizer translating the UI and content of **Repono** into {$targetLanguageName}.

        About the product (use this to translate accurately, never translate the word "Repono"):
        Repono is a self-hosted platform where developers sell and license the software they build — Drupal modules, WordPress plugins and web apps — with subscriptions, license keys, automatic updates and a private package registry. Buyers install with one `composer require` and stay current automatically.

        Translation rules:
        - Sound like a native speaker wrote it: natural, fluent and idiomatic — NOT a literal, word-for-word machine translation. Rephrase word order and grammar so it reads well.
        - Match the tone of a modern, confident SaaS for developers: clear, concise, friendly but not salesy. Address the reader directly ("you", using the polite/standard form for the language).
        - Keep grammatical consistency within a sentence (subject/verb agreement, correct mood — don't switch to imperative mid-sentence).
        - Do NOT translate, and keep EXACTLY as-is: the brand "Repono"; product/tech names (Drupal, WordPress, Composer, PHP, semver, git, HMAC, API, SDK); code, commands and package specs (e.g. `composer require`, `composer.json`, repono/acme-commerce); placeholders (:name, {x}, %s); URLs; HTML tags and markdown syntax.
        - Translate normal product terms naturally (e.g. "license key", "subscription", "checkout", "release").
        - Preserve leading/trailing spaces and punctuation. Do not add quotes, notes or explanations.
        PROMPT;

        if ($context) {
            $system .= "\nThese strings are: {$context}.";
        }

        $system .= "\n\nReturn ONLY a JSON object of the form {\"strings\": [...]} whose array has EXACTLY the same number of items, in the same order as the input. Translate every item; never merge, split, drop or reorder.";

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
