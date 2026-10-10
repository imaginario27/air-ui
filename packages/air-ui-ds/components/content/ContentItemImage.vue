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
                class="w-full h-full flex items-center justify-center bg-background-neutral-subtlest/60"
            >
                <Icon
                    :name="fallbackIcon"
                    :size="IconSize.XL"
                    :iconClass="fallbackIconClass"
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
                    <Icon 
                        v-if="hasHoverIcon"
                        :name="hoverIcon"
                        :size="IconSize.XL"
                        :iconClass="hoverIconClass"
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
        type: String as PropType<string>,
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
    hasHoverIcon: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hoverIcon: {
        type: String as PropType<string>,
        default: 'mdi:eye-outline',
    },
    hoverIconClass: {
        type: String as PropType<string>,
        default: 'text-icon-neutral-on-filled-bg',
    },
    fallbackIcon: {
        type: String as PropType<string>,
        default: 'mdi:image-off-outline',
    },
    fallbackIconClass: {
        type: String as PropType<string>,
        default: 'text-icon-primary-brand-default',
    },
    containerClass: String as PropType<string>,
})

// Computed classes
const resolvedAspectRatioClass = useAspectRatioClass(() => props.aspectRatio)
const aspectRatioClass = computed(() => resolvedAspectRatioClass.value ?? 'aspect-[16/9]')

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
