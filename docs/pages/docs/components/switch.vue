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
    title: 'Switch',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Standalone switch control for capturing boolean input, usable independently or within custom form layouts.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
