<template>
    <!-- Nav Sidebar -->
    <aside 
        ref="sidebarRef"
        :style="{
            top: stickOnScroll ? (isSticky ? '0px' : `${stickyScrollHeight}px`) : undefined,
            width: `${isCollapsed ? collapsedWidth : expandedWidth}px`,
        }"
        :class="[
            isFixed && 'fixed',
            'h-screen',
            'bg-background-surface',
            'flex flex-col items-center gap-6',
            'py-4',
            'border-r border-border-default',
            'transition-all duration-300 ease-in-ou',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0', // Always visible on large screens
        ]"
    >
        <!-- Collapse & Close Buttons -->
        <div 
            v-if="showMobileSidebarClose || (showCollapseToggle && collapseTogglePosition === Position.TOP)"
            :class="[
                'absolute',
                'top-3',
                'right-3',
            ]"
        >
            <div class="flex gap-2">
                <!-- Mobile sidebar toggler -->
                <ActionIconButton 
                    v-if="showMobileSidebarClose && isMobile && !isCollapsed"
                    :icon="mobileSidebarCloseIcon"
                    class="flex sm:hidden"
                    :size="ButtonSize.SM"
                    @click="toggleMobileSidebar()"
                />
    
                <!-- Collapse toggle button -->
                <ActionIconButton 
                    v-if="showCollapseToggle && collapseTogglePosition === Position.TOP && !isCollapsed"
                    :icon="expandedStateIcon"
                    :size="ButtonSize.SM"
                    @click="toggleSidebarState(sidebarId)"
                />
            </div>
        </div>
        
        <!-- Header -->
        <slot name="sidebar-header" />
        
        <!-- Menu -->
        <NavSidebarMenu 
            :isCollapsed
            :class="[
                !$slots['sidebar-footer'] && '80% lg:90%',
                isCollapsed && '!px-0 items-center',
            ]"
            :style="{
                height: computedMenuHeight
            }"
        >
             <!-- Collapse toggle item shown only in collapsed state -->
            <ActionIconButton 
                v-if="showCollapseToggle && collapseTogglePosition === Position.TOP && isCollapsed"
                :icon="collapsedStateIcon"
                :size="ButtonSize.SM"
                class="mb-2"
                @click="toggleSidebarState(sidebarId)"
            />

            <slot name="sidebar-menu-prefix-content" />

            <template v-for="(item, index) in menuItems" :key="index">
                <!-- Section Title -->
                <NavSidebarMenuSectionTitle 
                    v-if="item.isSectionTitle"
                    :text="item.text"
                    :icon="item.icon"
                    :styleType="itemsStyleType"
                    :isCollapsed
                    :showCollapseDivider
                />

                <!-- Collapsed Dropdown using NavSidebarMenuItem as activator -->
                <template v-else-if="isCollapsed && item.children">
                    <DropdownMenu
                        :key="item.text"
                        :position="index < props.collapsedFlipLimit ? DropdownPosition.RIGHT_TOP : DropdownPosition.RIGHT_BOTTOM"
                        :positionXOffset="collapsedSubmenuOffset"
                        :trigger="collapsedSubmenuTrigger"
                        :style="{ minWidth: `${collapsedSubmenuWidth}px` }"
                    >
                        <!-- Use NavSidebarMenuItem as activator -->
                        <template #activator>
                            <NavSidebarMenuItem 
                                :text="item.text"
                                :icon="item.icon"
                                :styleType="itemsStyleType"
                                :textClass="itemsTextClass"
                                :iconClass="itemsIconClass"
                                isCollapsed
                                :showDropdownArrow="false"
                                :class="itemsCustomClass"
                            />
                        </template>

                        <template #items>
                            <DropdownMenuItem
                                v-for="(child, childIndex) in item.children"
                                :key="`${item.text}-${childIndex}`"
                                :text="child.text"
                                :type="child.icon ? DropdownItemType.ICON : DropdownItemType.TEXT"
                                :icon="child.icon"
                                :to="child.to"
                            />
                        </template>
                    </DropdownMenu>
                </template>

                <!-- Regular item if not collapsed or no children -->
                <template v-else>
                    <NavSidebarMenuItem 
                        :text="item.text"
                        :icon="item.icon"
                        :to="item.to"
                        :styleType="itemsStyleType"
                        :textClass="itemsTextClass"
                        :iconClass="itemsIconClass"
                        :showDropdownArrow="!!item.children"
                        :isOpen="openItems[index]"
                        :isCollapsed
                        :class="itemsCustomClass"
                        @click="item.children ? toggleItem(index) : undefined"
                    />

                    <!-- Render nested children only when expanded -->
                    <template v-if="item.children && openItems[index] && !isCollapsed">
                        <NavSidebarMenuItem
                            v-for="(child, childIndex) in item.children"
                            :key="`${index}-${childIndex}`"
                            :text="child.text"
                            :icon="child.icon"
                            :to="child.to"
                            :styleType="itemsStyleType"
                            :textClass="subItemsTextClass"
                            :iconClass="subItemsIconClass"
                            :class="[
                                'ml-4',
                                subItemsCustomClass ? subItemsCustomClass : '!font-medium',
                            ]"
                        />
                    </template>
                </template>
            </template>

            <slot name="sidebar-menu-suffix-content" />
        </NavSidebarMenu>

        <!-- Collapse toggle button at bottom -->
        <ActionIconButton 
            v-if="showCollapseToggle && collapseTogglePosition === Position.BOTTOM"
            :icon="isCollapsed ? collapsedStateIcon : expandedStateIcon"
            :size="ButtonSize.SM"
            :class="[
                isCollapsed ? '' : 'absolute right-3 bottom-3'
            ]"
            @click="toggleSidebarState(sidebarId)"
        />

        <!-- Footer -->
        <div 
            v-if="$slots['sidebar-footer']"
            :class="[
                'w-full',
                'flex flex-col',
                'absolute',
            ]"
            :style="{bottom: `${footerHeight}px`}"
        >
            <slot name="sidebar-footer" />
        </div>
    </aside>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    sidebarId: {
        type: String as PropType<string>,
        required: true,
    },
    menuItems: {
        type: Array as PropType<SidebarMenuItem[]>,
        default: () => [
            {
                isSectionTitle: true,
                text: 'Section title',
                icon: 'mdi:bullseye',
            },
            {
                text: 'Item 1',
                icon: 'mdi:help',
                to: '/',
            },
            {
                text: 'Item 2',
                icon: 'mdi:help',
                to: '/',
            },
            {
                text: 'Item 3',
                icon: 'mdi:help',
                children: [
                    {
                        text: 'Subitem 1',
                        icon: 'mdi:help',
                        to: '/',
                    },
                    {
                        text: 'Subitem 2',
                        icon: 'mdi:help',
                        to: '/',
                    },
                ],
            },
        ],
    },
    expandedWidth: {
        type: Number as PropType<number>,
        default: 240
    },
    collapsedWidth: {
        type: Number as PropType<number>,
        default: 60
    },
    multipleSubmenusOpen: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showCollapseDivider: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    collapsedSubmenuOffset: {
        type: Number as PropType<number>,
        default: 20,
    },
    collapsedSubmenuWidth: {
        type: Number as PropType<number>,
        default: 200,
    },
    collapsedSubmenuTrigger: {
        type: String as PropType<Trigger>,
        default: Trigger.CLICK,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    collapsedFlipLimit: {
        type: Number as PropType<number>,
        default: 8,
    },
    showCollapseToggle: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    collapseTogglePosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    collapsedStateIcon: {
        type: String as PropType<string>,
        default: 'mdi:menu-close',
    },
    expandedStateIcon: {
        type: String as PropType<string>,
        default: 'mdi:menu-open',
    },
    showMobileSidebarClose: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    mobileSidebarCloseIcon: {
        type: String as PropType<string>,
        default: 'mdi:close-circle',
    },
    isFixed: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    stickOnScroll: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    stickyScrollHeight: {
        type: Number as PropType<number>,
        default: 0,
    },
    headerHeight: {
        type: Number as PropType<number>,
        default: 0,
    },
    footerHeight: Number as PropType<number>,
    footerSafeAreaHeight: {
        type: Number as PropType<number>,
        default: 180,
    },
    itemsStyleType: {
        type: String as PropType<SidebarNavMenuItemStyleType>,
        default: SidebarNavMenuItemStyleType.COMPACT, 
        validator: (value: SidebarNavMenuItemStyleType) => Object.values(SidebarNavMenuItemStyleType).includes(value),
    },    
    itemsCustomClass: String as PropType<string>,
    itemsTextClass: String as PropType<string>,
    itemsIconClass: String as PropType<string>,
    subItemsCustomClass: String as PropType<string>,
    subItemsTextClass: String as PropType<string>,
    subItemsIconClass: String as PropType<string>,
})

// States 
const isSticky = ref(false)
const openItems = ref<Record<number, boolean>>({})

// Emits
const emit = defineEmits<(e: 'update:isCollapsed', value: boolean) => void>()

// Slots
const slots = defineSlots()

// Composables
const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar()
const {
    isSidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebarState,
} = useSidebar()
const { isMobile } = useIsMobile()

// Methods
const handleScroll = () => {
    if(props.stickOnScroll) {
        isSticky.value = window.scrollY > props.stickyScrollHeight
    }
}

const toggleItem = (index: number) => {
    if (props.multipleSubmenusOpen) {
        openItems.value[index] = !openItems.value[index]
    } else {
        const wasOpen = openItems.value[index]

        // Close all
        openItems.value = {}

        // Reopen the one that was toggled if it wasn't already open
        if (!wasOpen) {
            openItems.value[index] = true
        }
    }
}

// Computed
const computedMenuHeight = computed(() => {
    if (slots['sidebar-footer']) {
        return `calc(100% - ${props.footerSafeAreaHeight + props.headerHeight}px)`
    } else {
        return `calc(100% - ${props.headerHeight}px)`
    }
})

// Constants
const isCollapsed = isSidebarCollapsed(props.sidebarId)

onMounted(() => {
    if(props.stickOnScroll) {
        window.addEventListener('scroll', handleScroll)
        handleScroll()
    }
})

onUnmounted(() => {
    if(props.stickOnScroll) {
        window.removeEventListener('scroll', handleScroll)
    }
})

// Sync collapsed props with global sidebar state
watch(
    () => props.isCollapsed,
    (newVal) => {
        setSidebarCollapsed(props.sidebarId, newVal)
    },
    { immediate: true }
)

// Update parent when local isCollapsed changes
watch(
    isCollapsed,
    (newVal) => {
        emit('update:isCollapsed', newVal)
    }
)
</script>
