<template>
    <figure :class="['w-full', containerClass]">
        <component
            :is="isClickable ? 'button' : 'div'"
            :type="isClickable ? 'button' : undefined"
            :aria-label="isClickable ? (openAriaLabel ?? dsConfig.lightbox.openImageText()) : undefined"
            :class="[
                'group relative block w-full overflow-hidden rounded-md',
                aspectRatioClass,
                useLightbox && 'cursor-zoom-in',
                !useLightbox && isClickable && 'cursor-pointer',
                isClickable && 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary-brand-default',
                wrapperClass,
            ]"
            @click="onClick"
        >
            <component
                :is="imageTag"
                v-bind="imageAttrs"
                :alt="cleanImageAlt(alt)"
                :class="imageClasses"
            />

            <!-- Split chromatic layers -->
            <template v-if="hoverEffect === ImageHoverEffect.SPLIT_ZOOM">
                <span
                    v-for="layer in splitLayers"
                    :key="layer.key"
                    aria-hidden="true"
                    :class="[
                        'pointer-events-none absolute inset-0 opacity-0',
                        'transition-[translate,scale,opacity] duration-300 ease-out motion-reduce:transition-none',
                        'group-hover:scale-105 group-hover:opacity-70',
                        layer.class,
                    ]"
                >
                    <component
                        :is="imageTag"
                        v-bind="imageAttrs"
                        alt=""
                        :class="[...baseImageClasses, 'h-full']"
                    />
                </span>
            </template>

            <!-- Overlay effect -->
            <span
                v-if="hoverEffect === ImageHoverEffect.OVERLAY"
                :class="[
                    'absolute inset-0 flex items-center justify-center',
                    'bg-background-neutral-filled-transparent text-text-neutral-on-filled',
                    'opacity-0 transition-opacity duration-200 motion-reduce:transition-none',
                    'group-hover:opacity-100 group-focus-visible:opacity-100',
                ]"
            >
                <Icon
                    v-if="hasHoverIcon"
                    :name="hoverIcon ?? (useLightbox ? 'mdi:magnify-plus-outline' : 'mdi:eye-outline')"
                    :size="IconSize.LG"
                />
            </span>

            <!-- Caption over the image -->
            <span
                v-if="hasVisibleCaption && captionPlacement === ImageCaptionPlacement.HOVER"
                :class="[
                    'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center font-semibold',
                    'bg-background-neutral-filled-transparent text-text-neutral-on-filled',
                    'opacity-0 transition-opacity duration-200 motion-reduce:transition-none',
                    'group-hover:opacity-100 group-focus-visible:opacity-100',
                    captionClass,
                ]"
            >
                {{ caption }}
            </span>

            <span
                v-else-if="hasVisibleCaption && captionPlacement === ImageCaptionPlacement.OVERLAY_BOTTOM"
                :class="[
                    'absolute inset-x-0 bottom-0 z-10 block p-3 text-left font-semibold',
                    'bg-linear-to-t from-background-neutral-filled-transparent to-transparent',
                    'text-text-neutral-on-filled',
                    captionClass,
                ]"
            >
                {{ caption }}
            </span>
        </component>

        <figcaption
            v-if="hasVisibleCaption && captionPlacement === ImageCaptionPlacement.BELOW"
            :class="['mt-2 text-sm text-text-neutral-subtle', captionClass]"
        >
            {{ caption }}
        </figcaption>

        <Lightbox
            v-if="useLightbox"
            v-model="isOpen"
            :images="lightboxImages"
        />
    </figure>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    src: {
        type: String as PropType<string>,
        required: true,
    },
    alt: {
        type: String as PropType<string>,
        default: '',
    },
    caption: String as PropType<string>,
    showCaption: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    captionPlacement: {
        type: String as PropType<ImageCaptionPlacement>,
        default: ImageCaptionPlacement.BELOW,
        validator: (value: ImageCaptionPlacement) => Object.values(ImageCaptionPlacement).includes(value),
    },
    width: Number as PropType<number>,
    height: Number as PropType<number>,
    aspectRatio: {
        type: String as PropType<AspectRatio>,
        validator: (value: AspectRatio) => Object.values(AspectRatio).includes(value),
    },
    fit: {
        type: String as PropType<ImageFit>,
        default: ImageFit.COVER,
        validator: (value: ImageFit) => Object.values(ImageFit).includes(value),
    },
    hoverEffect: {
        type: String as PropType<ImageHoverEffect>,
        default: ImageHoverEffect.NONE,
        validator: (value: ImageHoverEffect) => Object.values(ImageHoverEffect).includes(value),
    },
    hoverSplitDirection: {
        type: String as PropType<ImageHoverSplitDirection>,
        default: ImageHoverSplitDirection.DIAGONAL,
        validator: (value: ImageHoverSplitDirection) => Object.values(ImageHoverSplitDirection).includes(value),
    },
    hasHoverIcon: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hoverIcon: String as PropType<string>,
    useLightbox: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    lightboxSrc: String as PropType<string>,
    isClickable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    useNuxtImg: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    sizes: String as PropType<string>,
    densities: String as PropType<string>,
    loading: {
        type: String as PropType<ImageLoading>,
        default: ImageLoading.LAZY,
        validator: (value: ImageLoading) => Object.values(ImageLoading).includes(value),
    },
    containerClass: String as PropType<string>,
    wrapperClass: String as PropType<string>,
    imageClass: String as PropType<string>,
    captionClass: String as PropType<string>,
    openAriaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['click'])

// Composables
const dsConfig = useDSConfig()
const aspectRatioClass = useAspectRatioClass(() => props.aspectRatio)

// Components
const NuxtImg = resolveComponent('NuxtImg')

// State
const isOpen = ref(false)

// Computed
const hasVisibleCaption = computed(() => props.showCaption && Boolean(props.caption))
const isClickable = computed(() => props.useLightbox || props.isClickable)
const imageTag = computed(() => (props.useNuxtImg ? NuxtImg : 'img'))

const imageAttrs = computed(() => ({
    src: props.src,
    width: props.width,
    height: props.height,
    loading: props.loading,
    ...(props.useNuxtImg ? { sizes: props.sizes, densities: props.densities } : {}),
}))

const lightboxImages = computed<GalleryImage[]>(() => [
    {
        id: props.src,
        src: props.lightboxSrc ?? props.src,
        alt: props.alt,
        caption: props.caption,
    },
])

const baseImageClasses = computed(() => [
    'block w-full',
    props.aspectRatio ? 'h-full' : 'h-auto',
    props.fit === ImageFit.CONTAIN ? 'object-contain' : 'object-cover',
])

const imageClasses = computed(() => {
    const effect: Partial<Record<ImageHoverEffect, string>> = {
        [ImageHoverEffect.ZOOM_IN]: 'scale-100 group-hover:scale-110',
        [ImageHoverEffect.ZOOM_OUT]: 'scale-110 group-hover:scale-100',
        [ImageHoverEffect.BLUR]: 'group-hover:blur-xs',
        [ImageHoverEffect.GRAYSCALE]: 'grayscale group-hover:grayscale-0',
        [ImageHoverEffect.SPLIT_ZOOM]: 'group-hover:scale-105',
    }

    return [
        ...baseImageClasses.value,
        'transition-[scale,filter] duration-300 ease-out motion-reduce:transition-none',
        effect[props.hoverEffect],
        props.imageClass,
    ]
})

const splitLayers = computed(() => {
    const translate: Record<ImageHoverSplitDirection, [string, string]> = {
        [ImageHoverSplitDirection.DIAGONAL]: [
            'group-hover:-translate-x-1.5 group-hover:-translate-y-1',
            'group-hover:translate-x-1.5 group-hover:translate-y-1',
        ],
        [ImageHoverSplitDirection.HORIZONTAL]: ['group-hover:-translate-x-1.5', 'group-hover:translate-x-1.5'],
        [ImageHoverSplitDirection.VERTICAL]: ['group-hover:-translate-y-1.5', 'group-hover:translate-y-1.5'],
    }
    const [warm, cool] = translate[props.hoverSplitDirection]

    return [
        { key: 'warm', class: [warm, '[filter:sepia(1)_saturate(10)_hue-rotate(-30deg)_brightness(1.2)]'] },
        { key: 'cool', class: [cool, '[filter:sepia(1)_saturate(10)_hue-rotate(150deg)_brightness(1.2)]'] },
    ]
})

// Handlers
const onClick = (event: MouseEvent) => {
    if (!isClickable.value) return
    if (props.useLightbox) {
        isOpen.value = true
    }
    emit('click', event)
}
</script>
