<template>
    <Section 
        :spacing="SectionSpacing.MD"
        :class="[isDark ? 'bg-background-primary-brand-default/20' : 'bg-background-primary-brand-default']"
        isDark
    >
        <SectionBody>
            <Heading 
                :title
                description="Explore the official AirUI component library — including buttons, forms, modals, and more."
                :align="Align.CENTER"
            />
        </SectionBody>
    </Section>

    <div class="flex justify-center pt-[5vh]">
        <ComponentsPage class="max-w-[1200px]"/>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Components',
})

// States
const title = ref('Components')

// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore
</script>