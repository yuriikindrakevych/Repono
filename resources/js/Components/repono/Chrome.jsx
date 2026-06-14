import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { t } from '@/i18n';

/* Repono shared chrome — logo lockup, marketing header, footer.
   Ported from the design-system UI kit; navigation wired to Inertia routes. */

export function Logo({ dark = false, size = 26 }) {
    const ink = dark ? '#EAEEF2' : '#171B21';
    const node = dark ? '#9DC4CA' : '#0E5A66';
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="3.1" stroke={ink} strokeWidth="1.8" />
                <path d="M3.4 11.6 H20.6" stroke={ink} strokeWidth="1.4" />
                <rect x="13.7" y="14.1" width="4" height="4" rx="0.8" fill={node} />
            </svg>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: size * 0.82,
                letterSpacing: '-0.03em', color: ink }}>Repono</span>
        </span>
    );
}

function NavAnchor({ href, children }) {
    return (
        <a href={href} style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', fontWeight: 500,
            color: 'var(--text-muted)', padding: '6px 2px', cursor: 'pointer',
        }}>{children}</a>
    );
}

export function MarketingHeader({ auth }) {
    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-page)',
            borderBottom: '1px solid var(--border-default)',
        }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', height: 64, padding: '0 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    <Link href={route('home')}><Logo /></Link>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }} className="rep-navlinks">
                        <NavAnchor href="#catalog">{t('Catalog')}</NavAnchor>
                        <NavAnchor href="#how">{t('How it works')}</NavAnchor>
                        <NavAnchor href="#releases">{t('Changelog')}</NavAnchor>
                    </nav>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <LanguageSwitcher compact />
                    {auth?.user ? (
                        <Link href={route('cabinet')}>
                            <Button size="sm" variant="secondary">{t('Account')}</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 500, color: 'var(--text-muted)' }}>
                                {t('Sign in')}
                            </Link>
                            <Link href={route('register')}>
                                <Button size="sm">{t('Start free trial')}</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export function AppHeader({ user }) {
    const initial = (user?.name || user?.email || '?').trim().charAt(0).toUpperCase();
    return (
        <header style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-default)' }}>
            <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', height: 60, padding: '0 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Link href={route('home')}><Logo size={24} /></Link>
                    <span style={{ width: 1, height: 22, background: 'var(--border-default)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)' }}>
                        account
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <LanguageSwitcher compact />
                    {user?.is_admin ? (
                        <Link href={route('admin.dashboard')} style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-accent)', fontWeight: 500 }}>{t('Admin')}</Link>
                    ) : null}
                    <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{user?.email}</span>
                    <span style={{ width: 30, height: 30, borderRadius: 'var(--radius-full)', background: 'var(--ink-800)',
                        color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>{initial}</span>
                    <Link href={route('logout')} method="post" as="button" style={{
                        background: 'none', border: 'none', cursor: 'pointer', font: 'inherit',
                        fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{t('Sign out')}</Link>
                </div>
            </div>
        </header>
    );
}

export function Footer({ year = 2026 }) {
    const col = (title, links) => (
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{title}</span>
            {links.map((l) => (
                <a key={l.label} href={l.href} style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{t(l.label)}</a>
            ))}
        </div>
    );
    return (
        <footer style={{ borderTop: '1px solid var(--border-default)', background: 'var(--surface-raised)' }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 24px 36px',
                display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }} className="rep-foot-grid">
                <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
                    <Logo size={24} />
                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', maxWidth: 240 }}>
                        {t('The self-hosted registry for selling and licensing the modules you build.')}
                    </p>
                </div>
                {col(t('Product'), [
                    { label: 'Catalog', href: '#catalog' },
                    { label: 'How it works', href: '#how' },
                    { label: 'Changelog', href: '#releases' },
                ])}
                {col(t('Developers'), [
                    { label: 'License API', href: '#how' },
                    { label: 'composer require', href: '#how' },
                ])}
                {col(t('Account'), [
                    { label: 'Sign in', href: route('login') },
                    { label: 'Start free trial', href: route('register') },
                ])}
            </div>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '16px 24px',
                borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-subtle)' }}>© {year} Repono</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-subtle)' }}>self-hosted · UA</span>
            </div>
        </footer>
    );
}
