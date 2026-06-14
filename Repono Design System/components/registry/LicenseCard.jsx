import React from 'react';

/* Repono LicenseCard — a license rendered as a real artifact: the key as the
   hero, a semver tag, plan, and a live heartbeat. Self-contained (inlines its
   own status dot + version chip so it travels without dependencies). */

let _injected = false;
function useLicenseStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-lic{ position: relative; background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-strong);
    border-radius: var(--radius-lg); overflow: clip; box-shadow: var(--shadow-md);
    display: grid; grid-template-columns: 1fr; }
  .r-lic__top{ display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4);
    padding: var(--space-5) var(--space-5) var(--space-4); }
  .r-lic__id{ display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .r-lic__product{ font-family: var(--font-mono); font-size: var(--fs-mono); color: var(--text-strong);
    font-weight: var(--fw-medium); font-feature-settings: "zero" 1; }
  .r-lic__plan{ font-size: var(--fs-caption); color: var(--text-muted); }
  .r-lic__ver{ flex: none; display: inline-flex; align-items: center; height: 22px; padding: 0 var(--space-2);
    border-radius: var(--radius-xs); font-family: var(--font-mono); font-size: var(--fs-mono-xs);
    font-weight: var(--fw-medium); background: var(--badge-version-bg); color: var(--badge-version-fg);
    border: var(--bw-hairline) solid var(--badge-version-border); }

  /* perforation divider */
  .r-lic__perf{ position: relative; height: 0; border-top: var(--bw-hairline) dashed var(--border-strong);
    margin: 0 var(--space-5); }
  .r-lic__perf::before, .r-lic__perf::after{ content:""; position:absolute; top: -7px; width: 14px; height: 14px;
    border-radius: var(--radius-full); background: var(--surface-page); border: var(--bw-hairline) solid var(--border-strong); }
  .r-lic__perf::before{ left: calc(-1 * var(--space-5) - 7px); }
  .r-lic__perf::after{ right: calc(-1 * var(--space-5) - 7px); }

  .r-lic__keyrow{ padding: var(--space-4) var(--space-5) var(--space-3); }
  .r-lic__keylabel{ font-family: var(--font-mono); font-size: var(--fs-mono-xs); letter-spacing: var(--ls-overline);
    text-transform: uppercase; color: var(--text-subtle); }
  .r-lic__key{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-top: 6px; }
  .r-lic__keyval{ font-family: var(--font-mono); font-size: var(--fs-mono-lg); letter-spacing: 0.02em;
    color: var(--text-strong); font-feature-settings: "zero" 1; }
  .r-lic__copy{ flex: none; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center;
    border: var(--bw-hairline) solid var(--border-default); border-radius: var(--radius-sm);
    background: var(--surface-card); color: var(--text-muted); cursor: pointer;
    transition: border-color var(--dur-fast), color var(--dur-fast); }
  .r-lic__copy:hover{ border-color: var(--ink-300); color: var(--text-strong); }
  .r-lic__copy svg{ width: 15px; height: 15px; }

  .r-lic__foot{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-3);
    padding: var(--space-3) var(--space-5) var(--space-5); }
  .r-lic__meta{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); color: var(--text-muted); }

  .r-lic__hb{ display: inline-flex; align-items: center; gap: var(--space-2);
    font-family: var(--font-mono); font-size: var(--fs-mono-sm); font-weight: var(--fw-medium); }
  .r-lic__dot{ position: relative; width: 8px; height: 8px; }
  .r-lic__dot::before{ content:""; position:absolute; inset:0; border-radius: var(--radius-full); background: currentColor; }
  .r-lic__dot::after{ content:""; position:absolute; inset:0; border-radius: var(--radius-full); background: currentColor;
    opacity:.5; animation: r-lic-pulse var(--dur-heartbeat) var(--ease-standard) infinite; }
  @keyframes r-lic-pulse{ 0%{transform:scale(1);opacity:.5} 70%{transform:scale(3.2);opacity:0} 100%{transform:scale(3.2);opacity:0} }
  .r-lic--active .r-lic__hb{ color: var(--ok-600); }
  .r-lic--idle .r-lic__hb{ color: var(--text-subtle); }
  .r-lic--idle .r-lic__dot::after{ display:none; }
  .r-lic--down .r-lic__hb{ color: var(--danger-600); }
  .r-lic--down .r-lic__dot::after{ display:none; }
  @media (prefers-reduced-motion: reduce){ .r-lic__dot::after{ display:none; } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'license');
  el.textContent = css;
  document.head.appendChild(el);
}

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

export function LicenseCard({
  product = 'repono/acme-module',
  plan = 'Team plan',
  version = 'v2.4.1',
  licenseKey = 'RPN-9F2K-7T1A-QM4D',
  status = 'active',
  heartbeatMeta = 'active · 12s ago',
  meta,
  onCopy,
  className = '',
  ...rest
}) {
  useLicenseStyles();
  const cls = ['r-lic', `r-lic--${status}`, className].filter(Boolean).join(' ');
  const hbWord = status === 'active' ? 'active' : status === 'down' ? 'down' : 'idle';
  return (
    <div className={cls} {...rest}>
      <div className="r-lic__top">
        <div className="r-lic__id">
          <span className="r-lic__product">{product}</span>
          <span className="r-lic__plan">{plan}</span>
        </div>
        <span className="r-lic__ver">{version}</span>
      </div>
      <div className="r-lic__perf" aria-hidden="true" />
      <div className="r-lic__keyrow">
        <span className="r-lic__keylabel">License key</span>
        <div className="r-lic__key">
          <span className="r-lic__keyval">{licenseKey}</span>
          <button type="button" className="r-lic__copy" aria-label="Copy license key"
            onClick={() => { onCopy && onCopy(licenseKey); }}>
            <CopyIcon />
          </button>
        </div>
      </div>
      <div className="r-lic__foot">
        <span className="r-lic__hb">
          <span className="r-lic__dot" aria-hidden="true" />
          {heartbeatMeta || hbWord}
        </span>
        {meta ? <span className="r-lic__meta">{meta}</span> : null}
      </div>
    </div>
  );
}
