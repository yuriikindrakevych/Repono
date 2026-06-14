import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';
import { Tag } from '@/Components/repono/Tag';
import { Card } from '@/Components/repono/Card';
import { Terminal } from '@/Components/repono/Terminal';
import { VersionTable } from '@/Components/repono/VersionTable';
import { Heartbeat } from '@/Components/repono/Heartbeat';
import { MarketingHeader, Footer } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import * as I from '@/Components/repono/icons';

const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' };

function Meta({ icon, label, value }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)',
                fontSize: 'var(--fs-body-sm)' }}>
                <span style={{ display: 'inline-flex', fontSize: 15, color: 'var(--text-subtle)' }}>{icon}</span>{label}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-strong)' }}>{value}</span>
        </div>
    );
}

function PlanCard({ plan, period }) {
    const featured = plan.is_featured;
    const minor = period === 'yearly' ? plan.price_yearly : plan.price_monthly;
    const price = formatPrice(minor, plan.currency);
    const cadence = period === 'yearly' ? '/yr' : '/mo';
    const domains = plan.activation_limit === null
        ? 'Unlimited' : `${plan.activation_limit} domain${plan.activation_limit === 1 ? '' : 's'}`;

    return (
        <div style={{
            position: 'relative', display: 'grid', gap: 18, alignContent: 'start',
            background: 'var(--surface-card)',
            border: featured ? '1.5px solid var(--teal-600)' : '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)', padding: '26px 24px',
            boxShadow: featured ? 'var(--shadow-md)' : 'none',
        }}>
            {featured ? (
                <span style={{ position: 'absolute', top: -11, left: 24 }}>
                    <Badge tone="accent">Most agencies pick this</Badge>
                </span>
            ) : null}
            <div style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-title)', fontWeight: 600,
                    color: 'var(--text-strong)' }}>{plan.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600,
                    letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>{price ?? '—'}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>{cadence}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-xs)',
                    color: 'var(--ochre-700)', background: 'var(--ochre-100)', border: '1px solid var(--ochre-200)',
                    borderRadius: 'var(--radius-xs)', padding: '3px 7px' }}>{domains}</span>
            </div>
            <Link href={route('register')}>
                <Button variant={featured ? 'primary' : 'secondary'} style={{ width: '100%' }}>
                    {featured ? 'Start free trial' : `Choose ${plan.name}`}
                </Button>
            </Link>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 11,
                borderTop: '1px solid var(--border-subtle)', paddingTop: 18 }}>
                {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start',
                        fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)' }}>
                        <span style={{ color: 'var(--accent)', marginTop: 1, display: 'inline-flex', flex: 'none' }}><I.Check /></span>{f}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Show({ product, plans = [], releases = [], auth }) {
    const [period, setPeriod] = React.useState('monthly');
    const compat = product.compatibility || {};
    const compatTags = [...(compat.cms || []), ...(compat.php ? [`php ${compat.php}`] : [])];
    const isWordPress = product.type === 'wordpress';

    return (
        <div className="repono-surface">
            <Head title={`${product.name} — ${product.type_label}`} />
            <MarketingHeader auth={auth} />

            <main style={{ paddingBottom: 80 }}>
                {/* HEADER */}
                <section style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--surface-card)' }}>
                    <div style={{ ...wrap, padding: '36px 24px 32px', display: 'grid', gap: 20 }}>
                        <Link href={route('home') + '#catalog'} style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                            ← Catalog
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-lg)', fontWeight: 500,
                                color: 'var(--text-strong)' }}>
                                {product.package.split('/')[0]}<span style={{ color: 'var(--text-subtle)' }}>/</span>{product.package.split('/')[1]}
                            </span>
                            {product.latest_version ? <Badge tone="version">v{product.latest_version}</Badge> : null}
                            <Badge tone="active" dot>maintained</Badge>
                        </div>
                        <p style={{ fontSize: 'var(--fs-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 500,
                            letterSpacing: '-0.02em', color: 'var(--text-strong)', maxWidth: '24ch', lineHeight: 1.12 }}>
                            {product.tagline}
                        </p>
                        {compatTags.length ? (
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {compatTags.map((c) => <Tag key={c} mono>{c}</Tag>)}
                            </div>
                        ) : null}
                    </div>
                </section>

                <div style={{ ...wrap, paddingTop: 40, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40,
                    alignItems: 'start' }} className="rep-product-grid">
                    {/* MAIN */}
                    <div style={{ display: 'grid', gap: 36, minWidth: 0 }}>
                        <div style={{ display: 'grid', gap: 14 }}>
                            <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>What it does</h2>
                            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-body)', maxWidth: '64ch' }}>
                                {product.description || product.tagline}
                            </p>
                        </div>

                        {releases.length ? (
                            <div style={{ display: 'grid', gap: 16 }}>
                                <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>Release history</h2>
                                <VersionTable defaultOpen={0} releases={releases} />
                            </div>
                        ) : null}
                    </div>

                    {/* SIDEBAR */}
                    <aside style={{ position: 'sticky', top: 84, display: 'grid', gap: 20 }} className="rep-product-aside">
                        <Card raised flushBody>
                            <div style={{ padding: 'var(--space-5)', display: 'grid', gap: 14 }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                                    textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Install</span>
                                {isWordPress ? (
                                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)', margin: 0 }}>
                                        {product.install_command}
                                    </p>
                                ) : (
                                    <Terminal name="bash" lines={[{ type: 'command', text: product.install_command }]} />
                                )}
                                <Link href={route('register')}>
                                    <Button iconLeft={<I.Plug />} style={{ width: '100%' }}>Connect module</Button>
                                </Link>
                                <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', margin: 0 }}>
                                    Requires a license key. Start a free trial to get one.
                                </p>
                            </div>
                        </Card>

                        <Card title="Details">
                            <div style={{ display: 'grid' }}>
                                <Meta icon={<I.Package />} label="Type" value={product.type_label} />
                                {compat.php ? <Meta icon={<I.Terminal />} label="Runtime" value={`PHP ${compat.php}`} /> : null}
                                <Meta icon={<I.Key />} label="License" value="Per-domain" />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>Latest build</span>
                                    <Heartbeat status="active" label="passing" meta="2h ago" />
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>

                {/* PRICING */}
                {plans.length ? (
                    <section id="pricing" style={{ ...wrap, paddingTop: 72 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                            gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
                            <div style={{ display: 'grid', gap: 10 }}>
                                <span className="r-eyebrow">Pricing</span>
                                <h2 style={{ fontSize: 'var(--fs-display-md)', maxWidth: '20ch' }}>
                                    Priced per active domain. Staging is free.
                                </h2>
                            </div>
                            <div style={{ display: 'inline-flex', padding: 3, gap: 2, background: 'var(--surface-sunken)',
                                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)' }}>
                                {['monthly', 'yearly'].map((p) => (
                                    <button key={p} type="button" onClick={() => setPeriod(p)} style={{
                                        font: 'inherit', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)',
                                        fontWeight: 500, cursor: 'pointer', border: 'none', padding: '6px 16px',
                                        borderRadius: 'var(--radius-full)',
                                        background: period === p ? 'var(--surface-card)' : 'transparent',
                                        color: period === p ? 'var(--text-strong)' : 'var(--text-muted)',
                                        boxShadow: period === p ? 'var(--shadow-xs)' : 'none',
                                    }}>{p === 'monthly' ? 'Monthly' : 'Yearly'}</button>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(plans.length, 3)}, 1fr)`,
                            gap: 20, alignItems: 'start' }} className="rep-plans">
                            {plans.map((plan) => <PlanCard key={plan.slug} plan={plan} period={period} />)}
                        </div>
                    </section>
                ) : null}
            </main>

            <Footer />
        </div>
    );
}
