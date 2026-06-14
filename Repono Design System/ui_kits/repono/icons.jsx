/* Repono UI kit — shared icon set (Lucide-style line icons, 1.75 stroke).
   Attached to window.RepIcons so every screen script can read them. */
(function () {
  const S = (paths) => (props) => React.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', width: '1em', height: '1em' }, props),
    paths.map((d, i) => React.createElement('path', { key: i, d }))
  );
  const Multi = (children) => (props) => React.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', width: '1em', height: '1em' }, props),
    children
  );

  window.RepIcons = {
    Terminal: S(['m7 11 2-2-2-2', 'M11 13h4']).bind ? S(['m4 17 6-6-6-6', 'M12 19h8']) : null,
    Package: Multi([
      React.createElement('path', { key: 1, d: 'm7.5 4.27 9 5.15' }),
      React.createElement('path', { key: 2, d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' }),
      React.createElement('path', { key: 3, d: 'm3.3 7 8.7 5 8.7-5' }),
      React.createElement('path', { key: 4, d: 'M12 22V12' }),
    ]),
    Key: Multi([
      React.createElement('path', { key: 1, d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L21 5' }),
      React.createElement('path', { key: 2, d: 'm21 2-9.6 9.6' }),
      React.createElement('circle', { key: 3, cx: '7.5', cy: '15.5', r: '5.5' }),
    ]),
    Shield: Multi([
      React.createElement('path', { key: 1, d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' }),
      React.createElement('path', { key: 2, d: 'm9 12 2 2 4-4' }),
    ]),
    Refresh: Multi([
      React.createElement('path', { key: 1, d: 'M3 12a9 9 0 0 1 15-6.7L21 8' }),
      React.createElement('path', { key: 2, d: 'M21 3v5h-5' }),
      React.createElement('path', { key: 3, d: 'M21 12a9 9 0 0 1-15 6.7L3 16' }),
      React.createElement('path', { key: 4, d: 'M3 21v-5h5' }),
    ]),
    Check: S(['M20 6 9 17l-5-5']),
    ArrowRight: Multi([
      React.createElement('path', { key: 1, d: 'M5 12h14' }),
      React.createElement('path', { key: 2, d: 'm12 5 7 7-7 7' }),
    ]),
    ChevronDown: S(['m6 9 6 6 6-6']),
    ChevronRight: S(['m9 18 6-6-6-6']),
    Copy: Multi([
      React.createElement('rect', { key: 1, width: '14', height: '14', x: '8', y: '8', rx: '2' }),
      React.createElement('path', { key: 2, d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }),
    ]),
    Card: Multi([
      React.createElement('rect', { key: 1, width: '20', height: '14', x: '2', y: '5', rx: '2' }),
      React.createElement('path', { key: 2, d: 'M2 10h20' }),
    ]),
    Globe: Multi([
      React.createElement('circle', { key: 1, cx: '12', cy: '12', r: '10' }),
      React.createElement('path', { key: 2, d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }),
      React.createElement('path', { key: 3, d: 'M2 12h20' }),
    ]),
    Receipt: Multi([
      React.createElement('path', { key: 1, d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z' }),
      React.createElement('path', { key: 2, d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' }),
      React.createElement('path', { key: 3, d: 'M12 17.5v1.5M12 6v1.5' }),
    ]),
    Layers: Multi([
      React.createElement('path', { key: 1, d: 'm12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z' }),
      React.createElement('path', { key: 2, d: 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65' }),
      React.createElement('path', { key: 3, d: 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65' }),
    ]),
    GitBranch: Multi([
      React.createElement('line', { key: 1, x1: '6', x2: '6', y1: '3', y2: '15' }),
      React.createElement('circle', { key: 2, cx: '18', cy: '6', r: '3' }),
      React.createElement('circle', { key: 3, cx: '6', cy: '18', r: '3' }),
      React.createElement('path', { key: 4, d: 'M18 9a9 9 0 0 1-9 9' }),
    ]),
    Plug: Multi([
      React.createElement('path', { key: 1, d: 'M12 22v-5' }),
      React.createElement('path', { key: 2, d: 'M9 7V2' }),
      React.createElement('path', { key: 3, d: 'M15 7V2' }),
      React.createElement('path', { key: 4, d: 'M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z' }),
    ]),
    Zap: S(['M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z']),
    Gauge: Multi([
      React.createElement('path', { key: 1, d: 'm12 14 4-4' }),
      React.createElement('path', { key: 2, d: 'M3.34 19a10 10 0 1 1 17.32 0' }),
    ]),
    Lock: Multi([
      React.createElement('rect', { key: 1, width: '18', height: '11', x: '3', y: '11', rx: '2' }),
      React.createElement('path', { key: 2, d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
    ]),
    Search: Multi([
      React.createElement('circle', { key: 1, cx: '11', cy: '11', r: '8' }),
      React.createElement('path', { key: 2, d: 'm21 21-4.3-4.3' }),
    ]),
    Download: Multi([
      React.createElement('path', { key: 1, d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
      React.createElement('path', { key: 2, d: 'M7 10l5 5 5-5' }),
      React.createElement('path', { key: 3, d: 'M12 15V3' }),
    ]),
    Clock: Multi([
      React.createElement('circle', { key: 1, cx: '12', cy: '12', r: '10' }),
      React.createElement('path', { key: 2, d: 'M12 6v6l4 2' }),
    ]),
  };
  // Fix Terminal icon (clean prompt glyph)
  window.RepIcons.Terminal = Multi([
    React.createElement('path', { key: 1, d: 'm4 17 6-6-6-6' }),
    React.createElement('path', { key: 2, d: 'M12 19h8' }),
  ]);
})();
