import React from 'react';
import { usePage } from '@inertiajs/react';

/* Switches locale via ?lang= (the SetLocale middleware persists it in session
   and a full reload refreshes both the UI dictionary and translated content). */
export function LanguageSwitcher({ compact = false }) {
    const { i18n } = usePage().props;
    const locales = i18n?.locales ?? [];
    if (locales.length <= 1) return null;

    const onChange = (e) => {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', e.target.value);
        window.location.href = url.toString();
    };

    return (
        <select value={i18n.locale} onChange={onChange} aria-label="Language" style={{
            font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)',
            color: 'var(--text-muted)', background: 'transparent', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)', padding: compact ? '4px 6px' : '6px 10px', cursor: 'pointer',
        }}>
            {locales.map((l) => <option key={l.code} value={l.code}>{l.native_name}</option>)}
        </select>
    );
}
