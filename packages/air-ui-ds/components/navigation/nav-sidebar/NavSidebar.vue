<template>
    <!-- Nav Sidebar -->
    <aside 
        ref="sidebarRef"
        :style="stickOnScroll && { top: isSticky ? '0px' : `${stickyScrollHeight}px` }"
        :class="[
            isFixed && 'fixed',
            'w-[240px]',
            'h-screen',
            'bg-background-surface',
            'flex flex-col items-center gap-6',
            'py-4',
            'border-r border-border-default',
            'transition-transform duration-300',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0' // Always visible on large screens
        ]"
    >
        <!-- Only for small screen width -->
        <ActionIconButton 
            v-if="hasCloseButton"
            icon="mdiClose"
            class="absolute top-3 right-3 sm:hidden"
            :size="ButtonSize.SM"
            @click="toggleMobileSidebar()"
        />

        <!-- Header -->
        <slot name="sidebar-header" />
        
        <!-- Menu -->
         
        <NavSidebarMenu 
            :class="[!$slots['sidebar-footer'] && '80% lg:90%']"
            :style="{
                height: computedMenuHeight
            }"
        >
            <slot name="sidebar-menu-prefix-content" />
            <template 
                v-for="(item, index) in menuItems" 
                :key="index"
            >
                <NavSidebarMenuSectionTitle 
                    v-if="item.isSectionTitle" 
                    :text="item.text" 
                    :icon="item.icon"
                    :styleType="itemsStyleType"
                />
                <NavSidebarMenuItem 
                    v-else
                    :text="item.text"
                    :icon="item.icon"
                    :to="item.to"
                    :styleType="itemsStyleType"
                    :class="itemsCustomClass"
                />
            </template>
            <slot name="sidebar-menu-suffix-content" />
        </NavSidebarMenu>

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
    menuItems: {
        type: Array as PropType<SidebarMenuItem[]>,
        default: () => [
            {
                isSectionTitle: true,
                text: 'Section title',
                icon: 'mdiBullseye',
            },
            {
                text: 'Item 1',
                icon: 'mdiHelp',
                to: '/',
            },
            {
                text: 'Item 2',
                icon: 'mdiHelp',
                to: '/',
            },
            {
                text: 'Item 3',
                icon: 'mdiHelp',
                to: '/',
            },
        ],

    },
    hasCloseButton: {
        type: Boolean as PropType<boolean>,
        default: false,
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
    itemsStyleType: String as PropType<SidebarNavMenuItemStyleType>,    
    itemsCustomClass: String as PropType<string>
})

// States 
const sidebarRef = ref<HTMLElement | null>(null)
const isSticky = ref(false)

// Slots
const slots = defineSlots()

// Composables
const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar()

// Methods
const handleScroll = () => {
    if(props.stickOnScroll) {
        isSticky.value = window.scrollY > props.stickyScrollHeight
    }
}

// Dynamic height computation
const computedMenuHeight = computed(() => {
    if (slots['sidebar-footer']) {
        return `calc(100% - ${props.footerSafeAreaHeight + props.headerHeight}px)`
    } else {
        return `calc(100% - ${props.headerHeight}px)`
    }
})

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
</script>
