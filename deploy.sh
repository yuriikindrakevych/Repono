#!/usr/bin/env bash
#
# Repono deploy script. Run on the server from the project root:
#   ./deploy.sh
#
# Pulls the latest main, installs dependencies, builds assets, migrates and
# refreshes caches. Safe to re-run.

set -euo pipefail
cd "$(dirname "$0")"

# The web files are owned by www but deploy runs as root — allow git here.
git config --global --add safe.directory "$(pwd)" 2>/dev/null || true

# Use the aaPanel PHP build (override with PHP=… if needed).
PHP="${PHP:-/www/server/php/84/bin/php}"
COMPOSER="${COMPOSER:-/usr/local/bin/composer}"
WEB_USER="${WEB_USER:-www}"
BRANCH="${BRANCH:-main}"

echo "→ Pulling latest ($BRANCH)…"
git fetch --prune origin
git reset --hard "origin/$BRANCH"

echo "→ Composer (production)…"
$PHP "$COMPOSER" install --no-dev --optimize-autoloader --no-interaction --no-progress

echo "→ Frontend assets…"
npm ci --no-audit --no-fund
npm run build

echo "→ Database migrations…"
$PHP artisan migrate --force

echo "→ Caches & i18n…"
$PHP artisan optimize:clear
$PHP artisan config:cache
$PHP artisan route:cache
$PHP artisan view:cache
$PHP artisan translations:sync
$PHP artisan storage:link 2>/dev/null || true

echo "→ Restart queue workers…"
$PHP artisan queue:restart || true

echo "→ Fixing ownership/permissions…"
# (.user.ini is immutable on aaPanel — ignore that single failure)
chown -R "$WEB_USER:$WEB_USER" . 2>/dev/null || true
chmod -R ug+rwX storage bootstrap/cache

echo "✓ Deployed $(git rev-parse --short HEAD)."
