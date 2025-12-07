<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />

            <ContentFooterNavigation 
                :nextPage="{
                    label: 'Installation',
                    link: `/${AppSlug.DOCS}/installation`,
                    description: 'Learn how to install AirUI in your project.'
                }"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Introduction',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'AirUI is a flexible design system and UI library for Nuxt applications, offering a scalable foundation of fully styled components, theming tools, and developer-friendly utilities.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>