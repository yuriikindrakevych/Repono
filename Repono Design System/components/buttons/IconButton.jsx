import React from 'react';

/* Repono IconButton — square, hairline-quiet icon control for toolbars,
   table rows, and dismiss affordances. Same motion rules as Button. */

let _injected = false;
function useIconButtonStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-iconbtn{
    --_s: var(--control-h);
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--_s); height: var(--_s);
    border-radius: var(--radius-sm);
    border: var(--bw-hairline) solid transparent;
    background: transparent; color: var(--text-muted);
    cursor: pointer; padding: 0;
    transition: background var(--dur-fast) var(--ease-standard),
                color var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard);
  }
  .r-iconbtn:hover:not([disabled]){ background: var(--surface-sunken); color: var(--text-strong); }
  .r-iconbtn:active:not([disabled]){ transform: translateY(1px); background: var(--surface-inset); }
  .r-iconbtn:focus-visible{ outline: none; box-shadow: var(--ring); }
  .r-iconbtn[disabled]{ opacity: .45; cursor: not-allowed; }
  .r-iconbtn--bordered{ border-color: var(--border-strong); background: var(--surface-card); }
  .r-iconbtn--bordered:hover:not([disabled]){ border-color: var(--ink-300); }
  .r-iconbtn--sm{ --_s: var(--control-h-sm); }
  .r-iconbtn--lg{ --_s: var(--control-h-lg); }
  .r-iconbtn__icon{ display: inline-flex; width: 1.05em; height: 1.05em; font-size: var(--fs-body); }
  .r-iconbtn__icon svg{ width: 100%; height: 100%; display: block; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'iconbutton');
  el.textContent = css;
  document.head.appendChild(el);
}

export function IconButton({
  children,
  label,
  size = 'md',
  bordered = false,
  disabled = false,
  className = '',
  ...rest
}) {
  useIconButtonStyles();
  const cls = [
    'r-iconbtn',
    bordered ? 'r-iconbtn--bordered' : '',
    size === 'sm' ? 'r-iconbtn--sm' : size === 'lg' ? 'r-iconbtn--lg' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-label={label} title={label} disabled={disabled} {...rest}>
      <span className="r-iconbtn__icon" aria-hidden="true">{children}</span>
    </button>
  );
}
