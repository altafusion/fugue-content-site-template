/**
 * Site config registry.
 *
 * Consumed by `nuxt.config.ts`. Section order: theme → identity → content → auth → studio → dev.
 */
import { fugueContentAuthModeSection, fugueContentStudioSection } from '@altafusion/fugue-content/site-config-registry'
import { devServerOptions, siteDevPort, templateDevPorts, templateViteServerOptions } from '@altafusion/nuxt-base/dev/ports'
import { siteConfigThemeFromPalette } from '@altafusion/nuxt-base/ui-theme'
import { readFileSync } from 'node:fs'
import { sitePalette } from './palette'

const devPort = siteDevPort(templateDevPorts.fugueContentSite)

// ---------------------------------------------------------------------------
// Theme & UI — fugue-theme theme CSS + Nuxt UI palette (createAppConfig)
// ---------------------------------------------------------------------------

export const siteConfigTheme = siteConfigThemeFromPalette(sitePalette)

// ---------------------------------------------------------------------------
// Site identity — name, head, app styles
// ---------------------------------------------------------------------------

export const siteConfigIdentity = {
  runtimeConfig: {
    public: {
      appName: 'Fugue Content',
      appNav: [
        { labelKey: 'nav.home', label: 'Home', to: '/', icon: 'i-lucide-home', id: 'home' },
        { labelKey: 'nav.about', label: 'About', to: '/about', icon: 'i-lucide-info', id: 'about' },
        { labelKey: 'nav.demo', label: 'Demo', to: '/app/demo', icon: 'i-lucide-layout-dashboard', id: 'demo' }
      ]
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
}

// ---------------------------------------------------------------------------
// Content — i18n, MDC (optional)
// ---------------------------------------------------------------------------

export const siteConfigContent = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.yaml', isCatchallLocale: true },
      { code: 'es', name: 'Español', file: 'es.yaml' }
    ]
  }
}

// ---------------------------------------------------------------------------
// Auth — Google Studio OAuth only (`STUDIO_GOOGLE_*`); peek gate disabled
// ---------------------------------------------------------------------------

export const siteConfigAuth = fugueContentAuthModeSection('studio')

// ---------------------------------------------------------------------------
// Studio — git-backed CMS (Nuxt Studio)
// ---------------------------------------------------------------------------

// Replace OWNER and REPO with the GitHub repository Studio commits to.
export const siteConfigStudio = fugueContentStudioSection({
  rootDir: '',
  messagePrefix: 'content:',
  owner: 'OWNER',
  repo: 'REPO'
})

// ---------------------------------------------------------------------------
// Dev tooling — ports, Vite HMR
// ---------------------------------------------------------------------------

export const siteConfigDev = {
  devServer: {
    ...devServerOptions(devPort),
    // Nuxt 4.6 otherwise paints a full-screen logo until the dev server is ready.
    loadingTemplate: () => readFileSync(new URL('./app/spa-loading-template.html', import.meta.url), 'utf8')
  },

  vite: {
    server: templateViteServerOptions()
  }
}

// ---------------------------------------------------------------------------
// Combined — passed to defineFugueContentSite(siteConfig, siteConfigTheme)
// ---------------------------------------------------------------------------

export const siteConfig = {
  ...siteConfigIdentity,
  ...siteConfigContent,
  ...siteConfigAuth,
  ...siteConfigStudio,
  ...siteConfigDev
}
