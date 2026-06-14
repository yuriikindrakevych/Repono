**Tag** — selectable / removable chip for compatibility markers, filters, and dependency specifiers. Quieter than Badge.

```jsx
<Tag mono>drupal/core ^10.2</Tag>
<Tag selected onClick={pick}>WordPress</Tag>
<Tag onRemove={drop}>PHP 8.2</Tag>
```

`mono` for package/version specifiers, `selected` for active filters, `onRemove` adds a dismiss button, `onClick` makes it interactive.
