/* Repono UI kit — Buyer cabinet. Tabs for the things a buyer manages, plus the
   required states: populated, empty, payment error, loading. Interactions:
   pause a subscription (verb mirrored in the toast), copy a key, fix payment. */
(function () {
  const { Tabs, Card, Badge, Button, Switch, Input, Heartbeat, LicenseCard,
    EmptyState, Alert, Toast, Tag } = window.ReponoDesignSystem_7d8df0;
  const I = window.RepIcons;
  const D = window.RepData;
  const wrap = { maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 24px' };

  const TABS = [
    { value: 'subs', label: 'Subscriptions', count: 2 },
    { value: 'licenses', label: 'Licenses', count: 2 },
    { value: 'activations', label: 'Activations', count: 4 },
    { value: 'invoices', label: 'Invoices' },
    { value: 'payment', label: 'Payment method' },
  ];

  function StateSwitch({ state, setState }) {
    const opts = [['live', 'Populated'], ['empty', 'Empty'], ['error', 'Payment error'], ['loading', 'Loading']];
    return (
      <div style={{ display: 'inline-flex', gap: 2, padding: 2, background: 'var(--surface-sunken)',
        border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
        {opts.map(([v, l]) => (
          <button key={v} type="button" onClick={() => setState(v)} style={{
            font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
            padding: '5px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', border: 'none',
            background: state === v ? 'var(--surface-card)' : 'transparent',
            boxShadow: state === v ? 'var(--shadow-xs)' : 'none',
            color: state === v ? 'var(--text-strong)' : 'var(--text-muted)', fontWeight: 500,
          }}>{l}</button>
        ))}
      </div>
    );
  }

  function SkeletonRow() {
    return (
      <div style={{ display: 'grid', gap: 10, padding: '18px 20px', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)' }}>
        <div className="rep-skel" style={{ width: '40%', height: 14 }} />
        <div className="rep-skel" style={{ width: '70%', height: 12 }} />
        <div className="rep-skel" style={{ width: '25%', height: 12 }} />
      </div>
    );
  }

  function SubRow({ sub, onToast }) {
    const [paused, setPaused] = React.useState(sub.status === 'paused');
    return (
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'grid', gap: 6, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', fontWeight: 500,
                color: 'var(--text-strong)' }}>{sub.product}</span>
              <Badge tone="version">{sub.version}</Badge>
              {paused ? <Badge tone="warn" dot>paused</Badge> : <Badge tone="active" dot>active</Badge>}
            </div>
            <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
              {sub.plan} · renews {sub.renews}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Switch label={paused ? 'Resume' : 'Pause'} checked={!paused}
              onChange={() => { const next = !paused; setPaused(next);
                onToast(next ? { tone: 'neutral', msg: 'Subscription paused' } : { tone: 'success', msg: 'Subscription resumed' }); }} />
            <Button variant="secondary" size="sm">Manage</Button>
          </div>
        </div>
      </Card>
    );
  }

  function Th({ children, style }) {
    return <th style={{ textAlign: 'left', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 11,
      letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', fontWeight: 500,
      borderBottom: '1px solid var(--border-default)', ...style }}>{children}</th>;
  }
  function Td({ children, style }) {
    return <td style={{ padding: '13px 16px', fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)',
      borderBottom: '1px solid var(--border-subtle)', ...style }}>{children}</td>;
  }

  function Cabinet() {
    const [tab, setTab] = React.useState('subs');
    const [state, setState] = React.useState('live');
    const [toast, setToast] = React.useState(null);
    const fireToast = (t) => { setToast(t); clearTimeout(window.__repToast); window.__repToast = setTimeout(() => setToast(null), 2600); };

    const subs = [
      { product: 'acme/commerce-sync', version: 'v2.4.1', plan: 'Team plan · 5 domains', renews: '12 Jul 2026', status: 'active' },
      { product: 'acme/seo-redirects', version: 'v1.8.0', plan: 'Solo plan · 1 domain', renews: '03 Jul 2026', status: 'active' },
    ];

    const isEmpty = state === 'empty';
    const isLoading = state === 'loading';
    const isError = state === 'error';

    function Panel() {
      if (isLoading) {
        return <div style={{ display: 'grid', gap: 14 }}>{[0, 1, 2].map((i) => <SkeletonRow key={i} />)}</div>;
      }
      if (isEmpty) {
        return (
          <EmptyState icon={<I.Package />} title="No modules connected yet"
            actions={<><Button iconLeft={<I.Plug />}>Connect module</Button>
              <Button variant="secondary">Paste a license key</Button></>}>
            Run a <span className="r-mono">composer require</span> on any module you've bought, or paste a
            license key to activate your first one. Subscriptions and activations show up here.
          </EmptyState>
        );
      }
      if (tab === 'subs') {
        return (
          <div style={{ display: 'grid', gap: 14 }}>
            {isError ? (
              <Alert tone="error" icon={<I.Card />} title="Payment failed — update your card to keep auto-updates"
                actions={<><Button size="sm" variant="danger" onClick={() => setTab('payment')}>Update payment method</Button>
                  <Button size="sm" variant="ghost" onClick={() => setTab('invoices')}>View invoice</Button></>}>
                Your card ending 4242 was declined on 12 Jun. Modules keep working for 7 days — until 19 Jun — while you fix this.
              </Alert>
            ) : null}
            {subs.map((s) => <SubRow key={s.product} sub={s} onToast={fireToast} />)}
          </div>
        );
      }
      if (tab === 'licenses') {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
            {D.licenses.map((l) => (
              <LicenseCard key={l.key} product={l.product} plan={l.plan} version={l.version}
                licenseKey={l.key} status={l.status} heartbeatMeta={l.heartbeat} meta={l.meta}
                onCopy={() => fireToast({ tone: 'success', msg: 'License key copied' })} />
            ))}
          </div>
        );
      }
      if (tab === 'activations') {
        return (
          <Card flushBody>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><Th>Domain</Th><Th>Environment</Th><Th>License</Th><Th>Heartbeat</Th><Th style={{ textAlign: 'right' }}>·</Th></tr></thead>
              <tbody>
                {D.activations.map((a) => (
                  <tr key={a.domain}>
                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-strong)' }}>{a.domain}</span></Td>
                    <Td><Tag>{a.env}</Tag></Td>
                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{a.license}</span></Td>
                    <Td><Heartbeat status={a.status} meta={a.last} /></Td>
                    <Td style={{ textAlign: 'right' }}><Button variant="ghost" size="sm">Deactivate</Button></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        );
      }
      if (tab === 'invoices') {
        return (
          <Card flushBody>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><Th>Invoice</Th><Th>Date</Th><Th>Description</Th><Th>Amount</Th><Th style={{ textAlign: 'right' }}>·</Th></tr></thead>
              <tbody>
                {D.invoices.map((v) => (
                  <tr key={v.id}>
                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-strong)' }}>{v.id}</span></Td>
                    <Td><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{v.date}</span></Td>
                    <Td>{v.desc}</Td>
                    <Td><span style={{ fontFamily: 'var(--font-mono)' }}>{v.amount}</span> <Badge tone="active">{v.status}</Badge></Td>
                    <Td style={{ textAlign: 'right' }}><Button variant="ghost" size="sm" iconLeft={<I.Download />}>PDF</Button></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        );
      }
      // payment
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'start' }} className="rep-pay">
          <Card title="Payment method">
            <div style={{ display: 'grid', gap: 16 }}>
              {isError ? (
                <Alert tone="error" icon={<I.Card />} title="Card declined">
                  The card on file was declined. Add a new one to restore auto-updates.
                </Alert>
              ) : null}
              <Input label="Card number" mono prefix={<I.Card />} defaultValue="4242 4242 4242 4242" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="Expiry" mono placeholder="MM / YY" defaultValue="08 / 27" />
                <Input label="CVC" mono placeholder="123" />
              </div>
              <Input label="Billing email" defaultValue="ops@acme.example" />
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <Button onClick={() => fireToast({ tone: 'success', msg: 'Payment method updated' })}>Save card</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </div>
          </Card>
          <Card title="Current card" headerAction={isError ? <Badge tone="error" dot>declined</Badge> : <Badge tone="active" dot>valid</Badge>}>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-lg)', color: 'var(--text-strong)',
                letterSpacing: '0.04em' }}>•••• •••• •••• 4242</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-mono-sm)', color: 'var(--text-muted)' }}>
                <span>Visa · ops@acme.example</span><span>exp 08/27</span>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <main style={{ ...wrap, paddingTop: 28, paddingBottom: 80, minHeight: '70vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <h1 style={{ fontSize: 'var(--fs-display-sm)' }}>Account</h1>
            <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
              Manage your subscriptions, licenses and activations.
            </span>
          </div>
          <StateSwitch state={state} setState={setState} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Tabs items={TABS} value={tab} onChange={setTab} />
        </div>

        <Panel />

        {toast ? (
          <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
            <Toast tone={toast.tone}>{toast.msg}</Toast>
          </div>
        ) : null}
      </main>
    );
  }
  window.RepCabinet = Cabinet;
})();
