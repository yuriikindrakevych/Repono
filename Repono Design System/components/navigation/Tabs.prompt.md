**Tabs** — section navigation for the cabinet. Accent underline indicator, optional mono counts.

```jsx
<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { value: 'subs', label: 'Subscriptions', count: 3 },
    { value: 'licenses', label: 'Licenses', count: 5 },
    { value: 'activations', label: 'Activations' },
    { value: 'invoices', label: 'Invoices' },
  ]}
/>
```

Items can be plain strings or `{value, label, count}`.
