const YEARS_PER_PAGE = 12

// What is shown: the visible month, year and view, the grid of days, months and years, and the navigation
export const useCalendarView = (
    props: CalendarProps,
    emit: CalendarEmit,
    root: Ref<HTMLElement | null>,
    selection: ReturnType<typeof useCalendarSelection>,
) => {
    const dsConfig = useDSConfig()
    const { isMonth, isRange, isMultiple, firstDay, minISO, maxISO, anchorISO, bands, selectKey } = selection

    const clampISO = (iso: string) => {
        if (minISO.value && iso < minISO.value) return minISO.value
        if (maxISO.value && iso > maxISO.value) return maxISO.value

        return iso
    }

    const initialDate = parseISODate(
        clampISO(parseISODate(anchorISO.value) ? anchorISO.value! : toISODate(new Date())),
    )!

    // States
    const view = ref<CalendarView>(isMonth.value ? CalendarView.MONTHS : CalendarView.DAYS)
    const viewDate = ref(getMonthStart(initialDate))
    const focusedISO = ref(toISODate(initialDate))
    const yearsStart = ref(0)

    const todayISO = toISODate(new Date())
    const viewYear = computed(() => viewDate.value.getFullYear())
    const viewMonth = computed(() => viewDate.value.getMonth())

    // Texts
    const monthFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { month: 'long' }))
    const shortMonthFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { month: 'short' }))
    const labelFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }))

    const monthLabel = computed(() => monthFormatter.value.format(viewDate.value))
    const yearsRangeLabel = computed(() => `${yearsStart.value} – ${yearsStart.value + YEARS_PER_PAGE - 1}`)
    const weekAbbreviation = computed(() => dsConfig.calendar.weekAbbreviationText())

    const previousYearLabel = computed(() => props.previousYearAriaLabel ?? dsConfig.calendar.previousYearText())
    const nextYearLabel = computed(() => props.nextYearAriaLabel ?? dsConfig.calendar.nextYearText())

    const previousLabel = computed(() =>
        view.value === CalendarView.DAYS
            ? (props.previousMonthAriaLabel ?? dsConfig.calendar.previousMonthText())
            : previousYearLabel.value,
    )

    const nextLabel = computed(() =>
        view.value === CalendarView.DAYS
            ? (props.nextMonthAriaLabel ?? dsConfig.calendar.nextMonthText())
            : nextYearLabel.value,
    )

    const weekdays = computed(() => {
        const shortFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' })
        const longFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'long' })

        return Array.from({ length: 7 }, (_, index) => {
            // 2023-01-01 is a Sunday
            const date = new Date(2023, 0, 1 + ((firstDay.value + index) % 7))

            return { short: shortFormatter.format(date), long: longFormatter.format(date) }
        })
    })

    // Cells
    const weeks = computed<CalendarWeek[]>(() => {
        const firstOfMonth = viewDate.value
        const offset = (firstOfMonth.getDay() - firstDay.value + 7) % 7

        const days: CalendarDay[] = Array.from({ length: 42 }, (_, index) => {
            const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 - offset + index)
            const iso = toISODate(date)
            const key = toUnitKey(date, props.unit)
            const band = bands.value.find((item) => iso >= item.from && iso <= item.to)
            const isSelected = selection.isKeySelected(key)

            return {
                iso,
                key,
                number: date.getDate(),
                label: labelFormatter.value.format(date),
                isInMonth: date.getMonth() === firstOfMonth.getMonth(),
                markers: props.markers[iso] ?? [],
                isToday: iso === todayISO,
                isDisabled:
                    selection.isDisabled(iso) ||
                    (props.isNavigationLocked && date.getMonth() !== firstOfMonth.getMonth()),
                isSelected,
                isInRange: isRange.value && Boolean(band) && !isSelected,
                isBandStart: band?.from === iso,
                isBandEnd: band?.to === iso,
                hasSpan: Boolean(band && band.from !== band.to),
            }
        })

        // The ISO week number of a row is the one of its Thursday
        const thursdayIndex = (4 - firstDay.value + 7) % 7

        return Array.from({ length: 6 }, (_, index) => {
            const weekDays = days.slice(index * 7, index * 7 + 7)

            return { number: getISOWeek(parseISODate(weekDays[thursdayIndex]!.iso)!).week, days: weekDays }
        })
    })

    const isOutOfBounds = (first: string, last: string) =>
        Boolean((minISO.value && last < minISO.value) || (maxISO.value && first > maxISO.value))

    const months = computed<CalendarMonthCell[]>(() =>
        Array.from({ length: 12 }, (_, index) => {
            const key = toISOMonth(new Date(viewYear.value, index, 1))
            const isSelected = isMonth.value && selection.isKeySelected(key)

            return {
                index,
                key,
                label: shortMonthFormatter.value.format(new Date(viewYear.value, index, 1)),
                isSelected,
                isInRange: isMonth.value && !isSelected && selection.isKeyInRange(key),
                // Without months as the unit, the highlighted month is the one being shown
                isCurrent: !isMonth.value && index === viewMonth.value,
                isDisabled: isOutOfBounds(
                    toISODate(new Date(viewYear.value, index, 1)),
                    toISODate(new Date(viewYear.value, index + 1, 0)),
                ),
            }
        }),
    )

    const years = computed<CalendarYearCell[]>(() =>
        Array.from({ length: YEARS_PER_PAGE }, (_, index) => {
            const value = yearsStart.value + index

            return {
                value,
                isCurrent: value === viewYear.value,
                isDisabled: isOutOfBounds(toISODate(new Date(value, 0, 1)), toISODate(new Date(value, 11, 31))),
            }
        }),
    )

    // Navigation limits
    const canGoPrevious = computed(() => {
        if (!minISO.value) return true

        if (view.value === CalendarView.DAYS) {
            return toISODate(new Date(viewYear.value, viewMonth.value, 0)) >= minISO.value
        }
        if (view.value === CalendarView.MONTHS) return toISODate(new Date(viewYear.value - 1, 11, 31)) >= minISO.value

        return toISODate(new Date(yearsStart.value - 1, 11, 31)) >= minISO.value
    })

    const canGoNext = computed(() => {
        if (!maxISO.value) return true

        if (view.value === CalendarView.DAYS) {
            return toISODate(new Date(viewYear.value, viewMonth.value + 1, 1)) <= maxISO.value
        }
        if (view.value === CalendarView.MONTHS) return toISODate(new Date(viewYear.value + 1, 0, 1)) <= maxISO.value

        return toISODate(new Date(yearsStart.value + YEARS_PER_PAGE, 0, 1)) <= maxISO.value
    })

    // Same month in the previous / next year
    const canGoPreviousYear = computed(
        () => !minISO.value || toISODate(new Date(viewYear.value - 1, viewMonth.value + 1, 0)) >= minISO.value,
    )

    const canGoNextYear = computed(
        () => !maxISO.value || toISODate(new Date(viewYear.value + 1, viewMonth.value, 1)) <= maxISO.value,
    )

    // Shows the given month and keeps the focused day in it (same day of month, clamped)
    const showMonth = (year: number, month: number) => {
        const current = parseISODate(focusedISO.value) ?? viewDate.value
        const target = addMonths(current, (year - current.getFullYear()) * 12 + (month - current.getMonth()))

        viewDate.value = getMonthStart(target)
        focusedISO.value = toISODate(target)
    }

    const openMonths = () => {
        view.value = CalendarView.MONTHS
    }

    const openYears = () => {
        yearsStart.value = Math.floor(viewYear.value / YEARS_PER_PAGE) * YEARS_PER_PAGE
        view.value = CalendarView.YEARS
    }

    const goPrevious = () => {
        if (view.value === CalendarView.DAYS) showMonth(viewYear.value, viewMonth.value - 1)
        else if (view.value === CalendarView.MONTHS) showMonth(viewYear.value - 1, viewMonth.value)
        else yearsStart.value -= YEARS_PER_PAGE
    }

    const goNext = () => {
        if (view.value === CalendarView.DAYS) showMonth(viewYear.value, viewMonth.value + 1)
        else if (view.value === CalendarView.MONTHS) showMonth(viewYear.value + 1, viewMonth.value)
        else yearsStart.value += YEARS_PER_PAGE
    }

    const goYear = (amount: number) => showMonth(viewYear.value + amount, viewMonth.value)

    // When months are the unit, they are the final step and the days are never shown
    const selectMonth = (month: Pick<CalendarMonthCell, 'index' | 'key'>) => {
        showMonth(viewYear.value, month.index)

        if (!isMonth.value) {
            view.value = CalendarView.DAYS
        } else if (!props.readonly) {
            selectKey(month.key)
        }
    }

    // Picking a year goes straight back to the days of the current month (or the months when they are the unit)
    const selectYear = (year: number) => {
        showMonth(year, viewMonth.value)
        view.value = isMonth.value ? CalendarView.MONTHS : CalendarView.DAYS
    }

    const selectDay = (day: CalendarDay) => {
        if (day.isDisabled || props.disabled || props.readonly) return

        focusedISO.value = day.iso

        if (!day.isInMonth) viewDate.value = getMonthStart(parseISODate(day.iso)!)

        selectKey(day.key)
    }

    // Focus
    const focusDay = () => {
        nextTick(() => root.value?.querySelector<HTMLElement>(`[data-date="${focusedISO.value}"]`)?.focus())
    }

    const focus = () => {
        if (props.disabled) return

        if (view.value === CalendarView.DAYS) {
            focusDay()
            return
        }

        nextTick(() => root.value?.querySelector<HTMLElement>('button:not([disabled])')?.focus())
    }

    // Tell which month is shown
    watch([viewYear, viewMonth], ([year, month]) => {
        emit('month-change', {
            year,
            month: month + 1,
            from: toISODate(new Date(year, month, 1)),
            to: toISODate(new Date(year, month + 1, 0)),
        } satisfies CalendarMonthEvent)
    })

    // Follow external changes of the value
    watch(anchorISO, (iso) => {
        // Toggling dates in multiple mode must not move the view
        if (isMultiple.value) return

        const date = parseISODate(iso)
        if (!date || (date.getFullYear() === viewYear.value && date.getMonth() === viewMonth.value)) return

        viewDate.value = getMonthStart(date)
        focusedISO.value = iso!
    })

    return {
        view,
        viewDate,
        viewYear,
        viewMonth,
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
        selectDay,
        focusDay,
        focus,
    }
}
