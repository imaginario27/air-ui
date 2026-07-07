<template>
    <div 
        :class="[ 
            'flex justify-center items-center',
            'bg-background-primary-brand-soft',
            'aspect-square',
            'overflow-hidden',
            shapeClass,
            sizeClass,
            hasBorder && [
                'border border-border-primary-brand-hover',
                borderSizeClass,
            ],
            isInteractive && [
                hoverBorderSizeClass,
                'border-border-primary-brand-hover cursor-pointer transition-[border-width] duration-200 ease-out'
            ],
        ]"
    >
        <!-- Show initials if imgUrl is not provided or image fails to load -->
        <span 
            v-if="!props.imgUrl || !isImageLoaded"
            :class="[ 
                'flex items-center justify-center text-text-primary-brand-on-soft-bg font-bold select-none',
                textSizeClass,
            ]"
        >
            {{ initials }}
        </span>

        <!-- Show the image if it loads successfully -->
        <img 
            v-else
            :src="props.imgUrl" 
            :alt="`${props.displayName} avatar`"
            class="object-cover w-full h-full aspect-square"
            @load="handleImageLoad"
            @error="handleImageError"
        >
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    shape: {
        type: String as PropType<AvatarShape>,
        default: AvatarShape.CIRCLE,
        validator: (value: AvatarShape) => Object.values(AvatarShape).includes(value),
    },
    size: {
        type: String as PropType<AvatarSize | AvatarStackSize>,
        default: AvatarSize.SM,
        validator: (value: AvatarSize) => Object.values(AvatarSize).includes(value),
    },
    isInteractive: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    displayName: {
        type: String as PropType<string>,
        default: 'Test user',
    },
    imgUrl: String as PropType<string>,
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// States
const isImageLoaded = ref(true)

// Handlers for image load and error
const handleImageLoad = () => {
    isImageLoaded.value = true
}

const handleImageError = () => {
    isImageLoaded.value = false
}

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
        [AvatarSize.XS]: 'w-[24px] h-[24px]',
        [AvatarSize.SM]: 'w-[32px] h-[32px]',
        [AvatarSize.MD]: 'w-[36px] h-[36px]',
        [AvatarSize.LG]: 'w-[40px] h-[40px]',
        [AvatarSize.XL]: 'w-[48px] h-[48px]',
        [AvatarSize.XXL]: 'w-[56px] h-[56px]',
        [AvatarSize.XXXL]: 'w-[96px] h-[96px]',
        [AvatarSize.XXXXL]: 'w-[224px] h-[224px]',
    }
    return sizeVariant[props.size as AvatarSize] || 'w-[32px] h-[32px]'
})

const textSizeClass = computed(() => {
    const textSizeVariant = {
        [AvatarSize.XS]: 'text-xs',
        [AvatarSize.SM]: 'text-sm',
        [AvatarSize.MD]: 'text-md',
        [AvatarSize.LG]: 'text-md',
        [AvatarSize.XL]: 'text-lg',
        [AvatarSize.XXL]: 'text-xl',
        [AvatarSize.XXXL]: 'text-3xl',
        [AvatarSize.XXXXL]: 'text-4xl',
    }
    return textSizeVariant[props.size as AvatarSize] || 'text-sm'
})

const borderSizeClass = computed(() => {
    const sizeVariant = {
        [AvatarSize.XS]: 'border-1',
        [AvatarSize.SM]: 'border-2',
        [AvatarSize.MD]: 'border-2',
        [AvatarSize.LG]: 'border-2',
        [AvatarSize.XL]: 'border-2',
        [AvatarSize.XXL]: 'border-2',
        [AvatarSize.XXXL]: 'border-4',
        [AvatarSize.XXXXL]: 'border-4',
    }

    return sizeVariant[props.size as AvatarSize] || 'border-2'
})

const hoverBorderSizeClass = computed(() => {
    const sizeVariant = {
        [AvatarSize.XS]: 'hover:border-1',
        [AvatarSize.SM]: 'hover:border-2',
        [AvatarSize.MD]: 'hover:border-2',
        [AvatarSize.LG]: 'hover:border-2',
        [AvatarSize.XL]: 'hover:border-2',
        [AvatarSize.XXL]: 'hover:border-2',
        [AvatarSize.XXXL]: 'hover:border-4',
        [AvatarSize.XXXXL]: 'hover:border-4',
    }

    return sizeVariant[props.size as AvatarSize] || 'hover:border-2'
})

// Computed initials
const initials = computed(() => getInitials(props.displayName))
</script>
