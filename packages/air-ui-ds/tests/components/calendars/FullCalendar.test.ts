import { mount } from '@vue/test-utils'
import FullCalendar from '@/components/calendars/FullCalendar.vue'

const events = [
    { id: 'a', title: 'Birthday', start: '2026-10-12' },
    { id: 'b', title: 'Trip', start: '2026-10-14', end: '2026-10-16' },
    { id: 'c', title: 'Haircut', start: '2026-10-27', time: '16:30' },
]

const factory = (props: Record<string, any> = {}) =>
    mount(FullCalendar, {
        props: { modelValue: '2026-10-12', events, ...props },
        attachTo: document.body,
    })

const dayButton = (wrapper: ReturnType<typeof factory>, iso: string) => wrapper.find(`[data-date="${iso}"]`)

const eventButton = (wrapper: ReturnType<typeof factory>, title: string) =>
    wrapper.findAll('button').find((button) => button.text().includes(title))!

describe('FullCalendar.vue', () => {
    it('renders the title and only the weeks of the month', () => {
        const wrapper = factory()

        expect(wrapper.find('h2').text()).toBe('October 2026')
        expect(wrapper.findAll('[data-date]')).toHaveLength(35)
        expect(wrapper.findAll('span[abbr]')).toHaveLength(7)
    })

    it('starts the week on the given day', () => {
        const wrapper = factory({ firstDayOfWeek: 1 })

        expect(wrapper.findAll('span[abbr]')[0]!.attributes('abbr')).toBe('Monday')
        expect(wrapper.findAll('[data-date]')[0]!.attributes('data-date')).toBe('2026-09-28')
    })

    it('shows the month with the first day of a month', () => {
        const wrapper = factory({ firstDayOfWeek: 1 })

        expect(dayButton(wrapper, '2026-10-01').text()).toBe('Oct 1')
        expect(dayButton(wrapper, '2026-10-02').text()).toBe('2')
    })

    it('marks today and the selected day', () => {
        const wrapper = factory()

        expect(dayButton(wrapper, '2026-10-12').attributes('aria-pressed')).toBe('true')
        expect(dayButton(wrapper, '2026-10-13').attributes('aria-pressed')).toBe('false')
    })

    it('emits update:modelValue and day-click when a day is clicked', async () => {
        const wrapper = factory()

        await dayButton(wrapper, '2026-10-20').trigger('click')

        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20'])
        expect(wrapper.emitted('day-click')![0]![0]).toMatchObject({ date: '2026-10-20' })
    })

    it('does not select days when disabled', async () => {
        const wrapper = factory({ disabled: true })

        await dayButton(wrapper, '2026-10-20').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('navigates between months and emits month-change', async () => {
        const wrapper = factory()

        await wrapper.find('button[aria-label="Next month"]').trigger('click')

        expect(wrapper.find('h2').text()).toBe('November 2026')
        expect(wrapper.emitted('month-change')![0]![0]).toMatchObject({ year: 2026, month: 11 })

        await wrapper.find('button[aria-label="Previous month"]').trigger('click')

        expect(wrapper.find('h2').text()).toBe('October 2026')
    })

    it('goes back to the current month with the Today button', async () => {
        const wrapper = factory({ modelValue: '2020-01-15' })

        expect(wrapper.find('h2').text()).toBe('January 2020')

        await wrapper.findAll('button').find((button) => button.text() === 'Today')!.trigger('click')

        const today = new Date()
        expect(wrapper.find('h2').text()).toContain(String(today.getFullYear()))
        expect(wrapper.find(`[data-date="${toISODate(today)}"]`).exists()).toBe(true)
    })

    it('renders events and spans a multi-day event over its days', () => {
        const wrapper = factory()

        expect(eventButton(wrapper, 'Birthday').exists()).toBe(true)
        expect(eventButton(wrapper, 'Trip').attributes('style')).toContain('span 3')
        expect(eventButton(wrapper, 'Haircut').text()).toContain('16:30')
    })

    it('emits event-click without selecting the day', async () => {
        const wrapper = factory()

        await eventButton(wrapper, 'Birthday').trigger('click')

        expect(wrapper.emitted('event-click')![0]).toEqual([events[0]])
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('splits an event that crosses weeks into one segment per week', () => {
        const wrapper = factory({ events: [{ title: 'Holiday', start: '2026-10-15', end: '2026-10-20' }] })

        expect(wrapper.findAll('button').filter((button) => button.text() === 'Holiday')).toHaveLength(2)
    })

    it('collapses the events that do not fit into a +N more button', async () => {
        const crowded = ['One', 'Two', 'Three', 'Four', 'Five'].map((title) => ({ title, start: '2026-10-15' }))
        const wrapper = factory({ events: crowded, maxEvents: 3 })

        expect(eventButton(wrapper, 'One').exists()).toBe(true)
        expect(eventButton(wrapper, 'Three')).toBeUndefined()

        await eventButton(wrapper, '+2 more').trigger('click')

        const payload = wrapper.emitted('more-click')![0]![0] as { date: string; events: unknown[] }
        expect(payload.date).toBe('2026-10-15')
        expect(payload.events).toHaveLength(5)
    })

    it('ignores events with an invalid start', () => {
        const wrapper = factory({ events: [{ title: 'Broken', start: 'nope' }] })

        expect(eventButton(wrapper, 'Broken')).toBeUndefined()
    })

    it('moves the focus between days with the arrow keys', async () => {
        const wrapper = factory()

        await dayButton(wrapper, '2026-10-12').trigger('keydown', { key: 'ArrowRight' })

        expect(dayButton(wrapper, '2026-10-13').attributes('tabindex')).toBe('0')
        expect(dayButton(wrapper, '2026-10-12').attributes('tabindex')).toBe('-1')
    })
})
