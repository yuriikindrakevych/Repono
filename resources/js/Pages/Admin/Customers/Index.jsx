import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/repono/Badge';
import { t } from '@/i18n';

export default function Index({ customers }) {
    return (
        <AdminLayout title="Customers">
            <Head title="Admin — Customers" />
            <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip' }}>
                {customers.length === 0 ? <p style={{ padding: 20, color: 'var(--text-muted)' }}>{t('No customers yet.')}</p> : customers.map((c) => (
                    <Link key={c.id} href={route('admin.customers.show', c.id)} style={{ display: 'flex', alignItems: 'center', gap: 16,
                        padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <span style={{ flex: 1, display: 'grid', gap: 3 }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{c.name}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>{c.email}</span>
                        </span>
                        {c.verified ? <Badge tone="active" dot>{t('verified')}</Badge> : <Badge tone="warn" dot>{t('unverified')}</Badge>}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)', width: 200, textAlign: 'right' }}>
                            {c.subscriptions} {t('subs')} · {c.licenses} {t('licenses')}
                        </span>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}
