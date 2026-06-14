**IconButton** — square icon-only control for toolbars, table rows, and dismiss affordances; always pass an accessible `label`.

```jsx
<IconButton label="Copy command"><CopyIcon/></IconButton>
<IconButton label="Settings" bordered><GearIcon/></IconButton>
```

Pass an inline SVG as the child. `bordered` adds a hairline + card background for toolbars. Sizes `sm` / `md` / `lg`.
