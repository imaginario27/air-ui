<template>
    <Section>
        <SectionBody>
            <ContentRenderer v-if="data" :value="data" />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'TimePicker',
    layout: 'docs',
    overtitle: 'Components',
    description:
        'Displays columns of hours, minutes, seconds and AM/PM to pick a time, with 12 or 24 hour clocks, steps, limits and keyboard navigation.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
