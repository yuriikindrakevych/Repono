import React from 'react';

/* Repono EmptyState — empty screens are an invitation to act, not a mood.
   A quiet framed glyph slot, one-line explanation, a single primary action. */

let _injected = false;
function useEmptyStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-empty{ display: flex; flex-direction: column; align-items: center; text-align: center;
    gap: var(--space-4); padding: var(--space-16) var(--space-8);
    border: var(--bw-hairline) dashed var(--border-strong); border-radius: var(--radius-lg);
    background: var(--surface-raised); }
  .r-empty__icon{ display: inline-flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; border-radius: var(--radius-md);
    background: var(--surface-card); border: var(--bw-hairline) solid var(--border-default);
    color: var(--text-muted); }
  .r-empty__icon svg{ width: 22px; height: 22px; }
  .r-empty__title{ font-family: var(--font-display); font-size: var(--fs-title); font-weight: var(--fw-semibold);
    letter-spacing: var(--ls-tight); color: var(--text-strong); }
  .r-empty__body{ font-size: var(--fs-body-sm); color: var(--text-muted); max-width: 38ch; }
  .r-empty__actions{ display: flex; gap: var(--space-3); margin-top: var(--space-2); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'empty');
  el.textContent = css;
  document.head.appendChild(el);
}

export function EmptyState({ icon, title, children, actions, className = '', ...rest }) {
  useEmptyStyles();
  return (
    <div className={['r-empty', className].filter(Boolean).join(' ')} {...rest}>
      {icon ? <span className="r-empty__icon" aria-hidden="true">{icon}</span> : null}
      {title ? <div className="r-empty__title">{title}</div> : null}
      {children ? <div className="r-empty__body">{children}</div> : null}
      {actions ? <div className="r-empty__actions">{actions}</div> : null}
    </div>
  );
}
