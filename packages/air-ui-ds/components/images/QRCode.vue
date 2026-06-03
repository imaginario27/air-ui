<template>
    <div
        role="img"
        :aria-label="ariaLabel || `QR code: ${modelValue}`"
        :class="[
            'relative flex items-center justify-center',
            hasBorder && 'border border-border-default rounded-md p-2',
            containerClass,
        ]"
        :style="{
            width: `${size}px`,
            height: `${size}px`,
        }"
    >
        <Spinner v-if="isLoading" />

        <QrcodeVue
            v-else
            :value="modelValue"
            :level
            :render-as="renderAs"
            :background
            :foreground
            :gradient="useGradient"
            :gradient-type="gradientType"
            :gradient-start-color="gradientStartColor"
            :gradient-end-color="gradientEndColor"
            :image-settings="computedImageSettings"
            :margin="imageMargin"
            :size="qrSize"
        />
    </div>
</template>

<script setup lang="ts">
// Imports
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, GradientType, ImageSettings } from 'qrcode.vue'

// Props
const props = defineProps({
    renderAs: {
        type: String as PropType<QRRenderAs>,
        default: QRRenderAs.CANVAS,
        validator: (as: QRRenderAs) => Object.values(QRRenderAs).includes(as),
    },
    modelValue: {
        type: String as PropType<string>,
        required: true,
    },
    size: {
        type: Number as PropType<number>,
        default: 250,
    },
    level: {
        type: String as PropType<QRLevel>,
        default: QRLevel.M,
        validator: (level: QRLevel) => Object.values(QRLevel).includes(level),
    },
    background: {
        type: String as PropType<string>,
        default: '#ffffff',
    },
    foreground: {
        type: String as PropType<string>,
        default: '#000000',
    },
    useGradient: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    gradientType: {
        type: String as PropType<QRGradientType>,
        default: QRGradientType.LINEAR,
        validator: (type: QRGradientType) => Object.values(QRGradientType).includes(type),
    },
    gradientStartColor: {
        type: String as PropType<string>,
        default: '#ffffff',
    },
    gradientEndColor: {
        type: String as PropType<string>,
        default: '#000000',
    },
    imageMargin: {
        type: Number as PropType<number>,
        default: 0,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasMiddleImage: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    imageSettings: Object as PropType<ImageSettings>,
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    containerClass: String as PropType<string>,
    ariaLabel: String as PropType<string>,
})

// Computed
const computedImageSettings = computed(() => {
    if (!props.hasMiddleImage) return undefined

    if (props.imageSettings) {
        return props.imageSettings
    } else {
        return {
            src: 'https://github.com/scopewu.png',
            width: 30,
            height: 30,
            excavate: true,
        }
    }
})

const containerPaddingPx = 4 

const qrSize = computed(() => {
    return props.size - props.imageMargin * 2 - containerPaddingPx
})
</script>
