import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/repono/Button';
import { Badge } from '@/Components/repono/Badge';
import { Tag } from '@/Components/repono/Tag';
import { Terminal } from '@/Components/repono/Terminal';
import { LicenseCard } from '@/Components/repono/LicenseCard';
import { VersionTable } from '@/Components/repono/VersionTable';
import { MarketingHeader, Footer } from '@/Components/repono/Chrome';
import { formatPrice } from '@/Components/repono/format';
import { t } from '@/i18n';
import * as I from '@/Components/repono/icons';

const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' };

// Renders a translated sentence with an inline code term, kept as one
// translatable unit (so grammar stays correct) via a :cmd placeholder.
function withCode(key, code) {
    return t(key).split(':cmd').map((part, i) => (
        <React.Fragment key={i}>
            {i > 0 ? <span className="r-mono" style={{ color: 'var(--text-body)' }}>{code}</span> : null}
            {part}
        </React.Fragment>
    ));
}

function StepRow({ n, icon, title, children }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, alignItems: 'start',
            padding: '22px 0', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-subtle)', paddingTop: 2 }}>0{n}</span>
            <div style={{ display: 'grid', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--accent)', fontSize: 18, display: 'inline-flex' }}>{icon}</span>
                    <h3 style={{ fontSize: 'var(--fs-title)', margin: 0 }}>{title}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)', maxWidth: '52ch' }}>{children}</p>
            </div>
        </div>
    );
}

function ProductCard({ product }) {
    const compat = product.compatibility || {};
    const cms = compat.cms || [];
    const price = formatPrice(product.price_from, product.currency);

    return (
        <div className="r-hairline" style={{
            background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', overflow: 'clip',
            display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: 240 }}>
            <div style={{ padding: '18px 20px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <span className="r-eyebrow">{product.type_label}</span>
                {product.latest_version
                    ? <Badge tone="version">v{product.latest_version}</Badge>
                    : null}
            </div>
            <div style={{ padding: '10px 20px 16px', display: 'grid', gap: 10, alignContent: 'start' }}>
                <h3 style={{ fontSize: 'var(--fs-title)', margin: 0 }}>
                    <Link href={route('products.show', product.slug)} style={{ color: 'var(--text-strong)' }}>
                        {product.name}
                    </Link>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)', margin: 0 }}>{product.tagline}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                    {cms.map((c) => <Tag key={c} mono>{c}</Tag>)}
                    {compat.php ? <Tag mono>php {compat.php}</Tag> : null}
                </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-body)' }}>
                    {price ? <>{t('from')} <b style={{ color: 'var(--text-strong)' }}>{price}</b>{t('/mo')}</> : t('Contact us')}
                </span>
                <Link href={route('products.show', product.slug)}>
                    <Button size="sm" variant="secondary" iconRight={<I.ArrowRight />}>{t('View plans')}</Button>
                </Link>
            </div>
        </div>
    );
}

export default function Landing({ products = [], releases = [], stats = {}, auth }) {
    return (
        <div className="repono-surface">
            <Head title="Sell and license your modules" />
            <MarketingHeader auth={auth} />

            <main>
                {/* HERO */}
                <section style={{ ...wrap, paddingTop: 72, paddingBottom: 64,
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="rep-hero">
                    <div style={{ display: 'grid', gap: 24 }}>
                        <span className="r-eyebrow">{t('Self-hosted package registry')}</span>
                        <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                            {t('Sell your modules.')}<br />{t('Ship updates with one line.')}
                        </h1>
                        <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', maxWidth: '46ch' }}>
                            {t('Repono is the registry for the Drupal modules, WordPress plugins and apps you build.')}{' '}
                            {withCode('Buyers run one :cmd and stay current automatically — on your release schedule, behind your license keys.', 'composer require')}
                        </p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
                            <Link href={route('register')}>
                                <Button size="lg" iconLeft={<I.Plug />}>{t('Start free trial')}</Button>
                            </Link>
                            <a href="#catalog">
                                <Button size="lg" variant="secondary" iconRight={<I.ArrowRight />}>{t('Browse the catalog')}</Button>
                            </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 8,
                            fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>
                            <span>{products.length} module{products.length === 1 ? '' : 's'} live</span>
                            <span style={{ opacity: .4 }}>·</span>
                            <span>Drupal 10 · 11</span><span style={{ opacity: .4 }}>·</span>
                            <span>composer + git</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: 20, position: 'relative' }}>
                        <Terminal name="bash — acme.example" typeCommand lines={[
                            { type: 'comment', text: '# add the registry once, then require any module you’ve bought' },
                            { type: 'command', text: 'composer require repono/acme-commerce' },
                            { type: 'output', text: 'Resolving dependencies from repono.dev …' },
                            { type: 'output', text: 'Verifying license RPN-9F2K-7T1A-QM4D …' },
                            { type: 'success', text: '✓ Installed acme/commerce v2.4.1 — license active, auto-update on' },
                        ]} />
                        <div style={{ width: 360, maxWidth: '100%', marginLeft: 'auto' }}>
                            <LicenseCard product="repono/acme-commerce" plan="Team plan · 5 domains"
                                version="v2.4.1" licenseKey="RPN-9F2K-7T1A-QM4D" status="active"
                                heartbeatMeta="active · 12s ago" meta="acme.example" />
                        </div>
                    </div>
                </section>

                {/* TRUST STRIP */}
                <section style={{ borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)',
                    background: 'var(--surface-raised)' }}>
                    <div style={{ ...wrap, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 28,
                        flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
                            textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{t('Speaks your stack')}</span>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Tag mono>composer.json</Tag>
                            <Tag mono>semver</Tag>
                            <Tag mono>git tags</Tag>
                            <Tag mono>SHA-256 checksums</Tag>
                            <Tag mono>license API</Tag>
                            <Tag mono>webhooks</Tag>
                        </div>
                    </div>
                </section>

                {/* CATALOG */}
                <section id="catalog" style={{ ...wrap, paddingTop: 72, paddingBottom: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                        marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ display: 'grid', gap: 8 }}>
                            <span className="r-eyebrow">{t('Catalog')}</span>
                            <h2 style={{ fontSize: 'var(--fs-display-md)' }}>{t('Modules, plugins and apps — licensed and current.')}</h2>
                        </div>
                    </div>
                    {products.length ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                            {products.map((p) => <ProductCard key={p.slug} product={p} />)}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>No modules published yet.</p>
                    )}
                </section>

                {/* HOW IT WORKS */}
                <section id="how" style={{ ...wrap, paddingTop: 40, paddingBottom: 40,
                    display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 48 }} className="rep-how">
                    <div style={{ position: 'sticky', top: 88, alignSelf: 'start', display: 'grid', gap: 14 }}>
                        <span className="r-eyebrow">{t('From publish to paid')}</span>
                        <h2 style={{ fontSize: 'var(--fs-display-md)' }}>{t('Built around the manifest, not a marketplace.')}</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '36ch' }}>
                            {t('Every release is a signed, versioned artifact. Buyers consume it the way they consume everything else — through the package manager they already trust.')}
                        </p>
                    </div>
                    <div>
                        <StepRow n={1} icon={<I.GitBranch />} title={t('Tag a release')}>
                            {t('Push a git tag. Repono builds the artifact, computes its checksum, and writes the manifest. Stable and beta channels map to your branches.')}
                        </StepRow>
                        <StepRow n={2} icon={<I.Key />} title={t('Set a price and a license')}>
                            {t('Choose per-domain or per-seat. Each buyer gets a license key that gates installs and activations — no key, no update.')}
                        </StepRow>
                        <StepRow n={3} icon={<I.Refresh />} title={t('Updates ship themselves')}>
                            {t('Buyers on auto-update pull the next stable release on your schedule. You see every activation and its last heartbeat in real time.')}
                        </StepRow>
                    </div>
                </section>

                {/* RELEASES PREVIEW */}
                {releases.length ? (
                    <section id="releases" style={{ ...wrap, paddingTop: 40, paddingBottom: 80 }}>
                        <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
                            <span className="r-eyebrow">{t('Release history')}</span>
                            <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>{t('Every version, every changelog — in the open.')}</h2>
                        </div>
                        <VersionTable defaultOpen={0} releases={releases} />
                    </section>
                ) : null}

                {/* CTA */}
                <section style={{ background: 'var(--surface-inverse)' }}>
                    <div style={{ ...wrap, padding: '64px 24px', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
                        <div style={{ display: 'grid', gap: 10 }}>
                            <h2 style={{ color: 'var(--white)', fontSize: 'var(--fs-display-md)' }}>{t('Put your first module on the registry.')}</h2>
                            <p style={{ color: 'var(--text-on-dark-muted)', maxWidth: '44ch' }}>
                                {t('Free while you set it up. You only pay once buyers do.')}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <Link href={route('register')}>
                                <Button size="lg">{t('Start free trial')}</Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button size="lg" variant="ghost" className="rep-cta-ghost">{t('Open your account')}</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer year={stats.year || 2026} />
        </div>
    );
}
