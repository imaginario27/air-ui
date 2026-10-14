// Applies the saved theme before first paint to avoid a light-to-dark flash.
// Inlined in <head> by nuxt.config.ts. Mirrors useDarkMode: 'color-mode' holds light | dark | system.
(function () {
    try {
        // VueUse stores plain strings raw (dark), not JSON-encoded ("dark")
        const mode = localStorage.getItem('color-mode') || 'system'

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (mode === 'dark' || (mode !== 'light' && prefersDark)) {
            document.documentElement.classList.add('dark')
        }
    } catch (e) {
        // Storage unavailable: fall back to the default (light) theme
    }
})()
