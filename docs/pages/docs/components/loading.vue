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
    description: 'A loading component that displays a spinner with animated loading text to indicate background activity.',
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
        text: 'Loading',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/loading`,
    },
    {
        text: 'LoadingScreen',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/loading-screen`,
    },
]
</script>