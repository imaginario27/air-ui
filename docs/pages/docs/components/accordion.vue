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
    title: 'Accordion',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A stacked set of collapsible panels.'
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
        text: 'Accordion',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/accordion`,
    },
    {
        text: 'Accordion group',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/accordion-group`,
    },
]
</script>