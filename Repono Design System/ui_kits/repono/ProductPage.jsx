/* Repono UI kit — Product page. Description, compatibility, install, plans link,
   and the full release history with expandable changelog. */
(function () {
  const { Terminal, VersionTable, Button, Badge, Tag, Card, Heartbeat } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' };
  const P = D.product;

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

  function ProductPage({ go }) {
    return (
      <main style={{ paddingBottom: 80 }}>
        {/* header */}
        <section style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--surface-card)' }}>
          <div style={{ ...wrap, padding: '40px 24px 32px', display: 'grid', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-lg)', fontWeight: 500,
                color: 'var(--text-strong)' }}>
                {P.owner}<span style={{ color: 'var(--text-subtle)' }}>/</span>{P.name}
              </span>
              <Badge tone="version">{P.latest}</Badge>
              <Badge tone="active" dot>maintained</Badge>
            </div>
            <p style={{ fontSize: 'var(--fs-display-sm)', fontFamily: 'var(--font-display)', fontWeight: 500,
              letterSpacing: '-0.02em', color: 'var(--text-strong)', maxWidth: '20ch', lineHeight: 1.12 }}>
              {P.tagline}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {P.compat.map((c) => <Tag key={c} mono>{c}</Tag>)}
            </div>
          </div>
        </section>

        <div style={{ ...wrap, paddingTop: 40, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40,
          alignItems: 'start' }} className="rep-product-grid">
          {/* main */}
          <div style={{ display: 'grid', gap: 36, minWidth: 0 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>What it does</h2>
              <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-body)', maxWidth: '64ch' }}>{P.summary}</p>
              <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                {['Idempotent webhooks — replays never double-write', 'Per-store field mapping for multi-store Commerce',
                  'Replayable sync log you can audit and re-run', 'Signed releases with SHA-256 checksums'].map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start',
                    fontSize: 'var(--fs-body)', color: 'var(--text-body)' }}>
                    <span style={{ color: 'var(--accent)', marginTop: 2, display: 'inline-flex' }}><I.Check /></span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>Release history</h2>
              <VersionTable defaultOpen={0} releases={D.releases} />
            </div>
          </div>

          {/* sidebar */}
          <aside style={{ position: 'sticky', top: 84, display: 'grid', gap: 20 }} className="rep-product-aside">
            <Card raised flushBody>
              <div style={{ padding: 'var(--space-5)', display: 'grid', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Install</span>
                <Terminal name="bash" lines={[
                  { type: 'command', text: 'composer require repono/acme-commerce' },
                ]} />
                <Button iconLeft={<I.Plug />} onClick={() => go('pricing')}>Connect module</Button>
                <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)', margin: 0 }}>
                  Requires a license key. Start a free trial to get one.
                </p>
              </div>
            </Card>

            <Card title="Details">
              <div style={{ display: 'grid' }}>
                <Meta icon={<I.Layers />} label="Platform" value={P.platform} />
                <Meta icon={<I.Terminal />} label="Runtime" value={P.php} />
                <Meta icon={<I.Download />} label="Installs" value={P.installs} />
                <Meta icon={<I.Key />} label="License" value="Per-domain" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body-sm)' }}>Latest build</span>
                  <Heartbeat status="active" label="passing" meta="2h ago" />
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    );
  }
  window.RepProductPage = ProductPage;
})();
