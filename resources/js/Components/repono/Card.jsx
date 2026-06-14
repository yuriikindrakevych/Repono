import React from 'react';

/* Repono Card — the default container. Sits on a hairline, not a shadow;
   shadow is reserved for floating surfaces. Optional header + footer slots. */

let _injected = false;
function useCardStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-card{ background: var(--surface-card);
    border: var(--bw-hairline) solid var(--border-default);
    border-radius: var(--radius-lg); overflow: clip; }
  .r-card--raised{ box-shadow: var(--shadow-md); border-color: var(--border-subtle); }
  .r-card--flush{ border-radius: 0; }
  .r-card--interactive{ cursor: pointer; transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard); }
  .r-card--interactive:hover{ border-color: var(--ink-300); box-shadow: var(--shadow-sm); }
  .r-card--accent{ border-color: var(--teal-200); }
  .r-card--accent::before{ content:""; display:block; height: 3px; background: var(--accent); }

  .r-card__header{ display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
    padding: var(--space-4) var(--space-5); border-bottom: var(--bw-hairline) solid var(--border-subtle); }
  .r-card__title{ font-family: var(--font-display); font-size: var(--fs-title); font-weight: var(--fw-semibold);
    letter-spacing: var(--ls-tight); color: var(--text-strong); }
  .r-card__body{ padding: var(--space-5); }
  .r-card__body--flush{ padding: 0; }
  .r-card__footer{ padding: var(--space-4) var(--space-5); border-top: var(--bw-hairline) solid var(--border-subtle);
    background: var(--surface-raised); display: flex; align-items: center; gap: var(--space-3); }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'card');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Card({
  children, title, headerAction, footer,
  raised = false, accent = false, interactive = false, flushBody = false,
  className = '', ...rest
}) {
  useCardStyles();
  const cls = ['r-card', raised ? 'r-card--raised' : '', accent ? 'r-card--accent' : '',
    interactive ? 'r-card--interactive' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {(title || headerAction) ? (
        <div className="r-card__header">
          {title ? <span className="r-card__title">{title}</span> : <span />}
          {headerAction ? <span>{headerAction}</span> : null}
        </div>
      ) : null}
      <div className={['r-card__body', flushBody ? 'r-card__body--flush' : ''].filter(Boolean).join(' ')}>
        {children}
      </div>
      {footer ? <div className="r-card__footer">{footer}</div> : null}
    </div>
  );
}
