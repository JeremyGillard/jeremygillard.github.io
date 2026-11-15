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
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
  fonts: {
    families: [
      { name: "Michroma", provider: "google", weights: [400], global: true },
      { name: "Inter", provider: "google", weights: [400, 500, 600], global: true },
      // Resume page only (matches the original Google Docs PDF).
      { name: "Roboto", provider: "google", weights: [400, 700], styles: ["normal", "italic"] },
    ],
  },
});
