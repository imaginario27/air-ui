<template>
    <div 
        :class="[ 
            'flex justify-center items-center',
            'bg-background-primary-brand-soft',
            'aspect-square',
            'overflow-hidden',
            shapeClass,
            sizeClass,
            'border-2 border-border-neutral-stacked',
        ]"
    >
        <span 
            :class="[ 
                'flex items-center justify-center text-text-primary-brand-on-soft-bg font-bold select-none',
                textSizeClass,
            ]"
        >
            {{ text }}
        </span>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    type: {
        type: String as PropType<StackCounterType>,
        default: StackCounterType.ELLIPSIS,
        validator: (value: StackCounterType) => Object.values(StackCounterType).includes(value),
    },
    shape: {
        type: String as PropType<AvatarShape>,
        default: AvatarShape.CIRCLE,
        validator: (value: AvatarShape) => Object.values(AvatarShape).includes(value),
    },
    size: {
        type: String as PropType<AvatarStackSize>,
        default: AvatarStackSize.SM,
        validator: (value: AvatarStackSize) => Object.values(AvatarStackSize).includes(value),
    },
    text: {
        type: String as PropType<string>,
        default: '...',
    },
})

// Computed classes
const shapeClass = computed(() => {
    const shapeVariant = {
        [AvatarShape.CIRCLE]: 'rounded-full',
        [AvatarShape.SQUARE]: 'rounded-md',
    }
    return shapeVariant[props.shape as AvatarShape] || 'rounded-full'
})

const sizeClass = computed(() => {
    const sizeVariant = {
        [AvatarStackSize.XS]: 'w-[24px] h-[24px]',
        [AvatarStackSize.SM]: 'w-[32px] h-[32px]',
        [AvatarStackSize.MD]: 'w-[36px] h-[36px]',
    }
    return sizeVariant[props.size as AvatarStackSize] || 'w-[32px] h-[32px]'
})

const textSizeClass = computed(() => {
    const textSizeVariant = {
        [AvatarStackSize.XS]: 'text-xs',
        [AvatarStackSize.SM]: 'text-sm',
        [AvatarStackSize.MD]: 'text-md',
    }
    return textSizeVariant[props.size as AvatarStackSize] || 'text-sm'
})
</script>
