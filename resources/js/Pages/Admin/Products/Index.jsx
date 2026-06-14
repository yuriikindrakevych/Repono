import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';

const TYPES = [
    { value: 'drupal', label: 'Drupal module' },
    { value: 'wordpress', label: 'WordPress plugin' },
    { value: 'app', label: 'Web app' },
];

const field = { width: '100%', height: 'var(--control-h)', padding: '0 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-strong)', background: 'var(--surface-card)', font: 'inherit',
    fontSize: 'var(--fs-body-sm)', color: 'var(--text-strong)' };

export default function Index({ products }) {
    const [open, setOpen] = React.useState(false);
    const form = useForm({ name: '', slug: '', type: 'drupal', currency: 'USD', status: 'draft' });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.products.store'));
    };

    return (
        <AdminLayout title="Products" actions={<Button size="sm" onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'New product'}</Button>}>
            <Head title="Admin — Products" />

            {open ? (
                <form onSubmit={submit} className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
                    padding: 20, marginBottom: 20, display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 0.7fr 0.8fr auto', gap: 12, alignItems: 'end' }}>
                    <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">Name</span>
                        <input style={field} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} /></label>
                    <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">Slug</span>
                        <input style={field} value={form.data.slug} placeholder="acme-commerce" onChange={(e) => form.setData('slug', e.target.value)} /></label>
                    <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">Type</span>
                        <select style={field} value={form.data.type} onChange={(e) => form.setData('type', e.target.value)}>
                            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select></label>
                    <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">Currency</span>
                        <select style={field} value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                            {['USD', 'EUR', 'UAH', 'GBP'].map((c) => <option key={c} value={c}>{c}</option>)}
                        </select></label>
                    <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">Status</span>
                        <select style={field} value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                            <option value="draft">Draft</option><option value="published">Published</option>
                        </select></label>
                    <Button type="submit" disabled={form.processing}>Create</Button>
                    {Object.keys(form.errors).length > 0 ? (
                        <span style={{ gridColumn: '1 / -1', color: 'var(--danger-600)', fontSize: 'var(--fs-caption)' }}>
                            {Object.values(form.errors)[0]}
                        </span>
                    ) : null}
                </form>
            ) : null}

            <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip' }}>
                {products.map((p) => (
                    <Link key={p.id} href={route('admin.products.edit', p.slug)} style={{ display: 'flex', alignItems: 'center', gap: 16,
                        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <span style={{ flex: 1, display: 'grid', gap: 3 }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{p.name}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>repono/{p.slug} · {p.type_label}</span>
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)', width: 220 }}>
                            {p.plans} plans · {p.releases} releases · {p.licenses} licenses
                        </span>
                        <Badge tone={p.status === 'published' ? 'active' : 'neutral'} dot>{p.status}</Badge>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}
