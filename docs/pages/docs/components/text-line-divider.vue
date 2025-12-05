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
    title: 'Text line divider',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays a horizontal line with optional centered text. Ideal for visually separating sections while adding context or labels.'
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
        text: 'Divider',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/divider`,
    },
    {
        text: 'TextLineDivider',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/text-line-divider`,
    },
]
</script>