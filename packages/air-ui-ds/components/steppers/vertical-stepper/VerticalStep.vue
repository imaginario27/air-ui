<template>
    <div 
        :class="[
            'relative', 
            'flex',
            leftSpacingClass
        ]"
    >
        <!-- Circle + vertical line -->
        <div
            v-if="hasStepper"
            :class="[
                'absolute',
                'left-0',
                'top-0',
                'h-full',
                'flex',
                'flex-col',
                'items-center',
            ]"
        >
            <!-- Step circle -->
            <StepIndicator 
                :type="stepType"
                :size="stepSize"
                :status="stepStatus"
                :stepIcon
                :completedIcon="stepCompletedIcon"
                :step
                :isHovered
                class="z-10"
            />

            <!-- Vertical line -->
            <div
                v-if="showLine && !isLast"
                :class="[
                    stepStatus === StepStatus.COMPLETED ? 'w-[2px] bg-background-primary-brand-default' : 'w-[1px] bg-border-default',
                    'flex-1',
                    'rounded-md',
                    stepIndicatorGap,
                ]"
            />
        </div>

        <!-- Step content -->
        <div
            :class="[
                'ml-2',
                'w-full',
                'flex',
                'flex-col',
                'gap-3',
                !isLast && 'mb-7',
            ]"
        >
            <!-- Step header -->
            <div
                :class="[
                    'w-full',
                    'flex',
                    'flex-col',
                    titleHeaderClass,
                ]"
            >
                <div
                    v-if="metaTitle"
                    :class="[
                        metaTitleSizeClass,
                        'text-text-neutral-subtle',
                    ]"
                >
                    {{ metaTitle }}
                </div>
                <h3
                    :class="[
                        titleSizeClass,
                        'font-bold',
                        'text-text-default',
                    ]"
                >
                    {{ title }}
                </h3>
            </div>

            <!-- Can use description or slot as content -->
            <p
                v-if="description"
                :class="contentTextSizeClass"
            >
                {{ description }}
            </p>

            <div
                v-else
                :class="contentTextSizeClass"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Step title',
    },
    metaTitle: String as PropType<string>,
    description: String as PropType<string>,
    step: {
        type: Number as PropType<number>,
        default: 1,
    },
    stepType: String as PropType<StepIndicatorType>,
    stepStatus: {
        type: String as PropType<StepStatus>,
        default: StepStatus.NONE,
        validator: (value: StepStatus) => Object.values(StepStatus).includes(value),    
    },
    stepSize: {
        type: String as PropType<StepIndicatorSize>,
        default: StepIndicatorSize.SM,
        validator: (value: StepIndicatorSize) => Object.values(StepIndicatorSize).includes(value),    
    },
    stepIcon: String as PropType<string>,
    stepCompletedIcon: String as PropType<string>,
    isLast: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
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
    isHovered: Boolean as PropType<boolean>,
})

// Computed classes
const titleHeaderClass = computed(() => {
    // If using metaTitle, the fixing top margin is not necessary
    if(props.metaTitle) return undefined

    const variant = {
        [StepIndicatorSize.XL]: 'mt-1.5',
        [StepIndicatorSize.LG]: 'mt-1',
        [StepIndicatorSize.MD]: undefined,
        [StepIndicatorSize.SM]: undefined,
        [StepIndicatorSize.XS]: undefined,
    }
    return variant[props.stepSize as StepIndicatorSize] || undefined
})

const titleSizeClass = computed(() => {
    const variant = {
        [StepIndicatorSize.XL]: 'text-lg',
        [StepIndicatorSize.LG]: 'text-lg',
        [StepIndicatorSize.MD]: 'text-lg',
        [StepIndicatorSize.SM]: 'text-lg',
        [StepIndicatorSize.XS]: 'text-base',
    }
    return variant[props.stepSize as StepIndicatorSize] || 'text-lg'
})

const metaTitleSizeClass = computed(() => {
    const variant = {
        [StepIndicatorSize.XL]: 'text-sm',
        [StepIndicatorSize.LG]: 'text-sm',
        [StepIndicatorSize.MD]: 'text-sm',
        [StepIndicatorSize.SM]: 'text-sm',
        [StepIndicatorSize.XS]: 'text-xs',
    }
    return variant[props.stepSize as StepIndicatorSize] || 'text-sm'
})

const contentTextSizeClass = computed(() => {
    const variant = {
        [StepIndicatorSize.XL]: 'text-base',
        [StepIndicatorSize.LG]: 'text-base',
        [StepIndicatorSize.MD]: 'text-sm',
        [StepIndicatorSize.SM]: 'text-sm',
        [StepIndicatorSize.XS]: 'text-sm',
    }
    return variant[props.stepSize as StepIndicatorSize] || 'text-sm'
})

const leftSpacingClass = computed(() => {
    if(!props.hasStepper) return undefined

    const variant = {
        [StepIndicatorSize.XL]: 'pl-14',
        [StepIndicatorSize.LG]: 'pl-12',
        [StepIndicatorSize.MD]: 'pl-10',
        [StepIndicatorSize.SM]: 'pl-8',
        [StepIndicatorSize.XS]: 'pl-6',
    }
    return variant[props.stepSize as StepIndicatorSize] || 'pl-8'
})

const stepIndicatorGap = computed(() => {
    // Only apply gap if it has to
    if(!props.hasStepperGap) return undefined

    const variant = {
        [StepIndicatorSize.XL]: 'my-2',
        [StepIndicatorSize.LG]: 'my-1.5',
        [StepIndicatorSize.MD]: 'my-1',
        [StepIndicatorSize.SM]: 'my-0.5',
        [StepIndicatorSize.XS]: 'my-0.5',
    }
    return variant[props.stepSize as StepIndicatorSize] || 'my-0.5'
})
</script>
