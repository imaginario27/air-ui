import { mount } from '@vue/test-utils'
import FullCalendar from '@/components/calendars/FullCalendar.vue'
import { ColorAccent } from '@/models/enums/colors'

const events = [
    { id: 'a', title: 'Birthday', start: '2026-10-12' },
    { id: 'b', title: 'Trip', start: '2026-10-14', end: '2026-10-16' },
    { id: 'c', title: 'Haircut', start: '2026-10-27', time: '16:30' },
]

const factory = (props: Record<string, any> = {}, hasTransitionStub = false) =>
    mount(FullCalendar, {
        props: { modelValue: '2026-10-12', events, ...props },
        attachTo: document.body,
        ...(hasTransitionStub && { global: { stubs: { transition: true } } }),
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

    it('renders the title as the given heading tag', () => {
        expect(factory().find('h2').exists()).toBe(true)
        expect(factory({ headingTag: 'h4' }).find('h4').text()).toBe('October 2026')
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

        await wrapper
            .findAll('button')
            .find((button) => button.text() === 'Today')!
            .trigger('click')

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

    it('uses getEventColor over the color of the event', () => {
        const wrapper = factory({
            events: [{ title: 'Trip', start: '2026-10-14', end: '2026-10-16', color: ColorAccent.SUCCESS }],
            getEventColor: () => ColorAccent.DANGER,
        })

        expect(eventButton(wrapper, 'Trip').classes()).toContain('bg-background-danger-bold')
    })

    it('keeps the meta of an event in the event-click payload and the event slot', async () => {
        const wrapper = mount(FullCalendar, {
            props: {
                modelValue: '2026-10-12',
                events: [{ title: 'Review', start: '2026-10-12', meta: { team: 'ux' } }],
            },
            slots: { event: '<template #event="{ event }">{{ event.title }} / {{ event.meta.team }}</template>' },
            attachTo: document.body,
        })

        await eventButton(wrapper, 'Review').trigger('click')

        expect(eventButton(wrapper, 'Review').text()).toBe('Review / ux')
        expect(wrapper.emitted('event-click')![0]![0]).toMatchObject({ meta: { team: 'ux' } })
    })

    describe('+N more popover', () => {
        const crowded = ['One', 'Two', 'Three', 'Four', 'Five'].map((title) => ({ title, start: '2026-10-15' }))

        const open = async () => {
            const wrapper = factory({ events: crowded, maxEvents: 3 }, true)
            await eventButton(wrapper, '+2 more').trigger('click')

            return wrapper
        }

        it('lists all the events of the day', async () => {
            const wrapper = await open()
            const dialog = wrapper.find('[role="dialog"]')

            expect(dialog.exists()).toBe(true)
            expect(dialog.attributes('aria-label')).toContain('October 15, 2026')
            expect(
                dialog.findAll('button').filter((button) => button.attributes('aria-label')?.match(/^[A-Z]/)),
            ).toHaveLength(6)
            expect(dialog.text()).toContain('Three')
            expect(dialog.text()).toContain('Four')
        })

        it('emits event-click and closes when an event of the popover is clicked', async () => {
            const wrapper = await open()

            await wrapper
                .find('[role="dialog"]')
                .findAll('button')
                .find((button) => button.text() === 'Four')!
                .trigger('click')

            expect(wrapper.emitted('event-click')![0]![0]).toMatchObject({ title: 'Four' })
            expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
        })

        it('replaces its content with the more-popover slot', async () => {
            const wrapper = mount(FullCalendar, {
                props: { modelValue: '2026-10-12', events: crowded, maxEvents: 3 },
                slots: {
                    'more-popover':
                        '<template #more-popover="{ date, events }"><p class="custom">{{ date }} {{ events.length }}</p></template>',
                },
                global: { stubs: { transition: true } },
                attachTo: document.body,
            })

            await eventButton(wrapper, '+2 more').trigger('click')

            expect(wrapper.find('[role="dialog"] .custom').text()).toBe('2026-10-15 5')
        })

        describe('auto flip', () => {
            // jsdom has no layout: the rectangles are set by role
            const mockRects = (panel: Partial<DOMRect>) =>
                vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
                    this: HTMLElement,
                ) {
                    const role = this.getAttribute('role')
                    const rect =
                        role === 'group'
                            ? { top: 0, left: 0, right: 700, bottom: 600 }
                            : role === 'dialog'
                              ? { top: 400, left: 0, right: 224, bottom: 700, ...panel }
                              : this.querySelector(':scope > [role="dialog"]')
                                ? { top: 480, left: 0, right: 700, bottom: 600 }
                                : { top: 0, left: 0, right: 0, bottom: 0 }

                    return { ...rect, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) }
                })

            afterEach(() => vi.restoreAllMocks())

            it('opens upwards when the panel goes below the calendar', async () => {
                mockRects({})
                const wrapper = await open()

                expect(wrapper.find('[role="dialog"]').classes()).toContain('bottom-0')
            })

            it('opens towards the left when the panel goes out on the right', async () => {
                mockRects({ right: 800 })
                const wrapper = await open()

                expect(wrapper.find('[role="dialog"]').attributes('style')).toContain('right')
            })

            it('stays where it opens without morePopoverAutoFlip', async () => {
                mockRects({})
                const wrapper = factory({ events: crowded, maxEvents: 3, morePopoverAutoFlip: false }, true)
                await eventButton(wrapper, '+2 more').trigger('click')

                expect(wrapper.find('[role="dialog"]').classes()).toContain('top-0')
            })
        })

        it('closes with the close button, Escape, a day click or a month change', async () => {
            let wrapper = await open()
            await wrapper.find('button[aria-label="Close"]').trigger('click')
            expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

            wrapper = await open()
            await wrapper.trigger('keydown', { key: 'Escape' })
            expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

            wrapper = await open()
            await dayButton(wrapper, '2026-10-20').trigger('click')
            expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

            wrapper = await open()
            await wrapper.find('button[aria-label="Next month"]').trigger('click')
            expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
        })
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

describe('FullCalendar.vue views', () => {
    const viewEvents = [
        { id: 'a', title: 'Birthday', start: '2026-10-12' },
        { id: 'b', title: 'Haircut', start: '2026-10-12', time: '16:30', endTime: '17:30' },
        { id: 'c', title: 'Trip', start: '2026-10-14', end: '2026-10-16' },
    ]

    const viewFactory = (view: string, props: Record<string, any> = {}) =>
        factory({ view, events: viewEvents, ...props })

    const grid = (wrapper: ReturnType<typeof factory>) => wrapper.find('[data-test="full-calendar-time-grid"]')

    afterEach(() => vi.useRealTimers())

    it('shows the month by default, with a button to change the view', () => {
        const wrapper = factory()

        expect(wrapper.find('[data-test="full-calendar-month"]').exists()).toBe(true)
        expect(wrapper.findAll('button').some((button) => button.text() === 'Month')).toBe(true)
    })

    it('hides the view button when there is only one view', () => {
        const wrapper = factory({ views: ['month'] })

        expect(wrapper.findAll('button').some((button) => button.text() === 'Month')).toBe(false)
    })

    it('follows the view prop', async () => {
        const wrapper = viewFactory('month')

        await wrapper.setProps({ view: 'agenda' })

        expect(wrapper.find('[data-test="full-calendar-agenda"]').exists()).toBe(true)
        expect(wrapper.find('[data-test="full-calendar-month"]').exists()).toBe(false)
    })

    it('is boxed by default and can be unboxed', () => {
        expect(factory().classes()).toEqual(
            expect.arrayContaining(['border', 'rounded-lg', 'bg-background-container-surface']),
        )

        const unboxed = factory({ isBoxed: false })

        expect(unboxed.classes()).not.toContain('border')
        expect(unboxed.classes()).not.toContain('rounded-lg')
    })

    it('removes the right border of the last day of each week, so it does not double the border of the box', () => {
        const wrapper = factory()
        const cells = wrapper.find('[data-test="full-calendar-month"] > div').element.children

        expect(cells[6]!.className).toContain('[&:nth-child(7)]:border-r-0')
        expect(cells[6]!.className).not.toContain('last:border-r-0')
    })

    it('stacks the months of the year in one column on small screens', () => {
        const wrapper = viewFactory('year')

        expect(wrapper.find('[data-test="full-calendar-year"]').classes()).toEqual(
            expect.arrayContaining(['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4']),
        )
    })

    describe('hours', () => {
        it('are written in 24 hour format by default, in the default text color', () => {
            const wrapper = viewFactory('day')
            const labels = grid(wrapper).findAll('span.absolute')

            expect(labels.map((label) => label.text())).toContain('13:00')
            expect(grid(wrapper).text()).not.toMatch(/AM|PM/)
            expect(labels[0]!.classes()).not.toContain('text-text-neutral-subtler')
            expect(grid(wrapper).find('.sticky span').classes()).not.toContain('text-text-neutral-subtler')
        })

        it('can be written in 12 hour format', () => {
            const wrapper = viewFactory('day', { hourFormat: '12' })

            expect(grid(wrapper).text()).toMatch(/1:00\sPM/)
        })
    })

    describe('shortcuts', () => {
        it.each([
            ['d', 'day'],
            ['w', 'week'],
            ['y', 'year'],
            ['a', 'agenda'],
        ])('changes the view with %s', async (key, view) => {
            const wrapper = factory()

            await wrapper.trigger('keydown', { key })

            expect(wrapper.emitted('update:view')![0]).toEqual([view])
        })

        it('ignores a view that is not available and the keys with modifiers', async () => {
            const wrapper = factory({ views: ['month', 'week'] })

            await wrapper.trigger('keydown', { key: 'd' })
            await wrapper.trigger('keydown', { key: 'w', ctrlKey: true })

            expect(wrapper.emitted('update:view')).toBeUndefined()
        })
    })

    describe('day and week', () => {
        it('shows the day with its title', () => {
            const wrapper = viewFactory('day')

            expect(wrapper.find('h2').text()).toBe('October 12, 2026')
            expect(grid(wrapper).findAll('button[aria-pressed]')).toHaveLength(1)
        })

        it('shows the 7 days of the week, starting on firstDayOfWeek', () => {
            const wrapper = viewFactory('week', { firstDayOfWeek: 1 })
            const headers = grid(wrapper).findAll('button[aria-pressed]')

            expect(headers).toHaveLength(7)
            expect(headers[0]!.attributes('aria-label')).toContain('October 12')
            expect(wrapper.find('h2').text()).toMatch(/Oct\s*12.*18,\s*2026/)
        })

        it('keeps the header on top while the hours scroll', () => {
            const header = grid(viewFactory('week')).find('.sticky')

            expect(header.classes()).toEqual(expect.arrayContaining(['sticky', 'top-0']))
        })

        it('has the container background in the header, and a custom one with timeGridHeaderClass', () => {
            expect(grid(viewFactory('week')).find('.sticky').classes()).toContain('bg-background-container-surface')

            const custom = grid(viewFactory('week', { timeGridHeaderClass: 'bg-background-neutral-subtlest' })).find(
                '.sticky',
            )

            expect(custom.classes()).toContain('bg-background-neutral-subtlest')
            expect(custom.classes()).not.toContain('bg-background-container-surface')
        })

        it('limits the height of the hours with timeGridMaxHeight', () => {
            const wrapper = viewFactory('week', { timeGridMaxHeight: '20rem' })

            expect(grid(wrapper).attributes('style')).toContain('max-height: 20rem')
        })

        it('puts the events of the whole day in a row and the timed ones on their hours', () => {
            const wrapper = viewFactory('day')
            const allDay = wrapper.find('[data-test="full-calendar-all-day"]')
            const block = wrapper
                .findAll('[data-test="full-calendar-day-column"] button')
                .find((button) => button.text().includes('Haircut'))!

            expect(allDay.text()).toContain('Birthday')
            expect(allDay.text()).not.toContain('Haircut')
            expect(block.attributes('style')).toContain('top: 990px')
            expect(block.attributes('style')).toContain('height: 60px')
            expect(block.text()).toContain('16:30 – 17:30')
        })

        it('puts the events that share hours side by side', () => {
            const wrapper = viewFactory('day', {
                events: [
                    { title: 'First', start: '2026-10-12', time: '10:00', endTime: '11:00' },
                    { title: 'Second', start: '2026-10-12', time: '10:30', endTime: '11:30' },
                ],
            })
            const blocks = wrapper.findAll('[data-test="full-calendar-day-column"] button')

            expect(blocks[0]!.attributes('style')).toContain('left: 0%')
            expect(blocks[0]!.attributes('style')).toContain('width: 50%')
            expect(blocks[1]!.attributes('style')).toContain('left: 50%')
        })

        it('shows the current time on today', () => {
            vi.useFakeTimers({ toFake: ['Date'] })
            vi.setSystemTime(new Date(2026, 9, 12, 13, 0))

            const wrapper = viewFactory('day')

            expect(wrapper.find('[data-test="full-calendar-now"]').attributes('style')).toContain('top: 780px')
        })

        it('emits slot-click with the date and the time of the clicked hour', async () => {
            const wrapper = viewFactory('day')

            await wrapper.find('[data-test="full-calendar-day-column"]').trigger('click', { clientY: 100 })

            expect(wrapper.emitted('slot-click')![0]).toEqual([{ date: '2026-10-12', time: '01:30' }])
        })

        it('emits event-click without a slot-click', async () => {
            const wrapper = viewFactory('day')

            await wrapper.findAll('[data-test="full-calendar-day-column"] button')[0]!.trigger('click')

            expect(wrapper.emitted('event-click')![0]![0]).toMatchObject({ title: 'Haircut' })
            expect(wrapper.emitted('slot-click')).toBeUndefined()
        })

        it('moves a day or a week with the arrows and emits range-change', async () => {
            const wrapper = viewFactory('week')

            await wrapper.find('button[aria-label="Next"]').trigger('click')

            expect(wrapper.emitted('range-change')!.at(-1)![0]).toEqual({
                view: 'week',
                from: '2026-10-18',
                to: '2026-10-24',
            })

            await wrapper.setProps({ view: 'day' })
            await wrapper.find('button[aria-label="Previous"]').trigger('click')

            expect(wrapper.find('h2').text()).toBe('October 18, 2026')
        })

        it('opens the day view when a day of the week is clicked', async () => {
            const wrapper = viewFactory('week')

            await grid(wrapper).findAll('button[aria-pressed]')[3]!.trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-14'])
            expect(wrapper.emitted('day-click')![0]![0]).toMatchObject({ date: '2026-10-14' })
            expect(wrapper.emitted('update:view')![0]).toEqual(['day'])
        })
    })

    describe('year', () => {
        it('shows the 12 months of the year', () => {
            const wrapper = viewFactory('year')

            expect(wrapper.find('h2').text()).toBe('2026')
            expect(wrapper.findAll('[data-test="full-calendar-year"] > div')).toHaveLength(12)
        })

        it('opens the month view when a month is clicked', async () => {
            const wrapper = viewFactory('year')

            await wrapper.findAll('[data-test="full-calendar-year"] > div')[2]!.find('button').trigger('click')

            expect(wrapper.emitted('update:view')![0]).toEqual(['month'])
            expect(wrapper.find('h2').text()).toBe('March 2026')
        })

        it('opens the day view when a day is clicked', async () => {
            const wrapper = viewFactory('year')

            await wrapper.find('button[aria-label="Thursday, October 15, 2026"]').trigger('click')

            expect(wrapper.emitted('day-click')![0]![0]).toMatchObject({ date: '2026-10-15' })
            expect(wrapper.emitted('update:view')![0]).toEqual(['day'])
        })

        it('moves a year with the arrows', async () => {
            const wrapper = viewFactory('year')

            await wrapper.find('button[aria-label="Next"]').trigger('click')

            expect(wrapper.find('h2').text()).toBe('2027')
        })
    })

    describe('agenda', () => {
        it('lists the days that have events, with the time of each one', () => {
            const wrapper = viewFactory('agenda')
            const days = wrapper.findAll('[data-test="full-calendar-agenda-day"]')

            expect(days.map((day) => day.text())).toEqual([
                expect.stringContaining('Birthday'),
                expect.stringContaining('Trip'),
                expect.stringContaining('Trip'),
                expect.stringContaining('Trip'),
            ])
            expect(days[0]!.text()).toContain('All day')
            expect(days[0]!.text()).toContain('16:30 – 17:30')
        })

        it('only lists the days of agendaDays', () => {
            const wrapper = viewFactory('agenda', { agendaDays: 1 })

            expect(wrapper.findAll('[data-test="full-calendar-agenda-day"]')).toHaveLength(1)
        })

        it('says when there are no events', () => {
            const wrapper = viewFactory('agenda', { events: [] })

            expect(wrapper.text()).toContain('No events')
        })

        it('emits event-click and opens the day view from the day', async () => {
            const wrapper = viewFactory('agenda')
            const day = wrapper.findAll('[data-test="full-calendar-agenda-day"]')[1]!

            await day.findAll('button')[1]!.trigger('click')
            expect(wrapper.emitted('event-click')![0]![0]).toMatchObject({ title: 'Trip' })

            await day.findAll('button')[0]!.trigger('click')
            expect(wrapper.emitted('day-click')![0]![0]).toMatchObject({ date: '2026-10-14' })
        })

        it('moves by agendaDays and shows the range in the title', async () => {
            const wrapper = viewFactory('agenda', { agendaDays: 7 })

            await wrapper.find('button[aria-label="Next"]').trigger('click')

            expect(wrapper.emitted('range-change')!.at(-1)![0]).toEqual({
                view: 'agenda',
                from: '2026-10-19',
                to: '2026-10-25',
            })
        })
    })
})
