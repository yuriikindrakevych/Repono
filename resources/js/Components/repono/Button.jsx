import React from 'react';

/* Repono Button — disciplined registry hardware.
   Primary uses the petrol-teal accent (used pointwise). Hover LIGHTENS,
   press DARKENS + nudges 1px, per the brand motion rules. */

let _injected = false;
function useButtonStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-btn{
    --_h: var(--control-h);
    font-family: var(--font-display);
    font-weight: var(--fw-medium);
    font-size: var(--fs-body-sm);
    letter-spacing: var(--ls-tight);
    line-height: 1;
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--space-2);
    height: var(--_h);
    padding: 0 var(--space-4);
    border-radius: var(--radius-sm);
    border: var(--bw-hairline) solid transparent;
    background: transparent; color: var(--text-strong);
    cursor: pointer; white-space: nowrap; user-select: none;
    transition: background var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard);
  }
  .r-btn:focus-visible{ outline: none; box-shadow: var(--ring); }
  .r-btn:active{ transform: translateY(1px); }
  .r-btn[disabled]{ cursor: not-allowed; opacity: .5; transform: none; }

  .r-btn--sm{ --_h: var(--control-h-sm); font-size: var(--fs-caption); padding: 0 var(--space-3); }
  .r-btn--lg{ --_h: var(--control-h-lg); font-size: var(--fs-body); padding: 0 var(--space-6); }

  /* Primary — the accent */
  .r-btn--primary{ background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }
  .r-btn--primary:hover:not([disabled]){ background: var(--accent-hover); border-color: var(--accent-hover); }
  .r-btn--primary:active:not([disabled]){ background: var(--accent-pressed); border-color: var(--accent-pressed); }

  /* Secondary — hairline on surface */
  .r-btn--secondary{ background: var(--surface-card); color: var(--text-strong); border-color: var(--border-strong); }
  .r-btn--secondary:hover:not([disabled]){ background: var(--surface-sunken); border-color: var(--ink-300); }
  .r-btn--secondary:active:not([disabled]){ background: var(--surface-inset); }

  /* Ghost — quiet */
  .r-btn--ghost{ background: transparent; color: var(--text-body); border-color: transparent; }
  .r-btn--ghost:hover:not([disabled]){ background: var(--surface-sunken); }
  .r-btn--ghost:active:not([disabled]){ background: var(--surface-inset); }

  /* Danger — payment / destructive */
  .r-btn--danger{ background: var(--surface-card); color: var(--danger-600); border-color: color-mix(in srgb, var(--danger-600) 40%, transparent); }
  .r-btn--danger:hover:not([disabled]){ background: var(--danger-100); border-color: var(--danger-600); }
  .r-btn--danger:active:not([disabled]){ background: color-mix(in srgb, var(--danger-100) 70%, var(--danger-600) 8%); }

  .r-btn__icon{ display: inline-flex; width: 1em; height: 1em; flex: none; }
  .r-btn__icon svg{ width: 100%; height: 100%; display: block; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'button');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  useButtonStyles();
  const cls = [
    'r-btn',
    `r-btn--${variant}`,
    size === 'sm' ? 'r-btn--sm' : size === 'lg' ? 'r-btn--lg' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {iconLeft ? <span className="r-btn__icon" aria-hidden="true">{iconLeft}</span> : null}
      {children ? <span>{children}</span> : null}
      {iconRight ? <span className="r-btn__icon" aria-hidden="true">{iconRight}</span> : null}
    </button>
  );
}
