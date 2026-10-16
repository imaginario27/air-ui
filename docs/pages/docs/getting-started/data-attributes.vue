<template>
    <Section>
        <SectionBody>
            <ContentRenderer v-if="data" :value="data" />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation
                :previousPage="{
                    label: 'Configuration',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/configuration`,
                    description: 'Learn how to configure AirUI globally.',
                }"
                :nextPage="{
                    label: 'Theme customization',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.THEME}/theme-customization`,
                    description: 'Learn how to customize the theme of AirUI.',
                }"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Data attributes',
    layout: 'docs',
    overtitle: 'Getting Started',
    description:
        'Learn how to use the data attributes AirUI components set to adapt styles to the context they render in.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
