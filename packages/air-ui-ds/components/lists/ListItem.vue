<template>
    <li 
        :class="[
            'flex gap-2',
            spaced && 'py-4'
        ]"
    >
        <Icon
            v-if="icon"
            :name="icon"
            :class="[iconClass, iconSizeClass]"
        />
        <span :class="[contentSizeClass, 'w-full']">
            <slot />
        </span>
    </li>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    icon: String as PropType<string>,
    iconClass: {
        type: String as PropType<string>,
        default: 'text-icon-secondary-brand-default'
    },
    spaced: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    size: {
        type: String as PropType<ListItemSize>,
        default: ListItemSize.SM, 
        validator: (value: ListItemSize) => Object.values(ListItemSize).includes(value),
    },
})

// Computed
const iconSizeClass = computed(() => {
    const sizeVariant = {
        [ListItemSize.XS]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ListItemSize.SM]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ListItemSize.MD]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
    }
    return sizeVariant[props.size as ListItemSize] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

const contentSizeClass = computed(() => {
    const sizeVariant = {
        [ListItemSize.XS]: 'text-xs',
        [ListItemSize.SM]: 'text-sm',
        [ListItemSize.MD]: 'text-md',
    }
    return sizeVariant[props.size as ListItemSize] || 'text-sm'
})
</script>