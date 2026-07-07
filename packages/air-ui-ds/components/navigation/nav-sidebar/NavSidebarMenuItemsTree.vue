<template>
    <div :class="levelWrapperClass">
        <div
            v-if="showGuideLine"
            :class="guideLineClass"
        />

        <template v-for="(item, index) in items" :key="getNodeKey(getNodePath(index))">
            <NavSidebarMenuSectionTitle
                v-if="item.isSectionTitle"
                :text="item.text"
                :icon="item.icon"
                :styleType="itemsStyleType"
                :isCollapsed
                :level
                :showNestedLevelGuide
                :showCollapseDivider
                :class="[
                    level > 1 && 'mt-2',
                ]"
            />

            <template v-else>
                <NavSidebarMenuItem
                    :text="item.text"
                    :icon="item.icon"
                    :to="item.to"
                    :disabled="item.disabled"
                    :prefetchOn
                    :styleType="itemsStyleType"
                    :textClass="getTextClass(level)"
                    :iconClass="getIconClass(level)"
                    :showDropdownArrow="canRenderChildren(item)"
                    :isOpen="isNodeOpen(getNodePath(index))"
                    :isCollapsed
                    :level
                    :showNestedLevelGuide
                    :class="[
                        getItemCustomClass(level),
                    ]"
                    @click="handleItemClick(item, getNodePath(index))"
                />

                <VerticalExpansionTransition v-if="canRenderChildren(item)" v-show="isNodeOpen(getNodePath(index))">
                    <NavSidebarMenuItemsTree
                        :items="item.children ?? []"
                        :level="level + 1"
                        :isCollapsed
                        :openItems
                        :itemsStyleType
                        :itemsTextClass
                        :itemsIconClass
                        :subItemsCustomClass
                        :subItemsTextClass
                        :subItemsIconClass
                        :thirdLevelItemsCustomClass
                        :prefetchOn
                        :showCollapseDivider
                        :showNestedLevelGuide
                        :pathPrefix="getNodePath(index)"
                        @toggle="emit('toggle', $event)"
                    />
                </VerticalExpansionTransition>
            </template>
        </template>
    </div>
</template>
<script setup lang="ts">
defineOptions({
    name: 'NavSidebarMenuItemsTree',
})

const props = defineProps({
    items: {
        type: Array as PropType<SidebarMenuItem[]>,
        default: () => [],
    },
    level: {
        type: Number as PropType<number>,
        default: 1,
    },
    isCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    openItems: {
        type: Object as PropType<Record<string, boolean>>,
        default: () => ({}),
    },
    itemsStyleType: {
        type: String as PropType<SidebarNavMenuItemStyleType>,
        default: SidebarNavMenuItemStyleType.COMPACT,
        validator: (value: SidebarNavMenuItemStyleType) => Object.values(SidebarNavMenuItemStyleType).includes(value),
    },
    itemsCustomClass: String as PropType<string>,
    itemsTextClass: String as PropType<string>,
    itemsIconClass: String as PropType<string>,
    subItemsCustomClass: String as PropType<string>,
    subItemsTextClass: String as PropType<string>,
    subItemsIconClass: String as PropType<string>,
    thirdLevelItemsCustomClass: String as PropType<string>,
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
    showCollapseDivider: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showNestedLevelGuide: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    pathPrefix: {
        type: Array as PropType<number[]>,
        default: () => [],
    },
})

const emit = defineEmits<{
    (e: 'toggle', path: number[]): void
}>()

const MAX_NESTING_LEVEL = 3

const getNodePath = (index: number) => {
    return [...props.pathPrefix, index]
}

const getNodeKey = (path: number[]) => {
    return path.join('-')
}

const hasChildren = (item: SidebarMenuItem) => {
    return Array.isArray(item.children) && item.children.length > 0
}

const canRenderChildren = (item: SidebarMenuItem) => {
    return !props.isCollapsed && !item.isSectionTitle && hasChildren(item) && props.level < MAX_NESTING_LEVEL
}

const isNodeOpen = (path: number[]) => {
    return !!props.openItems[getNodeKey(path)]
}

const showGuideLine = computed(() => {
    return !props.isCollapsed && props.showNestedLevelGuide && props.level > 1
})

const levelWrapperClass = computed(() => {
    if (props.level <= 1) return ''

    const variant = {
        2: 'relative ml-4 pl-3',
        3: 'relative ml-8 pl-3',
    }

    return variant[props.level as 2 | 3] || 'relative ml-4 pl-3'
})

const guideLineClass = computed(() => {
    const variant = {
        2: 'pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-border-neutral-subtle/70',
        3: 'pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-border-neutral-subtle/50',
    }

    return variant[props.level as 2 | 3] || 'pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-border-neutral-subtle/70'
})

const getItemCustomClass = (level: number) => {
    if (level === 1) {
        return props.itemsCustomClass
    }

    if (level === 2) {
        return props.subItemsCustomClass ?? '!font-medium'
    }

    return props.thirdLevelItemsCustomClass ?? props.subItemsCustomClass ?? '!font-medium'
}

const getTextClass = (level: number) => {
    if (level === 1) {
        return props.itemsTextClass
    }

    return props.subItemsTextClass
}

const getIconClass = (level: number) => {
    if (level === 1) {
        return props.itemsIconClass
    }

    return props.subItemsIconClass
}

const handleItemClick = (item: SidebarMenuItem, path: number[]) => {
    if (!canRenderChildren(item)) return

    emit('toggle', path)
}
</script>
