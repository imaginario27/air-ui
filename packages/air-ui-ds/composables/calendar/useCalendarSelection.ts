// What is selected: the value as keys (a date, an ISO week or a month), the range preview and picking
export const useCalendarSelection = (props: CalendarProps, emit: CalendarEmit) => {
    // Mode (how many) and unit (what each selection covers) are independent
    const isRange = computed(() => props.mode === CalendarMode.RANGE)
    const isMultiple = computed(() => props.mode === CalendarMode.MULTIPLE)
    const isWeek = computed(() => props.unit === CalendarUnit.WEEK)
    const isMonth = computed(() => props.unit === CalendarUnit.MONTH)

    // Weeks are always Monday to Sunday (ISO 8601) when weeks are selected
    const firstDay = computed(() => (isWeek.value ? 1 : props.firstDayOfWeek))

    // The bounds can be a date, a month (YYYY-MM) or a week (YYYY-Www): they are normalized to dates
    const minISO = computed(() => toBoundISO(props.min, 'start'))
    const maxISO = computed(() => toBoundISO(props.max, 'end'))

    // A key is what a selection is made of: a date (DAY), an ISO week (WEEK) or a month (MONTH)
    const toValidKey = (key: unknown) => (typeof key === 'string' && getUnitBounds(key, props.unit) ? key : null)

    const singleValue = computed(() => toValidKey(props.modelValue))

    const multipleValue = computed(() =>
        Array.isArray(props.modelValue)
            ? props.modelValue.map(toValidKey).filter((key): key is string => key !== null)
            : [],
    )

    const rangeValue = computed<CalendarRange>(() => {
        const value = props.modelValue
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return { start: toValidKey(value.start), end: toValidKey(value.end) }
        }

        return { start: null, end: null }
    })

    const anchorKey = computed(() => {
        if (isRange.value) return rangeValue.value.start
        if (isMultiple.value) return multipleValue.value[0] ?? null

        return singleValue.value
    })

    // The first day of the selection decides which month is shown
    const anchorISO = computed(() => getUnitBounds(anchorKey.value, props.unit)?.from ?? null)

    // Range: while only the start is picked, the hovered cell previews the end
    const hoverKey = ref<string | null>(null)
    const clearHover = () => {
        hoverKey.value = null
    }

    const rangeSelection = computed(() => {
        const { start, end } = rangeValue.value
        if (!isRange.value || !start) return null

        const other = end ?? hoverKey.value ?? start
        const [startKey, endKey] = start <= other ? [start, other] : [other, start]

        return {
            startKey,
            endKey,
            from: getUnitBounds(startKey, props.unit)!.from,
            to: getUnitBounds(endKey, props.unit)!.to,
        }
    })

    const selectedKeys = computed(() => new Set(isMultiple.value ? multipleValue.value : [singleValue.value]))

    // The ends of a range (or each picked key) are selected, and the keys between the ends are in range
    const isKeySelected = (key: string) => {
        const range = rangeSelection.value

        return range ? key === range.startKey || key === range.endKey : selectedKeys.value.has(key)
    }

    const isKeyInRange = (key: string) => {
        const range = rangeSelection.value

        return Boolean(range && key > range.startKey && key < range.endKey)
    }

    // The days each selection covers: a day, a week or the span of a range
    const bands = computed<CalendarBand[]>(() => {
        if (isRange.value) return rangeSelection.value ? [rangeSelection.value] : []

        return [...selectedKeys.value].map((key) => getUnitBounds(key, props.unit)).filter((band) => band !== null)
    })

    const isDisabled = (iso: string) =>
        Boolean(
            (minISO.value && iso < minISO.value) || (maxISO.value && iso > maxISO.value) || props.isDateDisabled(iso),
        )

    // Picking
    const toggleMultiple = (key: string) => {
        const selected = multipleValue.value
        const next = selected.includes(key) ? selected.filter((value) => value !== key) : [...selected, key]

        emit('update:modelValue', next.sort())
    }

    const pickRangeKey = (key: string) => {
        const { start, end } = rangeValue.value

        // First click, a new range after a complete one, or a click before the start: (re)start the range
        if (!start || end || key < start) {
            emit('update:modelValue', { start: key, end: null })
        } else {
            emit('update:modelValue', { start, end: key })
        }
    }

    // The mode decides what is emitted for the key of the day, week or month that was picked
    const selectKey = (key: string) => {
        if (isMultiple.value) toggleMultiple(key)
        else if (isRange.value) pickRangeKey(key)
        else emit('update:modelValue', key)
    }

    return {
        isRange,
        isMultiple,
        isWeek,
        isMonth,
        firstDay,
        minISO,
        maxISO,
        anchorISO,
        hoverKey,
        clearHover,
        isKeySelected,
        isKeyInRange,
        bands,
        isDisabled,
        selectKey,
    }
}
