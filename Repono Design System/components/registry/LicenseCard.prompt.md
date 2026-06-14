**LicenseCard** — a license rendered as a real artifact: the key as hero, a semver tag, plan, ticket perforation, and a live heartbeat. The second signature element alongside Terminal.

```jsx
<LicenseCard
  product="repono/acme-commerce"
  plan="Team plan · 5 domains"
  version="v2.4.1"
  licenseKey="RPN-9F2K-7T1A-QM4D"
  status="active"
  heartbeatMeta="active · 12s ago"
  meta="acme.example"
  onCopy={(k) => navigator.clipboard.writeText(k)}
/>
```

`status`: `active` (green, pulsing) / `idle` (grey) / `down` (red). Pulse honors reduced-motion. Self-contained — no other components required.
