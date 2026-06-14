import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/repono/Badge';
import { Tag } from '@/Components/repono/Tag';

const CAT_TONE = {
    payment: 'accent', receipt: 'active', license: 'version',
    subscription: 'warn', activation: 'neutral', catalog: 'neutral', release: 'accent',
};

export default function Audit({ logs, categories, category }) {
    return (
        <AdminLayout title="Audit log">
            <Head title="Admin — Audit log" />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                <Tag selected={!category} onClick={() => router.get(route('admin.audit'))}>all</Tag>
                {categories.map((c) => (
                    <Tag key={c} mono selected={category === c} onClick={() => router.get(route('admin.audit'), { category: c })}>{c}</Tag>
                ))}
            </div>

            <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip' }}>
                {logs.data.length === 0 ? (
                    <p style={{ padding: 20, color: 'var(--text-muted)' }}>No events.</p>
                ) : logs.data.map((e) => (
                    <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 18px',
                        borderBottom: '1px solid var(--border-subtle)' }}>
                        <span style={{ width: 92 }}><Badge tone={CAT_TONE[e.category] || 'neutral'}>{e.category}</Badge></span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-xs)', color: 'var(--text-subtle)', width: 150 }}>{e.action}</span>
                        <span style={{ flex: 1, fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)' }}>{e.description}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)', width: 110 }}>{e.actor}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)', width: 130, textAlign: 'right' }}>{e.at}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 6, marginTop: 18, flexWrap: 'wrap' }}>
                {logs.links.map((l, i) => (
                    l.url ? (
                        <Link key={i} href={l.url} dangerouslySetInnerHTML={{ __html: l.label }} style={{
                            padding: '6px 11px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-body-sm)',
                            border: '1px solid var(--border-default)',
                            background: l.active ? 'var(--accent)' : 'var(--surface-card)',
                            color: l.active ? 'var(--white)' : 'var(--text-muted)' }} />
                    ) : (
                        <span key={i} dangerouslySetInnerHTML={{ __html: l.label }} style={{ padding: '6px 11px',
                            fontSize: 'var(--fs-body-sm)', color: 'var(--text-disabled)' }} />
                    )
                ))}
            </div>
        </AdminLayout>
    );
}
