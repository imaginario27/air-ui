<template>
    <div
        ref="root"
        role="group"
        :aria-label="ariaLabel"
        :class="[
            'flex flex-col gap-3',
            'max-w-full',
            'text-text-default',
            disabled && 'opacity-disabled',
            isBoxed
                ? [
                      hasWeekNumbers ? 'w-[22rem]' : 'w-[19.5rem]',
                      'p-3 rounded-lg border border-border-default bg-background-container-surface',
                  ]
                : hasWeekNumbers
                  ? 'w-[20.5rem]'
                  : 'w-[18rem]',
        ]"
        @keydown.esc="handleEscape"
    >
        <!-- Header -->
        <div class="flex items-center justify-between gap-1">
            <div class="flex items-center gap-1">
                <ActionIconButton
                    v-if="hasYearControls && view === CalendarView.DAYS"
                    icon="mdi:chevron-double-left"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoPreviousYear"
                    :ariaLabel="previousYearLabel"
                    @click="goYear(-1)"
                />
                <ActionIconButton
                    icon="mdi:chevron-left"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoPrevious"
                    :ariaLabel="previousLabel"
                    @click="goPrevious"
                />
            </div>

            <div class="flex items-center gap-1">
                <template v-if="view === CalendarView.DAYS">
                    <button
                        type="button"
                        :disabled="isNavigationDisabled"
                        :class="headerButtonClass"
                        @click="openMonths"
                    >
                        {{ monthLabel }}
                    </button>
                    <button
                        type="button"
                        :disabled="isNavigationDisabled"
                        :class="headerButtonClass"
                        @click="openYears"
                    >
                        {{ viewYear }}
                    </button>
                </template>
                <button
                    v-else-if="view === CalendarView.MONTHS"
                    type="button"
                    :disabled="isNavigationDisabled"
                    :class="headerButtonClass"
                    @click="openYears"
                >
                    {{ viewYear }}
                </button>
                <span v-else class="px-2 py-1 text-sm font-semibold">{{ yearsRangeLabel }}</span>
            </div>

            <div class="flex items-center gap-1">
                <ActionIconButton
                    icon="mdi:chevron-right"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoNext"
                    :ariaLabel="nextLabel"
                    @click="goNext"
                />
                <ActionIconButton
                    v-if="hasYearControls && view === CalendarView.DAYS"
                    icon="mdi:chevron-double-right"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoNextYear"
                    :ariaLabel="nextYearLabel"
                    @click="goYear(1)"
                />
            </div>
        </div>

        <!-- Days -->
        <div
            v-if="view === CalendarView.DAYS"
            role="grid"
            :aria-label="`${monthLabel} ${viewYear}`"
            :aria-readonly="readonly || undefined"
            @keydown="handleDayKeydown"
            @mouseleave="handleGridLeave"
        >
            <div role="row" :class="['grid', gridColumnsClass]">
                <span
                    v-if="hasWeekNumbers"
                    role="columnheader"
                    class="flex h-9 items-center justify-center text-xs font-semibold text-text-neutral-subtler"
                >
                    {{ weekAbbreviation }}
                </span>
                <span
                    v-for="weekday in weekdays"
                    :key="weekday.long"
                    role="columnheader"
                    :abbr="weekday.long"
                    class="flex h-9 items-center justify-center text-xs font-semibold text-text-neutral-subtler"
                >
                    {{ weekday.short }}
                </span>
            </div>

            <div v-for="(week, weekIndex) in weeks" :key="weekIndex" role="row" :class="['grid', gridColumnsClass]">
                <span
                    v-if="hasWeekNumbers"
                    role="rowheader"
                    class="flex items-center justify-center text-xs text-text-neutral-subtler"
                >
                    {{ week.number }}
                </span>
                <template v-for="day in week.days" :key="day.iso">
                    <div
                        v-if="day.isInMonth || hasOutsideDays"
                        role="presentation"
                        class="relative"
                        @mouseenter="handleCellEnter(day)"
                        @mouseleave="handleCellLeave"
                        @focusin="handleCellFocus(day)"
                        @focusout="handleCellBlur"
                    >
                        <button
                            type="button"
                            role="gridcell"
                            :data-date="day.iso"
                            :disabled
                            :tabindex="day.iso === focusedISO ? 0 : -1"
                            :aria-label="dayLabel(day)"
                            :aria-selected="day.isSelected"
                            :aria-disabled="day.isDisabled || undefined"
                            :aria-current="day.isToday ? 'date' : undefined"
                            :aria-haspopup="canOpenPopover(day) ? 'dialog' : undefined"
                            :aria-expanded="canOpenPopover(day) ? popoverDate === day.iso : undefined"
                            :class="dayClass(day)"
                            @click="handleDayClick(day)"
                        >
                            {{ day.number }}
                            <span
                                v-if="day.markers.length"
                                aria-hidden="true"
                                class="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center gap-0.5"
                            >
                                <span
                                    v-for="(marker, markerIndex) in visibleMarkers(day)"
                                    :key="markerIndex"
                                    :class="['h-1 w-1 rounded-full', markerClass(marker, day)]"
                                />
                            </span>
                        </button>

                        <Transition
                            enter-active-class="transition duration-150 ease-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition duration-100 ease-in"
                            leave-to-class="opacity-0"
                        >
                            <div
                                v-if="popoverDate === day.iso"
                                :ref="setPopoverElement"
                                :class="['absolute z-50', popoverPlacementClass]"
                            >
                                <div
                                    role="dialog"
                                    :aria-label="day.label"
                                    class="min-w-[14rem] max-w-[20rem] rounded-lg border border-border-default bg-background-surface p-3 text-left text-sm font-normal text-text-default shadow-lg"
                                >
                                    <slot
                                        name="day-popover"
                                        :date="day.iso"
                                        :markers="day.markers"
                                        :close="closePopover"
                                    />
                                </div>
                            </div>
                        </Transition>
                    </div>
                    <span v-else role="gridcell" aria-hidden="true" />
                </template>
            </div>
        </div>

        <!-- Months -->
        <div v-else-if="view === CalendarView.MONTHS" class="grid grid-cols-3 gap-1" @mouseleave="clearHover">
            <button
                v-for="month in months"
                :key="month.index"
                type="button"
                :disabled="disabled || month.isDisabled"
                :aria-current="month.isCurrent ? 'true' : undefined"
                :aria-pressed="isMonth ? month.isSelected : undefined"
                :class="
                    cellButtonClass(month.isSelected || month.isCurrent, disabled || month.isDisabled, month.isInRange)
                "
                @click="selectMonth(month)"
                @mouseenter="handleMonthHover(month)"
            >
                {{ month.label }}
            </button>
        </div>

        <!-- Years -->
        <div v-else class="grid grid-cols-3 gap-1">
            <button
                v-for="year in years"
                :key="year.value"
                type="button"
                :disabled="disabled || year.isDisabled"
                :aria-current="year.isCurrent ? 'true' : undefined"
                :class="cellButtonClass(year.isCurrent, disabled || year.isDisabled)"
                @click="selectYear(year.value)"
            >
                {{ year.value }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: [String, Object, Array] as PropType<string | string[] | CalendarRange | null>,
        default: null,
    },
    mode: {
        type: String as PropType<CalendarMode>,
        default: CalendarMode.SINGLE,
        validator: (value: CalendarMode) => Object.values(CalendarMode).includes(value),
    },
    unit: {
        type: String as PropType<CalendarUnit>,
        default: CalendarUnit.DAY,
        validator: (value: CalendarUnit) => Object.values(CalendarUnit).includes(value),
    },
    min: String as PropType<string>,
    max: String as PropType<string>,
    isDateDisabled: {
        type: Function as PropType<(date: string) => boolean>,
        default: () => false,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    firstDayOfWeek: {
        type: Number as PropType<number>,
        default: 0,
        validator: (value: number) => Number.isInteger(value) && value >= 0 && value <= 6,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
        validator: (value: ColorAccent) => [ColorAccent.PRIMARY_BRAND, ColorAccent.SECONDARY_BRAND].includes(value),
    },
    hasYearControls: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasOutsideDays: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasWeekNumbers: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isNavigationLocked: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isBoxed: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    markers: {
        type: Object as PropType<Record<string, CalendarMarker[]>>,
        default: () => ({}),
    },
    maxMarkers: {
        type: Number as PropType<number>,
        default: 3,
    },
    dayPopoverTrigger: {
        type: String as PropType<Trigger>,
        default: Trigger.MANUAL,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    hasDayPopover: Function as PropType<(date: string) => boolean>,
    dayPopoverPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    dayPopoverAlign: {
        type: String as PropType<Align>,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    dayPopoverAutoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    ariaLabel: String as PropType<string>,
    previousMonthAriaLabel: String as PropType<string>,
    nextMonthAriaLabel: String as PropType<string>,
    previousYearAriaLabel: String as PropType<string>,
    nextYearAriaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'day-click', 'day-hover', 'day-hover-end', 'month-change'])

// States
const slots = useSlots()
const root = ref<HTMLElement | null>(null)

// Logic, grouped under composables/calendar
const selection = useCalendarSelection(props, emit)
const calendarView = useCalendarView(props, emit, root, selection)
const styles = useCalendarStyles(props)
const popover = useCalendarDayPopover(props, emit, slots, root, calendarView, selection)
const { handleDayKeydown } = useCalendarKeyboard(props, calendarView)

// What the template reads
const { isMonth, clearHover } = selection

const {
    view,
    viewYear,
    focusedISO,
    monthLabel,
    yearsRangeLabel,
    weekAbbreviation,
    previousLabel,
    nextLabel,
    previousYearLabel,
    nextYearLabel,
    weekdays,
    weeks,
    months,
    years,
    canGoPrevious,
    canGoNext,
    canGoPreviousYear,
    canGoNextYear,
    openMonths,
    openYears,
    goPrevious,
    goNext,
    goYear,
    selectMonth,
    selectYear,
    focus,
} = calendarView

const {
    isNavigationDisabled,
    gridColumnsClass,
    headerButtonClass,
    dayClass,
    cellButtonClass,
    visibleMarkers,
    markerClass,
    dayLabel,
} = styles

const {
    popoverDate,
    popoverPlacementClass,
    canOpenPopover,
    setPopoverElement,
    closePopover,
    handleCellEnter,
    handleCellLeave,
    handleCellFocus,
    handleCellBlur,
    handleGridLeave,
    handleDayClick,
    handleEscape,
    handleMonthHover,
} = popover

defineExpose({ focus })
</script>
