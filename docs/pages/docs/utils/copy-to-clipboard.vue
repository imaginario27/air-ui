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
    title: 'copyToClipboard',
    layout: 'docs',
    overtitle: 'Utils',
    description: 'Copies text to the clipboard.',
    category: 'Events',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>