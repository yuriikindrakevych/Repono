/* Repono UI kit — sample data. Attached to window.RepData. Real, concrete copy
   (no lorem). One illustrative publisher: "acme/commerce-sync". */
window.RepData = {
  product: {
    owner: 'acme',
    name: 'commerce-sync',
    slug: 'acme/commerce-sync',
    tagline: 'Two-way order & stock sync between Drupal Commerce and your ERP.',
    summary: 'Keeps orders, stock levels and fulfilment status in lockstep across Drupal Commerce and SAP, NetSuite or a custom ERP. Idempotent webhooks, replayable sync log, zero double-writes.',
    latest: 'v2.4.1',
    platform: 'Drupal 10 · 11',
    php: 'PHP 8.2+',
    license: 'Per-domain subscription',
    installs: '1,240',
    compat: ['drupal/core ^10.2', 'drupal/commerce ^2.38', 'PHP 8.2', 'PHP 8.3'],
  },
  releases: [
    { version: 'v2.4.1', date: '2026-06-02', channel: 'stable', summary: 'Fix license refresh race on slow networks',
      changes: [
        { type: 'fixed', text: 'License key refresh no longer double-fires when the heartbeat is delayed past 30s' },
        { type: 'fixed', text: 'Stock deltas below 1 unit are no longer rounded to zero' },
        { type: 'changed', text: 'Heartbeat interval relaxed from 30s to 60s to cut activation noise' },
      ] },
    { version: 'v2.4.0', date: '2026-05-12', channel: 'stable', summary: 'Replayable sync log + per-store mapping',
      changes: [
        { type: 'added', text: 'Replay any failed sync from the admin log without re-importing the order' },
        { type: 'added', text: 'Per-store field mapping for multi-store Commerce setups' },
        { type: 'changed', text: 'Webhook signing now uses SHA-256 (HS256 deprecated, removed in v3)' },
      ] },
    { version: 'v3.0.0-rc.2', date: '2026-05-20', channel: 'rc', summary: 'Drupal 11 compatibility, second candidate',
      changes: [
        { type: 'added', text: 'Drupal 11 support behind the d11_compat flag' },
        { type: 'removed', text: 'HS256 webhook signing (deprecated since v2.4.0)' },
      ] },
    { version: 'v2.3.0', date: '2026-04-28', channel: 'stable', summary: 'Per-domain activation limits',
      changes: [
        { type: 'added', text: 'Cap activations per license and see which domain holds each seat' },
      ] },
  ],
  plans: [
    { id: 'solo', name: 'Solo', price: 19, cadence: '/mo', domains: '1 domain',
      blurb: 'For a single production site you maintain yourself.',
      features: ['1 active domain', 'Auto-updates on the stable channel', 'Email support, 2 business days', 'Replayable sync log'] },
    { id: 'team', name: 'Team', price: 59, cadence: '/mo', domains: '5 domains', featured: true,
      blurb: 'For agencies running a handful of client sites.',
      features: ['5 active domains', 'Stable + RC channels', 'Priority support, same business day', 'Per-store field mapping', 'Staging activations don\u2019t count'] },
    { id: 'agency', name: 'Agency', price: 149, cadence: '/mo', domains: '25 domains',
      blurb: 'For shops shipping at scale across many clients.',
      features: ['25 active domains', 'All channels incl. beta', 'Shared license keys for your team', 'SSO heartbeat dashboard', 'Invoiced annually on request'] },
  ],
  licenses: [
    { product: 'acme/commerce-sync', plan: 'Team plan \u00b7 5 domains', version: 'v2.4.1',
      key: 'RPN-9F2K-7T1A-QM4D', status: 'active', meta: 'acme.example', heartbeat: 'active \u00b7 12s ago' },
    { product: 'acme/seo-redirects', plan: 'Solo plan \u00b7 1 domain', version: 'v1.8.0',
      key: 'RPN-3J7P-5M2C-W8XR', status: 'idle', meta: 'staging.acme.example', heartbeat: 'idle \u00b7 4h ago' },
  ],
  activations: [
    { domain: 'acme.example', env: 'production', license: 'RPN-9F2K\u2026QM4D', status: 'active', last: '12s ago' },
    { domain: 'www.acme.example', env: 'production', license: 'RPN-9F2K\u2026QM4D', status: 'active', last: '31s ago' },
    { domain: 'staging.acme.example', env: 'staging', license: 'RPN-9F2K\u2026QM4D', status: 'stale', last: '4h ago' },
    { domain: 'review-812.acme.dev', env: 'review', license: 'RPN-9F2K\u2026QM4D', status: 'down', last: '6d ago' },
  ],
  invoices: [
    { id: 'RPN-2026-0612', date: '2026-06-12', amount: '$59.00', status: 'paid', desc: 'Team plan \u00b7 Jun 2026' },
    { id: 'RPN-2026-0512', date: '2026-05-12', amount: '$59.00', status: 'paid', desc: 'Team plan \u00b7 May 2026' },
    { id: 'RPN-2026-0412', date: '2026-04-12', amount: '$59.00', status: 'paid', desc: 'Team plan \u00b7 Apr 2026' },
  ],
};
