
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
            @mouseenter="onActivatorMouseEnter"
            @mouseleave="onActivatorMouseLeave"
        >
            <slot
                name="activator"
                :isOpen="isOpen"
            />
        </div>

        <template v-if="shouldTeleport">    
            <!-- Teleported Dropdown Menu -->
            <teleport :to="teleportTo">
                <Transition
                    appear
                    enter-active-class="transition-opacity duration-200 ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition-opacity duration-150 ease-in"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-if="isOpen"
                        ref="dropdown"
                        data-dropdown-menu-panel
                        v-bind="$attrs"
                        :class="[
                            'bg-background-surface',
                            'py-1',
                            'rounded',
                            hasShadow && 'shadow-lg',
                            'flex flex-col',
                            hasBorder && 'border border-border-default',
                            dropdownClass,
                        ]"
                        :style="{ 
                            ...computedTeleportStyle, 
                            zIndex: zIndex 
                        }"
                        @mouseenter="onDropdownMouseEnter"
                        @mouseleave="onDropdownMouseLeave"
                    >
                        <slot
                            v-if="$slots.items"
                            name="items"
                            :onClose="close"
                        />
                        <template v-else-if="items?.length">
                            <template
                                v-for="(item, index) in items"
                                :key="index"
                            >
                                <DropdownSectionItem
                                    v-if="item.sectionTitle"
                                    :text="item.text"
                                    :icon="item.icon"
                                />

                                <DropdownMenu
                                    v-else-if="canOpenNested(item)"
                                    :items="item.children"
                                    :position="DropdownPosition.RIGHT_TOP"
                                    :positionXOffset="nestedMenuGap"
                                    :positionYOffset="0"
                                    :trigger="trigger"
                                    :hasShadow
                                    :hasBorder
                                    :disabled="disabled || item.disabled"
                                    :prefetchOn
                                    :level="level + 1"
                                >
                                    <template #activator>
                                        <DropdownMenuItem
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
                                            :prefetchOn
                                        />
                                    </template>
                                </DropdownMenu>

                                <DropdownMenuItem
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
                                    :prefetchOn
                                    @click="handleClick(item.callback)"
                                />
                            </template>
                        </template>
                    </div>
                </Transition>
            </teleport>
        </template>
        <template v-else>
            <Transition
                appear
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95"
                leave-active-class="transition-all duration-150 ease-in"
                leave-to-class="opacity-0 scale-95"
            >
                <div 
                    v-if="isOpen"
                    ref="dropdown"
                    data-dropdown-menu-panel
                    v-bind="$attrs" 
                    :class="[
                        'bg-background-surface',
                        'py-1',
                        'rounded',
                        hasShadow && 'shadow-lg',
                        'w-full',
                        'flex flex-col',
                        hasBorder && 'border border-border-default',
                        positionClass ? positionClass : dropdownPositionClass,
                        dropdownClass,
                    ]"
                    :style="{ 
                        ...(!positionClass ? positionOffsetStyle : {}), 
                        zIndex: zIndex 
                    }"
                    @mouseenter="onDropdownMouseEnter"
                    @mouseleave="onDropdownMouseLeave"
                >
                    <slot 
                        v-if="$slots['items']"
                        name="items"
                        :onClose="toggle"
                    />
                    <template v-else-if="items?.length && !$slots['items']">
                        <template
                            v-for="(item, index) in items"
                            :key="index"
                        >
                            <DropdownSectionItem
                                v-if="item.sectionTitle"
                                :text="item.text"
                                :icon="item.icon"
                            />

                            <DropdownMenu
                                v-else-if="canOpenNested(item)"
                                :items="item.children"
                                :position="DropdownPosition.RIGHT_TOP"
                                :positionXOffset="nestedMenuGap"
                                :positionYOffset="0"
                                :trigger="trigger"
                                :hasShadow
                                :hasBorder
                                :disabled="disabled || item.disabled"
                                :prefetchOn
                                :level="level + 1"
                            >
                                <template #activator>
                                    <DropdownMenuItem
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
                                        :prefetchOn
                                    />
                                </template>
                            </DropdownMenu>

                            <DropdownMenuItem 
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
                                :prefetchOn
                                @click="handleClick(item.callback)"
                            />
                        </template>
                    </template>
                </div>
            </Transition>
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
    teleportTo: {
        type: String as PropType<string>,
        default: 'body',
    },
    zIndex: {
        type: String as PropType<string>,
        default: '50',
    },
    trigger: {
        type: String as PropType<Trigger>,
        default: Trigger.CLICK,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
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
    isSticky: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Refs
const activatorWrapper = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// States
const isPositioned = ref(false)
const activatorRect = ref<DOMRect | null>(null)
const dropdownRect = ref<DOMRect | null>(null)

// Methods
const close = () => {
    isOpen.value = false
    isPositioned.value = false
}

const MAX_NESTED_LEVELS = 3

const hasNestedItems = (item: DropdownMenuItem) => {
    return Array.isArray(item.children) && item.children.length > 0
}

const canOpenNested = (item: DropdownMenuItem) => {
    return props.level < MAX_NESTED_LEVELS && hasNestedItems(item)
}

const resolveItemActionType = (item: DropdownMenuItem) => {
    // Items with children are always ACTION items (never links)
    if (hasNestedItems(item)) {
        return DropdownActionType.ACTION
    }
    return item.actionType ?? DropdownActionType.ACTION
}

const clearCloseTimer = () => {
    if (closeTimer.value !== null) {
        globalThis.clearTimeout(closeTimer.value)
        closeTimer.value = null
    }
}

const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.value = globalThis.setTimeout(() => {
        close()
    }, 120)
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
    if(props.disabled) return

    if (props.trigger !== Trigger.CLICK) return
    if (!activatorWrapper.value) return

    if (activatorWrapper.value.contains(event.target as Node)) {
        toggle()
    }
}

const onActivatorMouseEnter = () => {
    if(props.disabled) return

    if (props.trigger !== Trigger.HOVER) return

    clearCloseTimer()
    open()
}

const onActivatorMouseLeave = () => {
    if(props.disabled) return

    if (props.trigger !== Trigger.HOVER) return

    scheduleClose()
}

const onDropdownMouseEnter = () => {
    onActivatorMouseEnter()
}

const onDropdownMouseLeave = () => {
    onActivatorMouseLeave()
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

const shouldCloseFromTarget = (target: Node) => {
    const dropdownEl = dropdown.value
    const activatorEl = activatorWrapper.value

    if (!dropdownEl || !activatorEl) return false

    const targetElement = target as HTMLElement | null
    if (targetElement?.closest('[data-dropdown-menu-panel]')) {
        return false
    }

    return !dropdownEl.contains(target) && !activatorEl.contains(target)
}

const handleOutsideEvent = (event: Event) => {
    const target = event.target as Node

    if (shouldCloseFromTarget(target)) {
        close()
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) return

    if (event.key === 'Escape') {
        close()
    }
}

// Computed
const computedTeleportStyle = computed<CSSProperties>(() => {
    if (!isPositioned.value || !activatorRect.value || !dropdownRect.value) {
        return {
            position: 'absolute',
            top: '0px',
            left: '0px',
            visibility: 'hidden',
            zIndex: props.zIndex,
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

    return props.isSticky
        ? {
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            width: `${a.width}px`,
            visibility: 'visible',
            zIndex: props.zIndex,
        }
        : {
            position: 'absolute',
            top: `${top + window.scrollY}px`,
            left: `${left + window.scrollX}px`,
            width: `${a.width}px`,
            visibility: 'visible',
            zIndex: props.zIndex,
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
    document.addEventListener('click', handleOutsideEvent)
    window.addEventListener('resize', close)
    document.addEventListener('scroll', handleOutsideEvent, true)
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    clearCloseTimer()
    document.removeEventListener('click', handleOutsideEvent)
    window.removeEventListener('resize', close)
    document.removeEventListener('scroll', handleOutsideEvent, true)
    document.removeEventListener('keydown', handleKeydown)
})
</script>
