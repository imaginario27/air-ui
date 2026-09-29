<template>
    <component
        :is="componentTag"
        v-bind="componentProps"
        :class="[
            !isCollapsed && 'w-full',
            'group',
            'flex',
            'items-center',
            'text-left',
            'rounded-lg',
            'transition-colors duration-200 ease-out',
            !isActive && 'hover:bg-background-neutral-hover',
            'justify-between',
            levelTextClass,
            spacingClass,
            nestedItemSpacingClass,
            !isActive && 'text-text-default',
            isActive && 'text-text-primary-brand-on-soft-bg bg-background-primary-brand-soft hover:bg-background-primary-brand-soft-hover',
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
        ]"
        @click="$emit('click')"
        @mouseenter="onRowMouseEnter"
        @mouseleave="onRowMouseLeave"
    >
        <div
            :class="[
                'w-full',
                'flex',
                'items-center',
                truncate && 'min-w-0',
                gapClass,
            ]"
        >
            <Icon
                v-if="icon"
                :name="icon"
                :iconClass="[
                    iconClass || 'text-icon-neutral-subtler',
                    'group-hover:text-icon-default',
                    isActive ? '!text-icon-primary-brand-on-soft-bg' : '',
                    iconSizeClass,
                ].filter(Boolean)"
            />

            <template v-if="!isCollapsed">
                <div
                    v-if="truncate"
                    ref="textWrapperEl"
                    :class="[
                        'relative min-w-0 flex-1 overflow-hidden',
                        isMarqueeEnabled && hasMoreActions && 'mr-2',
                    ]"
                >
                    <span
                        ref="textEl"
                        :class="[
                            'block',
                            disabled && 'select-none',
                            isMarqueeEnabled && 'transition-transform ease-in-out',
                            isMarqueeSliding ? 'whitespace-nowrap' : 'truncate',
                            textClass,
                        ]"
                        :style="marqueeStyle"
                    >
                        {{ text }}
                    </span>

                    <span
                        v-if="hasMoreActions && !isMarqueeEnabled"
                        aria-hidden="true"
                        :class="[
                            'pointer-events-none absolute inset-y-0 right-0 w-8',
                            'bg-linear-to-r from-transparent to-background-neutral-hover',
                            'opacity-0 transition-opacity duration-150',
                            'group-hover:opacity-100 group-focus-within:opacity-100',
                        ]"
                    />
                </div>

                <span
                    v-else
                    :class="[disabled && 'select-none', textClass]"
                >
                    {{ text }}
                </span>

                <span
                    v-if="$slots['text-suffix']"
                    class="flex shrink-0 items-center"
                >
                    <slot name="text-suffix" />
                </span>
            </template>
        </div>

        <Icon
            v-if="showDropdownArrow && !isCollapsed"
            :name="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
            :class="iconSizeClass"
        />

        <div
            v-if="hasMoreActions && !isCollapsed"
            :class="[
                'flex shrink-0 items-center',
                'opacity-0 transition-opacity duration-150',
                'group-hover:opacity-100 group-focus-within:opacity-100',
            ]"
            @click.stop.prevent
            @keydown.stop
        >
            <slot name="suffix">
                <DropdownMenu
                    :items="moreActionsItems"
                    :position="moreActionsPosition"
                    :positionXOffset="moreActionsPositionXOffset"
                    :positionYOffset="moreActionsPositionYOffset"
                    :style="{ minWidth: `${moreActionsMenuWidth}px` }"
                >
                    <template #activator>
                        <button
                            type="button"
                            :aria-label="moreActionsAriaLabel"
                            :class="[
                                'flex items-center justify-center rounded-button',
                                'w-[24px] h-[24px]',
                                'text-icon-default hover:bg-background-neutral-active',
                                'transition-colors duration-150',
                            ]"
                        >
                            <Icon
                                name="mdi:dots-vertical"
                                iconClass="w-[16px] h-[16px]"
                            />
                        </button>
                    </template>
                </DropdownMenu>
            </slot>
        </div>
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
    truncate: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    marquee: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    moreActionsItems: {
        type: Array as PropType<DropdownMenuItem[]>,
        default: () => [],
    },
    moreActionsAriaLabel: {
        type: String as PropType<string>,
        default: 'More options',
    },
    moreActionsMenuWidth: {
        type: Number as PropType<number>,
        default: 200,
    },
    moreActionsPosition: {
        type: String as PropType<DropdownPosition>,
        default: DropdownPosition.BOTTOM_RIGHT,
        validator: (value: DropdownPosition) => Object.values(DropdownPosition).includes(value),
    },
    moreActionsPositionXOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    moreActionsPositionYOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
})

// Emits
defineEmits(['click'])

// Composables
const route = useRoute()
const slots = useSlots()

// Refs
const textEl = ref<HTMLElement | null>(null)
const textWrapperEl = ref<HTMLElement | null>(null)

// States
const isRowHovered = ref(false)
const marqueeShift = ref(0)

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

const nestedItemSpacingClass = computed(() => {
    const variant = {
        [SidebarNavMenuItemStyleType.SPACED]: 'my-1',
        [SidebarNavMenuItemStyleType.COMPACT]: 'my-0.5',
    }

    return variant[props.styleType as SidebarNavMenuItemStyleType] || 'my-0.5'
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

const isMarqueeEnabled = computed(() => {
    return props.truncate && props.marquee && !props.isCollapsed
})

const isMarqueeSliding = computed(() => {
    return isMarqueeEnabled.value && isRowHovered.value
})

const hasMoreActions = computed(() => {
    if (props.showDropdownArrow) return false

    return Boolean(slots.suffix) || props.moreActionsItems.length > 0
})

const marqueeStyle = computed(() => {
    if (!isMarqueeEnabled.value) return undefined

    const shift = isRowHovered.value ? marqueeShift.value : 0
    const durationSeconds = Math.max(0.6, shift / 60)

    return {
        transform: `translateX(-${shift}px)`,
        transitionDuration: `${durationSeconds}s`,
    }
})

// Methods
const updateMarqueeShift = () => {
    if (!isMarqueeEnabled.value || !textEl.value || !textWrapperEl.value) {
        marqueeShift.value = 0
        return
    }

    const overflow = textEl.value.scrollWidth - textWrapperEl.value.clientWidth

    marqueeShift.value = Math.max(0, overflow)
}

const onRowMouseEnter = () => {
    isRowHovered.value = true

    if (isMarqueeEnabled.value) {
        nextTick(updateMarqueeShift)
    }
}

const onRowMouseLeave = () => {
    isRowHovered.value = false
}
</script>