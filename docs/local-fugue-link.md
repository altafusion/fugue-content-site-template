# Developing Against a Local Fugue Checkout

This site installs the Fugue stack (`@altafusion/*`) from npm. To try a change in Fugue before it is published, link a local
checkout of `altafusion/fugue`. The link is for testing only and never gets committed.

## The Rule

**Fugue ships first, then the site.** A site change that needs new Fugue behavior waits for the Fugue release, then bumps the
`@altafusion/*` versions. Site-only changes (content, styling, the site's own components) never need a link: commit them any time
while unlinked.

## Workflow

1. In `altafusion/fugue`, make the change on a branch or worktree, with a changeset (`.changeset/*.md`).
2. Pull the checkout so it is current (`git pull --ff-only`), then link it from this site:

   ```sh
   pnpm link:fugue                                        # finds ../fugue or ../../@altafusion/fugue
   FUGUE_PATH=/path/to/worktree pnpm link:fugue           # or point at a specific checkout
   ```

3. Restart the dev server (`pnpm dev`). Restart again after every link or unlink. If something looks stale, stop the server and run
   `pnpm clean` first (it clears `.nuxt`, `.output`, `node_modules/.cache`, `node_modules/.vite`, `dist` and `.data`).
4. Edit Fugue and the site together. Fugue edits show up live; nothing is published.
5. **Unlink before committing anything in this site:**

   ```sh
   pnpm unlink:fugue
   git checkout -- package.json pnpm-lock.yaml pnpm-workspace.yaml
   pnpm install --frozen-lockfile
   git status -sb   # must show no pnpm-workspace.yaml or pnpm-lock.yaml changes
   ```

6. Land the Fugue change on `main` and release it (merge the Changesets "version packages" PR; publishing to npm is permanent, so
   get an explicit OK first).
7. In this site, raise the `@altafusion/*` versions, add the new version to `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`
   (pnpm refuses very young releases otherwise), refresh the lockfile, and commit.

## What the Link Does

`pnpm link:fugue` adds a marked block of `link:` overrides under `overrides:` in `pnpm-workspace.yaml` (between `fugue-link:start`
and `fugue-link:end`) and installs, which also rewrites most of `pnpm-lock.yaml`. `pnpm unlink:fugue` removes the block. Only the
nine `@altafusion/*` stack packages are linked; `@altafusion/nuxt-studio` is not.

## The Commit Guard

`.githooks/pre-commit` refuses a commit when the staged `pnpm-workspace.yaml` has the link block or the staged `pnpm-lock.yaml` has
`link:` paths into a Fugue checkout. The `prepare` script turns it on (`git config core.hooksPath .githooks`) when you run
`pnpm install`. Bypass it only on purpose with `git commit --no-verify`.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| "Failed to load content." after clicking to a content page, with a wasm error in the console | An old checkout. Fixed in Fugue 0.4.0 (`nuxt-base` allows a linked checkout in Vite `server.fs.allow`). Pull the checkout, restart. |
| Pages look like old behavior | The checkout is behind `origin/main`. `git pull --ff-only` in it, restart. |
| Odd client errors right after linking | Stop the dev server, run `pnpm clean`, and restart. If that is not enough, `pnpm reset` also deletes `node_modules` and reinstalls (never run it while the dev server is up). |
| `pnpm install` refuses a new `@altafusion/*` version | Add it to `minimumReleaseAgeExclude`. |
| Duplicate Vue or Nuxt Content errors | The link resolves dependencies from the Fugue checkout. Unlink, restart, and report it in Fugue. |
