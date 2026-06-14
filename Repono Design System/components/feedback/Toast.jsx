import React from 'react';

/* Repono Toast — terse confirmation of an action. Mirrors the action verb
   ("Pause" -> "Paused"). Quiet entrance, auto-dismiss handled by the host. */

let _injected = false;
function useToastStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-toast{ display: inline-flex; align-items: center; gap: var(--space-3);
    min-height: 42px; padding: var(--space-3) var(--space-4);
    background: var(--surface-inverse); color: var(--text-on-dark);
    border: var(--bw-hairline) solid #2A323C; border-radius: var(--radius-md);
    box-shadow: var(--shadow-pop); font-size: var(--fs-body-sm);
    animation: r-toast-in var(--dur-slow) var(--ease-entrance) both; }
  @keyframes r-toast-in{ from{ opacity:0; transform: translateY(8px); } to{ opacity:1; transform:none; } }
  .r-toast__dot{ width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--text-on-dark-muted); flex:none; }
  .r-toast--success .r-toast__dot{ background: var(--ok-500); }
  .r-toast--error .r-toast__dot{ background: var(--danger-500); }
  .r-toast__msg b{ color: var(--white); font-weight: var(--fw-medium); }
  .r-toast__action{ margin-left: var(--space-2); background: none; border: none; cursor: pointer;
    color: var(--teal-200); font: inherit; font-weight: var(--fw-medium); padding: 0; }
  .r-toast__action:hover{ color: #BFD9DD; }
  @media (prefers-reduced-motion: reduce){ .r-toast{ animation: none; } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'toast');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Toast({ children, tone = 'neutral', actionLabel, onAction, className = '', ...rest }) {
  useToastStyles();
  return (
    <div role="status" className={['r-toast', `r-toast--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="r-toast__dot" aria-hidden="true" />
      <span className="r-toast__msg">{children}</span>
      {actionLabel ? <button type="button" className="r-toast__action" onClick={onAction}>{actionLabel}</button> : null}
    </div>
  );
}
