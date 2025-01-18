import fs from 'fs'
import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    '~/plugins/pinia', // Add Pinia plugin
    '~/plugins/naive-ui'
  ],
})
