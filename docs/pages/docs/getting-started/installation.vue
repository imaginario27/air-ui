<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation 
                :previousPage="{
                    label: 'Introduction',
                    link: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`,
                    description: 'Get started with AirUI.'
                }"
                :nextPage="{
                    label: 'Theme customization',
                    link: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/${AppSlug.THEME}/theme-customization`,
                    description: 'Learn how to customize the theme of AirUI.'
                }"
            />
        </SectionBody>
    </Section>
    
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Installation',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Learn how to install and configure AirUI with Nuxt application.'
})

// States
const activeIndex = ref(0)

const contentPath = computed(() => {
    return activeIndex.value === 0
        ? `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/installation-from-scratch`
        : `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/installation-from-existing`
})

const { data } = await useAsyncData(
    () =>
        queryCollection('content')
            .path(contentPath.value)
            .first(),
    {
        watch: [contentPath],
    }
)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'From scratch',
    },
    {
        text: 'Existing Nuxt project',
    },
]
</script>