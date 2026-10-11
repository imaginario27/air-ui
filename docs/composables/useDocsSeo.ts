const DEFAULT_OG_IMAGE = '/images/air-ui-og.jpg'

export const useDocsSeo = () => {
    const route = useRoute()
    const site = useSiteConfig()

    const title = computed(() => route.meta.title as string | undefined)
    const description = computed(() => route.meta.description as string | undefined)
    const url = computed(() => `${site.url}${route.path}`)
    const image = computed(() => `${site.url}${DEFAULT_OG_IMAGE}`)

    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        ogImage: image,
        ogSiteName: site.name,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: image,
    })

    useHead({
        link: computed(() => [{ rel: 'canonical', href: url.value }]),
    })
}
