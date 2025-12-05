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
        [SectionSpacing.XS]: 'py-section-xs',
        [SectionSpacing.SM]: 'py-section-sm',
        [SectionSpacing.MD]: 'py-section-md',
        [SectionSpacing.LG]: 'py-section-lg',
        [SectionSpacing.XL]: 'py-section-xl',
    }
    return variant[props.spacing as SectionSpacing] || 'py-section-xs'
})

const topSpacingClass = computed(() => {
    const variant = {
        [SectionSpacing.NONE]: 'py-0',
        [SectionSpacing.XS]: 'pt-section-xs',
        [SectionSpacing.SM]: 'pt-section-sm',
        [SectionSpacing.MD]: 'pt-section-md',
        [SectionSpacing.LG]: 'pt-section-lg',
        [SectionSpacing.XL]: 'pt-section-xl',
    }
    return variant[props.topSpacing as SectionSpacing] 
})

const bottomSpacingClass = computed(() => {
    const variant = {
        [SectionSpacing.NONE]: '!pb-0',
        [SectionSpacing.XS]: '!pb-section-xs',
        [SectionSpacing.SM]: '!pb-section-sm',
        [SectionSpacing.MD]: '!pb-section-md',
        [SectionSpacing.LG]: 'pb-section-lg',
        [SectionSpacing.XL]: 'pb-section-xl',
    }
    return variant[props.bottomSpacing as SectionSpacing] 
})

</script>
