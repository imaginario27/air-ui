<template>
    <div>
        <AppHeader useBottomTabsHeader />
        
        <NavSidebar 
            :menuItems="sidebarMenu"
            :itemsStyleType="SidebarNavMenuItemStyleType.COMPACT"
            itemsCustomClass="!font-medium"
            :headerHeight="121"
        />
    
        <ContentBody hasSidebar class="flex-row">
            <MainContent 
                :tocSidebarWidth="Number(!hasTableOfContent ? 0 : 240)"
            >
                <ContentPageHeader 
                    v-if="isComponentPage"
                    :type="hasOvertitle ? PageTitleType.WITH_OVERTITLE: PageTitleType.SIMPLE" 
                    hasGoBackLink
                    goBackText="Back to components"
                    :goBackLink="`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`"
                />

                <ContentPageHeader 
                    v-else
                    :type="hasOvertitle ? PageTitleType.WITH_OVERTITLE: PageTitleType.SIMPLE" 
                />

                <slot />
            </MainContent>
            <TableOfContentsSidebar
                v-if="hasTableOfContent"
                :title="tocTitle"
                :links="tocLinks"
                class="hidden lg:flex"
            />
        </ContentBody>
        <!-- Modal -->
        <!-- <SearchModalDialog
            v-model="showSearchModal" 
        /> -->
    </div> 
</template>
<script setup lang="ts">
// States
const tocTitle = ref('On this page')

// Route
const route = useRoute()
const cleanPath = computed(() => {
    return route.path?.split('?')[0]?.split('#')[0] || ''
})

// Computed states
const hasOvertitle = computed(() => route.meta.overtitle || null)
const hasTableOfContent = computed(() => tocLinks.value.length)

// Computed navigation items
const sidebarMenu = computed<SidebarMenuItem[]>(() => {
    const path = cleanPath.value

    if (!path) return []

    switch (true) {
        case path.startsWith(`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`):
            return sidebarComponentsMenu

        case path.startsWith(`/${AppSlug.DOCS}/`):
            return sidebarGettingStartedMenu

        default:
            return []
    }
})

// TOC Links
const { data } = await useAsyncData(
    () => queryCollection('content').path(cleanPath.value).first(),
    {
        watch: [cleanPath],
    }
)

// Up to depth level 3 links
const tocLinks = computed(() => {
    const filterDepth = (links: TOCLink[]): TOCLink[] => {
        return links
            .filter((link) => link.depth <= 3)
            .map((link) => ({
                ...link,
                children: link.children ? filterDepth(link.children) : [],
            }))
    }

    return data.value?.body?.toc?.links
        ? filterDepth(data.value.body.toc.links)
        : []
})

// Computed go back links
const isComponentPage = computed(() => {
    const path = cleanPath.value
    const basePath = `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`

    if (!path) return false

    return new RegExp(`^${basePath}/.+`).test(path) // Has component name slug
})
</script>
