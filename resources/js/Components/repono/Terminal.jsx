import React from 'react';

/* Repono Terminal — the signature surface. A real package manifest in a
   terminal window. Renders a list of lines (prompt / output / comment /
   success). Optional `typeCommand` types the first prompt, then reveals the
   output lines one by one — the only animation in the hero, and it serves
   meaning. Honors prefers-reduced-motion (shows the final state immediately). */

let _injected = false;
function useTerminalStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .r-term{ background: var(--surface-terminal); border: var(--bw-hairline) solid #232A33;
    border-radius: var(--radius-lg); overflow: clip; box-shadow: var(--shadow-lg);
    font-family: var(--font-mono); color: #C7D0DA; }
  .r-term__bar{ display: flex; align-items: center; gap: var(--space-3);
    height: 38px; padding: 0 var(--space-4);
    background: var(--surface-terminal-alt); border-bottom: var(--bw-hairline) solid #20262E; }
  .r-term__dots{ display: inline-flex; gap: 7px; }
  .r-term__dots i{ width: 11px; height: 11px; border-radius: var(--radius-full); background: #2E3742; display: inline-block; }
  .r-term__name{ font-size: var(--fs-mono-sm); color: #6B7682; letter-spacing: 0; }
  .r-term__body{ padding: var(--space-5) var(--space-5) var(--space-6);
    font-size: var(--fs-mono); line-height: var(--lh-mono); }
  .r-term__line{ white-space: pre-wrap; word-break: break-word; }
  .r-term__line + .r-term__line{ margin-top: 4px; }
  .r-term__prompt{ color: var(--teal-200); }
  .r-term__prompt b{ color: #E7ECF1; font-weight: var(--fw-medium); }
  .r-term__comment{ color: #5C6671; }
  .r-term__output{ color: #97A2AE; }
  .r-term__success{ color: #6FBF8C; }
  .r-term__pkg{ color: var(--ochre-200); }
  .r-term__cursor{ display: inline-block; width: 8px; height: 1.05em; vertical-align: text-bottom;
    background: var(--teal-200); margin-left: 2px; animation: r-term-blink 1.1s steps(1) infinite; }
  @keyframes r-term-blink{ 0%,50%{ opacity:1 } 50.01%,100%{ opacity:0 } }
  @media (prefers-reduced-motion: reduce){ .r-term__cursor{ animation: none } }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-repono', 'terminal');
  el.textContent = css;
  document.head.appendChild(el);
}

function Prompt({ text }) {
  // Highlight a package spec like repono/acme-module
  const m = text.match(/^(.*?)(\b[\w.-]+\/[\w.-]+)(.*)$/);
  if (!m) return <span className="r-term__prompt"><b>$</b> {text}</span>;
  return (
    <span className="r-term__prompt"><b>$</b> {m[1]}<span className="r-term__pkg">{m[2]}</span>{m[3]}</span>
  );
}

export function Terminal({
  name = 'bash — repono',
  lines = [],
  typeCommand = false,
  typeSpeed = 38,
  className = '',
  ...rest
}) {
  useTerminalStyles();
  const reduced = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const firstCmdIdx = lines.findIndex((l) => l.type === 'command');
  const cmdText = firstCmdIdx >= 0 ? lines[firstCmdIdx].text : '';

  const [typed, setTyped] = React.useState(typeCommand && !reduced ? '' : cmdText);
  const [revealed, setRevealed] = React.useState(typeCommand && !reduced ? firstCmdIdx : lines.length);

  React.useEffect(() => {
    if (!typeCommand || reduced) { setTyped(cmdText); setRevealed(lines.length); return; }
    let i = 0; let timer;
    const tick = () => {
      i += 1; setTyped(cmdText.slice(0, i));
      if (i < cmdText.length) { timer = setTimeout(tick, typeSpeed); }
      else {
        // reveal output lines after the command finishes
        let j = firstCmdIdx + 1;
        const reveal = () => {
          setRevealed(j + 1); j += 1;
          if (j <= lines.length) timer = setTimeout(reveal, 220);
        };
        setRevealed(firstCmdIdx + 1);
        timer = setTimeout(reveal, 320);
      }
    };
    timer = setTimeout(tick, 380);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  const cls = ['r-term', className].filter(Boolean).join(' ');
  const typing = typeCommand && !reduced && typed.length < cmdText.length;

  return (
    <div className={cls} {...rest}>
      <div className="r-term__bar">
        <span className="r-term__dots" aria-hidden="true"><i/><i/><i/></span>
        <span className="r-term__name">{name}</span>
      </div>
      <div className="r-term__body">
        {lines.slice(0, revealed).map((l, idx) => {
          if (l.type === 'command') {
            const shown = idx === firstCmdIdx ? typed : l.text;
            return (
              <div className="r-term__line" key={idx}>
                <Prompt text={shown} />
                {idx === firstCmdIdx && typing ? <span className="r-term__cursor" /> : null}
              </div>
            );
          }
          const tone = l.type === 'comment' ? 'r-term__comment'
            : l.type === 'success' ? 'r-term__success' : 'r-term__output';
          return <div className={`r-term__line ${tone}`} key={idx}>{l.text}</div>;
        })}
      </div>
    </div>
  );
}
