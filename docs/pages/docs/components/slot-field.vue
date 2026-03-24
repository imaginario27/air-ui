<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'SlotField',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Container field component that provides shared label, help, and error UI for custom slot content.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => {
    const path = route.path ?? ''
    const [pathWithoutQuery = ''] = path.split('?')
    const [pathWithoutHash = ''] = pathWithoutQuery.split('#')
    return pathWithoutHash
})

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
