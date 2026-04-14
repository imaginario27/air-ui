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
    title: 'Rating',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Display visual static rating indicators with customizable color and size options.'
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
        text: 'Rating',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/rating`,
    },
    {
        text: 'InteractiveRating',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/interactive-rating`,
    },
]
</script>