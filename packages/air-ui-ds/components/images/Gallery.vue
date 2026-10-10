<template>
    <div :class="['w-full', containerClass]">
        <Grid
            :cols
            :tabletCols
            :mobileCols
            :gapClass
        >
            <Image
                v-for="(image, index) in visibleImages"
                :key="image.id"
                :src="image.src"
                :alt="image.alt"
                :caption="image.caption ?? undefined"
                :showCaption="captionPlacement !== ImageCaptionPlacement.NONE"
                :captionPlacement
                :width="image.width"
                :height="image.height"
                :aspectRatio
                :fit
                :hoverEffect
                :hoverSplitDirection
                :isClickable="useLightbox"
                :useNuxtImg
                :sizes
                :densities
                :loading
                :imageClass
                :captionClass
                @click="openLightbox(index)"
            />
        </Grid>

        <!-- Pagination -->
        <div
            v-if="isPaged && totalPages > 1"
            :class="['mt-6', paginationClass]"
        >
            <ButtonPagination
                v-if="paginationMode === GalleryPaginationMode.BUTTONS"
                v-bind="paginationProps"
                :modelValue="currentPage"
                :totalItems="images.length"
                :itemsPerPage
                :showRowsPerPage="false"
                @update:modelValue="setPage"
            />
            <SimplePagination
                v-else
                v-bind="paginationProps"
                :modelValue="currentPage"
                :totalItems="images.length"
                :itemsPerPage
                @update:modelValue="setPage"
            />
        </div>

        <div
            v-else-if="hasMore && paginationMode === GalleryPaginationMode.LOAD_MORE"
            :class="['mt-6 flex justify-center', paginationClass]"
        >
            <ActionButton
                :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                :text="loadMoreText ?? dsConfig.gallery.loadMoreText()"
                @click="loadMore"
            />
        </div>

        <!-- The key renders a new sentinel after each batch, so it is observed again -->
        <div
            v-else-if="hasMore && paginationMode === GalleryPaginationMode.INFINITE"
            :key="currentPage"
            ref="sentinelEl"
            class="h-px w-full"
            aria-hidden="true"
        />

        <Lightbox
            v-if="useLightbox"
            v-model="isOpen"
            :images
            :initialIndex="activeIndex"
            :loop="useLightboxLoop"
            :showCaption="showLightboxCaption"
            @update:index="activeIndex = $event"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    images: {
        type: Array as PropType<GalleryImage[]>,
        required: true,
    },
    cols: {
        type: Number as PropType<number>,
        default: 3,
    },
    tabletCols: {
        type: Number as PropType<number>,
        default: 2,
    },
    mobileCols: {
        type: Number as PropType<number>,
        default: 1,
    },
    gapClass: {
        type: String as PropType<string>,
        default: 'gap-4',
    },
    aspectRatio: {
        type: String as PropType<AspectRatio>,
        default: AspectRatio.AR_1_1,
        validator: (value: AspectRatio) => Object.values(AspectRatio).includes(value),
    },
    fit: {
        type: String as PropType<ImageFit>,
        default: ImageFit.COVER,
        validator: (value: ImageFit) => Object.values(ImageFit).includes(value),
    },
    hoverEffect: {
        type: String as PropType<ImageHoverEffect>,
        default: ImageHoverEffect.ZOOM_IN,
        validator: (value: ImageHoverEffect) => Object.values(ImageHoverEffect).includes(value),
    },
    hoverSplitDirection: {
        type: String as PropType<ImageHoverSplitDirection>,
        default: ImageHoverSplitDirection.DIAGONAL,
        validator: (value: ImageHoverSplitDirection) => Object.values(ImageHoverSplitDirection).includes(value),
    },
    captionPlacement: {
        type: String as PropType<ImageCaptionPlacement>,
        default: ImageCaptionPlacement.NONE,
        validator: (value: ImageCaptionPlacement) => Object.values(ImageCaptionPlacement).includes(value),
    },
    paginationMode: {
        type: String as PropType<GalleryPaginationMode>,
        default: GalleryPaginationMode.NONE,
        validator: (value: GalleryPaginationMode) => Object.values(GalleryPaginationMode).includes(value),
    },
    itemsPerPage: {
        type: Number as PropType<number>,
        default: 12,
    },
    page: Number as PropType<number>,
    loadMoreText: String as PropType<string>,
    // Extra props for the pagination component, e.g. its result texts and aria labels
    paginationProps: Object as PropType<Record<string, unknown>>,
    useLightbox: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    useLightboxLoop: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showLightboxCaption: {
        type: Boolean as PropType<boolean>,
        default: true,
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
    imageClass: String as PropType<string>,
    captionClass: String as PropType<string>,
    paginationClass: String as PropType<string>,
})

// Emits
const emit = defineEmits(['click', 'update:page'])

// Composables
const dsConfig = useDSConfig()

// Refs
const sentinelEl = ref<HTMLElement | null>(null)

// State
const isOpen = ref(false)
const activeIndex = ref(0)
const currentPage = ref(props.page ?? 1)

// Computed
// Buttons and simple modes show one page at a time; load more and infinite modes accumulate pages
const isPaged = computed(() =>
    [GalleryPaginationMode.BUTTONS, GalleryPaginationMode.SIMPLE].includes(props.paginationMode)
)
const isProgressive = computed(() =>
    [GalleryPaginationMode.LOAD_MORE, GalleryPaginationMode.INFINITE].includes(props.paginationMode)
)

const totalPages = computed(() => Math.max(1, Math.ceil(props.images.length / props.itemsPerPage)))

// Index of the first visible image within the full list
const pageStart = computed(() => (isPaged.value ? (currentPage.value - 1) * props.itemsPerPage : 0))

const visibleImages = computed(() => {
    if (isPaged.value) {
        return props.images.slice(pageStart.value, pageStart.value + props.itemsPerPage)
    }
    if (isProgressive.value) {
        return props.images.slice(0, currentPage.value * props.itemsPerPage)
    }
    return props.images
})

const hasMore = computed(() => isProgressive.value && visibleImages.value.length < props.images.length)

// Handlers
const setPage = (page: number) => {
    const clampedPage = Math.min(Math.max(1, page), totalPages.value)
    if (clampedPage === currentPage.value) return
    currentPage.value = clampedPage
    emit('update:page', clampedPage)
}

const loadMore = () => setPage(currentPage.value + 1)

const openLightbox = (index: number) => {
    const imageIndex = pageStart.value + index
    emit('click', props.images[imageIndex], imageIndex)
    if (!props.useLightbox) return
    activeIndex.value = imageIndex
    isOpen.value = true
}

// Infinite scroll
useIntersectionObserver(sentinelEl, ([entry]) => {
    if (entry?.isIntersecting) loadMore()
})

// Watchers
watch(
    () => props.page,
    page => {
        if (page !== undefined) currentPage.value = page
    }
)

// Keeps the page valid when the images or the page size change
watch(totalPages, pages => {
    if (currentPage.value > pages) setPage(pages)
})
</script>
