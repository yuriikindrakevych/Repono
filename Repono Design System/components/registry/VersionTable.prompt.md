**VersionTable** — release history where hairlines encode structure. Each row is a semver release; clicking expands its changelog (a sanctioned motion).

```jsx
<VersionTable
  defaultOpen={0}
  releases={[
    { version: 'v2.4.1', date: '2026-06-02', channel: 'stable', summary: 'Fix license refresh race',
      changes: [
        { type: 'fixed', text: 'License key refresh no longer double-fires on slow networks' },
        { type: 'changed', text: 'Heartbeat interval relaxed to 60s' },
      ] },
    { version: 'v3.0.0-rc.2', date: '2026-05-20', channel: 'rc', summary: 'Drupal 11 compatibility', changes: [...] },
  ]}
/>
```

Channels: `stable` (teal), `rc` (ochre), `beta` (grey). Change types: `added` / `fixed` / `changed` / `removed`, each colour-coded.
