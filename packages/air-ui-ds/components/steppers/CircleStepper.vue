<template>
    <div 
        :class="[
            'flex items-center',
            isFullWidth ? 'w-full' : 'w-fit',
        ]"
    >
        <template v-for="(item, index) in stepItems" :key="index">
            <StepIndicator
                :type
                :status="item.status"
                :size="size"
                :step="index + 1"
                :stepIcon="item.icon"
                :completedIcon
                :isHovered="isInteractive && hoveredIndex === index"
                @click="handleStepClick(index)"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave"
            />

            <!-- Line divider -->
            <Divider 
                v-if="index < stepItems.length - 1"
                :class="[
                    'min-w-[20px] sm:min-w-[40px]',
                    'border-2',
                    item.status === StepStatus.COMPLETED && '!border-border-primary-brand-active',
                    dividerClass
                ]"
            />
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
        type: [Array, Number] as PropType<number | CircleStep[]>,
        default: () => [
            {
                icon: 'mdi:home-outline',
            },
            {
                icon: 'mdi:account-outline',
            },
            {
                icon: 'mdi:map-marker-star-outline',
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
    isFullWidth: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    dividerClass: String as PropType<string>,
})

// States
const hoveredIndex = ref<number | null>(null)

// Computed step status
const stepItems = computed(() => {
    const activeIndex = props.modelValue > 0 ? props.modelValue - 1 : 0

    const stepsArray: CircleStep[] = Array.isArray(props.steps)
        ? props.steps as CircleStep[]
        : Array.from({ length: props.steps }, () => ({}))

    return stepsArray.map((step, index) => {
        let status: StepStatus;

        if (index < activeIndex) {
            status = StepStatus.COMPLETED;
        } else if (index === activeIndex) {
            status = StepStatus.CURRENT;
        } else {
            status = StepStatus.INACTIVE;
        }

        return {
            icon: step.icon,
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

const handleMouseEnter = (index: number) => {
    if (props.isInteractive) {
        hoveredIndex.value = index
    }
}

const handleMouseLeave = () => {
    hoveredIndex.value = null
}
</script>
