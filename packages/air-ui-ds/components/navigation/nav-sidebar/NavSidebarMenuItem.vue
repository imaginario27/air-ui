<template>
    <component
        :is="componentTag"
        v-bind="componentProps"
        :class="[
            !isCollapsed && 'w-full',
            'flex',
            'items-center',
            'text-left',
            'rounded-lg',
            'hover:bg-background-neutral-hover',
            'justify-between',
            levelTextClass,
            spacingClass,
            !isActive && 'text-text-default',
            isActive && 'text-text-primary-brand-on-neutral-hover-bg bg-background-neutral-hover',
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
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
            <Icon
                v-if="icon"
                :name="icon"
                :iconClass="[iconClass || 'text-icon-neutral-subtler', iconSizeClass]"
            />

            <span
                v-if="!isCollapsed"
                :class="[disabled && 'select-none', textClass]"
            >
                {{ text }}
            </span>
        </div>

        <Icon
            v-if="showDropdownArrow && !isCollapsed"
            :name="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
            :class="iconSizeClass"
        />
    </component>
</template>
<script setup lang="ts">
import { NuxtLink } from '#components'

// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Item text'
    },
    icon: String as PropType<string>,
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
    level: {
        type: Number as PropType<number>,
        default: 1,
    },
    showNestedLevelGuide: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    textClass: String as PropType<string>,
    iconClass: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
})

// Emits 
defineEmits(['click'])

// Composables
const route = useRoute()

// Computed classes
const resolvedLevel = computed(() => {
    return Math.min(Math.max(props.level, 1), 3)
})

const levelTextClass = computed(() => {
    const variant = {
        1: 'text-sm font-semibold',
        2: 'text-sm font-medium',
        3: 'text-xs font-medium',
    }

    return variant[resolvedLevel.value as 1 | 2 | 3]
})

const spacingClass = computed(() => {
    if (props.isCollapsed) {
        const collapsedVariant = {
            [SidebarNavMenuItemStyleType.SPACED]: 'p-3',
            [SidebarNavMenuItemStyleType.COMPACT]: 'p-2',
        }

        return collapsedVariant[props.styleType as SidebarNavMenuItemStyleType] || 'p-2'
    }

    const levelVariant = {
        1: {
            [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[40px] py-2 pl-3 pr-2',
            [SidebarNavMenuItemStyleType.COMPACT]: 'py-1 pl-2 pr-1',
        },
        2: {
            [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[36px] py-1.5 pl-3 pr-2',
            [SidebarNavMenuItemStyleType.COMPACT]: 'py-1 pl-2 pr-1',
        },
        3: {
            [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[32px] py-1 pl-3 pr-2',
            [SidebarNavMenuItemStyleType.COMPACT]: 'py-0.5 pl-2 pr-1',
        },
    }

    const variant = levelVariant[resolvedLevel.value as 1 | 2 | 3]

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

const componentTag = computed(() => {
    return props.to ? NuxtLink : 'button'
})

const componentProps = computed(() => {
    if (props.to) {
        return { to: props.to, prefetchOn: props.prefetchOn }
    }

    return { type: 'button' }
})
</script>