import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Card } from '@/Components/repono/Card';
import { Badge } from '@/Components/repono/Badge';
import { MarketingHeader, Footer } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import { t } from '@/i18n';
import * as I from '@/Components/repono/icons';

const wrap = { maxWidth: '640px', margin: '0 auto', padding: '0 24px' };

export default function Success({ order }) {
    const { auth } = usePage().props;

    if (order.pending) {
        return (
            <div className="repono-surface">
                <Head title="Payment processing" />
                <MarketingHeader auth={auth} />
                <main style={{ ...wrap, paddingTop: 72, paddingBottom: 96, display: 'grid', gap: 16, textAlign: 'center', justifyItems: 'center' }}>
                    <span className="r-eyebrow">{t('Checkout')}</span>
                    <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>{t('Confirming your payment…')}</h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '46ch' }}>
                        {t('We’re waiting for the gateway to confirm order')} <span className="r-mono">{order.reference}</span>.{' '}
                        {t('Your license and receipt appear in your account the moment it clears — we’ll email you too.')}
                    </p>
                    <Link href={route('cabinet')}><Button size="lg" iconRight={<I.ArrowRight />}>{t('Go to your account')}</Button></Link>
                </main>
                <Footer />
            </div>
        );
    }

    const price = formatPrice(order.amount, order.currency);

    return (
        <div className="repono-surface">
            <Head title="Payment received" />
            <MarketingHeader auth={auth} />
            <main style={{ ...wrap, paddingTop: 56, paddingBottom: 80, display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gap: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ok-600)' }}>
                        <I.Check /> <span className="r-eyebrow" style={{ color: 'var(--ok-600)' }}>{t('Payment received')}</span>
                    </span>
                    <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>{t('Your license is ready.')}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {order.product} · {order.plan} — {t('charged :amount.', { amount: `${price} ${order.currency}` })}
                        {order.receipt ? ` ${t('Your :doc has been issued.', { doc: order.receipt.type_label.toLowerCase() })}` : ''}
                    </p>
                </div>

                <Card title={t('License key')}>
                    <div style={{ display: 'grid', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-lg)',
                            letterSpacing: '0.04em', color: 'var(--text-strong)' }}>{order.license_key}</span>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>
                            {t('Use it in :cmd or paste it in the plugin settings.').split(':cmd').map((part, i) => (
                                <React.Fragment key={i}>{i > 0 ? <span className="r-mono">composer require</span> : null}{part}</React.Fragment>
                            ))}
                        </span>
                    </div>
                </Card>

                {order.receipt ? (
                    <Card title={order.receipt.type_label} headerAction={<Badge tone="active" dot>{t('issued')}</Badge>}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-body)' }}>
                                {order.receipt.fiscal_number}
                            </span>
                            <a href={order.receipt.url} target="_blank" rel="noreferrer">
                                <Button variant="secondary" size="sm" iconLeft={<I.Receipt />}>{t('View document')}</Button>
                            </a>
                        </div>
                    </Card>
                ) : null}

                <div style={{ display: 'flex', gap: 12 }}>
                    <Link href={route('cabinet')}><Button size="lg" iconRight={<I.ArrowRight />}>{t('Go to your account')}</Button></Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
