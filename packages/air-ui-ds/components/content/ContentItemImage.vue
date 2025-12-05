<template>
    <div 
        :class="[
            'w-full',
            'flex items-center justify-center',
            containerClass,
        ]"
    >
        <div 
            :class="[
                'w-full',
                'rounded-md',
                'relative',
                'group',
                'overflow-hidden',
                aspectRatioClass,
                containerClass,
            ]"
        >
            <!-- Image or fallback -->
            <img
                v-if="src"
                :src
                :alt
                :class="imageClass"
            >

            <div
                v-else
                class="w-full h-full flex items-center justify-center bg-background-neutral-subtlest"
            >
                <MdiIcon
                    :icon="fallbackIcon"
                    size="32"
                    preserveAspectRatio="xMidYMid meet"
                    class="text-icon-primary-brand-default"
                />
            </div>

            <!-- Hover effect -->
            <template v-if="src">
                <div
                    v-if="hoverEffect === 'overlay'"
                    class="absolute inset-0 bg-background-neutral-filled-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div
                    :class="[
                        'absolute inset-0',
                        'flex items-center justify-center',
                        'opacity-0',
                        'group-hover:opacity-100',
                        'transition-opacity duration-300',
                    ]"
                >
                    <MdiIcon
                        :icon="hoverIcon"
                        size="32"
                        preserveAspectRatio="xMidYMid meet"
                        class="text-icon-neutral-on-filled-bg"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    src: String as PropType<string>,
    alt: {
        type: String,
        default: 'Item image',
    },
    aspectRatio: {
        type: String as PropType<AspectRatio>,
        default: AspectRatio.AR_16_9,
    },
    hoverEffect: {
        type: String as PropType<ImageHoverEffect>,
        default: ImageHoverEffect.BLUR,
    },
    hoverIcon: {
        type: String as PropType<any>,
        default: 'mdiEyeOutline',
    },
    fallbackIcon: {
        type: String as PropType<any>,
        default: 'mdiImageOffOutline',
    },
    containerClass: String as PropType<string>,
})

// Computed classes
const aspectRatioClass = computed(() => {
    const variant: Record<AspectRatio, string> = {
        [AspectRatio.AR_1_1]: 'aspect-[1/1]',
        [AspectRatio.AR_4_3]: 'aspect-[4/3]',
        [AspectRatio.AR_3_2]: 'aspect-[3/2]',
        [AspectRatio.AR_16_9]: 'aspect-[16/9]',
        [AspectRatio.AR_3_4]: 'aspect-[3/4]',
        [AspectRatio.AR_4_5]: 'aspect-[4/5]',
        [AspectRatio.AR_2_3]: 'aspect-[2/3]',
    }

    return variant[props.aspectRatio as AspectRatio] || 'aspect-[16/9]'
})

const imageClass = computed(() => {
    if (props.hoverEffect === ImageHoverEffect.ZOOM_IN) {
        return 'w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-110'
    }

    if (props.hoverEffect === ImageHoverEffect.ZOOM_OUT) {
        return 'w-full h-full object-cover transition-transform duration-300 scale-110 group-hover:scale-100'
    }

    if (props.hoverEffect === ImageHoverEffect.BLUR) {
        return 'w-full h-full object-cover transition duration-300 group-hover:blur-xs'
    }

    return 'w-full h-full object-cover'
})
</script>
