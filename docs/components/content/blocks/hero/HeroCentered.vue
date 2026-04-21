<template>
    <Section :spacing="SectionSpacing.XL">
        <SectionBody class="text-center">
            <h1 
                :class="[
                    'text-5xl',
                    'sm:text-6xl',
                    'lg:text-7xl',
                    'tracking-tight',
                    'font-bold',
                ]"
            >
                 Build scalable Nuxt interfaces with
                <span class="text-text-primary-brand-default">AirUI</span>
            </h1>

            <p 
                :class="[
                    'text-text-neutral-subtle',
                    'text-lg',
                    'sm:text-xl/8',
                ]"
            >
                A modern UI toolkit powered by Tailwind CSS.  
                Flexible, fast, and designed for real-world apps.
            </p>

            <div 
                :class="[
                    'flex',
                    'flex-col md:flex-row',
                    'gap-3',
                    'justify-center',
                    'mt-4'
                ]"
            >
                <ActionButton 
                    :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                    :size="ButtonSize.XXL"
                    text="Get started"
                    isMobileFullWidth
                    :class="[
                        isDark && [
                            'shadow-md',
                            'shadow-background-primary-brand-default/40',
                            'transition-shadow',
                        ],
                    ]"
                />
                <ActionButton 
                    :size="ButtonSize.XXL"
                    text="Explore components"
                    :iconPosition="IconPosition.RIGHT"
                    icon="mdi:arrow-right"
                    isMobileFullWidth
                    :class="[
                        isDark && [
                            'shadow-md',
                            'shadow-border-default/40',
                            'transition-shadow',
                        ],
                    ]"
                />
            </div>
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore
</script>