#!/bin/sh
set -eu

# load env
ENV_FILE="$(cd "$(dirname "$0")/../.." && pwd)/.env"
[ -f "$ENV_FILE" ] && . "$ENV_FILE"

# variables
HOST="${PGHOST:-$DB_HOST}"
PORT="${PGPORT:-$DB_PORT}"
DB="${PGDATABASE:-$DATABASE}"
USER="${PGUSER:-$DB_USER}"
export PGPASSWORD="${PGPASSWORD:-$DB_PASSWORD}"
MIGRATIONS_DIR="$(cd "$(dirname "$0")" && pwd)/../src/db/migrations"


echo "Connecting to $USER@$HOST:$PORT/$DB"
echo "Running migrations from: $MIGRATIONS_DIR"

files=$(ls "$MIGRATIONS_DIR"/*.sql 2>/dev/null | sort)

if [ -z "$files" ]; then
  echo "No .sql files found in $MIGRATIONS_DIR"
  exit 0
fi

for file in $files; do
  name=$(basename "$file")
  echo "-> $name"
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

# ─── Regenerate Kysely types ──────────────────────────────────────────────────

echo "Regenerating DB types..."
DATABASE_URL="postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DATABASE" \
  npx kysely-codegen --dialect postgres --url "$DATABASE_URL" --out-file "$SCRIPT_DIR/../src/db/schema.ts"
echo "Types updated."