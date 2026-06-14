import React from 'react';

/* Repono VersionTable — the release history. Hairlines encode structure here
   (not decor). Each row is a semver release; clicking expands its changelog.
   Changelog expansion is a sanctioned motion. Self-contained. */

let _injected = false;
function useVersionStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-vt{ border: var(--bw-hairline) solid var(--border-default); border-radius: var(--radius-lg);
    overflow: clip; background: var(--surface-card); }
  .r-vt__row{ border-bottom: var(--bw-hairline) solid var(--border-subtle); }
  .r-vt__row:last-child{ border-bottom: none; }
  .r-vt__head{ display: grid; grid-template-columns: 132px 1fr auto; align-items: center; gap: var(--space-4);
    width: 100%; text-align: left; padding: var(--space-4) var(--space-5);
    background: transparent; border: none; cursor: pointer; font: inherit; color: inherit;
    transition: background var(--dur-fast) var(--ease-standard); }
  .r-vt__head:hover{ background: var(--surface-raised); }
  .r-vt__head:focus-visible{ outline: none; box-shadow: var(--ring); border-radius: var(--radius-sm); }
  .r-vt__verwrap{ display: inline-flex; align-items: center; gap: var(--space-2); }
  .r-vt__ver{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); font-weight: var(--fw-medium);
    color: var(--text-strong); font-feature-settings: "zero" 1; }
  .r-vt__chan{ display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border-radius: var(--radius-xs);
    font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--ls-wide); text-transform: uppercase; }
  .r-vt__chan--stable{ background: var(--accent-tint); color: var(--teal-700); }
  .r-vt__chan--rc{ background: var(--badge-version-bg); color: var(--badge-version-fg); }
  .r-vt__chan--beta{ background: var(--surface-inset); color: var(--text-muted); }
  .r-vt__summary{ font-size: var(--fs-body-sm); color: var(--text-body); min-width: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .r-vt__meta{ display: inline-flex; align-items: center; gap: var(--space-3);
    font-family: var(--font-mono); font-size: var(--fs-mono-sm); color: var(--text-subtle); }
  .r-vt__chev{ display: inline-flex; color: var(--text-subtle); transition: transform var(--dur-normal) var(--ease-standard); }
  .r-vt__chev svg{ width: 16px; height: 16px; }
  .r-vt__row--open .r-vt__chev{ transform: rotate(90deg); }

  .r-vt__panel{ display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-slow) var(--ease-standard); }
  .r-vt__row--open .r-vt__panel{ grid-template-rows: 1fr; }
  .r-vt__panelinner{ overflow: hidden; }
  .r-vt__changes{ list-style: none; margin: 0; padding: 0 var(--space-5) var(--space-5) calc(132px + var(--space-5) + var(--space-4)); }
  .r-vt__change{ display: grid; grid-template-columns: 64px 1fr; gap: var(--space-3); padding: 5px 0;
    font-size: var(--fs-body-sm); color: var(--text-body); }
  .r-vt__ctype{ font-family: var(--font-mono); font-size: var(--fs-mono-xs); text-transform: uppercase;
    letter-spacing: var(--ls-wide); padding-top: 2px; }
  .r-vt__ctype--added{ color: var(--ok-600); }
  .r-vt__ctype--fixed{ color: var(--teal-600); }
  .r-vt__ctype--changed{ color: var(--ochre-600); }
  .r-vt__ctype--removed{ color: var(--danger-600); }
  @media (max-width: 560px){
    .r-vt__head{ grid-template-columns: 1fr auto; }
    .r-vt__summary{ display: none; }
    .r-vt__changes{ padding-left: var(--space-5); }
  }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'versiontable');
  el.textContent = css;
  document.head.appendChild(el);
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

function Row({ release, open, onToggle }) {
  const chan = release.channel || 'stable';
  return (
    <div className={['r-vt__row', open ? 'r-vt__row--open' : ''].filter(Boolean).join(' ')}>
      <button type="button" className="r-vt__head" aria-expanded={open} onClick={onToggle}>
        <span className="r-vt__verwrap">
          <span className="r-vt__ver">{release.version}</span>
          <span className={`r-vt__chan r-vt__chan--${chan}`}>{chan}</span>
        </span>
        <span className="r-vt__summary">{release.summary}</span>
        <span className="r-vt__meta">
          {release.date}
          <span className="r-vt__chev" aria-hidden="true"><Chevron /></span>
        </span>
      </button>
      <div className="r-vt__panel">
        <div className="r-vt__panelinner">
          <ul className="r-vt__changes">
            {(release.changes || []).map((c, i) => (
              <li className="r-vt__change" key={i}>
                <span className={`r-vt__ctype r-vt__ctype--${c.type}`}>{c.type}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function VersionTable({ releases = [], defaultOpen = 0, className = '', ...rest }) {
  useVersionStyles();
  const [open, setOpen] = React.useState(() => {
    const s = {}; if (defaultOpen != null && releases[defaultOpen]) s[defaultOpen] = true; return s;
  });
  return (
    <div className={['r-vt', className].filter(Boolean).join(' ')} {...rest}>
      {releases.map((r, i) => (
        <Row key={r.version || i} release={r} open={!!open[i]}
          onToggle={() => setOpen((s) => ({ ...s, [i]: !s[i] }))} />
      ))}
    </div>
  );
}
