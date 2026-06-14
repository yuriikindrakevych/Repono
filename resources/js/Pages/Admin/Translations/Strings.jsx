import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/repono/Badge';
import { t } from '@/i18n';

const cell = { width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
    background: 'var(--surface-card)', font: 'inherit', fontSize: 'var(--fs-body-sm)', color: 'var(--text-strong)', minHeight: 36 };

function StringRow({ s, locale }) {
    const [value, setValue] = React.useState(s.value ?? '');
    const dirty = value !== (s.value ?? '');

    const save = () => {
        if (!dirty) return;
        router.put(route('admin.translations.update'), { locale, group: s.group, key: s.key, value },
            { preserveScroll: true, preserveState: true });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'start',
            padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                <Badge tone="neutral">{s.group}</Badge>
                <span style={{ display: 'block', marginTop: 4, color: 'var(--text-body)' }}>{s.source}</span>
            </div>
            <textarea style={cell} rows={1} value={value} onChange={(e) => setValue(e.target.value)} onBlur={save}
                placeholder="—" />
            <span style={{ width: 70, paddingTop: 8, textAlign: 'right' }}>
                {dirty ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--ochre-700)' }}>{t('unsaved')}</span>
                    : s.reviewed ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--ok-600)' }}>✓</span> : null}
            </span>
        </div>
    );
}

export default function Strings({ strings, locale, group, locales }) {
    const go = (params) => router.get(route('admin.translations.index'), { locale, group, ...params }, { preserveState: false });

    return (
        <AdminLayout title="Edit translations" actions={
            <Link href={route('admin.languages.index')}><span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>← {t('Languages')}</span></Link>
        }>
            <Head title="Admin — Translations" />

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
                <select value={locale} onChange={(e) => go({ locale: e.target.value })} style={cell}>
                    {locales.map((l) => <option key={l.code} value={l.code}>{l.native_name} ({l.code})</option>)}
                </select>
                <div style={{ display: 'flex', gap: 6 }}>
                    {[['', t('all')], ['ui', 'UI'], ['content', t('content')]].map(([g, label]) => (
                        <button key={label} type="button" onClick={() => go({ group: g })} style={{
                            font: 'inherit', fontSize: 'var(--fs-body-sm)', cursor: 'pointer', padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
                            background: (group || '') === g ? 'var(--accent)' : 'var(--surface-card)',
                            color: (group || '') === g ? 'var(--white)' : 'var(--text-muted)' }}>{label}</button>
                    ))}
                </div>
            </div>

            <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: '4px 18px 12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, padding: '10px 0' }}>
                    <span className="r-eyebrow">{t('Source (English)')}</span>
                    <span className="r-eyebrow">{locale}</span><span style={{ width: 70 }} />
                </div>
                {strings.data.map((s) => <StringRow key={s.group + s.key_hash} s={s} locale={locale} />)}
            </div>

            <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
                {strings.links.map((l, i) => (
                    l.url ? (
                        <Link key={i} href={l.url} dangerouslySetInnerHTML={{ __html: l.label }} style={{
                            padding: '6px 11px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-body-sm)',
                            border: '1px solid var(--border-default)', background: l.active ? 'var(--accent)' : 'var(--surface-card)',
                            color: l.active ? 'var(--white)' : 'var(--text-muted)' }} />
                    ) : <span key={i} dangerouslySetInnerHTML={{ __html: l.label }} style={{ padding: '6px 11px', fontSize: 'var(--fs-body-sm)', color: 'var(--text-disabled)' }} />
                ))}
            </div>
        </AdminLayout>
    );
}
