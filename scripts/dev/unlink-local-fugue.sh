#!/usr/bin/env bash
# Remove the local fugue link block and restore the lockfile. Usage: pnpm unlink:fugue
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

WORKSPACE="$ROOT/pnpm-workspace.yaml"
INSTALL=1
[[ "${1:-}" == "--no-install" ]] && INSTALL=0

if ! grep -q 'fugue-link:start' "$WORKSPACE"; then
  [[ $INSTALL -eq 1 ]] && echo "No fugue link in pnpm-workspace.yaml, nothing to do."
  exit 0
fi

sed -i '' '/fugue-link:start/,/fugue-link:end/d' "$WORKSPACE"
[[ $INSTALL -eq 0 ]] && exit 0

# The lockfile gained link: entries from the link.

echo "==> pnpm install (back to published @altafusion/*)"
pnpm install --no-frozen-lockfile --config.blockExoticSubdeps=false
echo "==> Restored published packages."
