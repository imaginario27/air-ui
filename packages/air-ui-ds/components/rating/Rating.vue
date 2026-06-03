<template>
    <div
        :role="isInteractive ? 'radiogroup' : 'img'"
        :aria-label="isInteractive ? 'Rating' : `Rating: ${displayValue} out of 5`"
        class="flex gap-1"
        @mouseleave="hoverIndex = null"
        @keydown="isInteractive && handleKeydown($event)"
    >
        <div
            v-for="(icon, index) in items"
            :key="index"
            v-bind="isInteractive ? {
                role: 'radio',
                'aria-checked': modelValue === index + 1,
                'aria-label': `${index + 1} star${index + 1 > 1 ? 's' : ''}`,
                tabindex: modelValue === index + 1 || (modelValue === 0 && index === 0) ? 0 : -1,
            } : {
                'aria-hidden': 'true',
            }"
            class="inline-flex"
            @click="isInteractive && handleClick(index)"
            @mouseenter="isInteractive && onMouseEnter(index)"
        >
            <RatingItem
                :icon
                :size
                :color
                :isInteractive
            />
        </div>
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

const handleKeydown = (event: KeyboardEvent) => {
    let newValue = props.modelValue

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        newValue = Math.min(5, props.modelValue + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        newValue = Math.max(0, props.modelValue - 1)
    } else {
        return
    }

    emit('update:modelValue', newValue)
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
