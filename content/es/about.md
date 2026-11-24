---
title: Quienes Somos
description: Cómo funciona este templete en la capa Fugue Content
layout: article-aside
nav:
  primary: about
---

## Fugue Content

Esta página se sirve desde **`content/es/about.md`** mediante **`@altafusion/fugue-content`**.

Crea tu sitio desde este repositorio template. La capa proporciona:

- Colecciones Content **`pages_{locale}`** (o **`pages`** en un solo idioma)
- Bloques MDC (`Hero`, `CallToAction`)
- Layouts de contenido (`landing`, `article`, `article-aside`)
- Enrutamiento catch-all con cabecera y pie del shell

## Internacionalización

Este template demuestra **inglés** (`/`) y **español** (`/es`) con `prefix_except_default`. El contenido editorial está en **`content/en/`** y **`content/es/`**; los textos de la interfaz en **`i18n/locales/*.yaml`**.

## Modelo de extensión (Fase 4a)

Las rutas de producto interactivas viven en **`app/pages/**`** — por ejemplo **`/app/demo`** — y usan el layout shell **`product`**. Las rutas Vue explícitas **ganan** al catch-all de contenido de Fugue Content.

El copy editable en Studio dentro de una página de producto usa **`content/{locale}/fragments/{slug}.md`** y **`<FugueContentFragment />`** — ver **`/app/demo`**. Los metadatos tipados del sitio (teléfono, dirección, OG por defecto) usarán una colección **`settings`** aparte (Fase 5).

Los bloques MDC específicos de la app sobrescriben la capa por nombre cuando hace falta. Este template incluye **`OverrideDemo`** (abajo) solo como ejemplo didáctico — los sitios reales usan bloques compartidos de Fugue Content salvo que el branding exija un override.

::override-demo
::
