import React from 'react';

/* Repono Alert — inline banner for screen-level states (payment failed,
   update available). Explains what happened and what to do, no apology.
   Self-contained; tone drives the accent rail + icon colour. */

let _injected = false;
function useAlertStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-alert{ display: flex; gap: var(--space-3);
    padding: var(--space-4); border-radius: var(--radius-md);
    border: var(--bw-hairline) solid var(--border-default); background: var(--surface-card); }
  .r-alert__rail{ width: 3px; border-radius: var(--radius-full); flex: none; background: var(--text-subtle); }
  .r-alert__icon{ flex: none; display: inline-flex; color: var(--text-muted); margin-top: 1px; }
  .r-alert__icon svg{ width: 18px; height: 18px; }
  .r-alert__body{ display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1; }
  .r-alert__title{ font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
  .r-alert__msg{ font-size: var(--fs-body-sm); color: var(--text-muted); }
  .r-alert__actions{ display: flex; gap: var(--space-2); margin-top: var(--space-2); }
  .r-alert--error{ background: var(--status-error-bg); border-color: color-mix(in srgb, var(--danger-600) 30%, transparent); }
  .r-alert--error .r-alert__rail{ background: var(--danger-600); }
  .r-alert--error .r-alert__icon{ color: var(--danger-600); }
  .r-alert--warn{ background: var(--status-warn-bg); border-color: var(--ochre-200); }
  .r-alert--warn .r-alert__rail{ background: var(--ochre-600); }
  .r-alert--warn .r-alert__icon{ color: var(--ochre-700); }
  .r-alert--info{ background: var(--accent-tint-faint); border-color: var(--teal-200); }
  .r-alert--info .r-alert__rail{ background: var(--accent); }
  .r-alert--info .r-alert__icon{ color: var(--teal-600); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'alert');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Alert({ tone = 'info', icon, title, children, actions, className = '', ...rest }) {
  useAlertStyles();
  return (
    <div className={['r-alert', `r-alert--${tone}`, className].filter(Boolean).join(' ')} role="alert" {...rest}>
      <span className="r-alert__rail" aria-hidden="true" />
      {icon ? <span className="r-alert__icon" aria-hidden="true">{icon}</span> : null}
      <div className="r-alert__body">
        {title ? <span className="r-alert__title">{title}</span> : null}
        {children ? <span className="r-alert__msg">{children}</span> : null}
        {actions ? <div className="r-alert__actions">{actions}</div> : null}
      </div>
    </div>
  );
}
