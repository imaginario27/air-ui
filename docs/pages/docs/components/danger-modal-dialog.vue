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
    title: 'DangerModalDialog',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A preconfigured modal dialog for displaying informational messages with optional description and actions.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(2)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'ModalDialog',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/modal-dialog`,
    },
    {
        text: 'SuccessModalDialog',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/success-modal-dialog`,
    },
    {
        text: 'DangerModalDialog',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/danger-modal-dialog`,
    },
    {
        text: 'InfoModalDialog',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/info-modal-dialog`,
    },
]
</script>