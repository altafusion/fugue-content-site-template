// @ts-check
import { sharedVueSfcRules } from '@altafusion/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

/** Appended configs run after @nuxt/eslint-config and override matching rules (see `.nuxt/eslint.config.mjs`). */
export default withNuxt({
  files: ['**/*.vue'],
  rules: {
    ...sharedVueSfcRules,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 12,
        multiline: { max: 12 }
      }
    ],
    'no-console': 'warn'
  }
})
