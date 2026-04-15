<template>
    <div 
        v-if="!isCollapsed"
        v-bind="attrs"
        :class="[
        'flex',
        'items-center',
        textClass,
        borderClass,
        spacingClass,
        expandedLevelOneBottomMarginClass,
    ]"
    >
        <Icon
            v-if="icon"
            :name="icon"
            :iconClass="['!text-icon-neutral-subtle', iconSizeClass]"
        />

        <span>
            {{ text }}
        </span>
    </div>

    <Divider
        v-if="isCollapsed && showCollapseDivider"
        v-bind="attrs"
    />
</template>
<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Item text'
    },
    icon: String as PropType<string>,
    styleType: {
        type: String as PropType<SidebarNavMenuItemStyleType>,
        default: SidebarNavMenuItemStyleType.COMPACT, 
        validator: (value: SidebarNavMenuItemStyleType) => Object.values(SidebarNavMenuItemStyleType).includes(value),
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
    showCollapseDivider: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

const attrs = useAttrs()

// Computed classes
const resolvedLevel = computed(() => {
    return Math.min(Math.max(props.level, 1), 3)
})

const textClass = computed(() => {
    const variant = {
        1: 'text-sm font-semibold text-text-neutral-subtle',
        2: 'text-sm font-bold text-text-neutral-subtle',
        3: 'text-xs font-bold text-text-neutral-subtle',
    }

    return variant[resolvedLevel.value as 1 | 2 | 3]
})

const borderClass = computed(() => {
    if (resolvedLevel.value === 1) {
        return 'border-b border-border-neutral-subtle'
    }

    return ''
})

const spacingClass = computed(() => {
    if (resolvedLevel.value > 1) {
        const nestedVariant = {
            2: {
                [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[32px] gap-2 py-2 pl-3 pr-2',
                [SidebarNavMenuItemStyleType.COMPACT]: 'min-h-[28px] gap-2 py-1.5 pl-2 pr-2',
            },
            3: {
                [SidebarNavMenuItemStyleType.SPACED]: 'min-h-[30px] gap-2 py-1.5 pl-3 pr-2',
                [SidebarNavMenuItemStyleType.COMPACT]: 'min-h-[26px] gap-2 py-1 pl-2 pr-2',
            },
        }

        const levelVariant = nestedVariant[resolvedLevel.value as 2 | 3]

        return levelVariant[props.styleType as SidebarNavMenuItemStyleType] || 'min-h-[28px] gap-2 py-1.5 pl-3 pr-2'
    }

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

const expandedLevelOneBottomMarginClass = computed(() => {
    if (props.isCollapsed || resolvedLevel.value !== 1) {
        return ''
    }

    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'mb-2',
        [SidebarNavMenuItemStyleType.COMPACT]: 'mb-1',
    }

    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'mb-2'
})
</script>