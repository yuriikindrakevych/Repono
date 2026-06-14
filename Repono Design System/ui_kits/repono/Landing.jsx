/* Repono UI kit — Landing. Left-aligned editorial hero; the signature is the
   live terminal + license artifact. No centered blob, no 3 identical cards. */
(function () {
  const { Terminal, LicenseCard, VersionTable, Button, Badge, Heartbeat, Tag } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' };

  function StepRow({ n, icon, title, children }) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, alignItems: 'start',
        padding: '22px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-subtle)',
          paddingTop: 2 }}>0{n}</span>
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

  function Landing({ go }) {
    return (
      <main>
        {/* HERO */}
        <section style={{ ...wrap, paddingTop: 72, paddingBottom: 64,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="rep-hero">
          <div style={{ display: 'grid', gap: 24 }}>
            <span className="r-eyebrow">Self-hosted package registry</span>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
              Sell your modules.<br />Ship updates with one&nbsp;line.
            </h1>
            <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', maxWidth: '46ch' }}>
              Repono is the registry for the Drupal modules, WordPress plugins and apps you build.
              Buyers run one <span className="r-mono" style={{ color: 'var(--text-body)' }}>composer require</span> and
              stay current automatically — on your release schedule, behind your license keys.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <Button size="lg" iconLeft={<I.Plug />} onClick={() => go('pricing')}>Start free trial</Button>
              <Button size="lg" variant="secondary" iconRight={<I.ArrowRight />} onClick={() => go('product')}>
                See a live module
              </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 8,
              fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>
              <span>1,240 installs</span><span style={{ opacity: .4 }}>·</span>
              <span>Drupal 10 · 11</span><span style={{ opacity: .4 }}>·</span>
              <span>composer + git</span>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 20, position: 'relative' }}>
            <Terminal name="bash — acme.example" typeCommand lines={[
              { type: 'comment', text: '# add the registry once, then require any module you\u2019ve bought' },
              { type: 'command', text: 'composer require repono/acme-commerce' },
              { type: 'output', text: 'Resolving dependencies from repono.dev …' },
              { type: 'output', text: 'Verifying license RPN-9F2K-7T1A-QM4D …' },
              { type: 'success', text: '\u2713 Installed acme/commerce v2.4.1 — license active, auto-update on' },
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
              textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Speaks your stack</span>
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

        {/* HOW IT WORKS */}
        <section style={{ ...wrap, paddingTop: 72, paddingBottom: 40,
          display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 48 }} className="rep-how">
          <div style={{ position: 'sticky', top: 88, alignSelf: 'start', display: 'grid', gap: 14 }}>
            <span className="r-eyebrow">From publish to paid</span>
            <h2 style={{ fontSize: 'var(--fs-display-md)' }}>Built around the manifest, not a marketplace.</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '36ch' }}>
              Every release is a signed, versioned artifact. Buyers consume it the way they consume
              everything else — through the package manager they already trust.
            </p>
          </div>
          <div>
            <StepRow n={1} icon={<I.GitBranch />} title="Tag a release">
              Push a git tag. Repono builds the artifact, computes its checksum, and writes the
              manifest. Stable, RC and beta channels map to your branches.
            </StepRow>
            <StepRow n={2} icon={<I.Key />} title="Set a price and a license">
              Choose per-domain or per-seat. Each buyer gets a license key that gates installs and
              activations — no key, no update.
            </StepRow>
            <StepRow n={3} icon={<I.Refresh />} title="Updates ship themselves">
              Buyers on auto-update pull the next stable release on your schedule. You see every
              activation and its last heartbeat in real time.
            </StepRow>
          </div>
        </section>

        {/* RELEASES PREVIEW */}
        <section style={{ ...wrap, paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <span className="r-eyebrow">Release history</span>
              <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>Every version, every changelog — in the open.</h2>
            </div>
            <Button variant="secondary" iconRight={<I.ArrowRight />} onClick={() => go('product')}>
              View full changelog
            </Button>
          </div>
          <VersionTable defaultOpen={0} releases={D.releases.slice(0, 3)} />
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--surface-inverse)' }}>
          <div style={{ ...wrap, padding: '64px 24px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: 10 }}>
              <h2 style={{ color: 'var(--white)', fontSize: 'var(--fs-display-md)' }}>Put your first module on the registry.</h2>
              <p style={{ color: 'var(--text-on-dark-muted)', maxWidth: '44ch' }}>
                Free while you set it up. You only pay once buyers do.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button size="lg" onClick={() => go('pricing')}>Start free trial</Button>
              <Button size="lg" variant="ghost" onClick={() => go('cabinet')}
                className="rep-cta-ghost">Open your account</Button>
            </div>
          </div>
        </section>
      </main>
    );
  }
  window.RepLanding = Landing;
})();
