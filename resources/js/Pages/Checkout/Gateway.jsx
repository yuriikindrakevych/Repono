import React from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';
import { formatPrice } from '@/Components/repono/format';
import { t } from '@/i18n';
import * as I from '@/Components/repono/icons';

export default function Gateway({ order, pay_url, signature }) {
    const [processing, setProcessing] = React.useState(false);
    const price = formatPrice(order.amount, order.currency);

    const send = (outcome) => {
        setProcessing(true);
        router.post(pay_url, { outcome, signature }, { onFinish: () => setProcessing(false) });
    };

    return (
        <div className="repono-surface" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
            <Head title="Payment" />
            <div style={{ width: 440, maxWidth: '100%', background: 'var(--surface-card)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)', overflow: 'clip' }}>
                <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'inline-flex', color: 'var(--text-subtle)' }}><I.Lock /></span>
                        {t('secure checkout')}
                    </span>
                    <Badge tone="warn">{t('simulated gateway')}</Badge>
                </div>

                <div style={{ padding: '26px 22px', display: 'grid', gap: 18 }}>
                    <div style={{ display: 'grid', gap: 6 }}>
                        <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                            {order.product} · {order.plan}
                        </span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600,
                            letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>
                            {price} <span style={{ fontSize: 16, color: 'var(--text-subtle)' }}>{order.currency}</span>
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>
                            {order.reference}
                        </span>
                    </div>

                    <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', margin: 0 }}>
                        {t('No real card is charged. The gateway posts a signed (HMAC) result back to Repono, which verifies it and issues your license and fiscal receipt.')}
                    </p>

                    <div style={{ display: 'grid', gap: 10 }}>
                        <Button size="lg" onClick={() => send('success')} disabled={processing}
                            iconLeft={<I.Lock />}>{t('Pay :amount', { amount: `${price} ${order.currency}` })}</Button>
                        <Button size="lg" variant="danger" onClick={() => send('decline')} disabled={processing}>
                            {t('Simulate a declined card')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
