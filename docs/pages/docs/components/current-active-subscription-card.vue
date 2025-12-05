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
    title: 'Current active subscription card',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays the user’s current subscription details, including plan name, billing status, and renewal information—commonly used in account or billing pages.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'CurrentActiveSubscriptionCard',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/current-active-subscription-card`,
    },
    {
        text: 'SubscriptionPlanCard',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/subscription-plan-card`,
    },
    {
        text: 'UniqueSubscriptionPlanCard',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/unique-subscription-plan-card`,
    },
]
</script>