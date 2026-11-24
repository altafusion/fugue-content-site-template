/**
 * Fugue Content Starter — branding and Nuxt UI theming.
 * Palette is the single source for Nuxt UI colors (see `palette.ts` + README → Theming).
 */
import { mirrorAppUiThemeFromPalette } from '@altafusion/nuxt-base/ui-theme'
import { sitePalette } from '../palette'

export default defineAppConfig({
  brand: {
    name: 'Fugue Content Starter',
    favicon: '/favicon.svg'
  },

  seo: {
    title: 'Fugue Content',
    description: 'Markdown-driven marketing sites on @altafusion/fugue-content.',
    titleTemplate: '%s · Fugue Content',
    ogImage: '/favicon.svg',
    twitterCard: 'summary_large_image'
  },

  header: {
    visualStyle: 'default',
    showColorMode: true
  },

  ui: mirrorAppUiThemeFromPalette(sitePalette)
})
