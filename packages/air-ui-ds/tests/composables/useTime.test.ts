import {
    formatTime,
    joinDateTime,
    parseTime,
    splitDateTime,
    toTimeString,
    uses12HourClock,
} from '@/composables/useTime'
import { HourFormat } from '@/models/enums/calendars'

describe('useTime', () => {
    describe('parseTime', () => {
        it('parses HH:mm and HH:mm:ss', () => {
            expect(parseTime('19:30')).toEqual({ hours: 19, minutes: 30, seconds: 0 })
            expect(parseTime('07:05:09')).toEqual({ hours: 7, minutes: 5, seconds: 9 })
        })

        it.each([['24:00'], ['12:60'], ['12:00:60'], ['9:30'], ['19:30:'], ['abc'], [''], [null], [undefined]])(
            'returns null for %j',
            (value) => {
                expect(parseTime(value)).toBeNull()
            },
        )
    })

    describe('toTimeString', () => {
        it('pads and adds the seconds only when asked', () => {
            const parts = { hours: 7, minutes: 5, seconds: 9 }

            expect(toTimeString(parts)).toBe('07:05')
            expect(toTimeString(parts, true)).toBe('07:05:09')
        })
    })

    describe('uses12HourClock', () => {
        it('depends on the locale', () => {
            expect(uses12HourClock('en-US')).toBe(true)
            expect(uses12HourClock('es-ES')).toBe(false)
        })
    })

    describe('formatTime', () => {
        it('formats with the locale', () => {
            expect(formatTime('19:30', 'es-ES')).toBe('19:30')
            expect(formatTime('19:30', 'en-US')).toBe('07:30 PM')
        })

        it('forces the hour format', () => {
            expect(formatTime('19:30', 'es-ES', false, HourFormat.HOURS_12)).toMatch(/^07:30/)
            expect(formatTime('19:30', 'en-US', false, HourFormat.HOURS_24)).toBe('19:30')
        })

        it('includes the seconds when asked', () => {
            expect(formatTime('19:30:15', 'es-ES', true)).toBe('19:30:15')
        })

        it('returns an empty string for invalid values', () => {
            expect(formatTime('nope', 'en-US')).toBe('')
            expect(formatTime(null, 'en-US')).toBe('')
        })
    })

    describe('date and time', () => {
        it('splits and joins YYYY-MM-DDTHH:mm', () => {
            expect(splitDateTime('2026-10-15T19:30')).toEqual({ date: '2026-10-15', time: '19:30' })
            expect(joinDateTime('2026-10-15', '19:30')).toBe('2026-10-15T19:30')
        })

        it('splits partial and invalid values', () => {
            expect(splitDateTime('2026-10-15')).toEqual({ date: '2026-10-15', time: null })
            expect(splitDateTime('2026-13-45T25:00')).toEqual({ date: null, time: null })
            expect(splitDateTime(null)).toEqual({ date: null, time: null })
        })
    })
})
