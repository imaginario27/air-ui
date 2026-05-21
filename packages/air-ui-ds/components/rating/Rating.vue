<template>
    <div
        class="flex gap-1"
        @mouseleave="hoverIndex = null"
    >
        <RatingItem
            v-for="(icon, index) in items"
            :key="index"
            :icon
            :size
            :color
            :isInteractive
            @click="isInteractive && handleClick(index)"
            @mouseenter="isInteractive && onMouseEnter(index)"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
    },
    size: {
        type: String as PropType<RatingItemSize>,
        default: RatingItemSize.SM,
        validator: (value: RatingItemSize) => Object.values(RatingItemSize).includes(value),
    },
    color: {
        type: String as PropType<RatingItemColor>,
        default: RatingItemColor.GOLD,
        validator: (value: RatingItemColor) => Object.values(RatingItemColor).includes(value),
    },
    emptyIndicatorIcon: {
        type: String as PropType<string>,
        default: 'mdi:star-outline'
    },
    halfIndicatorIcon: {
        type: String as PropType<string>,
        default: 'mdi:star-half-full'
    },
    fullIndicatorIcon: {
        type: String as PropType<string>,
        default: 'mdi:star'
    },
    isInteractive: {
        type: Boolean,
        default: false
    },
    hoverPreview: {
        type: Boolean,
        default: true
    }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// States
const hoverIndex = ref<number | null>(null)

// Handlers
const onMouseEnter = (index: number) => {
    if (props.hoverPreview) {
        hoverIndex.value = index
    }
}

const handleClick = (index: number) => {
    const clickedValue = index + 1

    if (clickedValue === props.modelValue) {
        emit('update:modelValue', 0)
    } else {
        emit('update:modelValue', clickedValue)
    }
}

// Computed functions
// Normalize value: clamp between 0 and 5, round to nearest 0.5
const displayValue = computed(() => {
    if (props.isInteractive && props.hoverPreview && hoverIndex.value !== null)
        return hoverIndex.value + 1

    if (!isFinite(props.modelValue) || isNaN(props.modelValue))
        return 0

    return Math.min(5, Math.max(0, Math.round(props.modelValue * 2) / 2))
})

const items = computed(() => getRatingIndicator(
    displayValue.value,
    props.emptyIndicatorIcon,
    props.halfIndicatorIcon,
    props.fullIndicatorIcon
))
</script>
