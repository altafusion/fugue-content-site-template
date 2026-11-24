# Fugue Content Site Template

Starter for a Fugue Content site: markdown content, Nuxt Studio editing, Netlify deploy. It consumes the public
[`@altafusion/*`](https://github.com/altafusion/fugue) packages from npm, so a fresh clone needs no tokens or private registry.

**Start:** click "Use this template" on GitHub, clone your copy, then follow [Set up a new site](#set-up-a-new-site).

## Layer stack

```text
createAppConfig → app extends fugue-theme + shell + Fugue Content → app (content/, branding)
shell → fugue-ui → fugue-nuxt-ui → nuxt-base
fugue-theme → fugue-nuxt-ui → nuxt-base
```

## What this template owns

| Owns | From layers |
|------|-------------|
| `content/**` — sample markdown (`content/en/`, `content/es/` when i18n enabled) | `@altafusion/fugue-content` — Content module, MDC blocks, catch-all routes, optional i18n |
| `i18n/locales/*.yaml` — UI chrome strings | `@altafusion/shell` — header, footer, layouts, **`ShellLangToggle`** |
| `app/app.config.ts` — brand + Nuxt UI tokens | `@altafusion/shell` — header, footer, layouts |
| `app/assets/css/main.css` — Tailwind + Nuxt UI entry | `@altafusion/fugue-theme` — `@nuxt/ui`, base tokens |
| `nuxt.config.ts` — thin `defineFugueContentSite` entry | `@altafusion/nuxt-base` — shared app defaults, browser reuse |
| `site.config.ts` — theme, identity, content, Studio, dev sections | `@altafusion/fugue-content/site-config-registry` — `fugueContentStudioSection()` |

**Routing:** `@altafusion/fugue-content` ships `app/pages/index.vue` and `app/pages/[...slug].vue`. Add **`app/pages/**` in the app only** for interactive product routes that must win over content.

### Routing Precedence

| Route source | Example | Wins when |
|--------------|---------|-----------|
| **`app/pages/**`** (Vue) | `/app/demo` → `app/pages/app/demo.vue` | Explicit file exists — **always** over catch-all |
| **`content/**`** (markdown) | `/about` → `content/en/about.md` | No competing Vue page; served via `[...slug].vue` |

Nuxt resolves **more specific** **`app/pages/**`** files before the Fugue Content `[...slug].vue` catch-all.

### Studio Fragments in Vue Pages

Editorial sections inside product routes use **`content/{locale}/fragments/{slug}.md`** — a dedicated **`fragments_{locale}`** collection (not served by the catch-all). Embed with **`<FugueContentFragment slug="app-demo" />`** or **`useFugueContentFragment('app-demo')`** on **`/app/demo`**.

**Studio preview:** fragments are editable at **`/fragments/{slug}`** (and **`/es/fragments/{slug}`**) via **`app/pages/fragments/[slug].vue`** in `@altafusion/fugue-content` — avoids the pages catch-all “Page Not Found” when Studio opens a fragment.

Product routes use shell **`product`** layout (`definePageMeta({ layout: 'product' })`). This template overrides `app/layouts/product.vue` to keep site header + nav on product pages. Register nav with locale-neutral `to` in **`runtimeConfig.public.appNav`**; set **`nav.primary`** in page meta to highlight the active item.


## Theming

1. **`palette.ts`** — export **`sitePalette`** (generic name); set app-specific `id`, `theme`, and colors inside the object (see the example palette in the template).
2. **`site.config.ts`** → **`siteConfigTheme`** — `siteConfigThemeFromPalette(sitePalette)` loads app-local `~/assets/css/themes/{theme}-theme.css`.
3. **`app/assets/css/main.css`** — imports `@altafusion/fugue-theme/themes/tailwind.css` and `@altafusion/shell/themes/tailwind-shell.css`.
4. **`app/app.config.ts`** — `mirrorAppUiThemeFromPalette(sitePalette)` (no manual mirror of `primary` / `gray`); `header.visualStyle: 'default'` for this template.

**Dark canvas:** this template ships **`darkCanvas: 'black'`** in **`palette.ts`** and **`content/{locale}/settings/site.yml`** → `theme.darkCanvas`. Use `gray` for the default gray-900 stack. The **`@altafusion/fugue-theme`** dark-canvas plugin sets `html[data-dark-canvas]` at runtime.

### Header visual styles

| Style | When to use |
|-------|-------------|
| **`default`** | This template — multi-route CMS (`UHeader` + `appNav`) |
| **`landing-fixed`** | One-page brochure — hash nav, mobile drawer |
| **`landing-static`** | Landing chrome without fixed positioning |

```ts
// app/app.config.ts — brochure pilot example
header: {
  visualStyle: 'landing-fixed',
  showColorMode: true,
},
```

Chrome CSS loads from **`@altafusion/shell`** (`landing-header.css`, `shell-chrome.css`). Override menu weight/spacing via CSS vars on `.landing-header` in `main.css` or your token file.

## Branding and favicon

Apps with an **`app/`** directory must place **`app.config.ts` inside `app/`** (not the project root) so Nuxt merges brand and UI tokens.

| Need | Where |
|------|--------|
| Favicon file | `public/favicon.svg` (served at `/favicon.svg`) |
| Logo path + favicon | `app/app.config.ts` → `brand.logo`, `brand.favicon` (developer — guarded) |
| Header site name | **`content/{locale}/settings/site.yml`** → `siteName` (Studio); fallback `brand.name` |
| Explicit head link | `site.config.ts` → `siteConfigIdentity.app.head.link` (template includes this) |
| `/favicon.ico` requests | `server/routes/favicon.ico.ts` redirects to the SVG |

Use a filled SVG or explicit `fill` colors — thin `stroke="currentColor"` icons can look blank in browser tabs.

## Internationalization

This template ships **English** (`/`) and **Spanish** (`/es`) via **`site.config.ts`** → **`siteConfigContent.i18n`**:

| What | Where |
|------|--------|
| Editorial copy | **`content/en/**`**, **`content/es/**` |
| Nav structure (paths, keys) | **`site.config.ts`** → `siteConfigIdentity.runtimeConfig.public.appNav` |
| Nav + UI labels | **`i18n/locales/en.yaml`**, **`es.yaml`** (`nav.home`, `nav.about`, …) |
| Locale switcher | Shell **`ShellLangToggle`** |

Nav uses locale-neutral paths (`to: '/about'`); shell applies **`localePath()`** so Spanish stays on `/es/about`.

## Site settings and SEO


## Set up a new site

1. Use this template to create your repository, clone it, then `pnpm install` (Node version in `.nvmrc`).
2. In `package.json`, rename the package (`my-site`). In `site.config.ts`, set `owner` and `repo` in `fugueContentStudioSection` to your GitHub repository
   (the defaults point at the stack's own repo).
3. In `app/app.config.ts`, `site.config.ts` (`appName`, `appNav`), `i18n/locales/*.yaml` and `palette.ts`, replace the sample branding.
4. Replace the sample `content/` and `public/`.
5. Copy `.env.example` to `.env`, then `pnpm dev` (default `http://localhost:8001`; use `localhost`, not `127.0.0.1`, for OAuth).
6. Before pushing: `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Nuxt Studio

`defineFugueContentSite()` wires `nuxt-studio` with a git-backed `pages` collection (admin route `/_studio`). Studio commits
markdown under `content/` with the prefix set in `siteConfigStudio`. Production publish needs `STUDIO_GITHUB_TOKEN` on the host.
`@altafusion/fugue-content` installs `nuxt-studio` from the `@altafusion/nuxt-studio` fork (upstream 1.8.2 plus the
`@nuxtjs/i18n` locale fix and a media id quoting fix) until upstream ships them, so the site needs no patch of its own.

Studio setup notes:

- Create `STUDIO_GITHUB_TOKEN` as the account that owns the repo (fine-grained, only this repo, Contents read and write, with an
  expiry). A token created by another account gets a 404 from the GitHub API on a private repo.
- Keep `rootDir: ''` in `siteConfigStudio` for a single-site repo. `'.'` makes Studio send paths GitHub rejects with a 422.

## Deploy (Netlify)

1. Create a Netlify site from your repository. Leave Base directory empty; `netlify.toml` sets the build and publish directory.
2. Env vars, scope **Builds**: `SITE_AUTH_ENABLED=true` (already in `netlify.toml`).
3. Env vars, scope **Functions**: `STUDIO_GOOGLE_CLIENT_ID`, `STUDIO_GOOGLE_CLIENT_SECRET`, `STUDIO_GOOGLE_MODERATORS`,
   `STUDIO_GITHUB_TOKEN`.
4. `STUDIO_GITHUB_TOKEN`: a fine-grained GitHub token for your site's repository only, Contents read and write, with an expiry. Type
   it into Netlify yourself; never paste it in chat, issues or screenshots.
5. Studio and Google OAuth: create a Web application credential in Google Cloud Console. Redirect URIs, exactly:
   `http://localhost:8001/__nuxt_studio/auth/google` and `https://<your-netlify-host>/__nuxt_studio/auth/google`.
6. Smoke test: open `/_studio` on the deployed site, sign in, publish one edit, confirm the commit lands on `main`.

**Auth mode:** `fugueContentAuthModeSection('studio')`. Anonymous visitors see no Edit control; `/login` is the editor entry.

## Local dev (`scripts/dev.mjs`)

`pnpm dev` runs `scripts/dev.mjs` instead of bare `nuxt dev`. On macOS, Nuxt 4.4+ vite-node sockets under `$TMPDIR` can exceed the
socket path limit (`connect EINVAL ...nuxt-vite-node....sock`); the script shortens it. It also sets `NUXT_DEV_EAGER_LISTEN=0`, so the
server binds after Nuxt config loads and the boot splash (`app/spa-loading-template.html`) shows meanwhile. Set `SITE_DEV_PORT` or
`PORT` in `.env`. `nodeLinker: hoisted` in `pnpm-workspace.yaml` is required for Content SQLite.

## Related packages

| Package | Use |
|---------|-----|
| `@altafusion/fugue-content` | Content engine, layouts, MDC blocks |
| `@altafusion/shell` | Site chrome |
| `@altafusion/fugue-theme` | Theme tokens and Nuxt UI setup |
| `@altafusion/nuxt-base` | Shared Nuxt defaults and dev tooling |
