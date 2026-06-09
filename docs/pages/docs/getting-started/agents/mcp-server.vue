<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation 
                :previousPage="{
                    label: 'Design tokens',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.THEME}/design-tokens`,
                    description: 'Learn how to customize the design tokens of AirUI.'
                }"
                :nextPage="{
                    label: 'LLMs.txt',
                    link: `/${DocsAppSlug.DOCS}/${DocsAppSlug.GETTING_STARTED}/${DocsAppSlug.AGENTS}/llms-txt`,
                    description: 'Learn about the LLMs.txt file and how to use it with AirUI.'
                }"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'MCP Server',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Use Air UI docs directly inside AI assistants with Model Context Protocol (MCP).'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>