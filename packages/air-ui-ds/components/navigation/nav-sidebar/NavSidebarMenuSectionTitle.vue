<template>
    <div 
        :class="[
        'flex',
        'items-center',
        'text-sm',
        'font-semibold',
        'text-text-neutral-subtle',
        'border-b',
        'border-border-neutral-subtle',
        spacingClass,
    ]"
    >
        <MdiIcon 
            v-if="icon"
            :icon
            preserveAspectRatio="xMidYMid meet"
            :class="['text-icon-neutral-subtle', iconSizeClass]"
        />
        {{ text }}
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Item text'
    },
    icon: String as PropType<any>,
    styleType: {
        type: String as PropType<SidebarNavMenuItemStyleType>,
        default: SidebarNavMenuItemStyleType.COMPACT, 
        validator: (value: SidebarNavMenuItemStyleType) => Object.values(SidebarNavMenuItemStyleType).includes(value),
    },
})

// Computed classes
const spacingClass = computed(() => {
    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[40px] gap-3 pt-4 pb-2 px-3',
        [SidebarNavMenuItemStyleType.COMPACT]: 'gap-2 pt-3 pb-1 px-2',
    }
    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'min-h-[40px] gap-2 pt-4 pb-2 px-3'
})

const iconSizeClass = computed(() => {
    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [SidebarNavMenuItemStyleType.COMPACT]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
    }
    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})
</script>