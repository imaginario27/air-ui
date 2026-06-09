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
    title: 'CompactHeader',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A component which provides a compact and functional page header layout, supporting navigation menus, user profiles, and responsive design.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'CompactHeader',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/compact-header`,
    },
    {
        text: 'ContentPageHeader',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/content-page-header`,
    },
]
</script>