**Toast & Alert** — action and screen-level feedback.

**Toast** confirms an action; the message mirrors the verb ("Pause" → "Paused").
```jsx
<Toast tone="success">Subscription <b>paused</b>.<></><Toast actionLabel="Undo" onAction={undo} tone="neutral">Module disconnected</Toast>
```

**Alert** is an inline banner explaining what happened and what to do — no apology, no filler.
```jsx
<Alert tone="error" icon={<CardIcon/>} title="Payment failed"
  actions={<Button size="sm" variant="danger">Update payment method</Button>}>
  Your card ending 4242 was declined. Activations keep working for 7 days.
</Alert>
```

Toast tones: `neutral` / `success` / `error`. Alert tones: `info` (teal) / `warn` (ochre) / `error` (red).
