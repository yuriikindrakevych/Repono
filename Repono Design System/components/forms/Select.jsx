import React from 'react';

/* Repono Select — native select dressed in the field shell, with a custom
   chevron. Same hairline + teal-focus language as Input. */

let _injected = false;
function useSelectStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-select{ position: relative; display: flex; align-items: center;
    height: var(--control-h);
    background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-strong);
    border-radius: var(--radius-sm);
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard); }
  .r-select:hover{ border-color: var(--ink-300); }
  .r-select:focus-within{ border-color: var(--border-focus); box-shadow: var(--ring); }
  .r-select__control{ appearance: none; -webkit-appearance: none; border: none; background: transparent; outline: none;
    width: 100%; height: 100%; padding: 0 calc(var(--space-8)) 0 var(--space-3);
    font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-strong); cursor: pointer; }
  .r-select__chev{ position: absolute; right: var(--space-3); pointer-events: none; color: var(--text-subtle); display: inline-flex; }
  .r-select__chev svg{ width: 16px; height: 16px; }
  .r-select--disabled{ background: var(--surface-sunken); }
  .r-select--disabled .r-select__control{ cursor: not-allowed; color: var(--text-disabled); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'select');
  el.textContent = css;
  document.head.appendChild(el);
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

let _uid = 0;
export function Select({ label, hint, options = [], children, disabled = false, id, className = '', ...rest }) {
  useSelectStyles();
  const [fid] = React.useState(() => id || `r-select-${++_uid}`);
  return (
    <div className={['r-field', className].filter(Boolean).join(' ')}>
      {label ? <label className="r-field__label" htmlFor={fid}>{label}</label> : null}
      <div className={['r-select', disabled ? 'r-select--disabled' : ''].filter(Boolean).join(' ')}>
        <select id={fid} className="r-select__control" disabled={disabled} {...rest}>
          {children || options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span className="r-select__chev" aria-hidden="true"><Chevron /></span>
      </div>
      {hint ? <span className="r-field__hint">{hint}</span> : null}
    </div>
  );
}
