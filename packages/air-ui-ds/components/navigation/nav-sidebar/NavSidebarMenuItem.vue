<template>
    <NuxtLink 
        :to="to" 
        :class="[
            'flex',
            'items-center',
            'text-sm',
            'font-semibold',
            'rounded-lg',
            'hover:bg-background-neutral-hover',
            spacingClass,
            isActive && 'text-text-primary-brand-on-neutral-hover-bg bg-background-neutral-hover',
        ]"
    >
        <MdiIcon 
            v-if="icon"
            :icon
            preserveAspectRatio="xMidYMid meet"
            :class="['text-icon-neutral-subtler', iconSizeClass]"
        />
        <span :class="[!isActive && 'text-text-default']">
            {{ text }}
        </span>
    </NuxtLink>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Item text'
    },
    icon: String as PropType<any>,
    to: {
        type: String as PropType<string>,
        default: null
    },
    isActive: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    styleType: {
        type: String as PropType<SidebarNavMenuItemStyleType>,
        default: SidebarNavMenuItemStyleType.COMPACT, 
        validator: (value: SidebarNavMenuItemStyleType) => Object.values(SidebarNavMenuItemStyleType).includes(value),
    },    
    detectActive: {
        type: Boolean,
        default: true,
    },
})

// Composables
const route = useRoute()

// Computed classes
const spacingClass = computed(() => {
    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[40px] gap-3 py-2 pl-3 pr-2',
        [SidebarNavMenuItemStyleType.COMPACT]: 'gap-2 py-1 pl-2 pr-1',
    }
    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'min-h-[40px] gap-2 py-2 pl-3 pr-2'
})

const iconSizeClass = computed(() => {
    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [SidebarNavMenuItemStyleType.COMPACT]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
    }
    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

const isActive = computed(() => {
    return props.detectActive && route.path === props.to
})
</script>