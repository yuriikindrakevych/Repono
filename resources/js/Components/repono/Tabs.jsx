import React from 'react';

/* Repono Tabs — section navigation for the cabinet (Subscriptions, Licenses,
   Activations, Invoices, Payment method). Underline indicator in the accent;
   quiet hairline baseline. */

let _injected = false;
function useTabsStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-tabs{ display: flex; align-items: stretch; gap: var(--space-1);
    border-bottom: var(--bw-hairline) solid var(--border-default); }
  .r-tab{ position: relative; display: inline-flex; align-items: center; gap: var(--space-2);
    padding: var(--space-3) var(--space-3) calc(var(--space-3) - 1px);
    background: none; border: none; cursor: pointer; font: inherit;
    font-family: var(--font-body); font-size: var(--fs-body-sm); font-weight: var(--fw-medium);
    color: var(--text-muted); white-space: nowrap;
    transition: color var(--dur-fast) var(--ease-standard); }
  .r-tab:hover{ color: var(--text-strong); }
  .r-tab:focus-visible{ outline: none; box-shadow: var(--ring); border-radius: var(--radius-sm); }
  .r-tab::after{ content:""; position:absolute; left: var(--space-3); right: var(--space-3); bottom: -1px; height: 2px;
    background: var(--accent); border-radius: var(--radius-full) var(--radius-full) 0 0;
    transform: scaleX(0); transform-origin: center;
    transition: transform var(--dur-normal) var(--ease-standard); }
  .r-tab--active{ color: var(--text-strong); }
  .r-tab--active::after{ transform: scaleX(1); }
  .r-tab__count{ font-family: var(--font-mono); font-size: var(--fs-mono-xs); color: var(--text-subtle);
    background: var(--surface-sunken); border-radius: var(--radius-xs); padding: 1px 5px; }
  .r-tab--active .r-tab__count{ color: var(--teal-700); background: var(--accent-tint); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'tabs');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Tabs({ items = [], value, onChange, className = '', ...rest }) {
  useTabsStyles();
  return (
    <div className={['r-tabs', className].filter(Boolean).join(' ')} role="tablist" {...rest}>
      {items.map((it) => {
        const id = typeof it === 'string' ? it : it.value;
        const label = typeof it === 'string' ? it : it.label;
        const count = typeof it === 'string' ? undefined : it.count;
        const active = id === value;
        return (
          <button key={id} type="button" role="tab" aria-selected={active}
            className={['r-tab', active ? 'r-tab--active' : ''].filter(Boolean).join(' ')}
            onClick={() => onChange && onChange(id)}>
            {label}
            {count != null ? <span className="r-tab__count">{count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
