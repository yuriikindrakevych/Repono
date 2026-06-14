import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';

const field = { width: '100%', minHeight: 'var(--control-h)', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-strong)', background: 'var(--surface-card)', font: 'inherit',
    fontSize: 'var(--fs-body-sm)', color: 'var(--text-strong)' };
const Card = ({ title, children, action }) => (
    <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 style={{ fontSize: 'var(--fs-title)' }}>{title}</h2>{action}
        </div>
        <div style={{ padding: 20 }}>{children}</div>
    </div>
);
const Lbl = ({ label, children }) => (
    <label style={{ display: 'grid', gap: 6 }}><span className="r-eyebrow">{label}</span>{children}</label>
);

function ProductForm({ product, types }) {
    const form = useForm({ ...product });
    const save = (e) => { e.preventDefault(); form.put(route('admin.products.update', product.slug)); };
    return (
        <Card title="Product" action={<Badge tone={form.data.status === 'published' ? 'active' : 'neutral'} dot>{form.data.status}</Badge>}>
            <form onSubmit={save} style={{ display: 'grid', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <Lbl label="Name"><input style={field} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} /></Lbl>
                    <Lbl label="Slug"><input style={field} value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} /></Lbl>
                    <Lbl label="Type"><select style={field} value={form.data.type} onChange={(e) => form.setData('type', e.target.value)}>
                        {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Lbl>
                </div>
                <Lbl label="Tagline"><input style={field} value={form.data.tagline || ''} onChange={(e) => form.setData('tagline', e.target.value)} /></Lbl>
                <Lbl label="Description"><textarea style={{ ...field, minHeight: 70 }} value={form.data.description || ''} onChange={(e) => form.setData('description', e.target.value)} /></Lbl>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
                    <Lbl label="Compatible CMS (comma-separated)"><input style={field} value={form.data.compat_cms} onChange={(e) => form.setData('compat_cms', e.target.value)} /></Lbl>
                    <Lbl label="PHP"><input style={field} value={form.data.compat_php} onChange={(e) => form.setData('compat_php', e.target.value)} /></Lbl>
                    <Lbl label="Status"><select style={field} value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                        <option value="draft">Draft</option><option value="published">Published</option></select></Lbl>
                </div>
                <div><Button type="submit" disabled={form.processing}>Save product</Button></div>
            </form>
        </Card>
    );
}

function PlanRow({ plan }) {
    const form = useForm({ name: plan.name, slug: plan.slug, activation_limit: plan.activation_limit ?? '',
        price_monthly: plan.price_monthly ?? '', price_yearly: plan.price_yearly ?? '', features: plan.features, is_active: plan.is_active });
    const save = (e) => { e.preventDefault(); form.put(route('admin.plans.update', plan.id)); };
    const del = () => { if (confirm(`Delete plan ${plan.name}?`)) form.delete(route('admin.plans.destroy', plan.id)); };
    return (
        <form onSubmit={save} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr 1fr auto auto', gap: 8, alignItems: 'center',
            padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <input style={field} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
            <input style={field} value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
            <input style={field} value={form.data.activation_limit} placeholder="∞" onChange={(e) => form.setData('activation_limit', e.target.value)} />
            <input style={field} value={form.data.price_monthly} placeholder="kopiykas/mo" onChange={(e) => form.setData('price_monthly', e.target.value)} />
            <input style={field} value={form.data.price_yearly} placeholder="kopiykas/yr" onChange={(e) => form.setData('price_yearly', e.target.value)} />
            <Button size="sm" variant="secondary" type="submit">Save</Button>
            <Button size="sm" variant="ghost" type="button" onClick={del}>✕</Button>
        </form>
    );
}

function AddPlan({ product }) {
    const form = useForm({ name: '', slug: '', activation_limit: '', price_monthly: '', price_yearly: '', features: '', is_active: true });
    const submit = (e) => { e.preventDefault(); form.post(route('admin.plans.store', product.slug), { onSuccess: () => form.reset() }); };
    return (
        <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr 1fr auto', gap: 8, marginTop: 12 }}>
            <input style={field} placeholder="Plan name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
            <input style={field} placeholder="slug" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
            <input style={field} placeholder="limit" value={form.data.activation_limit} onChange={(e) => form.setData('activation_limit', e.target.value)} />
            <input style={field} placeholder="₴/mo (kop.)" value={form.data.price_monthly} onChange={(e) => form.setData('price_monthly', e.target.value)} />
            <input style={field} placeholder="₴/yr (kop.)" value={form.data.price_yearly} onChange={(e) => form.setData('price_yearly', e.target.value)} />
            <Button type="submit">Add</Button>
        </form>
    );
}

function UploadRelease({ product }) {
    const form = useForm({ version: '', channel: 'stable', changelog: '', artifact: null, publish: true });
    const submit = (e) => { e.preventDefault(); form.post(route('admin.releases.store', product.slug), { forceFormData: true, onSuccess: () => form.reset() }); };
    return (
        <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12 }}>
                <Lbl label="Version"><input style={field} placeholder="2.5.0" value={form.data.version} onChange={(e) => form.setData('version', e.target.value)} /></Lbl>
                <Lbl label="Channel"><select style={field} value={form.data.channel} onChange={(e) => form.setData('channel', e.target.value)}>
                    <option value="stable">stable</option><option value="beta">beta</option></select></Lbl>
                <Lbl label="Artifact (.zip)"><input type="file" accept=".zip" style={{ ...field, paddingTop: 7 }} onChange={(e) => form.setData('artifact', e.target.files[0])} /></Lbl>
            </div>
            <Lbl label="Changelog"><textarea style={{ ...field, minHeight: 56 }} value={form.data.changelog} onChange={(e) => form.setData('changelog', e.target.value)} /></Lbl>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Button type="submit" disabled={form.processing}>Upload release</Button>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                    <input type="checkbox" checked={form.data.publish} onChange={(e) => form.setData('publish', e.target.checked)} /> publish now
                </label>
                {form.progress ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>{form.progress.percentage}%</span> : null}
                {form.errors.artifact ? <span style={{ color: 'var(--danger-600)', fontSize: 'var(--fs-caption)' }}>{form.errors.artifact}</span> : null}
                {form.errors.version ? <span style={{ color: 'var(--danger-600)', fontSize: 'var(--fs-caption)' }}>{form.errors.version}</span> : null}
            </div>
        </form>
    );
}

export default function Edit({ product, plans, releases, types }) {
    const { post, delete: destroy } = useForm({});
    const toggle = (release) => post(route(release.is_published ? 'admin.releases.unpublish' : 'admin.releases.publish', release.id), { preserveScroll: true });
    const del = (release) => { if (confirm(`Delete release ${release.version}?`)) destroy(route('admin.releases.destroy', release.id), { preserveScroll: true }); };

    return (
        <AdminLayout title={product.name}>
            <Head title={`Admin — ${product.name}`} />
            <ProductForm product={product} types={types} />

            <Card title="Plans">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr 1fr auto auto', gap: 8 }}>
                    {['Name', 'Slug', 'Limit', 'Monthly', 'Yearly', '', ''].map((h, i) => (
                        <span key={i} className="r-eyebrow" style={{ paddingBottom: 4 }}>{h}</span>
                    ))}
                </div>
                {plans.map((p) => <PlanRow key={p.id} plan={p} />)}
                <AddPlan product={product} />
                <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', marginTop: 10 }}>Prices are in kopiykas (₴1 = 100). Empty limit = unlimited domains.</p>
            </Card>

            <Card title="Releases">
                <div style={{ marginBottom: 18 }}>
                    {releases.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No releases yet.</p> : releases.map((r) => (
                        <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-strong)', width: 80 }}>{r.version}</span>
                            <Badge tone={r.channel === 'stable' ? 'accent' : 'neutral'}>{r.channel}</Badge>
                            {r.is_published ? <Badge tone="active" dot>published</Badge> : <Badge tone="neutral">draft</Badge>}
                            <span style={{ flex: 1, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.changelog}</span>
                            <Button size="sm" variant="secondary" onClick={() => toggle(r)}>{r.is_published ? 'Unpublish' : 'Publish'}</Button>
                            <Button size="sm" variant="ghost" onClick={() => del(r)}>Delete</Button>
                        </div>
                    ))}
                </div>
                <UploadRelease product={product} />
            </Card>
        </AdminLayout>
    );
}
