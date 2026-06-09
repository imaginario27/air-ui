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
    title: 'Step indicator',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Represents a single step within a multi-step process or timeline.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(3)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'TabStepper',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/tab-stepper`,
    },
    {
        text: 'CircleStepper',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/circle-stepper`,
    },
    {
        text: 'VerticalStepper',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/vertical-stepper`,
    },
    {
        text: 'StepIndicator',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/step-indicator`,
    },
]
</script>