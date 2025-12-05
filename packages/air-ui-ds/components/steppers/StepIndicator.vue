<template>
    <div
        :class="[
            'aspect-square',
            'border-2',
            'flex items-center justify-center',
            'rounded-full',
            'select-none',
            'text-center',
            containerBackgroundClass,
            containerSizeClass,
            containerBorderClass,
        ]"
    >
        <!-- NONE -->
        <span 
            v-if="status === StepStatus.NONE"
            :class="[
                'font-bold',
                stepNumberSizeClass,
                textColorClass,
            ]"
        >
            <template v-if="type === StepIndicatorType.NUMBER">
                {{ step }}
            </template>
            <template v-else-if="type === StepIndicatorType.ICON && stepIcon">
                <MdiIcon 
                    :icon="stepIcon"
                    :size="iconSize"
                    preserveAspectRatio="xMidYMid meet"
                />
            </template>
        </span>

        <!-- INACTIVE -->
        <span 
            v-if="status === StepStatus.INACTIVE"
            :class="[
                'font-bold',
                stepNumberSizeClass,
                textColorClass,
            ]"
        >
            <template v-if="type === StepIndicatorType.NUMBER">
                {{ step }}
            </template>
            <template v-else-if="type === StepIndicatorType.ICON && stepIcon">
                <MdiIcon 
                    :icon="stepIcon"
                    :size="iconSize"
                    preserveAspectRatio="xMidYMid meet"
                />
            </template>
        </span>

        <!-- CURRENT -->
        <span 
            v-else-if="status === StepStatus.CURRENT"
            :class="[
                'font-bold text-text-primary-brand-default',
                stepNumberSizeClass,
                textColorClass,
            ]"
        >
            <template v-if="type === StepIndicatorType.NUMBER">
                {{ step }}
            </template>
            <template v-else-if="type === StepIndicatorType.ICON && stepIcon">
                <MdiIcon 
                    :icon="stepIcon"
                    :size="iconSize"
                    preserveAspectRatio="xMidYMid meet"
                />
            </template>
            <template v-else-if="type === StepIndicatorType.EMPTY">
                <!-- Circle -->
                <div 
                    :class="[
                        'w-[10px] h-[10px] rounded-full bg-icon-primary-brand-default',
                        circleColorClass,
                    ]" 
                />
            </template>
        </span>

        <!-- COMPLETED -->
        <span 
            v-else-if="status === StepStatus.COMPLETED"
            class="text-sm font-semibold text-text-primary-brand-default"
        >
            <MdiIcon 
                :icon="completedIcon"
                :size="iconSize"
                preserveAspectRatio="xMidYMid meet"
                class="text-icon-neutral-on-filled-bg"
            />
        </span>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    type: {
        type: String as PropType<StepIndicatorType>,
        default: StepIndicatorType.NUMBER,
        validator: (value: StepIndicatorType) => Object.values(StepIndicatorType).includes(value),    
    },
    status: {
        type: String as PropType<StepStatus>,
        default: StepStatus.INACTIVE,
        validator: (value: StepStatus) => Object.values(StepStatus).includes(value),    
    },
    size: {
        type: String as PropType<StepIndicatorSize>,
        default: StepIndicatorSize.XL,
        validator: (value: StepIndicatorSize) => Object.values(StepIndicatorSize).includes(value),    
    },
    step: {
        type: Number as PropType<number>,
        default: 1,
    },
    stepIcon: String as PropType<any>,
    completedIcon: {
        type: String as PropType<any>,
        default: 'mdiCheck',
    },
    isHovered: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Computed classes
const containerSizeClass = computed(() => {
    const variant = {
        [StepIndicatorSize.XL]: 'w-[40px] h-[40px]',
        [StepIndicatorSize.LG]: 'w-[36px] h-[36px]',
        [StepIndicatorSize.MD]: 'w-[32px] h-[32px]',
        [StepIndicatorSize.SM]: 'w-[28px] h-[28px]',
        [StepIndicatorSize.XS]: 'w-[24px] h-[24px]',
    }
    return variant[props.size as StepIndicatorSize] || 'w-[40px] h-[40px]'
})

const containerBorderClass = computed(() => {
    const variant = {
        [StepStatus.NONE]: 'border-none',
        [StepStatus.INACTIVE]: 'border-border-default',
        [StepStatus.CURRENT]: 'border-border-primary-brand-active',
        [StepStatus.COMPLETED]: 'border-border-primary-brand-active',
    }

    let base = variant[props.status as StepStatus] || 'border-border-default'

    if (props.isHovered && props.status !== StepStatus.COMPLETED) {
        base = 'border-border-primary-brand-hover'
    }

    return base
})

const iconSize = computed(() => {
    const variant = {
        [StepIndicatorSize.XL]: '24',
        [StepIndicatorSize.LG]: '20',
        [StepIndicatorSize.MD]: '20',
        [StepIndicatorSize.SM]: '16',
        [StepIndicatorSize.XS]: '16',
    }
    return variant[props.size as StepIndicatorSize] || '24'
})

const stepNumberSizeClass = computed(() => {
    const variant = {
        [StepIndicatorSize.XL]: 'text-sm',
        [StepIndicatorSize.LG]: 'text-xs',
        [StepIndicatorSize.MD]: 'text-xs',
        [StepIndicatorSize.SM]: 'text-xs',
        [StepIndicatorSize.XS]: 'text-xs',
    }
    return variant[props.size as StepIndicatorSize] || 'text-sm'
})

const textColorClass = computed(() => {
    const variant = {
        [StepStatus.NONE]: 'text-text-default',
        [StepStatus.INACTIVE]: 'text-text-neutral-inactive',
        [StepStatus.CURRENT]: 'text-text-primary-brand-active',
        [StepStatus.COMPLETED]: 'text-text-default',
    }

    let base = variant[props.status as StepStatus] || 'text-text-neutral-inactive'

    if (props.isHovered && props.status !== StepStatus.COMPLETED) {
        base = 'text-text-primary-brand-hover'
    }

    return base
})

const circleColorClass = computed(() => {
    const variant = {
        [StepStatus.NONE]: 'bg-background-neutral-bold',
        [StepStatus.INACTIVE]: 'bg-transparent',
        [StepStatus.CURRENT]: 'bg-primary-brand-active',
        [StepStatus.COMPLETED]: 'bg-transparent',
    }

    let base = variant[props.status as StepStatus] || 'bg-transparent'

    if (props.isHovered && props.status !== StepStatus.COMPLETED) {
        base = 'bg-text-primary-brand-hover'
    }

    return base
})

const containerBackgroundClass = computed(() => {
    const variant = {
        [StepStatus.NONE]: 'bg-background-neutral-subtle',
        [StepStatus.INACTIVE]: undefined,
        [StepStatus.CURRENT]: undefined,
        [StepStatus.COMPLETED]: 'bg-background-primary-brand-default',
    }
    return variant[props.status as StepStatus] || undefined
})
</script>