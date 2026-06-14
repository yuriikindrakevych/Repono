**Select** — native select in the Repono field shell with a custom chevron.

```jsx
<Select label="Platform" options={['Drupal', 'WordPress', 'Standalone']} />
<Select label="Billing" options={[{value:'mo',label:'Monthly'},{value:'yr',label:'Yearly'}]} />
```

Pass `options` (strings or `{value,label}`) or `<option>` children. Same hairline + teal-focus language as Input.
