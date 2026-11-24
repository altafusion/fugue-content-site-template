import { defineFugueContentSite } from '@altafusion/fugue-content/define-site'
import { siteConfig, siteConfigTheme } from './site.config'

export default defineNuxtConfig(defineFugueContentSite(siteConfig, siteConfigTheme))
