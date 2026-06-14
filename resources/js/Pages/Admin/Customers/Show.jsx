import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';

const SUB_TONE = { active: 'active', past_due: 'warn', grace: 'warn', canceled: 'neutral', expired: 'error' };
const LIC_TONE = { active: 'active', grace: 'warn', suspended: 'error' };

const Card = ({ title, children }) => (
    <div className="r-hairline" style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip', marginBottom: 22 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}><h2 style={{ fontSize: 'var(--fs-title)' }}>{title}</h2></div>
        <div style={{ padding: '8px 20px 18px' }}>{children}</div>
    </div>
);

export default function Show({ customer, subscriptions, licenses }) {
    const action = useForm({});
    const post = (name, id, confirmMsg) => {
        if (confirmMsg && !confirm(confirmMsg)) return;
        action.post(route(name, id), { preserveScroll: true });
    };
    const del = (name, id, confirmMsg) => { if (confirm(confirmMsg)) action.delete(route(name, id), { preserveScroll: true }); };

    return (
        <AdminLayout title={customer.name} actions={<Link href={route('admin.customers.index')}><Button size="sm" variant="secondary">← Customers</Button></Link>}>
            <Head title={`Admin — ${customer.name}`} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)', marginBottom: 22 }}>{customer.email}</p>

            <Card title="Subscriptions">
                {subscriptions.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>None.</p> : subscriptions.map((s) => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                        <span style={{ flex: 1 }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{s.product}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}> · {s.plan}{s.period_end ? ` · ends ${s.period_end}` : ''}</span>
                        </span>
                        <Badge tone={SUB_TONE[s.status] || 'neutral'} dot>{s.status}</Badge>
                        <Button size="sm" variant="secondary" onClick={() => post('admin.subscriptions.extend', s.id)}>Extend</Button>
                        <Button size="sm" variant="secondary" onClick={() => post('admin.subscriptions.reactivate', s.id)}>Reactivate</Button>
                        <Button size="sm" variant="danger" onClick={() => post('admin.subscriptions.suspend', s.id, 'Suspend this subscription?')}>Suspend</Button>
                    </div>
                ))}
            </Card>

            <Card title="Licenses & activations">
                {licenses.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>None.</p> : licenses.map((l) => (
                    <div key={l.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-strong)', flex: 1 }}>{l.key} · {l.product}</span>
                            <Badge tone={LIC_TONE[l.status] || 'neutral'} dot>{l.status}</Badge>
                            <Button size="sm" variant="secondary" onClick={() => post('admin.licenses.regenerate-key', l.id, 'Reissue the license key?')}>Reissue key</Button>
                            <Button size="sm" variant="secondary" onClick={() => post('admin.licenses.regenerate-token', l.id, 'Revoke and reissue the repo token?')}>Revoke token</Button>
                        </div>
                        {l.activations.length > 0 ? (
                            <div style={{ marginTop: 8, paddingLeft: 4, display: 'grid', gap: 6 }}>
                                {l.activations.map((a) => (
                                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)', flex: 1 }}>
                                            {a.domain} <span style={{ color: 'var(--text-subtle)' }}>· {a.last_heartbeat || 'never'}</span>
                                        </span>
                                        <Button size="sm" variant="ghost" onClick={() => del('admin.activations.destroy', a.id, `Reset activation ${a.domain}?`)}>Reset</Button>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </Card>
        </AdminLayout>
    );
}
