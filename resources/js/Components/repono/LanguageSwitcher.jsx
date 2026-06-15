import React from 'react';
import { usePage } from '@inertiajs/react';

/* On the storefront the locale lives in the URL path (/uk/...) — the default
   language has no prefix. Everywhere else (cabinet, admin) we fall back to
   ?lang=, which the SetLocale middleware persists in the session. A full reload
   refreshes both the UI dictionary and the translated content. */
export function LanguageSwitcher({ compact = false }) {
    const { i18n } = usePage().props;
    const locales = i18n?.locales ?? [];
    if (locales.length <= 1) return null;

    const onChange = (e) => {
        const code = e.target.value;

        if (i18n.path_localized) {
            const known = locales.map((l) => l.code);
            const segments = window.location.pathname.split('/').filter(Boolean);
            // Drop any existing locale prefix.
            if (segments.length && known.includes(segments[0])) segments.shift();
            const rest = segments.join('/');
            const prefix = code === i18n.default ? '' : `/${code}`;
            const path = rest ? `${prefix}/${rest}` : (prefix || '/');
            window.location.href = path + window.location.search + window.location.hash;
            return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set('lang', code);
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
