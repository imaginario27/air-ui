export default defineNuxtRouteMiddleware((to) => {
    const cleanPath = to.path.replace(/\/+$/, '')

    const redirects: Record<string, string> = {
        '/docs': `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`,
    }

    const target = redirects[cleanPath]

    if (target) {
        return navigateTo(target)
    }
})
