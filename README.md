# Repono

Self-hosted platform for selling and licensing your own software (Drupal modules,
WordPress plugins, web apps): storefront → payment → fiscal receipt → license →
update delivery → activity control → auto-billing → suspension on non-payment.

Built on **Laravel 11** (PHP 8.3) + **Inertia.js/React**, running on **Laravel Sail**
(PostgreSQL, Redis, Mailpit). See `Docs/repono-tz-rozrobka.md` for the full spec.

## Requirements

- Docker Desktop
- Node.js 20+ / npm (for the Vite frontend build)

## Getting started

```bash
cp .env.example .env

# Bring up the stack (PHP 8.3, PostgreSQL, Redis, Mailpit)
WWWUSER=1000 WWWGROUP=1000 docker compose up -d --build

# App key, database schema and demo data
docker compose exec laravel.test php artisan key:generate
docker compose exec laravel.test php artisan migrate --seed

# Frontend assets
npm install
npm run dev        # or: npm run build
```

App: http://localhost · Mailpit: http://localhost:8025 · Postgres: `localhost:5433`

> Host port `5432` is frequently occupied by another local Postgres, so the
> container is forwarded to **5433** (`FORWARD_DB_PORT`). The app itself talks to
> the container over the Docker network, so this only affects external clients.

### Demo accounts (after seeding)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@repono.test` | `password` |
| Buyer | `buyer@repono.test` | `password` |

The seeder prints a working demo license key.

## License verification API

The heartbeat endpoint client modules/plugins call (ТЗ §5.7):

```
POST /api/v1/license/verify
{ "key": "...", "domain": "...", "product": "<slug>", "version": "..." }

→ { "status": "active|grace|suspended|invalid",
    "expires_at": "...", "features": [...], "message": "..." }
```

Always returns `200`; the client treats the JSON `status` as authoritative and
keeps the product core working even when the license is invalid or suspended.
Rate limited per (key, IP) to blunt key brute-forcing.

## Status

Stage 1 (MVP core) — in progress:

- [x] Sail stack (PHP 8.3 / PostgreSQL / Redis / Mailpit)
- [x] Auth with email verification (Breeze + Inertia/React)
- [x] Domain schema: products, plans, releases, subscriptions, licenses, activations
- [x] License verification endpoint + activation tracking + rate limiting
- [x] Design system integrated (tokens + components) + landing with live catalog
- [x] Product detail page with release history + per-domain pricing plans
- [x] Customer cabinet (subscriptions, licenses, activations) with cancel & deactivate
- [x] Checkout + one-time payment (mock gateway, HMAC callback, idempotent) + ПРРО fiscal receipt + license issuance

**Stage 1 (MVP core) is functionally complete.**

Stage 2 (recurrent billing):

- [x] Card tokenization (only the rectoken is stored) + scheduled auto-charge
  (`subscriptions:charge-due`, daily) via a swappable `PaymentGateway`
- [x] Dunning on failed charge: retries (+1/+3/+5d), grace period, then
  suspension; subscription statuses active → past_due → grace → expired
- [x] License status derived from the subscription (active/grace/suspended),
  reflected by the verify endpoint
- [x] Email notifications (payment succeeded / failed / suspended) via Mailpit

Stage 3 (update repositories):

- [x] Private Composer repository for Drupal (http-basic per-license token,
  `packages.json` with signed dist URLs + shasum)
- [x] WordPress update endpoint (`/api/wp/update`, plugin-update-checker)
- [x] Expiring signed download URLs; entitlement re-checked at download
- [x] Token revocation: suspended/canceled licenses stop serving updates
- [x] Auto-generated connection instructions (repo URL + require + token) in
  the cabinet

Stage 4 (admin & audit):

- [x] Admin area (is_admin gate) with dashboard metrics: MRR, active
  subscriptions/licenses, revenue & failed payments (30d), receipts
- [x] Products & plans CRUD; release upload (.zip) + publish/unpublish/delete
- [x] Customers view with manual actions: extend / suspend / reactivate
  subscription, reissue key, revoke repo token, reset activation
- [x] Append-only audit log (payments, receipts, license/subscription/
  activation events, catalog & release changes) with filter

**ТЗ §8 roadmap (stages 1–4) complete.**

Real payment gateway:

- [x] **Fondy** (cloudipsp) integration behind `PaymentGateway`: hosted
  checkout with tokenization, signature-verified webhook (`/webhooks/payment`,
  idempotent), server-to-server recurring charge. Multi-currency.
- Enable with `BILLING_GATEWAY=fondy` (defaults to Fondy's public **sandbox**
  merchant; set your own `FONDY_*` + `FONDY_SANDBOX=false` for live). `fake`
  remains the default for local dev. Live callbacks need a public URL.

Multi-currency & international fiscalization:

- [x] Currency per product (USD/EUR/UAH/GBP); plans inherit it; prices format
  with the right symbol ($/€/₴). Fondy charges in the product's currency.
- [x] Billing document branches by currency: UAH → ПРРО fiscal receipt;
  USD/EUR/… → invoice (no ПРРО). Both stored as `receipts` with a `type`.
- [x] Admin currency selector; dashboard MRR/revenue reported per currency.

Multilingual (i18n) + mass translation:

- [x] DB-backed translations (`languages` + `translations`); locale via
  `?lang=` + session; Inertia shares the active dictionary; React `t()` with
  English fallback (partial wrapping never breaks the UI)
- [x] Translatable DB content (products, plans, legal) via a `HasTranslations`
  trait — `tr('field')` returns the active-locale value
- [x] Mass translation through **OpenRouter** (`Translator` interface;
  `FakeTranslator` until `OPENROUTER_API_KEY` is set) — batched, per language
- [x] Admin “Languages & translations”: add any language, sync source strings,
  auto-translate missing, per-language progress, inline string editor
- [x] Language switcher in the storefront + cabinet headers
- Run `php artisan translations:sync --translate` to (re)build + fill.

Remaining for production: real ПРРО (checkbox/ДПС) and invoice/VAT providers;
wrap the remaining admin/checkout UI strings (same `t()` pattern); queue the
translate/email/receipt jobs; finalize legal copy; tests; deploy.
