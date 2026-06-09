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
    title: 'Divider',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Visually separates content using a horizontal line. Useful for structuring layouts and improving content readability.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'Divider',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/divider`,
    },
    {
        text: 'TextLineDivider',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/text-line-divider`,
    },
]
</script>