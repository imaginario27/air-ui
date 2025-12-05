<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Dropdown menu',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays a list of selectable actions or links, commonly used for navigation or contextual actions. Uses a trigger element to display the menu.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'DropdownMenu',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/dropdown-menu`,
    },
    {
        text: 'DropdownSelect',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/dropdown-select`,
    },
]
</script>