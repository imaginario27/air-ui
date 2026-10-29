// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const themeInitScript = readFileSync(resolve(__dirname, 'scripts/theme-init.js'), 'utf-8')

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    ssr: false,

    extends: ['../air-ui-utils'],

    modules: ['@nuxt/image', '@nuxt/eslint', '@vueuse/nuxt', '@nuxt/icon'],

    plugins: ['@/plugins/vue3-toastify'],

    imports: {
        dirs: ['models/**', 'composables/**'],
    },

    components: [
        // Auto-import components based only on its name, not path,
        {
            path: './components',
            pathPrefix: false,
        },
    ],

    icon: {
        componentName: 'NuxtIcon',
        serverBundle: {
            collections: ['mdi'],
        },
    },

    eslint: {
        // options here
    },

    app: {
        head: {
            script: [
                {
                    key: 'air-ui-theme-init',
                    innerHTML: themeInitScript,
                    tagPosition: 'head',
                },
            ],
        },
    },

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [tailwindcss() as any],
        optimizeDeps: {
            // Nuxt >= 4.6 scans the root of an installed layer without `app/`; keep Node-only config files out of the client scan
            entries: ['!**/node_modules/@imaginario27/*/{nuxt.config.ts,eslint.config.mjs,scripts/**}'],
            // Tailwind only runs on the Node side; pre-bundling its native binding (.node) breaks the dev optimizer
            exclude: ['@tailwindcss/oxide', '@tailwindcss/vite', 'tailwindcss'],
        },
    },
})
