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
    title: 'TriStateCheckboxField',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Checkbox form field supporting an indeterminate state, in addition to checked and unchecked.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
