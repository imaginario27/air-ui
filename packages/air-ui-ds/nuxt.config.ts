// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    ssr: false,

    extends: [
        '../air-ui-utils',
    ],

    modules: ["@nuxt/image", "nuxt-mdi", "@nuxt/eslint", '@vueuse/nuxt', "@nuxt/icon"],

    plugins: ["@/plugins/vue3-toastify"],

    imports: {
        dirs: [
            "models/**"
        ],
    },

    components: [
        // Auto-import components based only on its name, not path,
        {
            path: "./components",
            pathPrefix: false,
        },
    ],

    icon: {
        componentName: 'NuxtIcon',
        serverBundle: {
            collections: ['mdi']
        }
    },

    eslint: {
        // options here
    },

    css: ["./assets/css/main.css"],

    vite: {
        plugins: [tailwindcss()],
    },
})