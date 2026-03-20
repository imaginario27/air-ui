<template>
    <component
        :is="componentTag"
        v-bind="componentProps"
        :class="[
            'flex',
            'items-center',
            'text-sm',
            'font-semibold',
            'rounded-lg',
            'hover:bg-background-neutral-hover',
            'justify-between',
            spacingClass,
            !isActive && 'text-text-default',
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
            <Icon
                v-if="icon"
                :name="icon"
                :iconClass="[iconClass || 'text-icon-neutral-subtler', iconSizeClass]"
            />

            <span
                v-if="!isCollapsed"
                :class="textClass"
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
    textClass: String as PropType<string>,
    iconClass: String as PropType<string>,
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

const componentTag = computed(() => {
    return props.to ? NuxtLink : 'button'
})

const componentProps = computed(() => {
    if (props.to) {
        return { to: props.to }
    }

    return { type: 'button' }
})
</script>