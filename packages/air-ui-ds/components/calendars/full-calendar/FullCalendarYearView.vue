<template>
    <div
        data-test="full-calendar-year"
        class="grid grid-cols-1 gap-x-6 gap-y-8 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
        <div v-for="month in months" :key="month.index">
            <button
                type="button"
                :disabled
                :class="[
                    'rounded px-1 text-sm font-semibold capitalize',
                    'focus-visible:outline-none focus-visible:ring-2',
                    accent.ring,
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-background-neutral-hover',
                ]"
                @click="emit('month-click', month.index)"
            >
                {{ month.label }}
            </button>

            <div class="mt-2 grid grid-cols-7 text-center">
                <span
                    v-for="weekday in weekdays"
                    :key="weekday.long"
                    :abbr="weekday.long"
                    class="py-1 text-xs font-semibold uppercase text-text-neutral-subtler"
                >
                    {{ weekday.narrow }}
                </span>

                <button
                    v-for="day in month.days"
                    :key="day.iso"
                    type="button"
                    :disabled
                    :aria-label="day.label"
                    :aria-current="day.isToday ? 'date' : undefined"
                    :aria-pressed="day.isSelected"
                    :class="[
                        'flex h-7 items-center justify-center rounded-full text-xs',
                        'focus-visible:outline-none focus-visible:ring-2',
                        accent.ring,
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        day.isToday && [accent.filled, 'font-semibold'],
                        !day.isToday && day.isSelected && [accent.soft, 'font-semibold'],
                        !day.isToday && !day.isSelected && !disabled && 'hover:bg-background-neutral-hover',
                        !day.isToday && !day.isSelected && !day.isInMonth && 'text-text-neutral-subtler',
                    ]"
                    @click="emit('day-click', day.iso)"
                >
                    {{ day.number }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    year: {
        type: Number as PropType<number>,
        default: () => new Date().getFullYear(),
    },
    selectedDate: {
        type: String as PropType<string | null>,
        default: null,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    firstDayOfWeek: {
        type: Number as PropType<number>,
        default: 0,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['day-click', 'month-click'])

// States
const accent = computed(() => getCalendarAccent(props.color))
const todayISO = toISODate(new Date())

const monthFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { month: 'long' }))
const labelFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }))

const weekdays = computed(() => {
    const narrowFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'narrow' })
    const longFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'long' })

    return Array.from({ length: 7 }, (_, index) => {
        // 2023-01-01 is a Sunday
        const date = new Date(2023, 0, 1 + ((props.firstDayOfWeek + index) % 7))

        return { narrow: narrowFormatter.format(date), long: longFormatter.format(date) }
    })
})

// Each month is a grid of 6 weeks, with the days of the months around it
const months = computed(() =>
    Array.from({ length: 12 }, (_, index) => {
        const first = new Date(props.year, index, 1)
        const offset = (first.getDay() - props.firstDayOfWeek + 7) % 7

        return {
            index,
            label: monthFormatter.value.format(first),
            days: Array.from({ length: 42 }, (_, dayIndex) => {
                const date = new Date(props.year, index, 1 - offset + dayIndex)
                const iso = toISODate(date)

                return {
                    iso,
                    number: date.getDate(),
                    label: labelFormatter.value.format(date),
                    isInMonth: date.getMonth() === index,
                    isToday: iso === todayISO,
                    isSelected: iso === props.selectedDate,
                }
            }),
        }
    }),
)
</script>
