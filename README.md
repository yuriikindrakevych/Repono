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
- [ ] Checkout + one-time payment + ПРРО fiscal receipt
- [ ] Customer cabinet
