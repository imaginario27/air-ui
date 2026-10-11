import { addMonths, formatISODate, parseISODate, toISODate } from '@/composables/useCalendar'

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
})
