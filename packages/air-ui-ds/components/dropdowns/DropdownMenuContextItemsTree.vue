<template>
    <template v-for="(item, index) in items" :key="`${item.text ?? 'divider'}-${index}`">
        <Divider v-if="item.divider" class="my-1" />

        <DropdownSectionItem
            v-else-if="item.sectionTitle"
            :text="item.text"
            :icon="item.icon"
        />

        <DropdownMenu
            v-else-if="canOpenNested(item)"
            :position="DropdownPosition.RIGHT_TOP"
            :positionXOffset="nestedMenuGap"
            :positionYOffset="0"
            :trigger="trigger"
            :hasShadow="hasShadow"
            :hasBorder="hasBorder"
            :disabled="disabled || item.disabled"
            :prefetchOn="prefetchOn"
            :level="level + 1"
            :matchActivatorWidth="false"
        >
            <template #activator>
                <DropdownMenuContextItem
                    :actionType="DropdownActionType.ACTION"
                    :text="item.text"
                    :icon="item.icon"
                    :size="item.size"
                    :type="item.type"
                    :userDisplayName="item.userDisplayName"
                    :userProfileImg="item.userProfileImg"
                    :imgUrl="item.imgUrl"
                    :alt="item.alt"
                    :helpText="item.helpText"
                    :hasSeparator="item.hasSeparator"
                    :disabled="disabled || item.disabled"
                    :hasNestedLevels="true"
                    :kbd="item.kbd"
                    :prefetchOn="prefetchOn"
                />
            </template>

            <template #items="{ onClose }">
                <DropdownMenuContextItemsTree
                    :items="item.children || []"
                    :trigger="trigger"
                    :hasShadow="hasShadow"
                    :hasBorder="hasBorder"
                    :disabled="disabled || item.disabled"
                    :prefetchOn="prefetchOn"
                    :level="level + 1"
                    :nestedMenuGap="nestedMenuGap"
                    :onClose="onClose"
                />
            </template>
        </DropdownMenu>

        <DropdownMenuContextItem
            v-else
            :actionType="resolveItemActionType(item)"
            :text="item.text"
            :icon="item.icon"
            :size="item.size"
            :type="item.type"
            :userDisplayName="item.userDisplayName"
            :userProfileImg="item.userProfileImg"
            :imgUrl="item.imgUrl"
            :alt="item.alt"
            :helpText="item.helpText"
            :to="item.to"
            :isExternal="item.isExternal"
            :hasSeparator="item.hasSeparator"
            :disabled="disabled || item.disabled"
            :hasNestedLevels="hasNestedItems(item)"
            :kbd="item.kbd"
            :prefetchOn="prefetchOn"
            @click="handleItemClick(item.callback)"
            @close="handleClose"
        />
    </template>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    items: {
        type: Array as PropType<ContextMenuItem[]>,
        default: () => [],
    },
    trigger: {
        type: String as PropType<Trigger>,
        default: Trigger.CLICK,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
    level: {
        type: Number as PropType<number>,
        default: 1,
    },
    nestedMenuGap: {
        type: Number as PropType<number>,
        default: 8,
    },
    onClose: {
        type: Function as PropType<() => void>,
        default: () => undefined,
    },
})

// Constants
const MAX_NESTED_LEVELS = 3

// Methods
const hasNestedItems = (item: ContextMenuItem) => {
    return Array.isArray(item.children) && item.children.length > 0
}

const canOpenNested = (item: ContextMenuItem) => {
    return props.level < MAX_NESTED_LEVELS && hasNestedItems(item)
}

const resolveItemActionType = (item: ContextMenuItem) => {
    if (hasNestedItems(item)) {
        return DropdownActionType.ACTION
    }

    return item.actionType ?? DropdownActionType.ACTION
}

const handleItemClick = (callback?: () => void) => {
    callback?.()
}

const handleClose = () => {
    props.onClose?.()
}
</script>