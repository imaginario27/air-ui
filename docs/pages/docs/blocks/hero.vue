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
    title: 'Hero',
    layout: 'docs',
    overtitle: 'Blocks',
    description: 'The Hero block is a versatile and visually impactful section designed to capture users\' attention and convey key messages effectively. It is ideal for highlighting important content, promotions, or calls to action.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>