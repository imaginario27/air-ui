<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation 
                :previousPage="{
                    label: 'Configuration',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/configuration`,
                    description: 'Learn how to configure AirUI globally.'
                }"
                :nextPage="{
                    label: 'Design tokens',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.THEME}/design-tokens`,
                    description: 'Learn how to customize the design tokens of AirUI.'
                }"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Theme customization',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Learn how to customize the theme of AirUI to match your brand and design requirements.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>