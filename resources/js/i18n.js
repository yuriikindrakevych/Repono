/* Lightweight i18n. Messages are shared per-request by Inertia (the active
   locale's UI dictionary). `t(key)` returns the translation or the English
   source key itself — so wrapping strings incrementally never breaks the UI. */

let store = { locale: 'en', messages: {} };

export function setI18n(data) {
    if (data) {
        store = { locale: data.locale || 'en', messages: data.messages || {} };
    }
}

export function t(key, replacements) {
    let value = store.messages[key] ?? key;
    if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
            value = value.split(`:${k}`).join(String(v));
        }
    }
    return value;
}

export function getLocale() {
    return store.locale;
}
