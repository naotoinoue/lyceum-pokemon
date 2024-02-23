import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["animate.css"],
  runtimeConfig: {
    region: "eu-central-1",
    bucketName: "km-sd11-pokemon",
    public: {
      backendOrigin: undefined,
    },
  },
});
