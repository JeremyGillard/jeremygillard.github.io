// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxtjs/color-mode"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Jeremy Gillard",
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  fonts: {
    families: [{ name: "Bruno Ace", provider: "google", weights: [400], global: true }],
  },
});
