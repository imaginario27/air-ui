export default defineNuxtRouteMiddleware((to) => {
    const cleanPath = to.path.replace(/\/+$/, '')

    const redirects: Record<string, string> = {
        '/docs': `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}`,
    }

    const target = redirects[cleanPath]

    if (target) {
        return navigateTo(target)
    }
})
