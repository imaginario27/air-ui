<template>
    <div>
        <AppHeader useBottomTabsHeader />
        
        <NavSidebar 
            sidebarId="nav-sidebar"
            :menuItems="sidebarMenu"
            :itemsStyleType="SidebarNavMenuItemStyleType.COMPACT"
            itemsCustomClass="!font-medium"
            :headerHeight="headerHeightOffset"
            :expandedWidth="expandedSidebarWidth"
            class="border-border-neutral-subtle"
        />
    
        <ContentBody 
            hasSidebar 
            :sidebarWidth="expandedSidebarWidth"
            class="flex-row"
        >
            <MainContent 
                :tocSidebarWidth="Number(hasTableOfContent ? tocSidebarWidth : 0)"
            >
                <ContentPageHeader 
                    v-if="isComponentPage"
                    :type="hasOvertitle ? PageTitleType.WITH_OVERTITLE: PageTitleType.SIMPLE" 
                    hasGoBackLink
                    goBackText="Back to components"
                    :goBackLink="`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`"
                    class="border-border-neutral-subtle"
                />

                <ContentPageHeader 
                    v-else-if="isUtilsPage"
                    :type="hasOvertitle ? PageTitleType.WITH_OVERTITLE: PageTitleType.SIMPLE" 
                    :hasGoBackLink="isUtilsChildPage"
                    goBackText="Back to utils"
                    :goBackLink="`/${AppSlug.DOCS}/${AppSlug.UTILS}`"
                    class="border-border-neutral-subtle"
                >   
                    <template v-if="hasPageMetadata" #bottom>
                        <PageMetadata :data="pageMetadata" />
                    </template>
                </ContentPageHeader>

                <ContentPageHeader 
                    v-else
                    :type="hasOvertitle ? PageTitleType.WITH_OVERTITLE: PageTitleType.SIMPLE" 
                    class="border-border-neutral-subtle"
                />

                <slot />
            </MainContent>
            <TableOfContentsSidebar
                v-if="hasTableOfContent"
                :title="tocTitle"
                :links="tocLinks"
                :topOffset="headerHeightOffset + 32"
                :maxWidth="tocSidebarWidth"
                class="hidden lg:flex"
            />
        </ContentBody>
    </div> 
</template>
<script setup lang="ts">
// States
const tocTitle = ref('On this page')
const tocSidebarWidth = 280
const headerHeightOffset = 121

// Route
const route = useRoute()
const cleanPath = computed(() => {
    return route.path?.split('?')[0]?.split('#')[0] || ''
})

// Computed states
const hasOvertitle = computed(() => route.meta.overtitle || null)
const hasTableOfContent = computed(() => tocLinks.value.length)
const hasPageMetadata = computed(() => {
    const { category, tags, updatedAt } = route.meta

    return Boolean(
        category ||
        (Array.isArray(tags) && tags.length > 0) ||
        updatedAt
    )
})

const pageMetadata = computed(() => {
    return {
        category: route.meta.category as string,
        tags: route.meta.tags as string[],
        updatedAt: route.meta.updatedAt as string,
    }
})

const isComponentPage = computed(() => {
    const path = cleanPath.value
    const basePath = `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`

    if (!path) return false

    return new RegExp(`^${basePath}/.+`).test(path) // Has component name slug
})

const isUtilsRootPage = computed(() => {
    const path = cleanPath.value
    return !!path && path === `/${AppSlug.DOCS}/${AppSlug.UTILS}`
})

const isUtilsChildPage = computed(() => {
    const path = cleanPath.value
    return !!path && path.startsWith(`/${AppSlug.DOCS}/${AppSlug.UTILS}/`)
})

const isUtilsPage = computed(() => {
    return isUtilsRootPage.value || isUtilsChildPage.value
})

const expandedSidebarWidth = computed(() => {
    return isUtilsPage.value ? 320 : 240
})

// Computed navigation items
const sidebarMenu = computed<SidebarMenuItem[]>(() => {
    const path = cleanPath.value

    if (!path) return []

    switch (true) {
        case path.startsWith(`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`):
            return sidebarComponentsMenu
        
        case path.startsWith(`/${AppSlug.DOCS}/${AppSlug.UTILS}`):
            return sidebarUtilsMenu

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
</script>
