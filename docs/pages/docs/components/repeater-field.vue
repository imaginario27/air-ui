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
    title: 'RepeaterField',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Form field component for repeating an arbitrary slot template over a list, with add, remove, and optional row reordering.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
