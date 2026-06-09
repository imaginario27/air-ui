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
    title: 'Loading',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A loading screen component that shows the loading status or in the event of an error, it displays the error message.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(1)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'Loading',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/loading`,
    },
    {
        text: 'LoadingScreen',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/loading-screen`,
    },
]
</script>