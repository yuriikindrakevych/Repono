# Repono Design System

A self-hosted **package registry** for developers who sell and license the modules,
plugins and apps they build. Repono's audience lives in the terminal — `composer.json`,
semver, git tags, license keys — so the system is designed to speak their visual
language, not the language of generic SaaS.

> **The world of the product is an engineering registry: manifests, versions,
> checksums, dependencies, activations.** Every decision in this system is derived
> from that world.

---

## Sources

This system was built from a single, opinionated art-direction brief (no existing
codebase or Figma — the attached GitHub repo was empty). Inputs, stored for reference:

- **Brief:** `uploads/Repono.txt` (Ukrainian) — product definition, screen list,
  mandated palette, type pairing, signature element, and an explicit list of
  forbidden "AI-default" tropes.
- **GitHub:** `https://github.com/yuriikindrakevych/Repono` — empty at time of build.
  Explore it if it has since been populated, to align components with real product code.

Because there was no source UI, **this system originates the Repono brand** from the
brief rather than recreating an existing one.

### Font substitution (action needed)

The brief names licensed faces — **Neue Montreal / Söhne** (display/body) and
**Berkeley Mono / Commit Mono** (mono). Those are paid. This system ships free,
near-identical equivalents from Google Fonts:

| Role | Brief's intent | Shipped here |
|---|---|---|
| Display + body | Neue Montreal / Söhne / Geist | **Geist** |
| Mono (identity) | Berkeley / Commit / JetBrains Mono | **JetBrains Mono** |

Fonts load via `@import` in `tokens/fonts.css` (Google Fonts CDN). **To switch to the
licensed faces:** drop the files in `assets/`, replace the `@import` with `@font-face`
rules, and update `--font-display` / `--font-body` / `--font-mono` in
`tokens/typography.css`. Nothing else needs to change.

---

## Content fundamentals

Copy is treated as a design material. The voice is that of a tool that respects the
person using it — **concrete over clever, calm over loud.**

- **Write from the user's side.** Name things by what the person manages —
  *Licenses, Activations, Payment method* — never by system internals
  (*entities, records, tokens*).
- **Sentence case everywhere.** Headlines, buttons, labels, table headers. No Title
  Case, no ALL CAPS except mono eyebrows/overlines (which are a deliberate technical
  device, set in JetBrains Mono with wide tracking).
- **Action verbs, kept identical across a flow.** The button says **"Connect module"**,
  not "Submit". A **"Pause"** control produces a **"Subscription paused"** toast — the
  verb in the toast mirrors the verb on the control.
- **"You" and direct address.** "Sell *your* modules." "*Your* card ending 4242 was
  declined." First person ("I/we") only for the company in the footer.
- **Empty states are invitations, not moods.** *"No modules connected yet — run a
  `composer require`, or paste a license key to activate your first one."* One concrete
  next action, never decorative emptiness.
- **Errors explain what happened and what to do — no apology, no filler.**
  *"Your card ending 4242 was declined. Modules keep working for 7 days while you fix
  this."* No "Oops!", no "Sorry for the inconvenience".
- **Numbers are real and specific.** Versions (`v2.4.1`), domain counts (`5 domains`),
  timings (`12s ago`, `7 days`), keys (`RPN-9F2K-7T1A-QM4D`). No round, invented stats.
- **No marketing fog.** No "powerful", "seamless", "revolutionary". If a sentence would
  fit any SaaS, it is rewritten until it could only describe Repono.
- **Mono is part of the voice.** Versions, keys, hashes, package specs, domains and
  commands are always set in the monospace — in prose, tables, badges and buttons.

**Examples**
- Hero: *"Sell your modules. Ship updates with one line."*
- Sub-hero: *"Buyers run one `composer require` and stay current automatically — on your
  release schedule, behind your license keys."*
- Pricing: *"Priced per active domain. Staging is free."*
- Toast: *"License key copied"* · *"Payment method updated"*

---

## Visual foundations

Disciplined, editorial, asymmetric. One bold accent (the terminal / license artifact);
everything else is quiet.

**Palette** — cool and engineered, never warm/creamy.
- **Base:** cold light `#F4F6F8` page, white cards, a ramp of cool blue-grays for
  surfaces, hairlines and text. Deep ink `#171B21` for primary text.
- **Accent:** one mature **petrol-teal `#0E5A66`**, used *pointwise* — a primary button,
  an active heartbeat, a focus ring, a single rule. Never a fill, never a gradient,
  never the page.
- **Technical highlight:** restrained **ochre `#B08124`**, reserved **only** for
  version/tag badges (semver, build numbers). It never becomes a CTA or a surface.
- **Status:** muted green (active heartbeat), ochre (renews/idle), muted red (payment
  failed). All pass WCAG AA on their tinted backgrounds.
- **Dark is content, not theme.** The only dark surface is the **terminal** (`#0E1116`)
  and the inverse CTA/toast band — appropriate because a terminal *is* dark, not because
  we wanted a "dark mode" look.

**Typography**
- **Geist** — modern grotesque, tight negative tracking (`-0.02em` to `-0.03em` on
  display). Used for headlines, titles and body.
- **JetBrains Mono** — load-bearing identity face. Versions, keys, hashes, package
  specs, domains, eyebrows, table meta, command lines. `font-feature-settings: "zero" 1`
  so zeros are slashed.
- **Scale** is fixed (see `tokens/typography.css`); no arbitrary sizes. Display tops out
  at 72px; body 16px; mono 13–16px.

**Composition & layout**
- **Left-aligned, asymmetric.** The hero is a two-column editorial split (copy left,
  living manifest right) — never a centered block with a gradient blob and three
  identical feature cards beneath it.
- **Hairlines encode structure, not decoration.** A 1px line appears where it means
  something — version-table rows, card dividers, table headers. Not as ornament.
- **Generous, consistent spacing** on a 4px grid. Sections breathe (`96px` vertical
  rhythm); dense data (tables, terminals) stays tight and aligned.

**Surfaces, borders, radius, elevation**
- **Cards sit on a hairline, not a shadow.** `--border-default` + white. Shadow is
  reserved for things that genuinely float — the install card, dialogs, toasts.
- **Restrained radii.** `2px` is the system default (badges, inputs, buttons); `8px` for
  cards. Nothing is pill-rounded except status dots and the screen switcher. This is
  registry hardware, not soft consumer SaaS.
- **Shadows are cool-tinted and low-spread** (`rgba(23,27,33,…)`), never soft blooms.
- **No glassmorphism, no backdrop-blur, no glow, no gradient text.** Explicitly avoided.

**Motion** — movement only where it carries meaning.
- The **heartbeat** dot pulses (an activation is checking in).
- The hero **terminal** types its command, then reveals output line by line.
- **Changelog rows** expand on click.
- Buttons: hover **lightens**, press **darkens + nudges 1px**. Switches/checkboxes have a
  short, bounce-free throw.
- Standard easing `cubic-bezier(0.2,0,0,1)`; durations 120–260ms. Everything honors
  `prefers-reduced-motion` — pulses and typing fall back to their final state.

**Imagery** — there is none by default. The brand's "imagery" is the **artifact**: the
terminal, the license card, the version table. No stock photography, no illustration, no
3D blobs.

**The signature element**
The product is presented as a **living manifest**. The hero pairs a real terminal
running `composer require repono/acme-commerce` with a **license rendered as a physical
artifact** — key as hero, semver tag, ticket perforation, and a live `● active`
heartbeat. This is the single bold accent; everything around it is calm and disciplined.

---

## Iconography

- **System:** [**Lucide**](https://lucide.dev) — clean line icons, `1.75` stroke,
  rounded caps/joins. It matches the engineered, hairline aesthetic exactly. In the UI
  kit they're defined inline in `ui_kits/repono/icons.jsx` (no runtime dependency); in
  cards they're inlined as SVG. To use the full set in production, pull Lucide from CDN
  or npm and keep the `1.75` stroke.
- **Sizing:** icons are sized in `em` and inherit `currentColor`, so they track the text
  they sit beside. Default ~16–18px.
- **Color:** icons are `--text-muted`/`--text-subtle` by default; teal only when they
  mark the accent action (a step marker, a primary button's leading glyph).
- **No emoji. No unicode glyphs as icons.** The only non-Lucide marks are the status dot
  (`●`, drawn as a styled element) and the `✓`/`→` used sparingly inside mono lines.
- **Brand mark:** `assets/repono-mark.svg` (and `-ink` variant) — a manifest container
  bisected by a hairline with a single teal "version node". It stands alone for
  avatars/favicons; the full lockup pairs it with the **Repono** wordmark in Geist. A
  mono lockup (`repono/registry`) is used in terminal/CLI contexts.

---

## What's in here (index)

**Foundations**
- `styles.css` — the single entry point consumers link. Import manifest only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `elevation.css`, `base.css`. CSS custom properties (base ramps + semantic aliases).
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, Brand).

**Components** (`components/<group>/`) — reusable primitives, bundled into
`window.ReponoDesignSystem_*`:
- `buttons/` — **Button**, **IconButton**
- `forms/` — **Input**, **Select**, **Checkbox**, **Switch**
- `status/` — **Badge** (incl. ochre version tone), **Tag**, **Heartbeat**
- `surfaces/` — **Card**
- `navigation/` — **Tabs**
- `feedback/` — **Alert**, **Toast**, **EmptyState**
- `registry/` — **Terminal**, **LicenseCard**, **VersionTable** *(the signature surfaces)*

Each component ships a `.jsx` (implementation), `.d.ts` (props + starting-point tag) and
`.prompt.md` (one-line "what & when" + usage). One `*.card.html` per directory renders
its states in the Design System tab.

**UI kit** (`ui_kits/repono/`) — high-fidelity, interactive recreation of the product:
- `index.html` — the runnable app (a screen switcher ties it together)
- `Landing.jsx` · `ProductPage.jsx` · `Pricing.jsx` · `Cabinet.jsx`
- `Chrome.jsx` (logo, headers, footer) · `icons.jsx` · `data.js`
- The **Cabinet** demonstrates the required states — *populated, empty, payment error,
  loading* — via an inline state switch.

**Other**
- `assets/` — brand mark SVGs.
- `SKILL.md` — makes this folder usable as a downloadable Claude Agent Skill.

---

## Using the system

Link the one stylesheet and read components off the global namespace:

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Terminal, LicenseCard, VersionTable, Badge } = window.ReponoDesignSystem_7d8df0;
</script>
```

Style everything through the tokens (`var(--accent)`, `var(--text-strong)`,
`var(--font-mono)`, `var(--space-6)`) — never hard-coded hexes or pixel values.
