<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :showMobileMenuToggle
        :showMobileSidebarToggle
        :sidebarTogglePosition="SidebarTogglePosition.LOGO_LEFT_SIDE"
        hasBorder
        isSticky
        class="backdrop-blur-md"
    >
        <template #header-logo>
            <AppLogo
                :src="isDark ? logoDark : logoLight"
                class="max-w-[80px]"
            />
            <Badge 
                :color="ColorAccent.PRIMARY_BRAND"
                :shape="BadgeShape.PILL"
                :text="designSystemDetails.version"
                class="self-end select-none"
            />
        </template>

        <template #header-actions>
            <!-- <ActionIconButton 
                icon="mdi:magnify"
            /> -->
 
            <ActionIconButton 
                v-if="!isMobile"
                :icon="isDark ? 'mdi:moon-waxing-crescent' : 'mdi:weather-sunny'"
                @click="toggleDark"
            />
            <ActionButton 
                v-else
                :text="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                :iconPosition="IconPosition.LEFT"
                :icon="isDark ? 'mdi:moon-waxing-crescent' : 'mdi:weather-sunny'"
                isFullWidth
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
// Imports
import logoLight from '@/public/images/logo/air-ui-logo-color.svg?raw'
import logoDark from '@/public/images/logo/air-ui-logo-white.svg?raw'

// Props 
defineProps({
    useBottomTabsHeader: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    showMobileMenuToggle: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showMobileSidebarToggle: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// States
const tocTitle = ref('On this page')

// Stores
const darkModeStore = useDarkMode()
const { toggleDark, isDark } = darkModeStore

// Composables
const { isMobile } = useIsMobile()

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
    /* {
        text: 'Figma',
        to: `/${AppSlug.FIGMA}`,
    },
    {
        text: 'Releases',
        to: `/releases`,
    }, */
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