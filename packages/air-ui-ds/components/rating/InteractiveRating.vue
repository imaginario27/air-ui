<template>
    <div
        class="flex gap-1"
        @mouseleave="hoverIndex = null"
    >
        <RatingItem
            v-for="(icon, index) in items"
            :key="index"
            :icon="icon"
            :size="size"
            :color="color"
            isInteractive
            @click="handleClick(index)"
            @mouseenter="onMouseEnter(index)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Number,
        required: true
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
        type: String as PropType<any>,
        default: 'mdiStarOutline'
    },
    halfIndicatorIcon: {
        type: String as PropType<any>,
        default: 'mdiStarHalfFull'
    },
    fullIndicatorIcon: {
        type: String as PropType<any>,
        default: 'mdiStar'
    },
    hoverPreview: {
        type: Boolean,
        default: true
    }
})

// States
const hoverIndex = ref<number | null>(null)

// Emits
const emit = defineEmits(['update:modelValue'])

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

// Computed
// Get the value to render: either hover preview or actual value
const displayValue = computed(() => {
    if (props.hoverPreview && hoverIndex.value !== null)
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
