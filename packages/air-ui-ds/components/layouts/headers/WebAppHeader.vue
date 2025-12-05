<template>
    <header 
        :class="[
            'flex',
            'items-center',
            'justify-between',
            'pt-12',
            'pb-8',
            'gap-3',
            'px-content-side-padding-mobile md:px-content-side-padding',
        ]"
    >
        <div class="flex gap-4">
            <ActionIconButton 
                :icon="isMobileSidebarOpen ? 'mdiMenuOpen' : 'mdiMenuClose'"
                class="lg:hidden shadow-sm"
                @click="toggleMobileSidebar"
            />
            <PageTitle class="hidden lg:flex" :type="pageTitleType"/>
        </div>
        <div class="flex gap-3 items-center xs:w-auto">
            <slot name="header-actions" />
        </div>
    </header>

</template>

<script setup lang="ts">
// Imports
import { useRoute } from 'vue-router'

// Props
defineProps({
    pageTitleType: {
        type: String as PropType<PageTitleType>,
        default: PageTitleType.SIMPLE
    }
})

// Page title
const route = useRoute()
const currentPageTitle = computed<string>(() => 
    (route.meta.title as string) || 'Page title'
)

// Dynamically set the page title
useHead(() => ({
    title: pageTitle(currentPageTitle.value, App.NAME),
}))

// Composables
const { isMobileSidebarOpen, toggleMobileSidebar } = useMobileSidebar()

</script>
