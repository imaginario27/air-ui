<template>
    <div 
        ref="dropdownContainer" 
        data-test="dropdown-container"
        :class="[isRelative && 'relative']"
    >
        <div 
            v-if="isOpen"
            v-bind="$attrs" 
            :class="[
                'bg-background-surface',
                'py-1',
                'rounded',
                hasShadow && 'shadow-lg',
                'w-full',
                'flex flex-col',
                'z-50',
                hasBorder && 'border border-border-default',
                positionClass ? positionClass : dropdownPositionClass,
                dropdownClass,
            ]"
            :style="!positionClass && positionOffsetStyle"
        >
            <slot 
                v-if="$slots['items']"
                name="items"
                :onClose="toggle"
            />
            <template v-else-if="items?.length && !$slots['items']">
                <DropdownMenuItem 
                    v-for="(item, index) in items" :key="index"
                    :actionType="item.actionType"
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
                    :exportData="item.exportData"
                    :exportFields="item.exportFields"
                    :exportType="item.exportType"
                    :exportFileName="item.exportFileName"
                    :hasSeparator="item.hasSeparator"
                    @click="handleClick(item.callback)"
                />
            </template>
        </div>
        <!-- Activator Slot -->
        <slot 
            name="activator" 
            :onClick="toggle"
            :isOpen
        />
    </div>
</template>
<script setup lang="ts">
// Component options
defineOptions({
    inheritAttrs: false, // Prevents Vue from automatically applying attributes incorrectly
})

// Props
const props = defineProps({
    items: Array as PropType<DropdownMenuItem[]>,
    position: {
        type: String as PropType<DropdownPosition>,
        default: DropdownPosition.BOTTOM_RIGHT,
        validator: (value: DropdownPosition) => Object.values(DropdownPosition).includes(value),
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    positionXOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    positionYOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    positionClass: String as PropType<string>,
    dropdownClass: String as PropType<string>,
    isRelative: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Ref
const dropdownContainer = ref(null)

// Composables
const [isOpen, toggle] = useToggle(false)

onClickOutside(dropdownContainer, () => {
    isOpen.value = false
})

// Handlers
const handleClick = (callback?: () => void) => {
    if(callback) {
        callback()
    }
    toggle()
}

// Computed
const dropdownPositionClass = computed(() => {
    const variant = {
        [DropdownPosition.LEFT_TOP]: 'absolute right-full top-0',
        [DropdownPosition.LEFT_BOTTOM]: 'absolute right-full bottom-0',
        [DropdownPosition.RIGHT_TOP]: 'absolute left-full top-0',
        [DropdownPosition.RIGHT_BOTTOM]: 'absolute left-full bottom-0',
        [DropdownPosition.TOP_LEFT]: 'absolute left-0 bottom-full',
        [DropdownPosition.TOP_RIGHT]: 'absolute right-0 bottom-full',
        [DropdownPosition.BOTTOM_LEFT]: 'absolute left-0 top-full',
        [DropdownPosition.BOTTOM_RIGHT]: 'absolute right-0 top-full',
    }

    return variant[props.position as DropdownPosition] || 'absolute right-0 top-full'
})

const positionOffsetStyle = computed(() => {
    const normalizeOffset = (value: number | string): string => {
        if (typeof value === 'number') return `${value}px`
        if (/\d+(px|rem|em|%)$/.test(value)) return value
        return `${value}px`
    }

    const x = props.positionXOffset
    const y = props.positionYOffset
    const position = props.position as DropdownPosition

    const style: Record<string, string> = {}

    // Vertical alignment
    if (
        position === DropdownPosition.TOP_LEFT ||
        position === DropdownPosition.TOP_RIGHT
    ) {
        style.marginBottom = normalizeOffset(y)
    }

    if (
        position === DropdownPosition.BOTTOM_LEFT ||
        position === DropdownPosition.BOTTOM_RIGHT
    ) {
        style.marginTop = normalizeOffset(y)
    }

    if (
        position === DropdownPosition.LEFT_TOP ||
        position === DropdownPosition.RIGHT_TOP
    ) {
        style.marginTop = normalizeOffset(y)
    }

    if (
        position === DropdownPosition.LEFT_BOTTOM ||
        position === DropdownPosition.RIGHT_BOTTOM
    ) {
        style.marginBottom = normalizeOffset(y)
    }

    // Horizontal alignment
    if (
        position === DropdownPosition.TOP_LEFT ||
        position === DropdownPosition.BOTTOM_LEFT
    ) {
        style.marginLeft = normalizeOffset(x)
    }

    if (
        position === DropdownPosition.TOP_RIGHT ||
        position === DropdownPosition.BOTTOM_RIGHT
    ) {
        style.marginRight = normalizeOffset(x)
    }

    if (
        position === DropdownPosition.LEFT_TOP ||
        position === DropdownPosition.LEFT_BOTTOM
    ) {
        style.marginRight = normalizeOffset(x)
    }

    if (
        position === DropdownPosition.RIGHT_TOP ||
        position === DropdownPosition.RIGHT_BOTTOM
    ) {
        style.marginLeft = normalizeOffset(x)
    }

    return style
})

</script>