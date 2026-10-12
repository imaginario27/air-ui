import {
    addMonths,
    formatISODate,
    getISOWeek,
    parseISODate,
    parseISOMonth,
    parseISOWeek,
    toBoundISO,
    toISODate,
    toISOMonth,
    toISOWeek,
    toUnitKey,
    getUnitBounds,
} from '@/composables/useCalendar'
import { CalendarUnit } from '@/models/enums/calendars'

describe('useCalendar', () => {
    describe('parseISODate', () => {
        it('parses a valid date as a local date', () => {
            const date = parseISODate('2026-10-15')!

            expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 9, 15])
        })

        it.each([['2026-02-30'], ['2026-13-01'], ['15/10/2026'], ['2026-1-5'], [''], [null], [undefined]])(
            'returns null for %j',
            (value) => {
                expect(parseISODate(value)).toBeNull()
            },
        )
    })

    it('toISODate round-trips with parseISODate', () => {
        expect(toISODate(parseISODate('2026-01-05')!)).toBe('2026-01-05')
    })

    describe('formatISODate', () => {
        it('formats with the given locale', () => {
            expect(formatISODate('2026-10-15', 'en-US')).toBe('10/15/2026')
            expect(formatISODate('2026-10-15', 'es-ES')).toBe('15/10/2026')
        })

        it('accepts custom Intl options', () => {
            expect(formatISODate('2026-10-15', 'en-US', { dateStyle: 'medium' })).toBe('Oct 15, 2026')
        })

        it('returns an empty string for invalid values', () => {
            expect(formatISODate('nope', 'en-US')).toBe('')
            expect(formatISODate(null, 'en-US')).toBe('')
        })
    })

    describe('addMonths', () => {
        it('clamps the day to the end of shorter months', () => {
            expect(toISODate(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28')
            expect(toISODate(addMonths(new Date(2028, 0, 31), 1))).toBe('2028-02-29')
        })

        it('crosses year boundaries in both directions', () => {
            expect(toISODate(addMonths(new Date(2026, 11, 10), 1))).toBe('2027-01-10')
            expect(toISODate(addMonths(new Date(2026, 0, 10), -1))).toBe('2025-12-10')
        })
    })

    describe('months', () => {
        it('parses and formats YYYY-MM', () => {
            expect(toISODate(parseISOMonth('2026-10')!)).toBe('2026-10-01')
            expect(toISOMonth(new Date(2026, 9, 15))).toBe('2026-10')
        })

        it.each([['2026-13'], ['2026-00'], ['2026-1'], ['2026-10-01'], [''], [null]])('rejects %j', (value) => {
            expect(parseISOMonth(value)).toBeNull()
        })
    })

    describe('ISO weeks', () => {
        it.each([
            ['2026-10-11', '2026-W41'],
            ['2026-10-12', '2026-W42'],
            ['2026-01-01', '2026-W01'],
            ['2024-12-30', '2025-W01'],
            ['2021-01-03', '2020-W53'],
            ['2020-12-31', '2020-W53'],
        ])('%s is in %s', (iso, expected) => {
            expect(toISOWeek(parseISODate(iso)!)).toBe(expected)
        })

        it('returns the numeric week and year', () => {
            expect(getISOWeek(new Date(2026, 9, 11))).toEqual({ year: 2026, week: 41 })
        })

        it('parses a week into its Monday', () => {
            expect(toISODate(parseISOWeek('2026-W41')!)).toBe('2026-10-05')
            expect(toISODate(parseISOWeek('2025-W01')!)).toBe('2024-12-30')
        })

        it.each([['2026-W00'], ['2025-W53'], ['2026-W54'], ['2026-41'], ['2026-W5'], [''], [null]])(
            'rejects %j',
            (value) => {
                expect(parseISOWeek(value)).toBeNull()
            },
        )

        it('accepts week 53 only in years that have it', () => {
            expect(parseISOWeek('2020-W53')).not.toBeNull()
            expect(parseISOWeek('2026-W53')).not.toBeNull()
            expect(parseISOWeek('2025-W53')).toBeNull()
        })
    })

    describe('toBoundISO', () => {
        it.each([
            ['2026-10-15', 'start', '2026-10-15'],
            ['2026-10-15', 'end', '2026-10-15'],
            ['2026-10', 'start', '2026-10-01'],
            ['2026-10', 'end', '2026-10-31'],
            ['2026-02', 'end', '2026-02-28'],
            ['2026-W41', 'start', '2026-10-05'],
            ['2026-W41', 'end', '2026-10-11'],
        ] as const)('%s as %s is %s', (value, edge, expected) => {
            expect(toBoundISO(value, edge)).toBe(expected)
        })

        it('returns undefined for no value', () => {
            expect(toBoundISO(undefined, 'start')).toBeUndefined()
        })
    })

    describe('units', () => {
        it.each([
            [CalendarUnit.DAY, '2026-10-15'],
            [CalendarUnit.WEEK, '2026-W42'],
            [CalendarUnit.MONTH, '2026-10'],
        ])('the key of a date for %s is %s', (unit, expected) => {
            expect(toUnitKey(new Date(2026, 9, 15), unit)).toBe(expected)
        })

        it.each([
            [CalendarUnit.DAY, '2026-10-15', { from: '2026-10-15', to: '2026-10-15' }],
            [CalendarUnit.WEEK, '2026-W41', { from: '2026-10-05', to: '2026-10-11' }],
            [CalendarUnit.MONTH, '2026-10', { from: '2026-10-01', to: '2026-10-31' }],
        ])('the days covered by a %s key are %j', (unit, key, expected) => {
            expect(getUnitBounds(key, unit)).toEqual(expected)
        })

        it.each([
            [CalendarUnit.DAY, '2026-10'],
            [CalendarUnit.DAY, '2026-W41'],
            [CalendarUnit.WEEK, '2026-10-15'],
            [CalendarUnit.WEEK, '2025-W53'],
            [CalendarUnit.MONTH, '2026-10-15'],
            [CalendarUnit.MONTH, '2026-13'],
            [CalendarUnit.DAY, ''],
            [CalendarUnit.DAY, null],
        ])('a %s key does not accept %j', (unit, key) => {
            expect(getUnitBounds(key, unit)).toBeNull()
        })
    })
})
