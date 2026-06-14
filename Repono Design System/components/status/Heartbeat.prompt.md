**Heartbeat** — the live activation status dot. `active` pulses softly (one of the few sanctioned motions); other states are static. Use in activation tables and license cards.

```jsx
<Heartbeat status="active" meta="12s ago" />
<Heartbeat status="stale" label="last seen" meta="4h ago" />
<Heartbeat status="down" meta="no check-in 6d" />
```

States: `active` (green, pulsing), `idle` / `stale` (ochre), `down` (red). `meta` appends a dimmed relative timestamp. Pulse honors `prefers-reduced-motion`.
