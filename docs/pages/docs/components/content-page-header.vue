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
    title: 'ContentPageHeader',
    layout: 'docs',
    overtitle: 'Components',
    description: 'The content page header component that displays the title, overtitle, and description of a page, with customizable styles and optional navigation features. It is useful for content pages.',
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
        text: 'CompactHeader',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/compact-header`,
    },
    {
        text: 'ContentPageHeader',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/content-page-header`,
    },
]
</script>