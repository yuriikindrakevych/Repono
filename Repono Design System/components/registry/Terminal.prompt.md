**Terminal** — the brand's signature surface: a real package manifest in a terminal window. Use it as the landing hero and in install/changelog contexts. Package specs (`owner/name`) auto-highlight in ochre.

```jsx
<Terminal
  name="bash — repono"
  typeCommand
  lines={[
    { type: 'comment', text: '# add the registry once' },
    { type: 'command', text: 'composer require repono/acme-commerce' },
    { type: 'output',  text: 'Resolving dependencies…' },
    { type: 'success', text: '✓ Installed acme/commerce v2.4.1 — license verified' },
  ]}
/>
```

Line types: `command` (prompt, `$`), `output`, `comment`, `success` (green). `typeCommand` types the first command then reveals output; it falls back to the final state under reduced-motion. Keep it to one terminal per view — it's the single bold accent.
