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
    title: 'Dropdown select',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays a dropdown list for selecting a single option or multiple option, commonly used in filtering or configuration panels. For form usage, prefer the SelectField component instead.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(1)

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