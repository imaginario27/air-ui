// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
import { resolve } from 'path'

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    ssr: false,

    /* runtimeConfig: {
        secretEnv: process.env.SECRET_ENV,
        public: {
            publicEnv: process.env.PUBLIC_ENV,
            GQL_HOST: "https://spacex-production.up.railway.app/",
        },
    }, */

    modules: ["@pinia/nuxt", "@nuxt/image", "nuxt-mdi", "@nuxt/eslint", '@vueuse/nuxt', '@nuxt/content', '@nuxt/icon'],

    plugins: ["@/plugins/vue3-toastify", "@/plugins/prettier"],

    extends: [
        '../packages/air-ui-ds',
        '../packages/air-ui-utils',
    ],

    imports: {
        dirs: [
            "models/**",
            "data/**"
        ],
    },

    components: [
        // Auto-import components based only on its name, not path,
        {
            path: "@/components",
            pathPrefix: false,
        },
    ],

    alias: {
        '@air-ui/components': resolve(__dirname, '../packages/air-ui-ds/components'),
    },

    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            link: [
                // Preconnect for fonts
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "anonymous",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
                },

                // Icons
                {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    href: "/images/favicon/apple-touch-icon.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "192x192",
                    href: "/images/favicon/android-chrome-192x192.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "512x512",
                    href: "/images/favicon/android-chrome-512x512.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/images/favicon/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: "/images/favicon/favicon-16x16.png",
                },
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon/favicon.ico",
                },
            ],

            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1.0, user-scalable=no",
                },
            ],
        },
    },

    content: {
        build: {
            markdown: {
                toc: { // Table of content Header depth
                    depth: 3, 
                },
                highlight: {
                    theme: {
                        default: 'github-dark', //light theme: github-light
                        dark: 'github-dark',
                    }
                },
                
            },
        }
    },

    eslint: {
        // options here
    },

    css: ["~/assets/css/main.css", "~/assets/css/docs.css"],

    vite: {
        plugins: [tailwindcss()],
    },
})

