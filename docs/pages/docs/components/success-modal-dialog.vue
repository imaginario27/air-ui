<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'SuccessModalDialog',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A preconfigured modal dialog designed to display success messages with visual feedback and actions.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(1)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'ModalDialog',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/modal-dialog`,
    },
    {
        text: 'SuccessModalDialog',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/success-modal-dialog`,
    },
    {
        text: 'DangerModalDialog',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/danger-modal-dialog`,
    },
    {
        text: 'InfoModalDialog',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/info-modal-dialog`,
    },
]
</script>