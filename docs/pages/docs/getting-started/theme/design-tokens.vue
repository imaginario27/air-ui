<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation 
                :previousPage="{
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
    title: 'Design tokens',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Learn about AirUI’s design tokens and how to customize them to fit your project’s needs.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>