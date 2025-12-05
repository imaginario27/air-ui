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
    title: 'Interactive rating',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Display visual interactive rating indicators with customizable color and size options.'
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
        text: 'Rating',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/rating`,
    },
    {
        text: 'InteractiveRating',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/interactive-rating`,
    },
]
</script>