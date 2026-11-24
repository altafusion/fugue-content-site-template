import type { SitePalette } from '@altafusion/nuxt-base/ui-theme'

/** Fugue Content Starter demo palette — indigo / slate. */
export const sitePalette = {
  id: 'demo',
  theme: 'demo',
  darkCanvas: 'black',
  tokens: '~/assets/css/themes/demo-theme.css',
  nuxtUI: {
    colors: {
      primary: 'indigo',
      secondary: 'indigo',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate'
    },
    notifications: {
      position: 'top-0 bottom-auto'
    }
  }
} satisfies SitePalette
