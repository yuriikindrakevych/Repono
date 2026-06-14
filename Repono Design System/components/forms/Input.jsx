import React from 'react';

/* Repono Input — text field for keys, domains, search. Hairline rest state,
   teal focus ring. Supports a leading slot (icon / "https://") and mono mode
   for keys and license fields. */

let _injected = false;
function useInputStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-field{ display: flex; flex-direction: column; gap: var(--space-2); }
  .r-field__label{ font-family: var(--font-body); font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
  .r-field__hint{ font-size: var(--fs-caption); color: var(--text-muted); }
  .r-field__hint--error{ color: var(--danger-600); }

  .r-input{ display: flex; align-items: center; gap: var(--space-2);
    height: var(--control-h); padding: 0 var(--space-3);
    background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-strong);
    border-radius: var(--radius-sm);
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard); }
  .r-input:hover{ border-color: var(--ink-300); }
  .r-input:focus-within{ border-color: var(--border-focus); box-shadow: var(--ring); }
  .r-input--lg{ height: var(--control-h-lg); }
  .r-input--error{ border-color: var(--danger-600); }
  .r-input--error:focus-within{ box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger-600) 24%, transparent); }
  .r-input--disabled{ background: var(--surface-sunken); border-color: var(--border-default); cursor: not-allowed; }

  .r-input__control{ flex: 1; min-width: 0; border: none; background: transparent; outline: none;
    font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-strong); }
  .r-input__control::placeholder{ color: var(--text-subtle); }
  .r-input--mono .r-input__control{ font-family: var(--font-mono); font-feature-settings: "zero" 1; letter-spacing: -0.01em; }
  .r-input__affix{ display: inline-flex; align-items: center; color: var(--text-subtle); font-size: var(--fs-body-sm); flex: none; }
  .r-input__affix--mono{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); }
  .r-input__affix svg{ width: 16px; height: 16px; }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'input');
  el.textContent = css;
  document.head.appendChild(el);
}

let _uid = 0;
export function Input({
  label, hint, error, prefix, suffix,
  mono = false, size = 'md', disabled = false,
  id, className = '', ...rest
}) {
  useInputStyles();
  const [fid] = React.useState(() => id || `r-input-${++_uid}`);
  const boxCls = ['r-input', mono ? 'r-input--mono' : '', size === 'lg' ? 'r-input--lg' : '',
    error ? 'r-input--error' : '', disabled ? 'r-input--disabled' : ''].filter(Boolean).join(' ');
  return (
    <div className={['r-field', className].filter(Boolean).join(' ')}>
      {label ? <label className="r-field__label" htmlFor={fid}>{label}</label> : null}
      <div className={boxCls}>
        {prefix ? <span className={`r-input__affix${mono ? ' r-input__affix--mono' : ''}`} aria-hidden="true">{prefix}</span> : null}
        <input id={fid} className="r-input__control" disabled={disabled}
          aria-invalid={error ? 'true' : undefined} {...rest} />
        {suffix ? <span className="r-input__affix" aria-hidden="true">{suffix}</span> : null}
      </div>
      {error ? <span className="r-field__hint r-field__hint--error">{error}</span>
        : hint ? <span className="r-field__hint">{hint}</span> : null}
    </div>
  );
}
