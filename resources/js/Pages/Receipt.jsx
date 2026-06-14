import React from 'react';
import { Head } from '@inertiajs/react';
import { Badge } from '@/Components/repono/Badge';
import { Logo } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import { t } from '@/i18n';

const wrap = { maxWidth: '560px', margin: '0 auto', padding: '0 24px' };

export default function Receipt({ receipt }) {
    const price = `${formatPrice(receipt.total, receipt.currency)} ${receipt.currency}`;
    const isFiscal = receipt.type !== 'invoice';

    const Line = ({ label, value, mono = true }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0',
            borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>{label}</span>
            <span style={{ fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)', fontSize: 'var(--fs-mono-sm)',
                color: 'var(--text-strong)', textAlign: 'right' }}>{value}</span>
        </div>
    );

    return (
        <div className="repono-surface" style={{ minHeight: '100vh', paddingTop: 48, paddingBottom: 64 }}>
            <Head title={`Receipt ${receipt.fiscal_number}`} />
            <div style={wrap}>
                <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'clip' }}>
                    <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Logo size={22} />
                        <Badge tone={receipt.status === 'issued' ? 'active' : 'warn'} dot>{receipt.status}</Badge>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <span className="r-eyebrow">{isFiscal ? 'Фіскальний чек · ПРРО' : t('Invoice')}</span>
                        <h1 style={{ fontSize: 'var(--fs-display-sm)', margin: '8px 0 20px' }}>{receipt.fiscal_number}</h1>
                        <div style={{ display: 'grid' }}>
                            <Line label={t('Product')} value={receipt.product} mono={false} />
                            <Line label={t('Plan')} value={`${receipt.plan} · ${receipt.billing_period}`} mono={false} />
                            <Line label={t('Order')} value={receipt.reference} />
                            <Line label={t('Buyer')} value={receipt.buyer} />
                            <Line label={t('Issued')} value={receipt.issued_at} />
                            <Line label={t('Provider')} value={receipt.provider} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 18 }}>
                            <span style={{ color: 'var(--text-muted)' }}>{t('Total')}</span>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display-sm)',
                                fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{price}</span>
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center', fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', marginTop: 16 }}>
                    {isFiscal
                        ? 'Simulated fiscal receipt for development. A real ПРРО number is issued via checkbox / ДПС in production.'
                        : (receipt.note || 'Invoice for an international sale — no Ukrainian ПРРО applies.')}
                </p>
            </div>
        </div>
    );
}
