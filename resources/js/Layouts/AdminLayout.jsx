import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Logo } from '@/Components/repono/Chrome';
import { Toast } from '@/Components/repono/Toast';
import { t } from '@/i18n';

const NAV = [
    { label: 'Dashboard', route: 'admin.dashboard', match: '/admin' },
    { label: 'Products', route: 'admin.products.index', match: '/admin/products' },
    { label: 'Customers', route: 'admin.customers.index', match: '/admin/customers' },
    { label: 'Languages', route: 'admin.languages.index', match: '/admin/languages' },
    { label: 'Settings', route: 'admin.settings.index', match: '/admin/settings' },
    { label: 'Audit log', route: 'admin.audit', match: '/admin/audit' },
];

export default function AdminLayout({ title, actions, children }) {
    const { auth, flash } = usePage().props;
    const current = usePage().url;
    const [toast, setToast] = React.useState(null);

    React.useEffect(() => {
        if (flash?.message) {
            setToast(flash.message);
            clearTimeout(window.__adminToast);
            window.__adminToast = setTimeout(() => setToast(null), 2800);
        }
    }, [flash?.message]);

    const isActive = (item) => item.match === '/admin'
        ? current === '/admin' || current === '/admin/'
        : current.startsWith(item.match);

    return (
        <div className="repono-surface" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '236px 1fr' }}>
            <aside style={{ borderRight: '1px solid var(--border-default)', background: 'var(--surface-card)',
                display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
                <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Link href={route('admin.dashboard')}><Logo size={22} /></Link>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--text-subtle)', border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-xs)', padding: '2px 6px' }}>admin</span>
                </div>
                <nav style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                    {NAV.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link key={item.route} href={route(item.route)} style={{
                                display: 'block', padding: '9px 12px', borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--fs-body-sm)', fontWeight: 500,
                                color: active ? 'var(--text-strong)' : 'var(--text-muted)',
                                background: active ? 'var(--surface-sunken)' : 'transparent',
                            }}>{t(item.label)}</Link>
                        );
                    })}
                </nav>
                <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{auth?.user?.email}</span>
                    <div style={{ display: 'flex', gap: 14 }}>
                        <Link href={route('home')} style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{t('Storefront')}</Link>
                        <Link href={route('profile.edit')} style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{t('Settings')}</Link>
                        <Link href={route('logout')} method="post" as="button" style={{ background: 'none', border: 'none',
                            cursor: 'pointer', font: 'inherit', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{t('Sign out')}</Link>
                    </div>
                </div>
            </aside>

            <main style={{ minWidth: 0 }}>
                <header style={{ height: 64, borderBottom: '1px solid var(--border-default)', background: 'var(--surface-page)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 10 }}>
                    <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>{t(title)}</h1>
                    <div>{actions}</div>
                </header>
                <div style={{ padding: 28, maxWidth: 1200 }}>{children}</div>
            </main>

            {toast ? (
                <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
                    <Toast tone="success">{toast}</Toast>
                </div>
            ) : null}
        </div>
    );
}
