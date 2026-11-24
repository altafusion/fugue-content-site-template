import { sendRedirect } from 'h3'

/** Browsers request /favicon.ico by default; redirect to the SVG in public/. */
export default defineEventHandler((event) => {
  return sendRedirect(event, '/favicon.svg', 302)
})
