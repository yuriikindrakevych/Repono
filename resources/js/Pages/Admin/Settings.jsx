import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';
import { t } from '@/i18n';

const field = { width: '100%', height: 'var(--control-h)', padding: '0 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-strong)', background: 'var(--surface-card)', font: 'inherit',
    fontSize: 'var(--fs-body-sm)', color: 'var(--text-strong)' };

const Card = ({ title, action, children }) => (
    <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip', maxWidth: 680 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 style={{ fontSize: 'var(--fs-title)' }}>{title}</h2>{action}
        </div>
        <div style={{ padding: 20 }}>{children}</div>
    </div>
);

export default function Settings({ openrouter }) {
    const form = useForm({ openrouter_api_key: '', openrouter_model: openrouter.model || '', clear_key: false });

    const save = (e) => {
        e.preventDefault();
        form.put(route('admin.settings.update'), { preserveScroll: true, onSuccess: () => form.setData('openrouter_api_key', '') });
    };
    const removeKey = () => {
        if (!confirm(t('Remove the OpenRouter key? Translation falls back to the offline stub.'))) return;
        router.put(route('admin.settings.update'), { clear_key: true, openrouter_model: form.data.openrouter_model }, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Settings">
            <Head title="Admin — Settings" />

            <Card
                title={t('OpenRouter (mass translation)')}
                action={openrouter.key_set
                    ? <Badge tone="active" dot>{openrouter.source === 'database' ? t('key set') : t('key from .env')}</Badge>
                    : <Badge tone="warn" dot>{t('no key')}</Badge>}
            >
                <form onSubmit={save} style={{ display: 'grid', gap: 16 }}>
                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', margin: 0 }}>
                        {t('Used to auto-translate the interface and content. Without a key, an offline stub is used. Get a key at')}{' '}
                        <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">openrouter.ai/keys</a>.
                    </p>

                    <label style={{ display: 'grid', gap: 6 }}>
                        <span className="r-eyebrow">{t('API key')}</span>
                        <input type="password" autoComplete="off" style={field}
                            placeholder={openrouter.key_set ? t('•••••••• — leave blank to keep current') : 'sk-or-…'}
                            value={form.data.openrouter_api_key}
                            onChange={(e) => form.setData('openrouter_api_key', e.target.value)} />
                        {form.errors.openrouter_api_key ? (
                            <span style={{ color: 'var(--danger-600)', fontSize: 'var(--fs-caption)' }}>{form.errors.openrouter_api_key}</span>
                        ) : null}
                    </label>

                    <label style={{ display: 'grid', gap: 6 }}>
                        <span className="r-eyebrow">{t('Model')}</span>
                        <input style={field} placeholder="openai/gpt-4o-mini"
                            value={form.data.openrouter_model}
                            onChange={(e) => form.setData('openrouter_model', e.target.value)} />
                    </label>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Button type="submit" disabled={form.processing}>{t('Save')}</Button>
                        {openrouter.key_set && openrouter.source === 'database' ? (
                            <Button type="button" variant="ghost" onClick={removeKey}>{t('Remove key')}</Button>
                        ) : null}
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
