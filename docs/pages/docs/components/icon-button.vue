<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else/>
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Icon button',
    layout: 'docs',
    overtitle: 'Components',
    description: 'An icon button element that can act as a link or trigger an action.'
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
        text: 'Button',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/button`,
    },
    {
        text: 'Icon Button',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/icon-button`,
    },
]
</script>