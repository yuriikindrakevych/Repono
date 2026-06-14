**Button** — the primary action control; primary variant carries the petrol-teal accent, so use at most one per view.

```jsx
<Button variant="primary">Connect module</Button>
<Button variant="secondary" iconLeft={<DownloadIcon/>}>Download</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="danger">Cancel subscription</Button>
```

Variants: `primary` (teal), `secondary` (hairline on white), `ghost` (quiet), `danger` (muted red, for payment/destructive). Sizes: `sm` / `md` / `lg`. Hover lightens, press darkens and nudges 1px. Labels are action verbs and stay identical across a flow.
