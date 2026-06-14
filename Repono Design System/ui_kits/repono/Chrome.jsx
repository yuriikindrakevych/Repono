/* Repono UI kit — shared chrome: Logo lockup, marketing header, app header,
   footer. Reads design-system components from the global namespace. */
(function () {
  const { Button, Badge } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;

  function Logo({ dark = false, size = 26 }) {
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

  function NavLink({ children, active, onClick }) {
    return (
      <button type="button" onClick={onClick} style={{
        background: 'none', border: 'none', cursor: 'pointer', font: 'inherit',
        fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', fontWeight: 500,
        color: active ? 'var(--text-strong)' : 'var(--text-muted)', padding: '6px 2px',
      }}>{children}</button>
    );
  }

  function MarketingHeader({ route, go }) {
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-page)',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', height: 64, padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a onClick={() => go('landing')} style={{ cursor: 'pointer' }}><Logo /></a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }} className="rep-navlinks">
              <NavLink active={route === 'product'} onClick={() => go('product')}>Product</NavLink>
              <NavLink active={route === 'pricing'} onClick={() => go('pricing')}>Pricing</NavLink>
              <NavLink onClick={() => go('product')}>Changelog</NavLink>
              <NavLink onClick={() => go('product')}>Docs</NavLink>
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NavLink onClick={() => go('cabinet')}>Sign in</NavLink>
            <Button size="sm" onClick={() => go('pricing')}>Start free trial</Button>
          </div>
        </div>
      </header>
    );
  }

  function AppHeader({ go }) {
    return (
      <header style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', height: 60, padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a onClick={() => go('landing')} style={{ cursor: 'pointer' }}><Logo size={24} /></a>
            <span style={{ width: 1, height: 22, background: 'var(--border-default)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)' }}>
              acme<span style={{ color: 'var(--text-subtle)' }}> / </span>account
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>ops@acme.example</span>
            <span style={{ width: 30, height: 30, borderRadius: 'var(--radius-full)', background: 'var(--ink-800)',
              color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>A</span>
          </div>
        </div>
      </header>
    );
  }

  function Footer({ go }) {
    const col = (title, links) => (
      <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{title}</span>
        {links.map((l) => (
          <a key={l} onClick={() => go && go('product')} style={{ cursor: 'pointer', fontSize: 'var(--fs-body-sm)',
            color: 'var(--text-muted)' }}>{l}</a>
        ))}
      </div>
    );
    return (
      <footer style={{ borderTop: '1px solid var(--border-default)', background: 'var(--surface-raised)', marginTop: 0 }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 24px 36px',
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
          <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
            <Logo size={24} />
            <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', maxWidth: 240 }}>
              The self-hosted registry for selling and licensing the modules you build.
            </p>
          </div>
          {col('Product', ['Overview', 'Changelog', 'Pricing', 'Status'])}
          {col('Developers', ['Docs', 'CLI reference', 'Webhooks', 'License API'])}
          {col('Company', ['About', 'Contact', 'Terms', 'Privacy'])}
        </div>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-subtle)' }}>© 2026 Repono</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-subtle)' }}>self-hosted · v2.4.1</span>
        </div>
      </footer>
    );
  }

  Object.assign(window, { RepLogo: Logo, RepMarketingHeader: MarketingHeader, RepAppHeader: AppHeader, RepFooter: Footer });
})();
