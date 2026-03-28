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
    title: 'SliderField',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Form field wrapper around Slider with label, min/max labels, validation, and error handling.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
