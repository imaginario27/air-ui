<template>
    <div 
        :class="[
            'flex gap-4 flex-col sm:flex-row',
            'border border-border-default',
            'rounded',
            'py-4 sm:py-0',
            isFullWidth ? 'w-full' : 'w-fit',
            hasDivider && justifySteps && 'justify-between'
        ]"
    >
        <template v-for="(item, index) in stepItems" :key="index">
            <Step
                :title="item.title"
                :description="item.description"
                :type
                :status="item.status"
                :size="size"
                :step="index + 1"
                :stepIcon="item.icon"
                :completedIcon
                :isInteractive
                :class="[
                    '!py-0 sm:!py-4 px-6',
                    justifySteps && 'grow',
                ]"
                @click="handleStepClick(index)"
            />

            <!-- Chevron divider -->
            <div 
                v-if="hasDivider && index < stepItems.length - 1"
                class="lg:flex justify-center items-center hidden"
            >
                <svg 
                    width="22" 
                    height="74" 
                    viewBox="0 0 22 74" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-border-default"
                >
                    <path stroke="currentColor" d="M1 1L21 37L1 73" />
                </svg>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
// Imports
const emit = defineEmits(['update:modelValue'])

// Props
const props = defineProps({
    modelValue: {
        type: Number as PropType<number>,
        default: 1,
    },
    steps: {
        type: Array as PropType<TabStep[]>,
        default: () => [
            {
                title: 'Step 1',
                description: 'Description one',
            },
            {
                title: 'Step 2',
                description: 'Description two',
            },
            {
                title: 'Step 3',
                description: 'Description three',
            },
        ],
    },
    type: String as PropType<StepIndicatorType>,
    size: String as PropType<StepIndicatorSize>,
    completedIcon: String as PropType<string>,
    isInteractive: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasDivider: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    justifySteps: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isFullWidth: {
        type: Boolean as PropType<boolean>,
        default: true,
    }
})

// Computed step status
const stepItems = computed(() => {
    const activeIndex = props.modelValue > 0 ? props.modelValue - 1 : 0

    return props.steps.map((step, index) => {
        let status: StepStatus

        if (index < activeIndex) {
            status = StepStatus.COMPLETED
        } else if (index === activeIndex) {
            status = StepStatus.CURRENT
        } else {
            status = StepStatus.INACTIVE
        }

        return {
            ...step,
            status,
        }
    })
})

// Handlers
const handleStepClick = (index: number) => {
    if (props.isInteractive) {
        emit('update:modelValue', index + 1)
    }
}
</script>
