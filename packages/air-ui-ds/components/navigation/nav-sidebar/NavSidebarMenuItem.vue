<template>
    <NuxtLink 
        :to
        :class="[
            'flex',
            'items-center',
            'text-sm',
            'font-semibold',
            'rounded-lg',
            'hover:bg-background-neutral-hover',
            'justify-between',
            spacingClass,
            isActive && 'text-text-primary-brand-on-neutral-hover-bg bg-background-neutral-hover',
        ]"
        @click="$emit('click')"
    >
        <div
            :class="[
                'w-full',
                'flex',
                'items-center',
                gapClass,
            ]"
        >
            <MdiIcon 
                v-if="icon"
                :icon
                preserveAspectRatio="xMidYMid meet"
                :class="['text-icon-neutral-subtler', iconSizeClass]"
            />

            <span 
                v-if="!isCollapsed"
                :class="[!isActive && 'text-text-default']"
            >
                {{ text }}
            </span>
        </div>

        <MdiIcon 
            v-if="showDropdownArrow && !isCollapsed"
            :icon="isOpen ? 'mdiChevronUp' : 'mdiChevronDown'"
            preserveAspectRatio="xMidYMid meet"
            :class="['text-icon-default', iconSizeClass]"
        />
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
    styleType: {
        type: String as PropType<SidebarNavMenuItemStyleType>,
        default: SidebarNavMenuItemStyleType.COMPACT, 
        validator: (value: SidebarNavMenuItemStyleType) => Object.values(SidebarNavMenuItemStyleType).includes(value),
    },    
    detectActive: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showDropdownArrow: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isOpen: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits 
defineEmits(['click'])

// Composables
const route = useRoute()

// Computed classes
const spacingClass = computed(() => {
    if (props.isCollapsed) {
        const collapsedVariant = {
            [SidebarNavMenuItemStyleType.SPACED]: 'p-3',
            [SidebarNavMenuItemStyleType.COMPACT]: 'p-2',
        }

        return collapsedVariant[props.styleType as SidebarNavMenuItemStyleType] || 'p-2'
    }

    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[40px] py-2 pl-3 pr-2',
        [SidebarNavMenuItemStyleType.COMPACT]: 'py-1 pl-2 pr-1',
    }

    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'min-h-[40px] py-2 pl-3 pr-2'
})

const gapClass = computed(() => {
    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'gap-3',
        [SidebarNavMenuItemStyleType.COMPACT]: 'gap-2',
    }
    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'gap-3'
})


const iconSizeClass = computed(() => {
    if (props.isCollapsed) {
        const collapsedVariant = {
            [SidebarNavMenuItemStyleType.SPACED]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
            [SidebarNavMenuItemStyleType.COMPACT]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        }

        return collapsedVariant[props.styleType as SidebarNavMenuItemStyleType] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
    }

    // Regular size
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