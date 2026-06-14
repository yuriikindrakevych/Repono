import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Card } from '@/Components/repono/Card';
import { Checkbox } from '@/Components/repono/Checkbox';
import { Alert } from '@/Components/repono/Alert';
import { MarketingHeader, Footer } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import { t } from '@/i18n';
import * as I from '@/Components/repono/icons';

const wrap = { maxWidth: '720px', margin: '0 auto', padding: '0 24px' };

export default function Show({ plan, period, amount, currency }) {
    const { auth, flash } = usePage().props;
    const form = useForm({ period, accept_terms: false });
    const price = formatPrice(amount, currency);
    const cadence = period === 'yearly' ? t('per year') : t('per month');

    const submit = (e) => {
        e.preventDefault();
        form.post(route('checkout.store', plan.id));
    };

    const Row = ({ label, value, strong }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>{label}</span>
            <span style={{ fontFamily: strong ? 'var(--font-display)' : 'var(--font-mono)',
                fontSize: strong ? 'var(--fs-title)' : 'var(--fs-mono-sm)',
                fontWeight: strong ? 600 : 400, color: 'var(--text-strong)' }}>{value}</span>
        </div>
    );

    return (
        <div className="repono-surface">
            <Head title="Checkout" />
            <MarketingHeader auth={auth} />
            <main style={{ ...wrap, paddingTop: 48, paddingBottom: 80, display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gap: 8 }}>
                    <span className="r-eyebrow">{t('Checkout')}</span>
                    <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>{t('Start your subscription')}</h1>
                </div>

                {flash?.message ? <Alert tone="error" icon={<I.Receipt />}>{flash.message}</Alert> : null}

                <Card>
                    <div style={{ display: 'grid', gap: 4 }}>
                        <Row label={t('Module')} value={plan.package} />
                        <Row label={t('Plan')} value={plan.name} />
                        <Row label={t('Billing')} value={cadence} />
                        <Row label={t('Total')} value={`${price} ${currency}`} strong />
                    </div>
                </Card>

                <form onSubmit={submit} style={{ display: 'grid', gap: 18 }}>
                    <Checkbox
                        checked={form.data.accept_terms}
                        onChange={(e) => form.setData('accept_terms', e.target.checked)}
                        label={(
                            <span>
                                {t('I accept the')}{' '}
                                <a href={route('legal', 'offer')} target="_blank" rel="noreferrer">{t('public offer')}</a>
                                {' '}{t('and the')}{' '}
                                <a href={route('legal', 'privacy')} target="_blank" rel="noreferrer">{t('privacy policy')}</a>.
                            </span>
                        )}
                    />
                    {form.errors.accept_terms ? (
                        <span style={{ color: 'var(--danger-600)', fontSize: 'var(--fs-caption)' }}>
                            {t('Please accept the offer and privacy policy to continue.')}
                        </span>
                    ) : null}

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Button type="submit" size="lg" iconRight={<I.ArrowRight />} disabled={form.processing}>
                            {t('Continue to payment')}
                        </Button>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>
                            {t('You’ll be charged :amount :cadence.', { amount: `${price} ${currency}`, cadence })}
                        </span>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
