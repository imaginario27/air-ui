<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :mobileMenuType="MobileNavigationMenuType.SIDEBAR"
        hasBorder
        isSticky
        class="backdrop-blur-md"
    >
        <template #header-logo>
            <AppLogo
                class="max-w-[80px]"
            />
            <Badge 
                :color="ColorAccent.PRIMARY_BRAND"
                :shape="BadgeShape.PILL"
                text="1.0.0"
                class="self-end select-none"
            />
        </template>

        <template #header-actions>
            <ActionIconButton 
                icon="mdiMagnify"
            />
            <ActionIconButton 
                :icon="isDark ? 'mdiMoonWaxingCrescent' : 'mdiWeatherSunny'"
                @click="toggleDark"
            />
        </template>

        <template v-if="useBottomTabsHeader" #bottom-header>
            <div 
                v-if="tocLinks.length"
                :class="[ 
                    'px-content-side-padding-mobile',
                    'md:px-content-side-padding',
                    'flex',
                    'lg:hidden',
                    'border-b',
                    'border-border-default',
                ]"
            >
                <Collapsible :title="tocTitle">
                    <TableOfContents :links="tocLinks" />
                </Collapsible>
            </div>
            
            <div
                v-if="tabs.length"
                :class="[ 
                    'px-content-side-padding-mobile',
                    'md:px-content-side-padding',
                    'border-b',
                    'border-border-default',
                ]"
            >
                <TabBar 
                    v-model="tabActiveIndex" 
                    :tabs 
                />
            </div>
        </template>
    </CompactHeader>
</template>
<script setup lang="ts">
// Props 
defineProps({
    useBottomTabsHeader: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

// States
const tocTitle = ref('On this page')

// Stores
const darkModeStore = useDarkMode()
const { toggleDark, isDark } = darkModeStore

// Route
const route = useRoute()
const cleanPath = computed(() => {
    return route.path?.split('?')[0]?.split('#')[0] || ''
})

// Computed navigation items
const mainHeaderMenu = computed<MenuItem[]>(() => [
    {
        text: 'Docs',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`,
    },
    {
        text: 'Figma',
        to: `/${AppSlug.FIGMA}`,
    },
    {
        text: 'Releases',
        to: `/releases`,
    },
])

const tabs = computed<TabItem[]>(() => {
    const path = cleanPath.value

    if (!path) return []

    switch (true) {
        case path.startsWith(`/${AppSlug.DOCS}/`):
            return docTabs

        default:
            return []
    }
})

const tabActiveIndex = computed(() => {
    const path = cleanPath.value

    if(!path) return 0

    switch (true) {
        case path.startsWith(`/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`):
            return 0

        case path.startsWith(`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`):
            return 1

        default:
            return 0
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