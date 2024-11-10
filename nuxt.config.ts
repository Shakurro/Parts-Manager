// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    '~/plugins/pinia.js', // Ensure the correct path and extension
    '~/plugins/pinia' // Add Pinia plugin
  ],
  
})
