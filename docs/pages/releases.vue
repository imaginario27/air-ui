<template>
    <Section 
        :spacing="SectionSpacing.XL"
        class="bg-background-primary-brand-soft/30"
    >
        <SectionBody>
            <Heading 
                :title
                description="Stay up to date with the latest AirUI releases, improvements, and breaking changes."
                :align="Align.CENTER"
            />
        </SectionBody>
    </Section>
    <Section>
        <SectionBody>
            <ContentPlaceholder 
                text="Under construction"
                class="h-[200px]"
            />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
// Computed
const title = computed(() => ('Releases'))

definePageMeta({
    title: title.value,
})
</script>