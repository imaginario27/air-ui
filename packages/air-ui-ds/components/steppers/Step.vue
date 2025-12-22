<template>
    <div 
        :class="[
            'flex gap-5',
            'select-none',
            !description && 'items-center',
            isInteractive && 'cursor-pointer group',
        ]"
        @mouseenter="isInteractive && (isHovered = true)"
        @mouseleave="isInteractive && (isHovered = false)"  
    >
        <StepIndicator 
            :type
            :status
            :size
            :step
            :stepIcon
            :completedIcon
            :isHovered
            class="!group-hover:border-red-500"
        />
        <div class="flex flex-col w-full text-sm">
            <span
                :class="[
                    'font-semibold',
                    titleClass,
                ]"
            >
                {{ title }}
            </span>
            <p 
                v-if="description"
                class="text-text-neutral-inactive"
            >
                {{ description }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    description: String as PropType<string>,
    type: String as PropType<StepIndicatorType>,
    status: String as PropType<StepStatus>,
    size: String as PropType<StepIndicatorSize>,
    step: Number as PropType<number>,
    stepIcon: String as PropType<any>,
    completedIcon: String as PropType<any>,
    isInteractive: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// States
const isHovered = ref(false)

// Computed classes
const titleClass = computed(() => {
    const variant: Record<StepStatus, string> = {
        [StepStatus.INACTIVE]: 'text-text-neutral-inactive group-hover:text-text-primary-brand-hover',
        [StepStatus.CURRENT]: 'text-text-primary-brand-active group-hover:text-text-primary-brand-hover',
        [StepStatus.COMPLETED]: 'text-text-default group-hover:text-text-primary-brand-hover',
        [StepStatus.NONE]: 'text-text-neutral-inactive',
    }

    return variant[props.status ?? StepStatus.INACTIVE]
})
</script>