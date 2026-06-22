#!/usr/bin/env bash
set -euo pipefail
# TODO: MIGRATE TO SH OR AT LEAST UNDERSTAND
# ─── Configuration ────────────────────────────────────────────────────────────

HOST="${PGHOST:-127.0.0.1}"
PORT="${PGPORT:-6000}"
DB="${PGDATABASE:-graphify}"
USER="${PGUSER:-postgres}"
export PGPASSWORD="${PGPASSWORD:-db-chef}"
MIGRATIONS_DIR="$(cd "$(dirname "$0")" && pwd)/../src/db/migrations"

# ─── Run ──────────────────────────────────────────────────────────────────────

echo "Connecting to $USER@$HOST:$PORT/$DB"
echo "Running migrations from: $MIGRATIONS_DIR"

files=$(ls "$MIGRATIONS_DIR"/*.sql 2>/dev/null | sort -V)

if [[ -z "$files" ]]; then
  echo "No .sql files found in $MIGRATIONS_DIR"
  exit 0
fi

for file in $files; do
  name=$(basename "$file")
  echo "→ $name"
  psql \
    --host="$HOST" \
    --port="$PORT" \
    --dbname="$DB" \
    --username="$USER" \
    --file="$file" \
    -v ON_ERROR_STOP=1 \
    --quiet
done

echo
echo "Done."
