import React from 'react';

/* Repono Badge — compact status & metadata label.
   The "version" tone is the ONLY place ochre appears: semver tags, build
   numbers. Everything else is neutral or a muted semantic tone. */

let _injected = false;
function useBadgeStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-badge{
    display: inline-flex; align-items: center; gap: var(--space-1);
    height: 22px; padding: 0 var(--space-2);
    border-radius: var(--radius-xs);
    border: var(--bw-hairline) solid transparent;
    font-family: var(--font-body);
    font-size: var(--fs-mono-xs); font-weight: var(--fw-medium);
    letter-spacing: var(--ls-wide); white-space: nowrap; line-height: 1;
  }
  .r-badge--mono{ font-family: var(--font-mono); letter-spacing: 0; font-feature-settings: "zero" 1; }
  .r-badge__dot{ width: 6px; height: 6px; border-radius: var(--radius-full); background: currentColor; flex: none; }

  .r-badge--neutral{ background: var(--surface-sunken); color: var(--text-muted); border-color: var(--border-subtle); }
  .r-badge--version{ background: var(--badge-version-bg); color: var(--badge-version-fg); border-color: var(--badge-version-border); }
  .r-badge--accent{ background: var(--accent-tint); color: var(--teal-700); border-color: var(--teal-200); }
  .r-badge--active{ background: var(--status-active-bg); color: var(--status-active-fg); border-color: color-mix(in srgb, var(--ok-600) 26%, transparent); }
  .r-badge--error{ background: var(--status-error-bg); color: var(--status-error-fg); border-color: color-mix(in srgb, var(--danger-600) 30%, transparent); }
  .r-badge--warn{ background: var(--status-warn-bg); color: var(--status-warn-fg); border-color: var(--ochre-200); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'badge');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Badge({ children, tone = 'neutral', dot = false, mono, className = '', ...rest }) {
  useBadgeStyles();
  const isMono = mono ?? tone === 'version';
  const cls = ['r-badge', `r-badge--${tone}`, isMono ? 'r-badge--mono' : '', className]
    .filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="r-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
