<template>
    <div data-test="context-menu-target" @contextmenu="onContextMenu">
        <slot />
    </div>

    <ContextMenuDropdown
        v-model="isOpen"
        :x="anchorPoint.x"
        :y="anchorPoint.y"
        :width="width"
        :hasShadow="hasShadow"
        :hasBorder="hasBorder"
        :positionXOffset="positionXOffset"
        :positionYOffset="positionYOffset"
        :dropdownClass="dropdownClass"
        :shouldTeleport="shouldTeleport"
        :teleportTo="teleportTo"
        :zIndex="zIndex"
        v-bind="$attrs"
    >
        <template #items="{ onClose }">
            <slot v-if="$slots.items" name="items" :onClose="onClose" />

            <DropdownMenuContextItemsTree
                v-else
                :items="items"
                :trigger="Trigger.HOVER"
                :hasShadow="hasShadow"
                :hasBorder="hasBorder"
                :disabled="disabled"
                :prefetchOn="prefetchOn"
                :level="level"
                :nestedMenuGap="nestedMenuGap"
                :onClose="onClose"
            />
        </template>
    </ContextMenuDropdown>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

// Props
const props = defineProps({
    items: {
        type: Array as PropType<ContextMenuItem[]>,
        default: () => [],
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    width: {
        type: Number as PropType<number>,
        default: 240,
    },
    positionXOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    positionYOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    dropdownClass: String as PropType<string>,
    shouldTeleport: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    teleportTo: {
        type: String as PropType<string>,
        default: 'body',
    },
    zIndex: {
        type: String as PropType<string>,
        default: '50',
    },
    level: {
        type: Number as PropType<number>,
        default: 1,
    },
    nestedMenuGap: {
        type: Number as PropType<number>,
        default: 8,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
})

// Composables
const slots = useSlots()

// States
const isOpen = ref(false)
const anchorPoint = ref({ x: 0, y: 0 })

// Computed
const hasMenuContent = computed(() => {
    return props.items.length > 0 || Boolean(slots.items)
})

// Methods
const openAtCursor = (event: MouseEvent) => {
    anchorPoint.value = {
        x: event.clientX,
        y: event.clientY,
    }

    isOpen.value = true
}

const onContextMenu = async (event: MouseEvent) => {
    if (props.disabled || !hasMenuContent.value) return

    event.preventDefault()
    openAtCursor(event)
}
</script>