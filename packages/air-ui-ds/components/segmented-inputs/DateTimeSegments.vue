<template>
    <fieldset
        ref="group"
        :aria-label="ariaLabel"
        :class="['flex items-center', 'w-full min-w-0']"
        @focusin="emit('focus')"
        @focusout="handleFocusOut"
        @click.self="focus"
    >
        <template v-for="(item, index) in items" :key="index">
            <span
                v-if="item.kind === DateSegmentKind.LITERAL"
                aria-hidden="true"
                :class="['whitespace-pre', 'text-text-neutral-subtler']"
            >
                {{ item.text }}
            </span>

            <input
                v-else
                :id="item.order === 0 ? id : undefined"
                :ref="(element) => (segmentRefs[item.order] = element as HTMLInputElement | null)"
                type="text"
                role="spinbutton"
                inputmode="numeric"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                :aria-label="getSegmentLabel(item.kind)"
                :aria-valuemin="item.kind !== DateSegmentKind.DAY_PERIOD ? getRange(item.kind).min : undefined"
                :aria-valuemax="item.kind !== DateSegmentKind.DAY_PERIOD ? getRange(item.kind).max : undefined"
                :aria-valuenow="
                    item.kind !== DateSegmentKind.DAY_PERIOD && parts[item.kind] ? Number(parts[item.kind]) : undefined
                "
                :aria-valuetext="getSegmentText(item.kind) || undefined"
                :aria-invalid="isInvalid || undefined"
                :placeholder="getSegmentPlaceholder(item.kind)"
                :value="getSegmentText(item.kind)"
                :disabled
                :readonly
                :class="[
                    'box-content',
                    'px-0.5',
                    'rounded-sm',
                    'text-center',
                    'tabular-nums',
                    'bg-transparent',
                    'outline-none',
                    'caret-transparent',
                    'placeholder:text-text-neutral-subtler',
                    'focus:bg-background-primary-brand-active',
                    'focus:text-text-neutral-on-filled',
                    'focus:placeholder:text-text-neutral-on-filled',
                    isInvalid && 'text-text-error',
                    cursorClass,
                ]"
                :style="{ width: `${getSegmentWidth(item.kind)}ch` }"
                @focus="handleSegmentFocus"
                @blur="handleSegmentBlur(item.kind)"
                @beforeinput="handleBeforeInput($event, item.order, item.kind)"
                @keydown="handleKeydown($event, item.order, item.kind)"
                @paste.prevent="handlePaste"
            />
        </template>
    </fieldset>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: String as PropType<string>,
    type: {
        type: String as PropType<DateSegmentsType>,
        default: DateSegmentsType.DATE,
        validator: (value: DateSegmentsType) => Object.values(DateSegmentsType).includes(value),
    },
    modelValue: {
        type: String as PropType<string | null>,
        default: '',
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
    isAllowed: {
        type: Function as PropType<(value: string) => boolean>,
        default: () => true,
    },
    ariaLabel: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'open'])

// Composables
const dsConfig = useDSConfig()

// Refs
const group = ref<HTMLElement | null>(null)
const segmentRefs = ref<(HTMLInputElement | null)[]>([])

// States
const parts = ref<DateSegmentParts>({})
const typingKind = ref<DateSegmentKind | null>(null)
const lastEmitted = ref('')

// Computed
const layout = computed(() =>
    getDateSegmentLayout(props.type, props.locale, {
        hourFormat: props.hourFormat,
        hasSeconds: props.hasSeconds,
        weekText: dsConfig.calendar.weekText(),
    }),
)

const items = computed(() => {
    let order = 0

    return layout.value.map((item) => ({ ...item, order: item.kind === DateSegmentKind.LITERAL ? -1 : order++ }))
})

const is12h = computed(() => layout.value.some((item) => item.kind === DateSegmentKind.DAY_PERIOD))
const dayPeriodLabels = computed(() => getDayPeriodLabels(props.locale))
const valueOptions = computed(() => ({ is12h: is12h.value, hasSeconds: props.hasSeconds }))

const isFilled = computed(() =>
    items.value.every((item) => item.kind === DateSegmentKind.LITERAL || Boolean(parts.value[item.kind])),
)
const isInvalid = computed(() => isFilled.value && lastEmitted.value === '')

const cursorClass = computed(() => {
    if (props.disabled) return 'cursor-not-allowed'

    return props.readonly ? 'cursor-default' : 'cursor-text'
})

const getSegmentLabel = (kind: DateSegmentKind): string => {
    const labels: Partial<Record<DateSegmentKind, string>> = {
        [DateSegmentKind.DAY]: dsConfig.calendar.dayText(),
        [DateSegmentKind.MONTH]: dsConfig.calendar.monthText(),
        [DateSegmentKind.YEAR]: dsConfig.calendar.yearText(),
        [DateSegmentKind.WEEK]: dsConfig.calendar.weekText(),
        [DateSegmentKind.HOUR]: dsConfig.timePicker.hoursText(),
        [DateSegmentKind.MINUTE]: dsConfig.timePicker.minutesText(),
        [DateSegmentKind.SECOND]: dsConfig.timePicker.secondsText(),
        [DateSegmentKind.DAY_PERIOD]: dsConfig.timePicker.periodText(),
    }

    return labels[kind] ?? ''
}

const getSegmentPlaceholder = (kind: DateSegmentKind): string => {
    const placeholders: Partial<Record<DateSegmentKind, string>> = {
        [DateSegmentKind.DAY]: dsConfig.calendar.daySegmentText(),
        [DateSegmentKind.MONTH]: dsConfig.calendar.monthSegmentText(),
        [DateSegmentKind.YEAR]: dsConfig.calendar.yearSegmentText(),
        [DateSegmentKind.WEEK]: dsConfig.calendar.weekSegmentText(),
        [DateSegmentKind.HOUR]: dsConfig.timePicker.hoursSegmentText(),
        [DateSegmentKind.MINUTE]: dsConfig.timePicker.minutesSegmentText(),
        [DateSegmentKind.SECOND]: dsConfig.timePicker.secondsSegmentText(),
        [DateSegmentKind.DAY_PERIOD]: dsConfig.timePicker.periodSegmentText(),
    }

    return placeholders[kind] ?? ''
}

const getSegmentText = (kind: DateSegmentKind): string => {
    if (kind !== DateSegmentKind.DAY_PERIOD) return parts.value[kind] ?? ''

    const labels = dayPeriodLabels.value

    return { am: labels.am, pm: labels.pm }[parts.value.dayPeriod as 'am' | 'pm'] ?? ''
}

const getSegmentWidth = (kind: DateSegmentKind): number => {
    const lengths = [getSegmentPlaceholder(kind).length, getSegmentLength(kind)]
    if (kind === DateSegmentKind.DAY_PERIOD)
        lengths.push(dayPeriodLabels.value.am.length, dayPeriodLabels.value.pm.length)

    return Math.max(...lengths)
}

const toNumber = (value?: string) => (value ? Number(value) : null)

const getRange = (kind: DateSegmentKind) =>
    getSegmentRange(kind, {
        is12h: is12h.value,
        month: toNumber(parts.value.month),
        year: parts.value.year?.length === 4 ? toNumber(parts.value.year) : null,
    })

// Methods
const focusSegment = (order: number) => segmentRefs.value[order]?.focus()

const focus = () => focusSegment(0)

const commit = () => {
    const built = buildSegmentValue(props.type, parts.value, valueOptions.value)
    const next = built && props.isAllowed(built) ? built : ''
    if (next === lastEmitted.value) return

    lastEmitted.value = next
    emit('update:modelValue', next)
}

const fillSegments = (value: string) => {
    parts.value = (value && parseSegmentValue(props.type, value, valueOptions.value)) || {}
}

const finishSegment = (kind: DateSegmentKind) => {
    const value = parts.value[kind]
    if (value) parts.value[kind] = padSegmentValue(kind, value)

    typingKind.value = null
}

const clearSegment = (kind: DateSegmentKind) => {
    parts.value[kind] = ''
    typingKind.value = null
    commit()
}

const typeDigit = (order: number, kind: DateSegmentKind, digit: string) => {
    const range = getRange(kind)
    const length = getSegmentLength(kind)
    let buffer = (typingKind.value === kind ? (parts.value[kind] ?? '') : '') + digit

    if (Number(buffer) > range.max || (buffer.length >= length && Number(buffer) < range.min)) buffer = digit

    parts.value[kind] = buffer
    typingKind.value = kind

    const isDone = buffer.length >= length || Number(buffer) * 10 > range.max
    if (!isDone) return

    finishSegment(kind)
    commit()
    focusSegment(order + 1)
}

const typeDayPeriod = (order: number, char: string) => {
    const typed = char.toLowerCase()
    const isAm = dayPeriodLabels.value.am.toLowerCase().startsWith(typed)
    const isPm = dayPeriodLabels.value.pm.toLowerCase().startsWith(typed)
    if (isAm === isPm) return

    parts.value.dayPeriod = isAm ? 'am' : 'pm'
    commit()
    focusSegment(order + 1)
}

const typeChar = (order: number, kind: DateSegmentKind, char: string) => {
    if (kind === DateSegmentKind.DAY_PERIOD) {
        typeDayPeriod(order, char)
    } else if (/\d/.test(char)) {
        typeDigit(order, kind, char)
    } else if (!/\p{L}/u.test(char) && parts.value[kind]) {
        finishSegment(kind)
        commit()
        focusSegment(order + 1)
    }
}

const stepSegment = (kind: DateSegmentKind, direction: 1 | -1) => {
    typingKind.value = null

    if (kind === DateSegmentKind.DAY_PERIOD) {
        parts.value.dayPeriod = parts.value.dayPeriod === 'am' ? 'pm' : 'am'
        commit()
        return
    }

    const range = getRange(kind)
    const current = toNumber(parts.value[kind])
    let next: number

    if (current !== null) {
        next = current + direction
    } else if (kind === DateSegmentKind.YEAR) {
        next = new Date().getFullYear()
    } else {
        next = direction > 0 ? range.min : range.max
    }

    if (next > range.max) next = range.min
    if (next < range.min) next = range.max

    parts.value[kind] = padSegmentValue(kind, next)
    commit()
}

// Handlers
const handleSegmentFocus = (event: FocusEvent) => {
    typingKind.value = null
    ;(event.target as HTMLInputElement).select()
}

const handleSegmentBlur = (kind: DateSegmentKind) => {
    if (typingKind.value !== kind) return

    finishSegment(kind)
    commit()
}

const handleFocusOut = (event: FocusEvent) => {
    if (!group.value?.contains(event.relatedTarget as Node | null)) emit('blur')
}

const handleBeforeInput = (event: InputEvent, order: number, kind: DateSegmentKind) => {
    event.preventDefault()
    if (props.disabled || props.readonly) return

    if (event.inputType.startsWith('delete')) {
        clearSegment(kind)
        return
    }

    for (const char of event.data ?? '') typeChar(order, kind, char)
}

const handleKeydown = (event: KeyboardEvent, order: number, kind: DateSegmentKind) => {
    if (props.disabled || event.ctrlKey || event.metaKey) return

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        focusSegment(order + (event.key === 'ArrowRight' ? 1 : -1))
        return
    }

    if (props.readonly) return

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()

        if (event.key === 'ArrowDown' && event.altKey) emit('open')
        else stepSegment(kind, event.key === 'ArrowUp' ? 1 : -1)
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault()
        clearSegment(kind)
    }
}

const handlePaste = (event: ClipboardEvent) => {
    if (props.disabled || props.readonly) return

    const pasted = parseSegmentValue(
        props.type,
        (event.clipboardData?.getData('text') ?? '').trim(),
        valueOptions.value,
    )
    if (!pasted) return

    parts.value = pasted
    commit()
}

// Watchers
watch(
    () => props.modelValue ?? '',
    (value) => {
        if (value === lastEmitted.value) return

        lastEmitted.value = value
        fillSegments(value)
    },
    { immediate: true },
)

watch([() => props.type, valueOptions], () => fillSegments(lastEmitted.value))

defineExpose({ focus })
</script>
