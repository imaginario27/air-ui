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
    title: 'Simple pagination',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A minimal pagination component displaying results text with previous and next navigation buttons.',
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
        text: 'ButtonPagination',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/button-pagination`,
    },
    {
        text: 'SimplePagination',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/simple-pagination`,
    },
]
</script>