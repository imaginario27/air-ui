import { DateSegmentKind, DateSegmentsType, HourFormat } from '@/models/enums/calendars'
import {
    buildSegmentValue,
    getDateSegmentLayout,
    getDayPeriodLabels,
    getSegmentLength,
    getSegmentRange,
    isWithinBounds,
    padSegmentValue,
    parseSegmentValue,
} from '@/composables/useDateSegments'

const kindsOf = (type: DateSegmentsType, locale: string, options = {}) =>
    getDateSegmentLayout(type, locale, options)
        .filter((item) => item.kind !== DateSegmentKind.LITERAL)
        .map((item) => item.kind)

const literalsOf = (type: DateSegmentsType, locale: string) =>
    getDateSegmentLayout(type, locale)
        .filter((item) => item.kind === DateSegmentKind.LITERAL)
        .map((item) => item.text)

describe('useDateSegments', () => {
    describe('getDateSegmentLayout', () => {
        it.each([
            ['en-US', ['month', 'day', 'year']],
            ['es-ES', ['day', 'month', 'year']],
            ['de-DE', ['day', 'month', 'year']],
            ['ja-JP', ['year', 'month', 'day']],
        ])('orders the date segments of %s', (locale, expected) => {
            expect(kindsOf(DateSegmentsType.DATE, locale)).toEqual(expected)
        })

        it.each([
            ['es-ES', '/'],
            ['de-DE', '.'],
        ])('uses the separator of %s', (locale, separator) => {
            expect(literalsOf(DateSegmentsType.DATE, locale)).toContain(separator)
        })

        it('orders month and year by locale', () => {
            expect(kindsOf(DateSegmentsType.MONTH, 'en-US')).toEqual(['month', 'year'])
            expect(kindsOf(DateSegmentsType.MONTH, 'ja-JP')).toEqual(['year', 'month'])
        })

        it('writes the week with the week text and the year', () => {
            const layout = getDateSegmentLayout(DateSegmentsType.WEEK, 'en-US', { weekText: 'Semana' })

            expect(layout.map((item) => item.text ?? item.kind)).toEqual(['Semana ', 'week', ', ', 'year'])
        })

        it('uses the day period in 12 hour locales only', () => {
            expect(kindsOf(DateSegmentsType.TIME, 'en-US')).toEqual(['hour', 'minute', 'dayPeriod'])
            expect(kindsOf(DateSegmentsType.TIME, 'es-ES')).toEqual(['hour', 'minute'])
        })

        it('follows the hour format over the locale', () => {
            expect(kindsOf(DateSegmentsType.TIME, 'en-US', { hourFormat: HourFormat.HOURS_24 })).toEqual([
                'hour',
                'minute',
            ])
            expect(kindsOf(DateSegmentsType.TIME, 'es-ES', { hourFormat: HourFormat.HOURS_12 })).toContain('dayPeriod')
        })

        it('adds the seconds', () => {
            expect(kindsOf(DateSegmentsType.TIME, 'es-ES', { hasSeconds: true })).toEqual(['hour', 'minute', 'second'])
        })

        it('joins the date and the time', () => {
            expect(kindsOf(DateSegmentsType.DATETIME_LOCAL, 'en-US')).toEqual([
                'month',
                'day',
                'year',
                'hour',
                'minute',
                'dayPeriod',
            ])
        })
    })

    describe('getDayPeriodLabels', () => {
        it('writes AM and PM in en-US', () => {
            expect(getDayPeriodLabels('en-US')).toEqual({ am: 'AM', pm: 'PM' })
        })

        it('writes AM and PM in the locale', () => {
            const { am, pm } = getDayPeriodLabels('es-US')

            expect(am).not.toBe(pm)
            expect(am.toLowerCase().startsWith('a')).toBe(true)
            expect(pm.toLowerCase().startsWith('p')).toBe(true)
        })
    })

    describe('getSegmentRange', () => {
        const context = { is12h: false }

        it('follows the month and the year for the day', () => {
            expect(getSegmentRange(DateSegmentKind.DAY, { ...context, month: 2, year: 2024 }).max).toBe(29)
            expect(getSegmentRange(DateSegmentKind.DAY, { ...context, month: 2, year: 2023 }).max).toBe(28)
            expect(getSegmentRange(DateSegmentKind.DAY, { ...context, month: 4 }).max).toBe(30)
            expect(getSegmentRange(DateSegmentKind.DAY, context).max).toBe(31)
        })

        it('follows the year for the week', () => {
            expect(getSegmentRange(DateSegmentKind.WEEK, { ...context, year: 2020 }).max).toBe(53)
            expect(getSegmentRange(DateSegmentKind.WEEK, { ...context, year: 2021 }).max).toBe(52)
        })

        it('follows the clock for the hour', () => {
            expect(getSegmentRange(DateSegmentKind.HOUR, { is12h: true })).toEqual({ min: 1, max: 12 })
            expect(getSegmentRange(DateSegmentKind.HOUR, { is12h: false })).toEqual({ min: 0, max: 23 })
        })

        it.each([
            [DateSegmentKind.MONTH, { min: 1, max: 12 }],
            [DateSegmentKind.YEAR, { min: 1, max: 9999 }],
            [DateSegmentKind.MINUTE, { min: 0, max: 59 }],
            [DateSegmentKind.SECOND, { min: 0, max: 59 }],
        ])('has a fixed range for %s', (kind, expected) => {
            expect(getSegmentRange(kind, context)).toEqual(expected)
        })
    })

    describe('segment digits', () => {
        it('takes four digits for the year and two for the rest', () => {
            expect(getSegmentLength(DateSegmentKind.YEAR)).toBe(4)
            expect(getSegmentLength(DateSegmentKind.DAY)).toBe(2)
        })

        it('pads a number to the digits of its segment', () => {
            expect(padSegmentValue(DateSegmentKind.DAY, 5)).toBe('05')
            expect(padSegmentValue(DateSegmentKind.YEAR, '5')).toBe('0005')
        })
    })

    describe('buildSegmentValue', () => {
        const clock24 = { is12h: false, hasSeconds: false }
        const clock12 = { is12h: true, hasSeconds: false }

        it('builds a date', () => {
            const parts = { year: '2026', month: '10', day: '15' }

            expect(buildSegmentValue(DateSegmentsType.DATE, parts, clock24)).toBe('2026-10-15')
        })

        it('returns null for an incomplete or not real date', () => {
            expect(buildSegmentValue(DateSegmentsType.DATE, { year: '2026', month: '10' }, clock24)).toBeNull()
            expect(
                buildSegmentValue(DateSegmentsType.DATE, { year: '2026', month: '02', day: '31' }, clock24),
            ).toBeNull()
            expect(
                buildSegmentValue(DateSegmentsType.DATE, { year: '0000', month: '01', day: '01' }, clock24),
            ).toBeNull()
        })

        it('builds a month and a week', () => {
            expect(buildSegmentValue(DateSegmentsType.MONTH, { year: '2026', month: '10' }, clock24)).toBe('2026-10')
            expect(buildSegmentValue(DateSegmentsType.WEEK, { year: '2026', week: '42' }, clock24)).toBe('2026-W42')
        })

        it('returns null for a week the year does not have', () => {
            expect(buildSegmentValue(DateSegmentsType.WEEK, { year: '2025', week: '53' }, clock24)).toBeNull()
        })

        it('builds a time of a 24 hour clock', () => {
            expect(buildSegmentValue(DateSegmentsType.TIME, { hour: '19', minute: '30' }, clock24)).toBe('19:30')
            expect(
                buildSegmentValue(
                    DateSegmentsType.TIME,
                    { hour: '19', minute: '30', second: '05' },
                    { is12h: false, hasSeconds: true },
                ),
            ).toBe('19:30:05')
        })

        it.each([
            ['07', 'pm', '19:30'],
            ['07', 'am', '07:30'],
            ['12', 'am', '00:30'],
            ['12', 'pm', '12:30'],
        ])('builds a time of a 12 hour clock: %s %s', (hour, dayPeriod, expected) => {
            expect(buildSegmentValue(DateSegmentsType.TIME, { hour, minute: '30', dayPeriod }, clock12)).toBe(expected)
        })

        it('returns null for a time without the day period, or with a minute that does not exist', () => {
            expect(buildSegmentValue(DateSegmentsType.TIME, { hour: '07', minute: '30' }, clock12)).toBeNull()
            expect(buildSegmentValue(DateSegmentsType.TIME, { hour: '19', minute: '75' }, clock24)).toBeNull()
            expect(
                buildSegmentValue(DateSegmentsType.TIME, { hour: '13', minute: '30', dayPeriod: 'am' }, clock12),
            ).toBeNull()
        })

        it('builds a date and time', () => {
            const parts = { year: '2026', month: '10', day: '15', hour: '19', minute: '30' }

            expect(buildSegmentValue(DateSegmentsType.DATETIME_LOCAL, parts, clock24)).toBe('2026-10-15T19:30')
            expect(buildSegmentValue(DateSegmentsType.DATETIME_LOCAL, { ...parts, hour: '' }, clock24)).toBeNull()
        })
    })

    describe('parseSegmentValue', () => {
        const clock24 = { is12h: false, hasSeconds: false }
        const clock12 = { is12h: true, hasSeconds: false }

        it('splits a date, a month and a week', () => {
            expect(parseSegmentValue(DateSegmentsType.DATE, '2026-10-15', clock24)).toEqual({
                year: '2026',
                month: '10',
                day: '15',
            })
            expect(parseSegmentValue(DateSegmentsType.MONTH, '2026-10', clock24)).toEqual({ year: '2026', month: '10' })
            expect(parseSegmentValue(DateSegmentsType.WEEK, '2026-W42', clock24)).toEqual({ year: '2026', week: '42' })
        })

        it('splits a time of a 24 and a 12 hour clock', () => {
            expect(parseSegmentValue(DateSegmentsType.TIME, '19:30', clock24)).toEqual({ hour: '19', minute: '30' })
            expect(parseSegmentValue(DateSegmentsType.TIME, '19:30', clock12)).toEqual({
                hour: '07',
                minute: '30',
                dayPeriod: 'pm',
            })
            expect(parseSegmentValue(DateSegmentsType.TIME, '00:15', clock12)).toEqual({
                hour: '12',
                minute: '15',
                dayPeriod: 'am',
            })
        })

        it('keeps the seconds only when they are used', () => {
            expect(parseSegmentValue(DateSegmentsType.TIME, '19:30:05', { is12h: false, hasSeconds: true })).toEqual({
                hour: '19',
                minute: '30',
                second: '05',
            })
            expect(parseSegmentValue(DateSegmentsType.TIME, '19:30:05', clock24)).toEqual({ hour: '19', minute: '30' })
        })

        it('splits a date and time', () => {
            expect(parseSegmentValue(DateSegmentsType.DATETIME_LOCAL, '2026-10-15T19:30', clock24)).toEqual({
                year: '2026',
                month: '10',
                day: '15',
                hour: '19',
                minute: '30',
            })
        })

        it.each([
            [DateSegmentsType.DATE, '2026-02-31'],
            [DateSegmentsType.DATE, 'tomorrow'],
            [DateSegmentsType.MONTH, '2026-13'],
            [DateSegmentsType.WEEK, '2025-W53'],
            [DateSegmentsType.TIME, '25:00'],
            [DateSegmentsType.DATETIME_LOCAL, '2026-10-15'],
        ])('returns null for a value that is not a real %s: %s', (type, value) => {
            expect(parseSegmentValue(type, value, clock24)).toBeNull()
        })
    })

    describe('isWithinBounds', () => {
        it('compares a date with its bounds', () => {
            expect(isWithinBounds('2026-10-15', '2026-10-01', '2026-10-31')).toBe(true)
            expect(isWithinBounds('2026-09-30', '2026-10-01', '2026-10-31')).toBe(false)
            expect(isWithinBounds('2026-11-01', '2026-10-01', '2026-10-31')).toBe(false)
        })

        it('accepts any value without bounds', () => {
            expect(isWithinBounds('2026-10-15')).toBe(true)
        })

        it('only compares as much as the bound has', () => {
            expect(isWithinBounds('2026-10-31T10:00', undefined, '2026-10-31')).toBe(true)
            expect(isWithinBounds('2026-11-01T00:00', undefined, '2026-10-31')).toBe(false)
            expect(isWithinBounds('2026-10-31T10:00', '2026-10-31', undefined)).toBe(true)
        })

        it('compares a time with or without seconds', () => {
            expect(isWithinBounds('10:30', '10:30:00', '10:30:00')).toBe(true)
            expect(isWithinBounds('10:29', '10:30', undefined)).toBe(false)
            expect(isWithinBounds('10:30:30', undefined, '10:30')).toBe(false)
        })
    })
})
