<template>
    <div 
        :class="[
            'w-full',
            'flex flex-col justify-center items-center',
            'p-6',
            'bg-background-primary-brand-soft',
            'rounded-sm',
            'bg-diagonal-stripes',
        ]"
    >
        <div 
            :class="[
            'bg-[#f3f4f6]',
            'px-2',
            'py-1',
            'rounded',
            textWrapperClass,
        ]">
            <span 
                :class="[
                'text-text-neutral-subtle-on-subtler-bg',
                textClass,
            ]">
                {{ text }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Replace me',
    },
    textWrapperClass: String as PropType<string>,
    textClass: String as PropType<string>,
})
</script>
