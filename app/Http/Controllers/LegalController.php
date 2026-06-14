<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    private const DOCS = [
        'offer' => [
            'title' => 'Договір публічної оферти',
            'updated' => '14 червня 2026',
            'body' => [
                'Цей договір визначає умови, на яких Repono надає доступ до приватного репозиторію оновлень та ліцензій на власні розробки (модулі, плагіни, застосунки).',
                'Підписка активується після першого успішного списання. На кожне списання формується фіскальний чек. Ліцензія діє в межах оплаченого періоду та обраного плану (кількість активних доменів).',
                'Скасування підписки можливе в кабінеті й діє до кінця оплаченого періоду без пропорційного повернення. Несплата призводить до призупинення оновлень; ядро продукту лишається робочим.',
                'Це чернетка-плейсхолдер для розробки. Перед запуском замінюється на узгоджений із юристом текст.',
            ],
        ],
        'privacy' => [
            'title' => 'Політика конфіденційності',
            'updated' => '14 червня 2026',
            'body' => [
                'Ми обробляємо мінімум персональних даних, потрібних для надання послуги: e-mail, домени активацій, історію платежів і чеків.',
                'Дані картки не зберігаються — платіжний шлюз повертає лише токен (rectoken) для рекурентних списань.',
                'Обробка відповідає ЗУ «Про захист персональних даних». Ви можете запросити видалення акаунта та пов’язаних даних.',
                'Це чернетка-плейсхолдер для розробки. Перед запуском замінюється на узгоджений із юристом текст.',
            ],
        ],
    ];

    /**
     * @return array<string, array{title: string, updated: string, body: array<int, string>}>
     */
    public static function docs(): array
    {
        return self::DOCS;
    }

    public function show(string $doc): Response
    {
        if (! isset(self::DOCS[$doc])) {
            throw new NotFoundHttpException();
        }

        $source = self::DOCS[$doc];

        return Inertia::render('Legal', [
            'doc' => [
                'title' => \App\Models\Translation::content(app()->getLocale(), "legal:{$doc}:title") ?? $source['title'],
                'updated' => $source['updated'],
                'body' => collect($source['body'])
                    ->map(fn ($para, $i) => \App\Models\Translation::content(app()->getLocale(), "legal:{$doc}:p{$i}") ?? $para)
                    ->all(),
            ],
        ]);
    }
}
