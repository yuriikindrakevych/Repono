import React from 'react';

/* Repono Heartbeat — the live activation status. A pulsing dot that signals a
   domain is checking in. This is one of the few places motion is allowed: it
   serves meaning (last heartbeat). Honors prefers-reduced-motion (ring drops,
   dot stays). */

let _injected = false;
function useHeartbeatStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-hb{ display: inline-flex; align-items: center; gap: var(--space-2);
    font-family: var(--font-mono); font-size: var(--fs-mono-sm); font-weight: var(--fw-medium);
    letter-spacing: 0; line-height: 1; }
  .r-hb__dot{ position: relative; width: 8px; height: 8px; flex: none; }
  .r-hb__dot::before{ content:""; position:absolute; inset:0; border-radius: var(--radius-full);
    background: currentColor; }
  .r-hb__dot::after{ content:""; position:absolute; inset:0; border-radius: var(--radius-full);
    background: currentColor; opacity:.55; animation: r-hb-pulse var(--dur-heartbeat) var(--ease-standard) infinite; }
  @keyframes r-hb-pulse{
    0%{ transform: scale(1); opacity:.5; }
    70%{ transform: scale(3.2); opacity:0; }
    100%{ transform: scale(3.2); opacity:0; }
  }
  .r-hb--active{ color: var(--ok-600); }
  .r-hb--idle{ color: var(--text-subtle); }
  .r-hb--idle .r-hb__dot::after{ animation: none; display:none; }
  .r-hb--stale{ color: var(--ochre-600); }
  .r-hb--down{ color: var(--danger-600); }
  .r-hb--down .r-hb__dot::after{ animation: none; display:none; }
  .r-hb__label{ color: var(--text-body); }
  .r-hb__meta{ color: var(--text-subtle); }
  @media (prefers-reduced-motion: reduce){ .r-hb__dot::after{ animation: none; display:none; } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'heartbeat');
  el.textContent = css;
  document.head.appendChild(el);
}

const LABELS = { active: 'active', idle: 'idle', stale: 'stale', down: 'down' };

export function Heartbeat({ status = 'active', label, meta, className = '', ...rest }) {
  useHeartbeatStyles();
  const text = label ?? LABELS[status] ?? status;
  return (
    <span className={['r-hb', `r-hb--${status}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="r-hb__dot" aria-hidden="true" />
      <span className="r-hb__label">{text}</span>
      {meta ? <span className="r-hb__meta">· {meta}</span> : null}
    </span>
  );
}
