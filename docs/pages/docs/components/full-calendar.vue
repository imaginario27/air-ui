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
    title: 'Full calendar',
    layout: 'docs',
    overtitle: 'Components',
    description:
        'Displays a month view like a planner, with the events laid over the days, multi-day bars and a +N more button when a day has too many.',
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
        text: 'Calendar',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/calendar`,
    },
    {
        text: 'FullCalendar',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/full-calendar`,
    },
]
</script>
