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
    title: 'Circle stepper',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A multi-step progress component that visually represents sequential steps using circular indicators, with optional interactivity and icon support.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(1)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'TabStepper',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/tab-stepper`,
    },
    {
        text: 'CircleStepper',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/circle-stepper`,
    },
    {
        text: 'VerticalStepper',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/vertical-stepper`,
    },
    {
        text: 'StepIndicator',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/step-indicator`,
    },
]
</script>