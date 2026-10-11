<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer v-if="data" :value="data" />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Dropdown combobox',
    layout: 'docs',
    overtitle: 'Components',
    description:
        'Displays a text input that filters a dropdown list of options, with keyboard navigation and optional async search. For form usage, prefer the ComboboxField component instead.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(2)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'DropdownMenu',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/dropdown-menu`,
    },
    {
        text: 'DropdownSelect',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/dropdown-select`,
    },
    {
        text: 'DropdownCombobox',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/dropdown-combobox`,
    },
]
</script>
