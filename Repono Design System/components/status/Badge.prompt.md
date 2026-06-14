**Badge** — compact metadata / status label. The `version` tone is the only place the ochre highlight appears (semver tags, build numbers) and renders in mono.

```jsx
<Badge tone="version">v2.4.1</Badge>
<Badge tone="active" dot>active</Badge>
<Badge tone="error" dot>payment failed</Badge>
<Badge tone="neutral">Drupal 10</Badge>
```

Tones: `neutral`, `version` (ochre, mono), `accent` (teal), `active` (green), `error` (red), `warn` (ochre). `dot` adds a leading status dot.
