<template>
    <Section>
        <SectionBody>
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
            />
        </SectionBody>
    </Section>
    
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Installation',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Learn hot to install and configure AirUI in your Nuxt application'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

</script>