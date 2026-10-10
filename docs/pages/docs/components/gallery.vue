<template>
    <Section>
        <SectionBody>
            <ContentRenderer
                v-if="data"
                :value="data"
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Gallery',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A responsive grid of images that opens in a shared lightbox.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
