<template>
    <div
        :class="[
            'relative',
            'flex',
            'flex-col',
        ]"
    >
        <template v-if="items && items.length && !$slots.default">
            <VerticalStep
                v-for="(step, index) in items"
                :key="`vertical-stepper-item-${index + 1}`"
                :title="step.title"
                :metaTitle="step.metaTitle"
                :description="step.description"
                :stepSize
                :step="index + 1"
                :stepIcon="step.stepIcon"
                :stepType
                :stepCompletedIcon
                :stepStatus="step.stepStatus"
                :isLast="index === items.length - 1"
                :isHovered="isStepInteractive && hoveredIndex === index"
                :hasStepper
                :hasStepperGap
                :showLine
                @mouseenter="() => isStepInteractive && (hoveredIndex = index)"
                @mouseleave="() => isStepInteractive && (hoveredIndex = null)"
            />
        </template>

        <slot />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    items: Array as PropType<VerticalStepperItem[]>,
    stepType: String as PropType<StepIndicatorType>,
    stepSize: String as PropType<StepIndicatorSize>,
    stepCompletedIcon: String as PropType<any>,
    hasStepper: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasStepperGap: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showLine: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isStepInteractive: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Status
const hoveredIndex = ref<number | null>(null)
</script>
