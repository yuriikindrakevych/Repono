import React from 'react';

/* Repono Tag — a removable/selectable label for compatibility chips,
   filters, dependency markers. Quieter than Badge; hairline by default. */

let _injected = false;
function useTagStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-tag{ display: inline-flex; align-items: center; gap: var(--space-2);
    height: 26px; padding: 0 var(--space-3);
    border-radius: var(--radius-sm);
    border: var(--bw-hairline) solid var(--border-default);
    background: var(--surface-card); color: var(--text-body);
    font-family: var(--font-body); font-size: var(--fs-caption); font-weight: var(--fw-medium);
    line-height: 1; white-space: nowrap; }
  .r-tag--mono{ font-family: var(--font-mono); font-feature-settings: "zero" 1; }
  .r-tag--selected{ background: var(--accent-tint-faint); border-color: var(--teal-200); color: var(--teal-700); }
  .r-tag--button{ cursor: pointer; transition: border-color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard); }
  .r-tag--button:hover{ border-color: var(--ink-300); background: var(--surface-sunken); }
  .r-tag__remove{ display: inline-flex; width: 14px; height: 14px; margin-right: -2px;
    color: var(--text-subtle); cursor: pointer; border: none; background: none; padding: 0; }
  .r-tag__remove:hover{ color: var(--text-strong); }
  .r-tag__remove svg{ width: 100%; height: 100%; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'tag');
  el.textContent = css;
  document.head.appendChild(el);
}

const X = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export function Tag({ children, mono = false, selected = false, onRemove, onClick, className = '', ...rest }) {
  useTagStyles();
  const interactive = !!onClick;
  const cls = ['r-tag', mono ? 'r-tag--mono' : '', selected ? 'r-tag--selected' : '',
    interactive ? 'r-tag--button' : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} onClick={onClick} {...rest}>
      {children}
      {onRemove ? (
        <button type="button" className="r-tag__remove" aria-label="Remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
          <X />
        </button>
      ) : null}
    </span>
  );
}
