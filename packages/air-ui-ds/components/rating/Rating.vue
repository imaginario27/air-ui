<template>
    <div class="flex gap-1">
        <RatingItem
            v-for="(icon, index) in items"
            :key="index"
            :icon
            :size
            :color
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    value: {
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
    }
})


// Computed functions
// Normalize value: clamp between 0 and 5, round to nearest 0.5
const safeValue = computed(() => {
    if (!isFinite(props.value) || isNaN(props.value))
        return 0

    return Math.min(5, Math.max(0, Math.round(props.value * 2) / 2))
})

const items = computed(() => getRatingIndicator(
    safeValue.value, 
    props.emptyIndicatorIcon, 
    props.halfIndicatorIcon, 
    props.fullIndicatorIcon
))
</script>
