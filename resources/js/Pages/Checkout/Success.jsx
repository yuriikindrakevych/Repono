import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Card } from '@/Components/repono/Card';
import { Badge } from '@/Components/repono/Badge';
import { MarketingHeader, Footer } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import * as I from '@/Components/repono/icons';

const wrap = { maxWidth: '640px', margin: '0 auto', padding: '0 24px' };

export default function Success({ order }) {
    const { auth } = usePage().props;
    const price = formatPrice(order.amount, order.currency);

    return (
        <div className="repono-surface">
            <Head title="Payment received" />
            <MarketingHeader auth={auth} />
            <main style={{ ...wrap, paddingTop: 56, paddingBottom: 80, display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gap: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ok-600)' }}>
                        <I.Check /> <span className="r-eyebrow" style={{ color: 'var(--ok-600)' }}>Payment received</span>
                    </span>
                    <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>Your license is ready.</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {order.product} · {order.plan} — charged {price} {order.currency}. A fiscal receipt has been issued.
                    </p>
                </div>

                <Card title="License key">
                    <div style={{ display: 'grid', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-lg)',
                            letterSpacing: '0.04em', color: 'var(--text-strong)' }}>{order.license_key}</span>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>
                            Use it in <span className="r-mono">composer require</span> or paste it in the plugin settings.
                        </span>
                    </div>
                </Card>

                {order.receipt ? (
                    <Card title="Fiscal receipt" headerAction={<Badge tone="active" dot>issued</Badge>}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-body)' }}>
                                {order.receipt.fiscal_number}
                            </span>
                            <a href={order.receipt.url} target="_blank" rel="noreferrer">
                                <Button variant="secondary" size="sm" iconLeft={<I.Receipt />}>View receipt</Button>
                            </a>
                        </div>
                    </Card>
                ) : null}

                <div style={{ display: 'flex', gap: 12 }}>
                    <Link href={route('cabinet')}><Button size="lg" iconRight={<I.ArrowRight />}>Go to your account</Button></Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
