<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :showMobileMenuToggle
        :showMobileSidebarToggle
        :sidebarTogglePosition="SidebarTogglePosition.LOGO_LEFT_SIDE"
        hasBorder
        isSticky
        headerClass="border-border-neutral-subtle"
        class="backdrop-blur-lg bg-background-surface/90"
        navMobileMenuClass="lg:hidden min-w-[300px]"
    >
        <template #header-logo>
            <div :class="['flex gap-3', isMobile && 'mt-1.5']">
                <AppLogo
                    :src="isDark ? logoDark : logoLight"
                    class="w-[80px]"
                />
                <Badge 
                    :color="isDark ? ColorAccent.NEUTRAL : ColorAccent.PRIMARY_BRAND"
                    :shape="BadgeShape.PILL"
                    :text="designSystemDetails.version"
                    :isTransparent="isDark"
                    class="select-none self-end"
                />
            </div>
        </template>

        <template #header-actions> 
            <ToggleButtonGroup
                v-if="!isMobile"
                v-model="toggleButtonTheme"
                :buttons="themeToggleIconButtons"
                :hasButtonBorder="false"
                onlyIcon
            />
            <ToggleButtonsGroupField
                v-else
                id="theme"
                v-model="toggleButtonTheme"
                :buttons="themeToggleButtons"
                :hasButtonBorder="false"
                label="Theme"
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
                <Collapsible v-model="isTOCOpen" :title="tocTitle">
                    <TableOfContents 
                        :links="tocLinks" 
                        class="max-h-[200px] overflow-y-auto"
                        @itemClick="() => isTOCOpen = false"
                    />
                </Collapsible>
            </div>
    
            <div
                v-if="tabs.length"
                :class="[ 
                    'px-content-side-padding-mobile',
                    'md:px-content-side-padding',
                    'border-b',
                    'border-border-neutral-subtle',
                ]"
            >
                <!-- Mobile select -->
                <DropdownSelect
                    v-model="selectedTabRoute"
                    :options="tabSelectOptions"
                    :size="SelectSize.LG"
                    class="mb-4 sm:hidden"
                />

                <!-- Desktop tabs -->
                <TabBar 
                    v-model="tabActiveIndex" 
                    :tabs 
                    :decoration="TabDecoration.ICON"
                    class="hidden sm:flex"
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

// Stores
const darkModeStore = useDarkMode()
const { isDark, themeMode, setTheme } = darkModeStore

// States
const tocTitle = ref('On this page')
const isTOCOpen = ref(false)

const themeToggleIconButtons = ref<ToggleIconButton[]>([
    { icon: 'mdi:weather-sunny', value: 'light' },
    { icon: 'mdi:moon-waxing-crescent', value: 'dark' },
    { icon: 'mdi:theme-light-dark', value: 'system' },
])


const themeToggleButtons = ref<ToggleButton[]>([
    {
        text: 'Light',
        value: 'light',
        icon: 'mdi:weather-sunny',
        iconPosition: IconPosition.LEFT,
    },
    {
        text: 'Dark',
        value: 'dark',
        icon: 'mdi:moon-waxing-crescent',
        iconPosition: IconPosition.LEFT,
    },
    {
        text: 'System',
        value: 'system',
        icon: 'mdi:theme-light-dark',
        iconPosition: IconPosition.LEFT,
    },
])


// Composables
const { isMobile } = useIsMobile()

// Route
const route = useRoute()
const cleanPath = computed(() => {
    return route.path?.split('?')[0]?.split('#')[0] || ''
})

// Computed
const mainHeaderMenu = computed<MenuItem[]>(() => [
    {
        text: 'Docs',
        to: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`,
    },
    {
        text: 'Components',
        to: `/${AppSlug.COMPONENTS}`,
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

        case path.startsWith(`/${AppSlug.DOCS}/${AppSlug.UTILS}`):
            return 2

        default:
            return 0
    }
})

const tabSelectOptions = computed(() =>
    convertToSelectOptions(tabs.value, {
        text: 'text',
        value: 'to',
        icon: 'icon',
    }),
)

const selectedTabRoute = computed({
    get: () => cleanPath.value,
    set: (value: string) => {
        if (value) {
            navigateTo(value)
        }
    },
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

const toggleButtonTheme = computed({
    get: () => themeMode.value,
    set: (value: 'light' | 'dark' | 'system') => {
        setTheme(value)
    },
})
</script>