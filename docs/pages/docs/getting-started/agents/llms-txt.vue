<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation 
                :previousPage="{
                    label: 'MCP Server',
                    link: `/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}/${AppSlug.AGENTS}/mcp-server`,
                    description: 'Learn about the MCP Server and how to use it with AirUI.'
                }"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'LLMs.txt',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Use the LLMs.txt file to provide AI assistants with access to AirUI documentation and resources in a standardized way.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>