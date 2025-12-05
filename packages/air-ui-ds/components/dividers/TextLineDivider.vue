<template>
    <div class="w-full flex items-center gap-4">
        <Divider v-if="align === Align.CENTER"/>
        <span 
            :class="[
                'font-semibold',
                'text-nowrap',
                textSizeClass, 
                textColorClass
            ]"
        >
            {{ text }}
        </span>
        <Divider />
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    text: { 
        type: String as PropType<string>,
        default: 'Text',
    },
    styleType: {
        type: String as PropType<DividerStyle>,
        default: DividerStyle.NEUTRAL,
        validator: (value: DividerStyle) => Object.values(DividerStyle).includes(value),
    },
    size: {
        type: String as PropType<DividerSize>,
        default: DividerSize.XS,
        validator: (value: DividerSize) => Object.values(DividerSize).includes(value),
    },
    align: {
        type: String as PropType<Align.LEFT | Align.CENTER>,
        default: Align.CENTER,
        validator: (value: Align) => [Align.LEFT, Align.CENTER].includes(value),
    },
})

// Computed classes
const textColorClass = computed(() => {
    const variant = {
        [DividerStyle.NEUTRAL]: 'text-text-neutral-subtle',
        [DividerStyle.PRIMARY_BRAND]: 'text-text-primary-brand-default',
        [DividerStyle.SECONDARY_BRAND]: 'text-text-secondary-brand-default',
    }
    return variant[props.styleType as DividerStyle] || 'text-text-neutral-subtle'
})

const textSizeClass = computed(() => {
    const variant = {
        [DividerSize.XS]: 'text-xs',
        [DividerSize.SM]: 'text-sm',
    }
    return variant[props.size as DividerSize] || 'text-xs'
})
</script>