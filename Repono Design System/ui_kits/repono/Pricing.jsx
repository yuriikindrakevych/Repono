/* Repono UI kit — Pricing. Three plans, asymmetric emphasis on Team. Real
   feature copy, per-domain framing. */
(function () {
  const { Button, Badge, Card } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' };

  function Plan({ plan, go }) {
    const featured = plan.featured;
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
          <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{plan.blurb}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600,
            letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>${plan.price}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-sm)', color: 'var(--text-subtle)' }}>{plan.cadence}</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-xs)',
            color: 'var(--ochre-700)', background: 'var(--ochre-100)', border: '1px solid var(--ochre-200)',
            borderRadius: 'var(--radius-xs)', padding: '3px 7px' }}>{plan.domains}</span>
        </div>
        <Button variant={featured ? 'primary' : 'secondary'} onClick={() => go('cabinet')}>
          {featured ? 'Start free trial' : 'Choose ' + plan.name}
        </Button>
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

  function Pricing({ go }) {
    return (
      <main style={{ paddingBottom: 88 }}>
        <section style={{ ...wrap, paddingTop: 64, paddingBottom: 16, display: 'grid', gap: 14, textAlign: 'left' }}>
          <span className="r-eyebrow">Pricing</span>
          <h1 style={{ fontSize: 'var(--fs-display-lg)', maxWidth: '18ch' }}>
            Priced per active domain. Staging is free.
          </h1>
          <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', maxWidth: '54ch' }}>
            Every plan includes auto-updates, the license API, and the activation dashboard.
            Review and beta domains never count toward your seats.
          </p>
        </section>

        <section style={{ ...wrap, paddingTop: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}
            className="rep-plans">
            {D.plans.map((p) => <Plan key={p.id} plan={p} go={go} />)}
          </div>
        </section>

        <section style={{ ...wrap, paddingTop: 56 }}>
          <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-raised)', padding: '24px 26px', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-display)', fontSize: 'var(--fs-title)', fontWeight: 600,
                color: 'var(--text-strong)' }}>
                <span style={{ color: 'var(--accent)', display: 'inline-flex' }}><I.Shield /></span>
                Self-hosted, on your terms
              </span>
              <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', maxWidth: '60ch' }}>
                Run the registry on your own infrastructure. Annual invoicing, SSO and a private
                channel for unreleased builds are available on Agency.
              </span>
            </div>
            <Button variant="secondary" iconRight={<I.ArrowRight />} onClick={() => go('product')}>Talk to us</Button>
          </div>
        </section>
      </main>
    );
  }
  window.RepPricing = Pricing;
})();
