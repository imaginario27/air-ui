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
    title: 'Badge',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Used to highlight short pieces of information, such as statuses, counts, or labels, often displayed alongside UI elements.'
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
        text: 'Badge',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/badge`,
    },
    {
        text: 'Badge stack',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/badge-stack`,
    },
    {
        text: 'Icon badge',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/icon-badge`,
    },
    {
        text: 'Icon text badge',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/icon-text-badge`,
    },
]
</script>