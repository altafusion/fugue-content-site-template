#!/usr/bin/env bash
# Link the @altafusion/* stack from a local altafusion/fugue clone so edits there show up here without publishing.
# Usage: pnpm link:fugue [pkg ...]   (default: every package in the clone; names without the @altafusion/ scope)
# Env:   FUGUE_PATH (default: ../fugue next to this repo, else ../../@altafusion/fugue)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

if [[ -z "${FUGUE_PATH:-}" ]]; then
  for candidate in "$ROOT/../fugue" "$ROOT/../../@altafusion/fugue"; do
    if [[ -f "$candidate/pnpm-workspace.yaml" ]]; then FUGUE_PATH="$(cd "$candidate" && pwd)"; break; fi
  done
fi
FUGUE_PATH="${FUGUE_PATH:-$ROOT/../fugue}"
WORKSPACE="$ROOT/pnpm-workspace.yaml"
START="  # fugue-link:start (local only, never commit; run pnpm unlink:fugue)"
END="  # fugue-link:end"

if [[ ! -f "$FUGUE_PATH/pnpm-workspace.yaml" ]]; then
  echo "error: fugue clone not found at: ${FUGUE_PATH} (set FUGUE_PATH)" >&2
  exit 1
fi

# name<TAB>absolute dir for every publishable package in the clone, filtered by the args.
LINES="$(node - "$FUGUE_PATH" "$@" <<'JS'
const fs = require('node:fs'), path = require('node:path')
const [root, ...want] = process.argv.slice(2)
const out = []
for (const bucket of fs.readdirSync(root).filter(d => d.startsWith('packages-'))) {
  for (const dir of fs.readdirSync(path.join(root, bucket))) {
    const file = path.join(root, bucket, dir, 'package.json')
    if (!fs.existsSync(file)) continue
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (!pkg.name?.startsWith('@altafusion/') || pkg.private) continue
    const short = pkg.name.slice('@altafusion/'.length)
    if (want.length && !want.includes(short)) continue
    out.push(`${pkg.name}\t${path.join(root, bucket, dir)}`)
  }
}
const unknown = want.filter(w => !out.some(l => l.startsWith(`@altafusion/${w}\t`)))
if (unknown.length) { console.error(`error: unknown package(s): ${unknown.join(', ')}`); process.exit(1) }
console.log(out.join('\n'))
JS
)"

# Drop any previous block, then insert a fresh one at the end of the overrides: section.
bash "$ROOT/scripts/dev/unlink-local-fugue.sh" --no-install

BLOCK="$START"$'\n'
while IFS=$'\t' read -r name dir; do
  BLOCK+="  '${name}': link:${dir}"$'\n'
done <<<"$LINES"
BLOCK+="$END"

node - "$WORKSPACE" "$BLOCK" <<'JS'
const fs = require('node:fs')
const [file, block] = process.argv.slice(2)
const text = fs.readFileSync(file, 'utf8')
const lines = text.split('\n')
const i = lines.findIndex(l => l === 'overrides:')
if (i < 0) { console.error('error: no overrides: block in pnpm-workspace.yaml'); process.exit(1) }
let j = i + 1
while (j < lines.length && (lines[j] === '' || lines[j].startsWith(' ') || lines[j].startsWith('#')) && !(lines[j] === '' && lines[j + 1] !== undefined && !lines[j + 1].startsWith(' '))) j++
lines.splice(j, 0, ...block.split('\n'))
fs.writeFileSync(file, lines.join('\n'))
JS

echo "==> Linked from ${FUGUE_PATH}:"
sed 's/\t/  ->  /' <<<"$LINES" | sed 's/^/    /'
echo "==> pnpm install"
pnpm install --config.blockExoticSubdeps=false --no-frozen-lockfile

cat <<MSG

pnpm-workspace.yaml and pnpm-lock.yaml are modified. Run pnpm unlink:fugue before committing.
Edits in ${FUGUE_PATH} are live; no publish needed.
MSG
