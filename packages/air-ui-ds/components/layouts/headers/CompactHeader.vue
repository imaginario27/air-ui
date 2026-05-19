<template>
    <header 
        :class="[
            isSticky && 'sticky top-0 z-50',
        ]"
    >
        <slot name="top-header" />

        <!-- Main header wrapper -->
        <div
            :class="[
                'w-full', 
                'flex',
                'items-center',
                'justify-between',
                'gap-3',
                'mx-auto',
                'px-content-side-padding-mobile md:px-content-side-padding',
                'py-4',
                'bg-background-surface',
                hasGlassEffect && [
                    'backdrop-blur-md',
                    'bg-background-surface/30 dark:bg-background-surface/85',
                ],
                hasBorder && 'border-b border-border-default',
                headerClass,
            ]"
        >
            <!-- Logo -->
            <div class="flex gap-4">
                <template 
                    v-if="
                        showMobileSidebarToggle
                        && sidebarTogglePosition === SidebarTogglePosition.LOGO_LEFT_SIDE
                    "
                >
                    <ActionIconButton
                        :icon="isMobileSidebarOpen ? 'mdi:menu-open' : 'mdi:menu-close'"
                        :class="['shadow-sm', !isMobile && 'hidden']"
                        @click="toggleMobileSidebar"
                    />
                </template>

                <slot name="header-logo" />

                <template 
                    v-if="
                        showMobileSidebarToggle
                        && sidebarTogglePosition === SidebarTogglePosition.LOGO_RIGHT_SIDE
                    "
                >
                    <ActionIconButton
                        :icon="isMobileSidebarOpen ? 'mdi:menu-open' : 'mdi:menu-close'"
                        :class="['shadow-sm', !isMobile && 'hidden']"
                        @click="toggleMobileSidebar"
                    />
                </template>
            </div>

            <!-- Navigation -->
            <div class="flex gap-3 items-center xs:w-auto">
                <!-- Horizontal menu -->
                <NavMenu
                    v-if="navMenuItems.length && !isMobile"
                    :menuItems="navMenuItems"
                    :detectActive="detectActiveMenuItem"
                    :submenuYOffset
                    :submenuDropdownClass
                    :submenuTrigger
                    :prefetchOn
                    :class="navMenuClass"
                />

                <!-- Header actions -->
                <div 
                    v-if="$slots['header-actions']"
                    :class="['gap-3 items-center', isMobile ? 'hidden' : 'flex']"
                >
                    <slot name="header-actions" />
                </div>

                <!-- User Menu -->
                <DropdownMenu 
                    v-if="userMenuItems.length && userFullname"
                    class="min-w-[200px]"
                    :positionYOffset="submenuYOffset"
                >
                    <template #activator>
                        <Avatar 
                            :size="AvatarSize.MD"
                            isInteractive
                            :displayName="userFullname"
                            :imgUrl="userAvatarUrl"
                        />
                    </template>
                    <template #items>
                        <DropdownMenuItem 
                            v-for="item in userMenuItems" :key="item.text"
                            :text="item.text"
                            :icon="item.icon"
                            :type="item.type"
                            :imgUrl="item.imgUrl"
                            :alt="item.imgUrl"
                            :to="item.to"
                            :isExternal="item.isExternal"
                            :actionType="item.actionType"
                            :prefetchOn
                            @click="item.callback"
                        />
                    </template>
                </DropdownMenu>

                <!-- Mobile menu -->
                <template v-if="isMobile && showMobileMenuToggle">
                    <DropdownMenu 
                        :class="navMobileMenuClass"
                        :positionYOffset="submenuYOffset"
                    >
                        <template #activator>
                            <ActionIconButton
                                icon="mdi:menu"
                                class="shadow-sm"
                            />
                        </template>
                        <template #items>
                            <template v-for="item in navMenuItems" :key="item.text">
                                <DropdownMenuItem 
                                    v-if="!getSubmenuItems(item).length"
                                    :text="item.text"
                                    :to="item.to"
                                />

                                <template v-else>
                                    <DropdownMenuItem
                                        v-for="submenuItem in getSubmenuItems(item)"
                                        :key="`${item.text}-${submenuItem.text}`"
                                        :text="`- ${submenuItem.text}`"
                                        :to="submenuItem.to"
                                        class="pl-5"
                                    />
                                </template>
                            </template>
                            
                            <DropdownMenuActions v-if="$slots['header-actions']">
                                <slot name="header-actions" />
                            </DropdownMenuActions>
                        </template>
                    </DropdownMenu>
                </template>

                <template 
                    v-else-if="
                        showMobileSidebarToggle
                        && sidebarTogglePosition === SidebarTogglePosition.RIGHT_SIDE
                    "
                >
                    <ActionIconButton 
                        :icon="isMobileSidebarOpen ? 'mdi:menu-open' : 'mdi:menu-close'"
                        class="lg:hidden shadow-sm"
                        @click="toggleMobileSidebar"
                    />
                </template>  

            </div>
        </div>
        <slot name="bottom-header" />
    </header>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    pageTitleFormat: {
        type: String as PropType<PageTitleFormat>,
        default: PageTitleFormat.SIMPLE,
    },
    navMenuItems: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    submenuYOffset: {
        type: Number as PropType<number>,
        default: 8,
    },
    submenuDropdownClass: {
        type: String as PropType<string>,
        default: 'min-w-[220px]',
    },
    submenuTrigger: {
        type: String as PropType<Trigger>,
        default: Trigger.CLICK,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    userFullname: String as PropType<string>,
    userAvatarUrl: String as PropType<string>,
    userMenuItems: {
        type: Array as PropType<DropdownMenuItem[]>,
        default: () => [],
    },
    mobileBreakpoint: {
        type: Number as PropType<number>,
        default: 1024,
    },
    showMobileMenuToggle: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showMobileSidebarToggle: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    sidebarTogglePosition: {
        type: String as PropType<SidebarTogglePosition>,
        default: SidebarTogglePosition.RIGHT_SIDE,
        validator: (value: SidebarTogglePosition) => Object.values(SidebarTogglePosition).includes(value),
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isSticky: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasGlassEffect: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    detectActiveMenuItem: {
        type: Boolean,
        default: true,
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
    navMenuClass: {
        type: String as PropType<string>,
        default: ''
    },
    navMobileMenuClass: {
        type: String as PropType<string>,
        default: 'min-w-[280px]'
    },
    headerClass: String as PropType<string>,
})

// Composables
const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar()
const { isMobile } = useIsMobile(() => props.mobileBreakpoint)

const getSubmenuItems = (item: MenuItem): NonNullable<MenuItem['children']> => {
    return item.children ?? []
}

// Page title
const route = useRoute()
const currentPageTitle = computed<string>(() => 
    (route.meta.title as string) ?? 'Page title'
)

const config = useRuntimeConfig()
const { public: { appName } } = config

// Dynamically set the page title
useHead(() => ({
    title: pageTitle(currentPageTitle.value, appName as string, props.pageTitleFormat),
}))
</script>
