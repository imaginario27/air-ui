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
    title: 'Marquee',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Continuously scrolls content in a loop, horizontally or vertically, with optional pause on hover and fade edges.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>