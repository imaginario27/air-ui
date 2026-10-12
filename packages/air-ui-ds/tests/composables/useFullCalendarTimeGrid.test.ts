import { isFullCalendarBar, normalizeFullCalendarEvents, toMinutes } from '@/composables/calendar/useFullCalendarEvents'
import { layoutTimedEvents } from '@/composables/calendar/useFullCalendarTimeGrid'

const timed = (title: string, time: string, endTime?: string) => ({ title, start: '2026-10-12', time, endTime })

describe('toMinutes', () => {
    it.each([
        ['00:00', 0],
        ['09:05', 545],
        ['23:59', 1439],
    ])('converts %s', (time, minutes) => {
        expect(toMinutes(time)).toBe(minutes)
    })

    it.each([['24:00'], ['9:05'], ['12:60'], ['noon'], [''], [undefined], [null]])('returns null for %j', (time) => {
        expect(toMinutes(time)).toBeNull()
    })
})

describe('isFullCalendarBar', () => {
    it('is a bar without a valid time or when it lasts several days', () => {
        expect(isFullCalendarBar({ title: 'a', start: '2026-10-12' })).toBe(true)
        expect(isFullCalendarBar({ title: 'a', start: '2026-10-12', time: '25:00' })).toBe(true)
        expect(isFullCalendarBar({ title: 'a', start: '2026-10-12', end: '2026-10-14', time: '10:00' })).toBe(true)
        expect(isFullCalendarBar({ title: 'a', start: '2026-10-12', time: '10:00' })).toBe(false)
    })
})

describe('normalizeFullCalendarEvents', () => {
    it('drops invalid starts and puts bars first, then the earliest', () => {
        const titles = normalizeFullCalendarEvents([
            timed('Late', '18:00'),
            { title: 'Broken', start: 'nope' },
            timed('Early', '08:00'),
            { title: 'All day', start: '2026-10-12' },
        ]).map((item) => item.event.title)

        expect(titles).toEqual(['All day', 'Early', 'Late'])
    })
})

describe('layoutTimedEvents', () => {
    it('lasts an hour without an end, and until midnight at most', () => {
        const [first, last] = layoutTimedEvents([timed('a', '10:00'), timed('b', '23:30')])

        expect([first!.start, first!.end]).toEqual([600, 660])
        expect([last!.start, last!.end]).toEqual([1410, 1440])
    })

    it('ignores an end that is not after the start', () => {
        expect(layoutTimedEvents([timed('a', '10:00', '09:00')])[0]!.end).toBe(660)
    })

    it('keeps events that do not overlap in a single column', () => {
        const blocks = layoutTimedEvents([timed('a', '09:00', '10:00'), timed('b', '10:00', '11:00')])

        expect(blocks.map((block) => [block.column, block.columns])).toEqual([
            [0, 1],
            [0, 1],
        ])
    })

    it('puts overlapping events side by side, in the same number of columns', () => {
        const blocks = layoutTimedEvents([
            timed('a', '10:00', '12:00'),
            timed('b', '10:30', '11:00'),
            timed('c', '11:00', '11:30'),
        ])

        // b and c share the second column, as they do not overlap each other
        expect(blocks.map((block) => [block.event.title, block.column, block.columns])).toEqual([
            ['a', 0, 2],
            ['b', 1, 2],
            ['c', 1, 2],
        ])
    })

    it('starts a new group of columns after the previous one ends', () => {
        const blocks = layoutTimedEvents([
            timed('a', '09:00', '10:00'),
            timed('b', '09:30', '10:30'),
            timed('c', '13:00', '14:00'),
        ])

        expect(blocks.map((block) => block.columns)).toEqual([2, 2, 1])
    })
})
