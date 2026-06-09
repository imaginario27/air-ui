<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else/>
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'CopyButton',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A button component that copies text to the clipboard when clicked.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(2)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'ActionButton',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/action-button`,
    },
    {
        text: 'ActionIconButton',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/action-icon-button`,
    },
    {
        text: 'CopyButton',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/copy-button`,
    },
]
</script>