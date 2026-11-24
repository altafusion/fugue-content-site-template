---
title: About
description: How this starter fits the Fugue Content layer
layout: article-aside
nav:
  primary: about
---

## Starter Template

This page is served from `content/en/about.md` via `@altafusion/fugue-content`.

Create your site from this template repository. The layer provides:

- Nuxt Content `pages_{locale}` collections (or single `pages` when monolingual)
- MDC blocks (`Hero`, `CallToAction`)
- Content layouts (`landing`, `article`, `article-aside`)
- Catch-all routing with shell header and footer

## Internationalization

This template demonstrates **English** (`/`) and **Spanish** (`/es`) with `prefix_except_default`. Editorial copy lives under **`content/en/`** and **`content/es/`**; UI chrome strings are in **`i18n/locales/*.yaml`**.

## Extension Model (Phase 4a)

Interactive product routes live in `app/pages/**` — for example `/app/demo` — and use the shell `product` layout. Explicit Vue routes **win** over the Fugue Content content catch-all.

Studio-editable copy inside a product page uses `content/{locale}/fragments/{slug}.md` and `<FugueContentFragment />` — see `/app/demo`. Site-wide metadata (phone, address, default OG, `siteName`, landing manifest) lives in **`content/{locale}/settings/site.yml`** — see **[Settings & Metadata](/fugue-content/starter-template/settings-and-metadata)**.

App-specific MDC blocks override the layer by name when you need them. This template includes `OverrideDemo` (below) as a teaching example only — real sites use shared blocks from `@altafusion/fugue-content` unless branding requires an override.

::override-demo
::
