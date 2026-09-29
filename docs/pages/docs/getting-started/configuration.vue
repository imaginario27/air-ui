<template>
    <Section>
        <SectionBody>
            <ContentRenderer
                v-if="data" :value="data"
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation
                :previousPage="{
                    label: 'Installation',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/installation`,
                    description: 'Learn how to install AirUI in your project.'
                }"
                :nextPage="{
                    label: 'Theme customization',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.THEME}/theme-customization`,
                    description: 'Learn how to customize the theme of AirUI.'
                }"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Configuration',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Learn how to configure AirUI globally, including translating built-in text via useDSConfig.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
