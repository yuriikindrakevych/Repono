---
name: repono-design
description: Use this skill to generate well-branded interfaces and assets for Repono, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out
and create static HTML files for the user to view. If working on production code, you can
copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs HTML
artifacts _or_ production code, depending on the need.

## Quick orientation

Repono is a **self-hosted package registry** for developers who sell and license their
own modules/plugins/apps. The audience lives in the terminal. The visual world is an
engineering registry: manifests, versions, checksums, license keys, activations.

- **Foundations:** link `styles.css` (it `@import`s everything in `tokens/`). Style only
  through CSS custom properties — `var(--accent)`, `var(--text-strong)`,
  `var(--font-mono)`, `var(--space-6)`, etc. Never hard-code hexes or px.
- **Components:** load `_ds_bundle.js`, then read from `window.ReponoDesignSystem_7d8df0`
  (e.g. `const { Button, Terminal, LicenseCard, VersionTable } = window.ReponoDesignSystem_7d8df0`).
  See each component's `.prompt.md` for usage.
- **UI kit:** `ui_kits/repono/` is a working multi-screen recreation (landing, product,
  pricing, cabinet) — copy from it for full-screen layouts.

## Non-negotiables (from the brief)

- Palette: cold light base `#F4F6F8`, deep ink `#171B21`, petrol-teal `#0E5A66` used
  **pointwise**, ochre `#B08124` **only on version/tag badges**. No purple/neon
  gradients, no gradient text, no glow, no glassmorphism/blur.
- Type: **Geist** (display + body), **JetBrains Mono** as a load-bearing identity face
  for versions, keys, hashes, commands. (These substitute the brief's paid Neue
  Montreal / Berkeley Mono — see README.)
- Composition: editorial, left-aligned, asymmetric. Hairlines encode structure, not
  decoration. Cards sit on hairlines; shadow only for floating surfaces. Radii are
  restrained (2px default).
- Copy: sentence case, action verbs kept identical across a flow, written from the
  user's side, no marketing fog, real/specific numbers. Empty states invite; errors
  explain what to do.
- Motion only where it carries meaning (heartbeat pulse, terminal typing, changelog
  expand). Honor `prefers-reduced-motion`. Hover lightens, press darkens + nudges 1px.
- The signature is the **living manifest** — terminal (`composer require …`) and/or the
  **license-as-artifact** card with a live `● active` heartbeat. One bold accent; keep
  everything else quiet.
