<template>
    <section
        :id="id || undefined"
        :class="[
            'flex',
            'flex-col',
            'gap-3',
            'items-center',
            'justify-center',
            'w-full',
            hasSidePadding && 'px-content-side-padding-mobile md:px-content-side-padding',
            spacingClass,
            topSpacing && topSpacingClass,
            bottomSpacing && bottomSpacingClass,
            isDark && 'dark'
        ]"
    >
        <template v-if="hasContentMaxWidth">
            <MaxWidthContainer>
                <slot />
            </MaxWidthContainer>
        </template>
        <template v-else>
            <slot />
        </template>
    </section>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    id: String as PropType<string | undefined>,
    hasSidePadding: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasContentMaxWidth: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    spacing: {
        type: String as PropType<SectionSpacing>,
        default: SectionSpacing.XS,
        validator: (value: SectionSpacing) => Object.values(SectionSpacing).includes(value),
    },
    topSpacing: String as PropType<SectionSpacing>,
    bottomSpacing: String as PropType<SectionSpacing>,
    isDark: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Computed
const spacingClass = computed(() => {
    const variant = {
        [SectionSpacing.NONE]: 'py-0',
        [SectionSpacing.XS]: 'py-[2vh] sm:py-section-xs lg:py-section-xs',
        [SectionSpacing.SM]: 'py-[4vh] sm:py-section-sm lg:py-section-sm',
        [SectionSpacing.MD]: 'py-[6vh] sm:py-section-md lg:py-section-md',
        [SectionSpacing.LG]: 'py-[8vh] sm:py-section-lg lg:py-section-lg',
        [SectionSpacing.XL]: 'py-[10vh] sm:py-section-xl lg:py-section-xl',
    }
    return variant[props.spacing as SectionSpacing] || variant[SectionSpacing.XS]
})

const topSpacingClass = computed(() => {
    const variant = {
        [SectionSpacing.NONE]: 'pt-0',
        [SectionSpacing.XS]: 'pt-[2vh] sm:pt-section-xs lg:pt-section-xs',
        [SectionSpacing.SM]: 'pt-[4vh] sm:pt-section-sm lg:pt-section-sm',
        [SectionSpacing.MD]: 'pt-[6vh] sm:pt-section-md lg:pt-section-md',
        [SectionSpacing.LG]: 'pt-[8vh] sm:pt-section-lg lg:pt-section-lg',
        [SectionSpacing.XL]: 'pt-[10vh] sm:pt-section-xl lg:pt-section-xl',
    }
    return variant[props.topSpacing as SectionSpacing]
})

const bottomSpacingClass = computed(() => {
    const variant = {
        [SectionSpacing.NONE]: '!pb-0',
        [SectionSpacing.XS]: 'pb-[2vh] sm:!pb-section-xs lg:!pb-section-xs',
        [SectionSpacing.SM]: 'pb-[4vh] sm:!pb-section-sm lg:!pb-section-sm',
        [SectionSpacing.MD]: 'pb-[6vh] sm:!pb-section-md lg:!pb-section-md',
        [SectionSpacing.LG]: 'pb-[8vh] sm:pb-section-lg lg:pb-section-lg',
        [SectionSpacing.XL]: 'pb-[10vh] sm:pb-section-xl lg:pb-section-xl',
    }
    return variant[props.bottomSpacing as SectionSpacing]
})
</script>
