import React from 'react';

/* Repono Checkbox — square, 2px radius, teal when checked. Crisp check stroke.
   Pairs label + optional description. */

let _injected = false;
function useCheckboxStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-check{ display: inline-flex; align-items: flex-start; gap: var(--space-3); cursor: pointer; }
  .r-check--disabled{ cursor: not-allowed; opacity: .55; }
  .r-check__input{ position: absolute; opacity: 0; width: 0; height: 0; }
  .r-check__box{ flex: none; width: 18px; height: 18px; margin-top: 1px;
    border: var(--bw-regular) solid var(--border-strong); border-radius: var(--radius-xs);
    background: var(--surface-card); display: inline-flex; align-items: center; justify-content: center;
    color: var(--white);
    transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard); }
  .r-check__box svg{ width: 13px; height: 13px; opacity: 0; transform: scale(.6); transition: opacity var(--dur-fast), transform var(--dur-fast) var(--ease-entrance); }
  .r-check__input:checked + .r-check__box{ background: var(--accent); border-color: var(--accent); }
  .r-check__input:checked + .r-check__box svg{ opacity: 1; transform: scale(1); }
  .r-check__input:focus-visible + .r-check__box{ box-shadow: var(--ring); }
  .r-check:hover .r-check__input:not(:checked):not(:disabled) + .r-check__box{ border-color: var(--ink-400); }
  .r-check__text{ display: flex; flex-direction: column; gap: 2px; }
  .r-check__label{ font-size: var(--fs-body-sm); color: var(--text-strong); line-height: 1.35; }
  .r-check__desc{ font-size: var(--fs-caption); color: var(--text-muted); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'checkbox');
  el.textContent = css;
  document.head.appendChild(el);
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

let _uid = 0;
export function Checkbox({ label, description, disabled = false, id, className = '', ...rest }) {
  useCheckboxStyles();
  const [fid] = React.useState(() => id || `r-check-${++_uid}`);
  return (
    <label className={['r-check', disabled ? 'r-check--disabled' : '', className].filter(Boolean).join(' ')} htmlFor={fid}>
      <input id={fid} type="checkbox" className="r-check__input" disabled={disabled} {...rest} />
      <span className="r-check__box" aria-hidden="true"><Check /></span>
      {(label || description) ? (
        <span className="r-check__text">
          {label ? <span className="r-check__label">{label}</span> : null}
          {description ? <span className="r-check__desc">{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
