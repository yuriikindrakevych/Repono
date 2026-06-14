import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/repono/Badge';
import { formatPrice } from '@/Components/repono/format';

const CAT_TONE = {
    payment: 'accent', receipt: 'active', license: 'version',
    subscription: 'warn', activation: 'neutral', catalog: 'neutral', release: 'accent',
};

function Stat({ label, value, sub }) {
    return (
        <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
            padding: '18px 20px', display: 'grid', gap: 6 }}>
            <span className="r-eyebrow">{label}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display-sm)', fontWeight: 600,
                letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{value}</span>
            {sub ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>{sub}</span> : null}
        </div>
    );
}

function MoneyStat({ label, items, sub }) {
    const many = items.length > 1;
    return (
        <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
            padding: '18px 20px', display: 'grid', gap: 6 }}>
            <span className="r-eyebrow">{label}</span>
            <div style={{ display: 'grid', gap: 2 }}>
                {items.length === 0 ? (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>—</span>
                ) : items.map((it) => (
                    <span key={it.currency} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em',
                        color: 'var(--text-strong)', fontSize: many ? 'var(--fs-title)' : 'var(--fs-display-sm)' }}>
                        {formatPrice(it.amount, it.currency)} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>{it.currency}</span>
                    </span>
                ))}
            </div>
            {sub ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>{sub}</span> : null}
        </div>
    );
}

export default function Dashboard({ metrics, audit }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin — Dashboard" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16 }}>
                <MoneyStat label="MRR" items={metrics.mrr} sub="monthly recurring revenue" />
                <MoneyStat label="Revenue · 30d" items={metrics.revenue_30d} />
                <Stat label="Active subscriptions" value={metrics.active_subscriptions} />
                <Stat label="Active licenses" value={metrics.active_licenses} />
                <Stat label="Customers" value={metrics.customers} />
                <Stat label="Published products" value={metrics.products} />
                <Stat label="Failed payments · 30d" value={metrics.failed_payments_30d} sub="dunning in progress" />
                <Stat label="Fiscal receipts" value={metrics.receipts} />
            </div>

            <div style={{ marginTop: 32 }}>
                <h2 style={{ fontSize: 'var(--fs-title)', marginBottom: 14 }}>Recent activity</h2>
                <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip' }}>
                    {audit.length === 0 ? (
                        <p style={{ padding: 20, color: 'var(--text-muted)' }}>No events yet.</p>
                    ) : audit.map((e) => (
                        <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px',
                            borderBottom: '1px solid var(--border-subtle)' }}>
                            <span style={{ width: 88 }}><Badge tone={CAT_TONE[e.category] || 'neutral'}>{e.category}</Badge></span>
                            <span style={{ flex: 1, fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)' }}>{e.description}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>{e.actor}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)', width: 110, textAlign: 'right' }}>{e.at}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
