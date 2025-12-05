<template>
    <div 
        :class="[
            'flex',
            'flex-row',
            'items-center',
            'self-stretch',
            'gap-2',
        ]"
    >
        <MdiIcon 
            :icon="isValid ? 'mdiCheck' : 'mdiClose'" 
            preserveAspectRatio="xMidYMid meet"
            :class="[
                isValid ? 'text-icon-success-subtle' : 'text-text-neutral-subtle',
                'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
            ]" 
        />
        <span 
            :class="[
                'text-sm',
                isValid ? 'text-success-default' : 'text-text-neutral-subtle'
            ]" 
        >
            {{ label }}
        </span>
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    label: {
        type: String as PropType<string>,
        default: 'Condition label'
    },
    isValid: {
        type: Boolean as PropType<boolean>,
        required: true,
    },
})
</script>
