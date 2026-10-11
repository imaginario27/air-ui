<template>
    <div
        ref="root"
        role="group"
        :aria-label="ariaLabel"
        :class="[
            'inline-flex gap-1',
            'max-w-full',
            'text-text-default',
            disabled && 'opacity-disabled',
            isBoxed && 'p-2 rounded-lg border border-border-default bg-background-container-surface',
        ]"
        @keydown="handleKeydown"
    >
        <div
            v-for="column in columns"
            :key="column.key"
            role="listbox"
            data-time-column
            :aria-label="column.label"
            :aria-readonly="readonly || undefined"
            class="relative flex h-[12rem] w-14 flex-col gap-1 overflow-y-auto pr-1"
        >
            <button
                v-for="option in column.options"
                :key="option.value"
                type="button"
                role="option"
                :disabled="disabled || option.isDisabled"
                :tabindex="option.tabbable ? 0 : -1"
                :aria-selected="option.isSelected"
                :class="optionClass(option)"
                @click="select(column.key, option.value)"
            >
                {{ option.label }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
type TimeColumnKey = 'hours' | 'minutes' | 'seconds' | 'period'

interface TimeOption {
    value: number | string
    label: string
    isSelected: boolean
    isDisabled: boolean
    tabbable: boolean
}

// Props
const props = defineProps({
    modelValue: {
        type: String as PropType<string | null>,
        default: null,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    hourFormat: {
        type: String as PropType<HourFormat>,
        validator: (value: HourFormat) => Object.values(HourFormat).includes(value),
    },
    hasSeconds: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    minuteStep: {
        type: Number as PropType<number>,
        default: 1,
        validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 30,
    },
    secondStep: {
        type: Number as PropType<number>,
        default: 1,
        validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 30,
    },
    min: String as PropType<string>,
    max: String as PropType<string>,
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
        validator: (value: ColorAccent) => [ColorAccent.PRIMARY_BRAND, ColorAccent.SECONDARY_BRAND].includes(value),
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isBoxed: {
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
    hoursAriaLabel: String as PropType<string>,
    minutesAriaLabel: String as PropType<string>,
    secondsAriaLabel: String as PropType<string>,
    periodAriaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Composables
const dsConfig = useDSConfig()

// Refs
const root = ref<HTMLElement | null>(null)

// Computed
const parts = computed(() => parseTime(props.modelValue))
const is12Hour = computed(() =>
    props.hourFormat ? props.hourFormat === HourFormat.HOURS_12 : uses12HourClock(props.locale),
)
const accent = computed(() => getCalendarAccent(props.color))
const isPm = computed(() => (parts.value?.hours ?? 0) >= 12)

// Bounds as HH:mm:ss, so any time can be compared as a string
const toFull = (value?: string) => {
    const time = parseTime(value)

    return time ? toTimeString(time, true) : undefined
}
const minFull = computed(() => toFull(props.min))
const maxFull = computed(() => toFull(props.max))

// A range of times is disabled when it ends before min or starts after max
const isRangeDisabled = (from: TimeParts, to: TimeParts) =>
    Boolean(
        (minFull.value && toTimeString(to, true) < minFull.value) ||
        (maxFull.value && toTimeString(from, true) > maxFull.value),
    )

const periodLabels = computed(() => {
    const formatter = new Intl.DateTimeFormat(props.locale, { hour: 'numeric', hour12: true })
    const label = (hour: number) =>
        formatter.formatToParts(new Date(2000, 0, 1, hour)).find((part) => part.type === 'dayPeriod')?.value ?? ''

    return { am: label(1), pm: label(13) }
})

const numberOptions = (values: number[], selected: number | undefined, isDisabled: (value: number) => boolean) => {
    const options = values.map((value) => ({
        value,
        label: String(value).padStart(2, '0'),
        isSelected: value === selected,
        isDisabled: isDisabled(value),
        tabbable: false,
    }))

    return withTabStop(options)
}

// Only one option per column is a tab stop: the selected one, or the first enabled one
const withTabStop = (options: TimeOption[]) => {
    const stop = options.find((option) => option.isSelected) ?? options.find((option) => !option.isDisabled)
    if (stop) stop.tabbable = true

    return options
}

const hourOptions = computed(() => {
    const current = parts.value
    const values = is12Hour.value ? Array.from({ length: 12 }, (_, index) => (index === 0 ? 12 : index)) : range(24)

    const options = values.map((value) => {
        const hours = to24Hour(value)

        return {
            value,
            label: is12Hour.value ? String(value) : String(value).padStart(2, '0'),
            isSelected:
                current !== null && (is12Hour.value ? to12Hour(current.hours) === value : current.hours === value),
            isDisabled: isRangeDisabled({ hours, minutes: 0, seconds: 0 }, { hours, minutes: 59, seconds: 59 }),
            tabbable: false,
        }
    })

    return withTabStop(options)
})

const minuteOptions = computed(() => {
    const hours = parts.value?.hours ?? 0

    return numberOptions(range(60, props.minuteStep), parts.value?.minutes, (minutes) =>
        isRangeDisabled({ hours, minutes, seconds: 0 }, { hours, minutes, seconds: 59 }),
    )
})

const secondOptions = computed(() => {
    const hours = parts.value?.hours ?? 0
    const minutes = parts.value?.minutes ?? 0

    return numberOptions(range(60, props.secondStep), parts.value?.seconds, (seconds) =>
        isRangeDisabled({ hours, minutes, seconds }, { hours, minutes, seconds }),
    )
})

const periodOptions = computed(() => {
    const current = parts.value

    return withTabStop(
        (['am', 'pm'] as const).map((period) => {
            const offset = period === 'pm' ? 12 : 0

            return {
                value: period,
                label: periodLabels.value[period],
                isSelected: current !== null && current.hours >= 12 === (period === 'pm'),
                isDisabled: isRangeDisabled(
                    { hours: offset, minutes: 0, seconds: 0 },
                    { hours: offset + 11, minutes: 59, seconds: 59 },
                ),
                tabbable: false,
            }
        }),
    )
})

const columns = computed(() => {
    const result: { key: TimeColumnKey; label: string; options: TimeOption[] }[] = [
        { key: 'hours', label: props.hoursAriaLabel ?? dsConfig.timePicker.hoursText(), options: hourOptions.value },
        {
            key: 'minutes',
            label: props.minutesAriaLabel ?? dsConfig.timePicker.minutesText(),
            options: minuteOptions.value,
        },
    ]

    if (props.hasSeconds) {
        result.push({
            key: 'seconds',
            label: props.secondsAriaLabel ?? dsConfig.timePicker.secondsText(),
            options: secondOptions.value,
        })
    }

    if (is12Hour.value) {
        result.push({
            key: 'period',
            label: props.periodAriaLabel ?? dsConfig.timePicker.periodText(),
            options: periodOptions.value,
        })
    }

    return result
})

// Helpers
const range = (length: number, step = 1) => Array.from({ length: Math.ceil(length / step) }, (_, index) => index * step)

const to12Hour = (hours: number) => (hours % 12 === 0 ? 12 : hours % 12)

// A 12-hour option keeps the AM/PM period that is currently selected
const to24Hour = (value: number) => (value % 12) + (isPm.value ? 12 : 0)

const optionClass = (option: TimeOption) => {
    const isInteractive = !props.disabled && !props.readonly && !option.isDisabled

    return [
        'flex items-center justify-center',
        'h-9 w-full shrink-0',
        'text-sm',
        'transition-colors',
        props.isRounded ? 'rounded-full' : 'rounded',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
        accent.value.ring,
        option.isSelected && !option.isDisabled && accent.value.filled,
        option.isSelected && isInteractive && accent.value.filledHover,
        !option.isSelected && isInteractive && 'hover:bg-background-neutral-hover',
        option.isDisabled || props.disabled
            ? 'cursor-not-allowed'
            : props.readonly
              ? 'cursor-default'
              : 'cursor-pointer',
        option.isDisabled && 'text-text-neutral-disabled',
    ]
}

const emitParts = (next: Partial<TimeParts>) => {
    const base = parts.value ?? { hours: 0, minutes: 0, seconds: 0 }

    emit('update:modelValue', toTimeString({ ...base, ...next }, props.hasSeconds))
}

const select = (key: TimeColumnKey, value: number | string) => {
    if (props.disabled || props.readonly) return

    if (key === 'hours') emitParts({ hours: is12Hour.value ? to24Hour(value as number) : (value as number) })
    else if (key === 'minutes') emitParts({ minutes: value as number })
    else if (key === 'seconds') emitParts({ seconds: value as number })
    else emitParts({ hours: (to12Hour(parts.value?.hours ?? 0) % 12) + (value === 'pm' ? 12 : 0) })
}

const enabledOptions = (column: Element) =>
    Array.from(column.querySelectorAll<HTMLElement>('[role="option"]:not(:disabled)'))

const focusColumn = (column: Element | null) => {
    if (!column) return

    const options = enabledOptions(column)
    const target = options.find((option) => option.getAttribute('aria-selected') === 'true') ?? options[0]

    target?.focus()
}

// Scrolls each column so that its selected option is centered
const scrollToSelected = () => {
    root.value?.querySelectorAll<HTMLElement>('[data-time-column]').forEach((column) => {
        const selected = column.querySelector<HTMLElement>('[aria-selected="true"]')
        if (!selected) return

        column.scrollTop = selected.offsetTop - column.clientHeight / 2 + selected.offsetHeight / 2
    })
}

const focus = () => {
    if (props.disabled) return

    nextTick(() => focusColumn(root.value?.querySelector('[data-time-column]') ?? null))
}

// Handlers
const handleKeydown = (event: KeyboardEvent) => {
    const column = (event.target as HTMLElement).closest('[data-time-column]')
    if (!column) return

    const options = enabledOptions(column)
    const index = options.indexOf(event.target as HTMLElement)

    const targets: Record<string, () => void> = {
        ArrowUp: () => options[index - 1]?.focus(),
        ArrowDown: () => options[index + 1]?.focus(),
        Home: () => options[0]?.focus(),
        End: () => options[options.length - 1]?.focus(),
        ArrowLeft: () => focusColumn(column.previousElementSibling),
        ArrowRight: () => focusColumn(column.nextElementSibling),
    }

    const move = targets[event.key]
    if (!move) return

    event.preventDefault()
    move()
}

// Keep the selection in view when the value changes from outside
watch(
    () => props.modelValue,
    () => nextTick(scrollToSelected),
)
onMounted(scrollToSelected)

defineExpose({ focus })
</script>
