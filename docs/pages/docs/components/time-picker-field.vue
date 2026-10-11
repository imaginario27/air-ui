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
    title: 'TimePickerField',
    layout: 'docs',
    overtitle: 'Components',
    description:
        'A form field to pick a time, either as an input that opens a time picker popup or as an inline time picker, with label, help text and validation.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
