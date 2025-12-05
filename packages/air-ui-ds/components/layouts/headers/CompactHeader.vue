<template>
    <header 
        :class="[
            isSticky && 'sticky top-0 z-50'
        ]"
    >
        <slot name="top-header" />
        <!-- Main header wrapper -->
        <div
            :class="[
                'flex',
                'items-center',
                'justify-between',
                'gap-3',
                'px-content-side-padding-mobile md:px-content-side-padding',
                'py-4',
                'bg-background-surface',
                hasBorder && 'border-b border-border-default',
                isSticky && 'sticky top-0 z-50',
                hasGlassEffect && [
                    'backdrop-blur-md',
                    'bg-background-surface/30 dark:bg-background-surface/85',
                ],
                containerClass,
            ]"
        >
            <!-- Logo -->
            <div class="flex gap-4">
                <slot name="header-logo" />
            </div>

            <!-- Navigation -->
            <div class="flex gap-3 items-center xs:w-auto">
                <!-- Horizontal menu -->
                <NavMenu 
                    v-if="navMenuItems.length"
                    :menuItems="navMenuItems" 
                    :detectActive="detectActiveMenuItem"
                    :class="navMenuClass"
                />

                <!-- Header actions -->
                <div 
                    v-if="$slots['header-actions']"
                    class="gap-3 items-center hidden lg:flex"
                >
                    <slot name="header-actions" />
                </div>

                <!-- User Menu -->
                <DropdownMenu 
                    v-if="userMenuItems.length && userFullname"
                    class="min-w-[200px]"
                >
                    <template #activator="{ onClick }">
                        <Avatar 
                            :size="AvatarSize.MD"
                            isInteractive
                            :displayName="userFullname"
                            :imgUrl="userAvatarUrl"
                            @click="onClick"
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
                            @click="item.callback"
                        />
                    </template>
                </DropdownMenu>

                <!-- Mobile menu -->
                <template v-if="isMobile && mobileMenuType === MobileNavigationMenuType.DROPDOWN">
                    <DropdownMenu :class="navMobileMenuClass">
                        <template #activator="{ onClick }">
                            <ActionIconButton 
                                icon="mdiMenu"
                                class="lg:hidden shadow-sm"
                                @click="onClick"
                            />
                        </template>
                        <template #items>
                            <DropdownMenuItem 
                                v-for="item in navMenuItems" :key="item.text"
                                :text="item.text"
                                :to="item.to"
                            />
                            
                            <DropdownMenuActions v-if="$slots['header-actions']">
                                <slot name="header-actions" />
                            </DropdownMenuActions>
                        </template>
                    </DropdownMenu>
                </template>

                <template v-else-if="mobileMenuType === MobileNavigationMenuType.SIDEBAR">
                    <ActionIconButton 
                        :icon="isMobileSidebarOpen ? 'mdiMenuOpen' : 'mdiMenuClose'"
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
defineProps({
    pageTitleType: {
        type: String as PropType<PageTitleType>,
        default: PageTitleType.SIMPLE,
    },
    navMenuItems: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    userFullname: String as PropType<string>,
    userAvatarUrl: String as PropType<string>,
    userMenuItems: {
        type: Array as PropType<DropdownMenuItem[]>,
        default: () => [],
    },
    mobileMenuType: {
        type: String as PropType<MobileNavigationMenuType>,
        default: MobileNavigationMenuType.DROPDOWN,
        validator: (value: MobileNavigationMenuType) => Object.values(MobileNavigationMenuType).includes(value),
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
    navMenuClass: {
        type: String as PropType<string>,
        default: 'hidden lg:flex'
    },
    navMobileMenuClass: {
        type: String as PropType<string>,
        default: 'lg:hidden min-w-[280px]'
    },
    containerClass: String as PropType<string>,
})

// Composables
const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar()
const { isMobile } = useIsMobile()

// Page title
const route = useRoute()
const currentPageTitle = computed<string>(() => 
    (route.meta.title as string) ?? 'Page title'
)

// Dynamically set the page title
useHead(() => ({
    title: pageTitle(currentPageTitle.value, App.NAME),
}))
</script>
