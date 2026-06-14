import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';
import { Card } from '@/Components/repono/Card';
import { Tag } from '@/Components/repono/Tag';
import { Tabs } from '@/Components/repono/Tabs';
import { Heartbeat } from '@/Components/repono/Heartbeat';
import { LicenseCard } from '@/Components/repono/LicenseCard';
import { EmptyState } from '@/Components/repono/EmptyState';
import { Toast } from '@/Components/repono/Toast';
import { AppHeader } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import * as I from '@/Components/repono/icons';

const wrap = { maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 24px' };

const SUB_TONE = {
    active: ['active', 'active'],
    past_due: ['warn', 'past due'],
    grace: ['warn', 'grace'],
    canceled: ['neutral', 'canceled'],
    expired: ['error', 'expired'],
};

function Th({ children, style }) {
    return <th style={{ textAlign: 'left', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', fontWeight: 500,
        borderBottom: '1px solid var(--border-default)', ...style }}>{children}</th>;
}
function Td({ children, style }) {
    return <td style={{ padding: '13px 16px', fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)',
        borderBottom: '1px solid var(--border-subtle)', ...style }}>{children}</td>;
}

function SubRow({ sub }) {
    const [tone, label] = SUB_TONE[sub.status] || ['neutral', sub.status];
    const cancel = () => {
        if (!window.confirm('Cancel this subscription? It stays active until the end of the paid period.')) return;
        router.post(route('cabinet.subscriptions.cancel', sub.id), {}, { preserveScroll: true });
    };
    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'grid', gap: 6, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', fontWeight: 500,
                            color: 'var(--text-strong)' }}>{sub.product}</span>
                        <Badge tone={tone} dot>{label}</Badge>
                    </div>
                    <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                        {sub.plan}{sub.renews ? ` · renews ${sub.renews}` : ''}
                    </span>
                </div>
                {sub.can_cancel ? (
                    <Button variant="danger" size="sm" onClick={cancel}>Cancel</Button>
                ) : null}
            </div>
        </Card>
    );
}

export default function Cabinet({ subscriptions = [], licenses = [], activations = [], invoices = [], counts = {} }) {
    const { auth, flash } = usePage().props;
    const [tab, setTab] = React.useState('subs');
    const [toast, setToast] = React.useState(null);

    const fireToast = React.useCallback((t) => {
        setToast(t);
        clearTimeout(window.__repToast);
        window.__repToast = setTimeout(() => setToast(null), 2800);
    }, []);

    React.useEffect(() => {
        if (flash?.message) fireToast({ tone: 'success', msg: flash.message });
    }, [flash?.message, fireToast]);

    const TABS = [
        { value: 'subs', label: 'Subscriptions', count: counts.subscriptions ?? subscriptions.length },
        { value: 'licenses', label: 'Licenses', count: counts.licenses ?? licenses.length },
        { value: 'activations', label: 'Activations', count: counts.activations ?? activations.length },
        { value: 'invoices', label: 'Invoices', count: counts.invoices ?? invoices.length },
        { value: 'payment', label: 'Payment method' },
    ];

    const deactivate = (a) => {
        if (!window.confirm(`Deactivate ${a.domain}? This frees the activation slot.`)) return;
        router.delete(route('cabinet.activations.deactivate', a.id), { preserveScroll: true });
    };

    function Panel() {
        if (tab === 'subs') {
            if (!subscriptions.length) {
                return (
                    <EmptyState icon={<I.Package />} title="No subscriptions yet"
                        actions={<a href={route('home') + '#catalog'}><Button iconLeft={<I.Plug />}>Browse the catalog</Button></a>}>
                        Pick a module and a plan to start a subscription. It’ll show up here with its renewal date and license key.
                    </EmptyState>
                );
            }
            return <div style={{ display: 'grid', gap: 14 }}>{subscriptions.map((s) => <SubRow key={s.id} sub={s} />)}</div>;
        }

        if (tab === 'licenses') {
            if (!licenses.length) {
                return (
                    <EmptyState icon={<I.Key />} title="No license keys yet">
                        Your license keys appear here once you start a subscription — copy one and run a
                        <span className="r-mono"> composer require</span> to install behind it.
                    </EmptyState>
                );
            }
            return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
                    {licenses.map((l) => (
                        <LicenseCard key={l.key} product={l.product} plan={l.plan} version={l.version}
                            licenseKey={l.key} status={l.status} heartbeatMeta={l.heartbeat_meta} meta={l.meta}
                            onCopy={(k) => {
                                navigator.clipboard?.writeText(k);
                                fireToast({ tone: 'success', msg: 'License key copied' });
                            }} />
                    ))}
                </div>
            );
        }

        if (tab === 'activations') {
            if (!activations.length) {
                return (
                    <EmptyState icon={<I.Globe />} title="No active domains">
                        Once a module checks in from a domain, it shows up here with its last heartbeat. You can free a slot any time.
                    </EmptyState>
                );
            }
            return (
                <Card flushBody>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead><tr>
                            <Th>Domain</Th><Th>Product</Th><Th>License</Th><Th>Heartbeat</Th><Th style={{ textAlign: 'right' }}>·</Th>
                        </tr></thead>
                        <tbody>
                            {activations.map((a) => (
                                <tr key={a.id}>
                                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-strong)' }}>{a.domain}</span></Td>
                                    <Td>{a.product}</Td>
                                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{a.license_key}</span></Td>
                                    <Td><Heartbeat status={a.heartbeat_status} meta={a.heartbeat_meta} /></Td>
                                    <Td style={{ textAlign: 'right' }}>
                                        <Button variant="ghost" size="sm" onClick={() => deactivate(a)}>Deactivate</Button>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            );
        }

        if (tab === 'invoices') {
            if (!invoices.length) {
                return (
                    <EmptyState icon={<I.Receipt />} title="No invoices yet">
                        Every successful charge generates a fiscal receipt (ПРРО) you can open here. Nothing has been billed yet.
                    </EmptyState>
                );
            }
            return (
                <Card flushBody>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead><tr>
                            <Th>Invoice</Th><Th>Date</Th><Th>Description</Th><Th>Amount</Th><Th style={{ textAlign: 'right' }}>·</Th>
                        </tr></thead>
                        <tbody>
                            {invoices.map((v) => (
                                <tr key={v.reference}>
                                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-strong)' }}>{v.reference}</span></Td>
                                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{v.date}</span></Td>
                                    <Td>{v.description}</Td>
                                    <Td><span style={{ fontFamily: 'var(--font-mono)' }}>{formatPrice(v.amount, v.currency)} {v.currency}</span></Td>
                                    <Td style={{ textAlign: 'right' }}>
                                        {v.receipt_url ? (
                                            <a href={v.receipt_url} target="_blank" rel="noreferrer">
                                                <Button variant="ghost" size="sm" iconLeft={<I.Receipt />}>Receipt</Button>
                                            </a>
                                        ) : null}
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            );
        }

        // payment method
        return (
            <Card title="Payment method">
                <div style={{ display: 'grid', gap: 14, maxWidth: 520 }}>
                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', margin: 0 }}>
                        No card on file. You’ll add one securely at checkout when you start your first subscription —
                        Repono stores only a payment token, never your card number.
                    </p>
                    <div>
                        <a href={route('home') + '#catalog'}>
                            <Button variant="secondary" iconRight={<I.ArrowRight />}>Browse the catalog</Button>
                        </a>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className="repono-surface" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Head title="Account" />
            <AppHeader user={auth?.user} />

            <main style={{ ...wrap, paddingTop: 28, paddingBottom: 80, flex: 1 }}>
                <div style={{ display: 'grid', gap: 4, marginBottom: 20 }}>
                    <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>Account</h1>
                    <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                        Manage your subscriptions, licenses and activations.
                    </span>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <Tabs items={TABS} value={tab} onChange={setTab} />
                </div>

                <Panel />
            </main>

            {toast ? (
                <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
                    <Toast tone={toast.tone}>{toast.msg}</Toast>
                </div>
            ) : null}
        </div>
    );
}
