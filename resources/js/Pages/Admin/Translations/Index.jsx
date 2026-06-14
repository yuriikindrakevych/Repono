import React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';
import { t } from '@/i18n';

const field = { width: '100%', height: 'var(--control-h)', padding: '0 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-strong)', background: 'var(--surface-card)', font: 'inherit',
    fontSize: 'var(--fs-body-sm)', color: 'var(--text-strong)' };

export default function Index({ languages, driver }) {
    const add = useForm({ code: '', name: '', native_name: '' });
    const post = (url, data = {}) => router.post(url, data, { preserveScroll: true });

    const submitAdd = (e) => { e.preventDefault(); add.post(route('admin.languages.store'), { onSuccess: () => add.reset() }); };

    return (
        <AdminLayout title="Languages & translations" actions={
            <div style={{ display: 'flex', gap: 10 }}>
                <Button size="sm" variant="secondary" onClick={() => post(route('admin.languages.sync'))}>{t('Sync source strings')}</Button>
                <Button size="sm" onClick={() => post(route('admin.languages.translate'))}>{t('Auto-translate missing')}</Button>
            </div>
        }>
            <Head title="Admin — Languages" />

            <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', marginBottom: 18 }}>
                Translation engine: <span className="r-mono" style={{ color: 'var(--text-strong)' }}>{driver}</span>.
                “Sync” scans the app for source strings; “Auto-translate” fills every missing string for each language.
            </p>

            <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip', marginBottom: 22 }}>
                {languages.map((l) => {
                    const pct = l.total ? Math.round((l.translated / l.total) * 100) : 0;
                    return (
                        <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '13px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <span style={{ width: 150, display: 'grid', gap: 2 }}>
                                <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{l.native_name}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>{l.code}</span>
                            </span>
                            {l.is_default ? <Badge tone="accent">{t('source')}</Badge> : (
                                l.enabled ? <Badge tone="active" dot>{t('enabled')}</Badge> : <Badge tone="neutral">{t('disabled')}</Badge>
                            )}
                            <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ flex: 1, height: 6, background: 'var(--surface-inset)', borderRadius: 999, overflow: 'hidden' }}>
                                    <span style={{ display: 'block', height: '100%', width: `${pct}%`, background: 'var(--accent)' }} />
                                </span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)', width: 110, textAlign: 'right' }}>
                                    {l.translated}/{l.total}
                                </span>
                            </span>
                            {! l.is_default ? (
                                <>
                                    <Button size="sm" variant="secondary" onClick={() => post(route('admin.languages.translate'), { code: l.code })}>{t('Translate')}</Button>
                                    <Link href={route('admin.translations.index', { locale: l.code })}><Button size="sm" variant="ghost">{t('Edit')}</Button></Link>
                                    <Button size="sm" variant="ghost" onClick={() => post(route('admin.languages.update', l.id) /* toggle */, { enabled: ! l.enabled })}>{l.enabled ? t('Disable') : t('Enable')}</Button>
                                    <Button size="sm" variant="ghost" onClick={() => { if (confirm(`Remove ${l.native_name}? Its translations are deleted.`)) router.delete(route('admin.languages.destroy', l.id), { preserveScroll: true }); }}>✕</Button>
                                </>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <form onSubmit={submitAdd} className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
                padding: 20, display: 'grid', gridTemplateColumns: '0.6fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">{t('Code')}</span>
                    <input style={field} placeholder="de" value={add.data.code} onChange={(e) => add.setData('code', e.target.value)} /></label>
                <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">{t('Name (English)')}</span>
                    <input style={field} placeholder="German" value={add.data.name} onChange={(e) => add.setData('name', e.target.value)} /></label>
                <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">{t('Native name')}</span>
                    <input style={field} placeholder="Deutsch" value={add.data.native_name} onChange={(e) => add.setData('native_name', e.target.value)} /></label>
                <Button type="submit" disabled={add.processing}>{t('Add language')}</Button>
                {Object.keys(add.errors).length > 0 ? (
                    <span style={{ gridColumn: '1 / -1', color: 'var(--danger-600)', fontSize: 'var(--fs-caption)' }}>{Object.values(add.errors)[0]}</span>
                ) : null}
            </form>
        </AdminLayout>
    );
}
