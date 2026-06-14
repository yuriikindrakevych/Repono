**Card** — the default container. Sits on a hairline (not a shadow); reserve `raised` for things that truly float.

```jsx
<Card title="Subscription" headerAction={<Badge tone="active" dot>active</Badge>}>
  …body…
</Card>
<Card flushBody>{/* version table */}</Card>
<Card accent raised footer={<Button>Connect module</Button>}>…</Card>
```

`title` + `headerAction` render the header row; `footer` sits on a sunken bar; `flushBody` removes padding for tables/media; `accent` adds a teal top rule.
