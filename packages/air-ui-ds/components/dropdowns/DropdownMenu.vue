
<template>
    <div
        ref="dropdownContainer"
        data-test="dropdown-container"
        :class="[isRelative && 'relative']"
    >
        <!-- Activator Wrapper -->
        <div
            ref="activatorWrapper"
            class="dropdown-activator"
            @click="onActivatorClick"
        >
            <slot
                name="activator"
                :isOpen="isOpen"
            />
        </div>

        <template v-if="shouldTeleport">    
            <!-- Teleported Dropdown Menu -->
            <teleport to="body">
                <div
                    v-if="isOpen"
                    ref="dropdown"
                    v-bind="$attrs"
                    :class="[
                        'bg-background-surface',
                        'py-1',
                        'rounded',
                        hasShadow && 'shadow-lg',
                        'flex flex-col',
                        'z-50',
                        hasBorder && 'border border-border-default',
                        dropdownClass,
                    ]"
                    :style="computedTeleportStyle"
                >
                    <slot
                        v-if="$slots.items"
                        name="items"
                        :onClose="close"
                    />
                    <template v-else-if="items?.length">
                        <DropdownMenuItem
                            v-for="(item, index) in items"
                            :key="index"
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
            </teleport>
        </template>
        <template v-else>
            <div 
                v-if="isOpen"
                ref="dropdown"
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
        </template>
    </div>
</template>

<script setup lang="ts">
// Imports
import type { CSSProperties } from 'vue'

defineOptions({
    inheritAttrs: false,
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
    shouldTeleport: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Refs
const activatorWrapper = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)
const isOpen = ref(false)

// States
const isPositioned = ref(false)
const activatorRect = ref<DOMRect | null>(null)
const dropdownRect = ref<DOMRect | null>(null)

// Methods
const close = () => {
    isOpen.value = false
    isPositioned.value = false
}

const open = () => {
    isOpen.value = true
    isPositioned.value = false

    nextTick(() => {
        requestAnimationFrame(() => {
            updateRects()
            isPositioned.value = true
        })
    })
}

const toggle = () => {
    if (isOpen.value) {
        close()
    } else {
        open()
    }
}

const getActivatorElement = () => {
    return activatorWrapper.value
}

const onActivatorClick = (event: MouseEvent) => {
    if (!activatorWrapper.value) return

    if (activatorWrapper.value.contains(event.target as Node)) {
        toggle()
    }
}

const updateRects = () => {
    const activatorEl = getActivatorElement()
    if (!activatorEl || !dropdown.value) return

    activatorRect.value = activatorEl.getBoundingClientRect()
    dropdownRect.value = dropdown.value.getBoundingClientRect()
}

const handleClick = (callback?: () => void) => {
    if (callback) callback()
    close()
}

const handleClickOutside = (event: MouseEvent) => {
    const dropdownEl = dropdown.value
    const activatorEl = activatorWrapper.value

    if (!dropdownEl || !activatorEl) return

    const target = event.target as Node

    if (
        !dropdownEl.contains(target) &&
        !activatorEl.contains(target)
    ) {
        close()
    }
}

const handleScrollOutside = (event: Event) => {
    const dropdownEl = dropdown.value
    const activatorEl = activatorWrapper.value

    if (!dropdownEl || !activatorEl) return

    const target = event.target as Node

    // If scroll happened on an element not containing the dropdown or activator
    if (
        !dropdownEl.contains(target) &&
        !activatorEl.contains(target)
    ) {
        close()
    }
}

const computedTeleportStyle = computed<CSSProperties>(() => {
    if (!isPositioned.value || !activatorRect.value || !dropdownRect.value) {
        return {
            position: 'absolute',
            top: '0px',
            left: '0px',
            visibility: 'hidden',
            zIndex: '50',
            width: '0px',
        }
    }

    const a = activatorRect.value
    const d = dropdownRect.value
    const x = Number(props.positionXOffset) || 0
    const y = Number(props.positionYOffset) || 0

    const [primary, secondary] = props.position.toLowerCase().split('-')

    let top = 0
    let left = 0

    if (primary === 'bottom') top = a.bottom + y
    if (primary === 'top') top = a.top - d.height - y
    if (primary === 'left') left = a.left - d.width - x
    if (primary === 'right') left = a.right + x

    if (secondary === 'left') left = a.left
    if (secondary === 'right') left = a.right - d.width
    if (secondary === 'top') top = a.top
    if (secondary === 'bottom') top = a.bottom - d.height

    return {
        position: 'absolute',
        top: `${top + window.scrollY}px`,
        left: `${left + window.scrollX}px`,
        width: `${a.width}px`,
        visibility: 'visible',
        zIndex: '50',
    }
})

// Styles for non-teleported dropdown
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

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', close)
    document.addEventListener('scroll', handleScrollOutside, true)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', close)
    document.removeEventListener('scroll', handleScrollOutside, true)
})
</script>
