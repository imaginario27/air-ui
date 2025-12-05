<template>
    <hr 
        :class="[ 
            orientation === Orientation.VERTICAL
                ? [
                    'h-full',
                    'min-h-[16px]',
                    'w-px',
                    'border-none',
                    'bg-border-default',
                    'mx-2',
                  ]
                : [
                    'w-full',
                    'border-xs',
                    'border-border-default',
                  ],
            hideOnMobile && 'hidden md:block',
        ]"
    >
</template>

<script setup lang="ts">
defineProps({
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    hideOnMobile: {
        type: Boolean as PropType<boolean>,
        default: false,
    },  
})
</script>