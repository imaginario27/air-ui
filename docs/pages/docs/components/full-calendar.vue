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
        'Displays dates like a planner in day, week, month, year and agenda views, with events, multi-day bars, a sticky header while the hours scroll and a +N more panel.',
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
