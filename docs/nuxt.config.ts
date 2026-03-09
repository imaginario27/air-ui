// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
import { resolve } from 'path'

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    ssr: false,

    runtimeConfig: {
        githubToken: process.env.GITHUB_TOKEN,
        githubRepo: 'imaginario27/air-ui',
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    },

    modules: ["@pinia/nuxt", "@nuxt/image", "@nuxt/eslint", "@vueuse/nuxt", "@nuxt/content", "@nuxt/icon", "nuxt-llms", "@nuxtjs/mcp-toolkit"],

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

            title: 'Loading...',

            // $s is replaced by the page title
            titleTemplate: '%s | AirUI',
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

    icon: {
        customCollections: [
            {
                prefix: 'custom-icon',
                dir: './assets/icons',
                // if you want to include all the icons in nested directories:
                // recursive: true,
            },
        ],
    },

    llms: {
        domain: process.env.LLM_DOMAIN || 'https://air-ui.netlify.app',
        title: 'AirUI',
        description: 'AirUI design system documentation and resources',
        sections: [
            {
                title: 'Getting Started',
                description: 'Introduction and setup instructions for AirUI',
                contentCollection: 'content',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/getting-started%' }
                ]
            },
            {
                title: 'Components',
                description: 'Documentation for Air UI components',
                contentCollection: 'content',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/components%' }
                ]
            },
            {
                title: 'Utilities',
                description: 'Documentation for Air UI utilities',
                contentCollection: 'content',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/utils%' }
                ]
            }
        ]
    },

    mcp: {
        name: 'airui',
        route: '/mcp',
        version: '1.0.0',
    },
  
    eslint: {
        // options here
    },

    experimental: {
        asyncContext: true
    },

    css: ["~/assets/css/main.css", "~/assets/css/docs.css"],

    vite: {
        plugins: [tailwindcss() as any],
    },
})

