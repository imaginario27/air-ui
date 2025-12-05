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
    title: 'Button pagination',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Explore the ButtonPagination component for navigating paginated data using interactive buttons and customizable controls.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

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