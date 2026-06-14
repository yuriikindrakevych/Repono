**Input** — single-line text field for keys, domains, and search. Hairline rest, teal focus ring.

```jsx
<Input label="License key" mono placeholder="RPN-XXXX-XXXX-XXXX" />
<Input label="Domain" prefix="https://" placeholder="acme.example" />
<Input label="Email" error="Enter a valid email" defaultValue="bad@" />
```

`mono` for keys/hashes/domains, `prefix`/`suffix` for affixes, `error` paints red + sets aria-invalid, `hint` for help text. Sizes `md` / `lg`.
