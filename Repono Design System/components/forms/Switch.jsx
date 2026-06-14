import React from 'react';

/* Repono Switch — for binding toggles like auto-update. Track turns teal when
   on. Restrained throw, no bounce. */

let _injected = false;
function useSwitchStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-switch{ display: inline-flex; align-items: center; gap: var(--space-3); cursor: pointer; }
  .r-switch--disabled{ cursor: not-allowed; opacity: .55; }
  .r-switch__input{ position: absolute; opacity: 0; width: 0; height: 0; }
  .r-switch__track{ position: relative; flex: none; width: 38px; height: 22px;
    border-radius: var(--radius-full); background: var(--ink-200);
    transition: background var(--dur-normal) var(--ease-standard); }
  .r-switch__thumb{ position: absolute; top: 3px; left: 3px; width: 16px; height: 16px;
    border-radius: var(--radius-full); background: var(--white); box-shadow: var(--shadow-sm);
    transition: transform var(--dur-normal) var(--ease-standard); }
  .r-switch__input:checked + .r-switch__track{ background: var(--accent); }
  .r-switch__input:checked + .r-switch__track .r-switch__thumb{ transform: translateX(16px); }
  .r-switch__input:focus-visible + .r-switch__track{ box-shadow: var(--ring); }
  .r-switch__label{ font-size: var(--fs-body-sm); color: var(--text-strong); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'switch');
  el.textContent = css;
  document.head.appendChild(el);
}

let _uid = 0;
export function Switch({ label, disabled = false, id, className = '', ...rest }) {
  useSwitchStyles();
  const [fid] = React.useState(() => id || `r-switch-${++_uid}`);
  return (
    <label className={['r-switch', disabled ? 'r-switch--disabled' : '', className].filter(Boolean).join(' ')} htmlFor={fid}>
      <input id={fid} type="checkbox" role="switch" className="r-switch__input" disabled={disabled} {...rest} />
      <span className="r-switch__track" aria-hidden="true"><span className="r-switch__thumb" /></span>
      {label ? <span className="r-switch__label">{label}</span> : null}
    </label>
  );
}
