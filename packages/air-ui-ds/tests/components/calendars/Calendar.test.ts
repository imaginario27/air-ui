import { mount } from '@vue/test-utils'
import Calendar from '@/components/calendars/Calendar.vue'
import { CalendarMode } from '@/models/enums/calendars'

const factory = (props: Record<string, any> = {}) =>
    mount(Calendar, {
        props: { modelValue: '2026-10-15', ...props },
        attachTo: document.body,
    })

const buttonByLabel = (wrapper: ReturnType<typeof factory>, label: string) =>
    wrapper.find(`button[aria-label="${label}"]`)

const buttonByText = (wrapper: ReturnType<typeof factory>, text: string) =>
    wrapper.findAll('button').find((button) => button.text() === text)!

const dayButton = (wrapper: ReturnType<typeof factory>, iso: string) => wrapper.find(`[data-date="${iso}"]`)

describe('Calendar.vue', () => {
    it('renders the month of the selected date with a 6-week grid', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('October')
        expect(wrapper.text()).toContain('2026')
        expect(wrapper.findAll('[role="gridcell"]')).toHaveLength(42)
        expect(wrapper.findAll('[role="columnheader"]')).toHaveLength(7)
    })

    it('marks the selected day', () => {
        const wrapper = factory()

        expect(dayButton(wrapper, '2026-10-15').attributes('aria-selected')).toBe('true')
        expect(dayButton(wrapper, '2026-10-16').attributes('aria-selected')).toBe('false')
    })

    it('emits an ISO string when a day is clicked', async () => {
        const wrapper = factory()

        await dayButton(wrapper, '2026-10-20').trigger('click')

        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20'])
    })

    it('orders weekdays from firstDayOfWeek', () => {
        const wrapper = factory({ firstDayOfWeek: 1 })

        expect(wrapper.findAll('[role="columnheader"]')[0]!.attributes('abbr')).toBe('Monday')
    })

    it('hides outside days when hasOutsideDays is false', () => {
        const wrapper = factory({ hasOutsideDays: false })

        // 2026-09-30 belongs to the previous month
        expect(dayButton(wrapper, '2026-09-30').exists()).toBe(false)
        expect(dayButton(wrapper, '2026-10-01').exists()).toBe(true)
    })

    describe('constraints', () => {
        it('does not emit for days outside min and max', async () => {
            const wrapper = factory({ min: '2026-10-10', max: '2026-10-20' })

            await dayButton(wrapper, '2026-10-05').trigger('click')
            await dayButton(wrapper, '2026-10-25').trigger('click')

            expect(dayButton(wrapper, '2026-10-05').attributes('aria-disabled')).toBe('true')
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })

        it('does not emit for days rejected by isDateDisabled', async () => {
            const wrapper = factory({ isDateDisabled: (iso: string) => iso === '2026-10-21' })

            await dayButton(wrapper, '2026-10-21').trigger('click')

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })

        it('disables the navigation buttons at the limits', () => {
            const wrapper = factory({ min: '2026-10-01', max: '2026-10-31' })

            expect(buttonByLabel(wrapper, 'Previous month').attributes('disabled')).toBeDefined()
            expect(buttonByLabel(wrapper, 'Next month').attributes('disabled')).toBeDefined()
        })
    })

    describe('navigation', () => {
        it('goes to the next and previous month', async () => {
            const wrapper = factory()

            await buttonByLabel(wrapper, 'Next month').trigger('click')
            expect(wrapper.text()).toContain('November')

            await buttonByLabel(wrapper, 'Previous month').trigger('click')
            await buttonByLabel(wrapper, 'Previous month').trigger('click')
            expect(wrapper.text()).toContain('September')
        })

        it('picks a month from the months view', async () => {
            const wrapper = factory()

            await buttonByText(wrapper, 'October').trigger('click')
            expect(wrapper.text()).toContain('Jan')

            await buttonByText(wrapper, 'Mar').trigger('click')

            expect(wrapper.text()).toContain('March')
            expect(wrapper.find('[role="grid"]').exists()).toBe(true)
        })

        it('picks a year and goes back to the days of the same month', async () => {
            const wrapper = factory()

            await buttonByText(wrapper, '2026').trigger('click')
            expect(wrapper.text()).toContain('2016 – 2027')

            await buttonByText(wrapper, '2020').trigger('click')

            expect(wrapper.find('[role="grid"]').exists()).toBe(true)
            expect(wrapper.text()).toContain('October')
            expect(wrapper.text()).toContain('2020')
        })

        it('hides the year controls by default', () => {
            const wrapper = factory()

            expect(buttonByLabel(wrapper, 'Previous year').exists()).toBe(false)
            expect(buttonByLabel(wrapper, 'Next year').exists()).toBe(false)
        })

        it('jumps a year with the year controls', async () => {
            const wrapper = factory({ hasYearControls: true })

            await buttonByLabel(wrapper, 'Next year').trigger('click')
            expect(wrapper.text()).toContain('2027')
            expect(wrapper.text()).toContain('October')

            await buttonByLabel(wrapper, 'Previous year').trigger('click')
            await buttonByLabel(wrapper, 'Previous year').trigger('click')
            expect(wrapper.text()).toContain('2025')
        })

        it('disables the year controls at the limits', () => {
            const wrapper = factory({ hasYearControls: true, min: '2026-01-01', max: '2026-12-31' })

            expect(buttonByLabel(wrapper, 'Previous year').attributes('disabled')).toBeDefined()
            expect(buttonByLabel(wrapper, 'Next year').attributes('disabled')).toBeDefined()
        })

        it('follows an external change of the value', async () => {
            const wrapper = factory()

            await wrapper.setProps({ modelValue: '2027-01-05' })

            expect(wrapper.text()).toContain('January')
            expect(wrapper.text()).toContain('2027')
        })
    })

    describe('keyboard', () => {
        it('moves the focus with the arrow keys', async () => {
            const wrapper = factory()

            await dayButton(wrapper, '2026-10-15').trigger('keydown', { key: 'ArrowRight' })
            expect(dayButton(wrapper, '2026-10-16').attributes('tabindex')).toBe('0')

            await dayButton(wrapper, '2026-10-16').trigger('keydown', { key: 'ArrowDown' })
            expect(dayButton(wrapper, '2026-10-23').attributes('tabindex')).toBe('0')
        })

        it('changes month when the focus leaves it', async () => {
            const wrapper = factory({ modelValue: '2026-10-31' })

            await dayButton(wrapper, '2026-10-31').trigger('keydown', { key: 'ArrowRight' })

            expect(wrapper.text()).toContain('November')
            expect(dayButton(wrapper, '2026-11-01').attributes('tabindex')).toBe('0')
        })

        it.each([
            ['PageDown', {}, '2026-11-15'],
            ['PageUp', {}, '2026-09-15'],
            ['PageDown', { shiftKey: true }, '2027-10-15'],
            ['Home', {}, '2026-10-01'],
            ['End', {}, '2026-10-31'],
        ])('%s %j moves the focus to %s', async (key, modifiers, expected) => {
            const wrapper = factory()

            await dayButton(wrapper, '2026-10-15').trigger('keydown', { key, ...modifiers })

            expect(dayButton(wrapper, expected).attributes('tabindex')).toBe('0')
        })
    })

    describe('range mode', () => {
        const range = (value: { start: string | null; end: string | null }) =>
            factory({ mode: CalendarMode.RANGE, modelValue: value })

        it('starts a range on the first click', async () => {
            const wrapper = range({ start: null, end: null })

            await dayButton(wrapper, '2026-10-10').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10-10', end: null }])
        })

        it('ends the range on the second click', async () => {
            const wrapper = range({ start: '2026-10-10', end: null })

            await dayButton(wrapper, '2026-10-14').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10-10', end: '2026-10-14' }])
        })

        it('restarts the range when clicking before the start', async () => {
            const wrapper = range({ start: '2026-10-10', end: null })

            await dayButton(wrapper, '2026-10-05').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10-05', end: null }])
        })

        it('restarts the range after a complete one', async () => {
            const wrapper = range({ start: '2026-10-10', end: '2026-10-14' })

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10-20', end: null }])
        })

        it('marks both ends as selected', () => {
            const wrapper = range({ start: '2026-10-10', end: '2026-10-14' })

            expect(dayButton(wrapper, '2026-10-10').attributes('aria-selected')).toBe('true')
            expect(dayButton(wrapper, '2026-10-12').attributes('aria-selected')).toBe('false')
            expect(dayButton(wrapper, '2026-10-14').attributes('aria-selected')).toBe('true')
        })
    })

    describe('multiple mode', () => {
        const multiple = (value: string[]) => factory({ mode: CalendarMode.MULTIPLE, modelValue: value })

        it('adds a day to the selection', async () => {
            const wrapper = multiple(['2026-10-15'])

            await dayButton(wrapper, '2026-10-10').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2026-10-10', '2026-10-15']])
        })

        it('removes an already selected day', async () => {
            const wrapper = multiple(['2026-10-10', '2026-10-15'])

            await dayButton(wrapper, '2026-10-10').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2026-10-15']])
        })

        it('marks every selected day', () => {
            const wrapper = multiple(['2026-10-10', '2026-10-15'])

            expect(dayButton(wrapper, '2026-10-10').attributes('aria-selected')).toBe('true')
            expect(dayButton(wrapper, '2026-10-12').attributes('aria-selected')).toBe('false')
            expect(dayButton(wrapper, '2026-10-15').attributes('aria-selected')).toBe('true')
        })

        it('keeps the visible month when toggling the first date', async () => {
            const wrapper = multiple(['2026-10-10', '2026-10-15'])
            await buttonByLabel(wrapper, 'Next month').trigger('click')

            await wrapper.setProps({ modelValue: ['2026-10-15'] })

            expect(wrapper.text()).toContain('November')
        })
    })

    describe('color', () => {
        it.each([
            ['primary-brand', 'bg-background-primary-brand-default'],
            ['secondary-brand', 'bg-background-secondary-brand-default'],
        ])('colors the selected day for %s', (color, expected) => {
            const wrapper = factory({ color })

            expect(dayButton(wrapper, '2026-10-15').classes()).toContain(expected)
        })

        it('falls back to primary brand for an unknown color', () => {
            const wrapper = factory({ color: 'unknown' })

            expect(dayButton(wrapper, '2026-10-15').classes()).toContain('bg-background-primary-brand-default')
        })
    })

    describe('isRounded', () => {
        it('uses a small radius by default and a full radius when rounded', () => {
            expect(dayButton(factory(), '2026-10-15').classes()).toContain('rounded')
            expect(dayButton(factory({ isRounded: true }), '2026-10-15').classes()).toContain('rounded-full')
        })

        it('only rounds the ends of a range', () => {
            const wrapper = factory({
                mode: CalendarMode.RANGE,
                modelValue: { start: '2026-10-10', end: '2026-10-14' },
                isRounded: true,
            })

            expect(dayButton(wrapper, '2026-10-10').classes()).toContain('rounded-l-full')
            expect(dayButton(wrapper, '2026-10-14').classes()).toContain('rounded-r-full')
            expect(dayButton(wrapper, '2026-10-12').classes().join(' ')).not.toContain('rounded')
        })
    })

    describe('disabled', () => {
        it('disables every control and ignores clicks', async () => {
            const wrapper = factory({ disabled: true })

            expect(wrapper.classes()).toContain('opacity-disabled')
            expect(wrapper.findAll('button').every((button) => button.attributes('disabled') !== undefined)).toBe(true)

            await dayButton(wrapper, '2026-10-20').trigger('click')
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })

    describe('isNavigationLocked', () => {
        it('disables the arrows, the year controls and the month and year buttons', () => {
            const wrapper = factory({ isNavigationLocked: true, hasYearControls: true })

            expect(
                wrapper
                    .findAll('button')
                    .slice(0, 6)
                    .every((button) => button.attributes('disabled') !== undefined),
            ).toBe(true)
            expect(buttonByText(wrapper, 'October').attributes('disabled')).toBeDefined()
            expect(buttonByText(wrapper, '2026').attributes('disabled')).toBeDefined()
        })

        it('still selects days of the visible month', async () => {
            const wrapper = factory({ isNavigationLocked: true })

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20'])
        })

        it('does not select days of adjacent months', async () => {
            const wrapper = factory({ isNavigationLocked: true })

            await dayButton(wrapper, '2026-11-01').trigger('click')

            expect(dayButton(wrapper, '2026-11-01').attributes('aria-disabled')).toBe('true')
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })

        it('does not move the focus out of the month with the keyboard', async () => {
            const wrapper = factory({ isNavigationLocked: true, modelValue: '2026-10-31' })

            await dayButton(wrapper, '2026-10-31').trigger('keydown', { key: 'ArrowRight' })
            await dayButton(wrapper, '2026-10-31').trigger('keydown', { key: 'PageDown' })

            expect(wrapper.text()).toContain('October')
            expect(dayButton(wrapper, '2026-10-31').attributes('tabindex')).toBe('0')
        })

        it('still moves the focus inside the month', async () => {
            const wrapper = factory({ isNavigationLocked: true })

            await dayButton(wrapper, '2026-10-15').trigger('keydown', { key: 'ArrowRight' })

            expect(dayButton(wrapper, '2026-10-16').attributes('tabindex')).toBe('0')
        })
    })

    describe('readonly', () => {
        it('does not select but still navigates', async () => {
            const wrapper = factory({ readonly: true })

            await dayButton(wrapper, '2026-10-20').trigger('click')
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
            expect(wrapper.find('[role="grid"]').attributes('aria-readonly')).toBe('true')
        })

        it('has no interactive cursor or range preview on the days', async () => {
            const wrapper = factory({
                readonly: true,
                min: '2026-10-10',
                mode: CalendarMode.RANGE,
                modelValue: { start: '2026-10-12', end: null },
            })

            expect(dayButton(wrapper, '2026-10-20').classes()).toContain('cursor-default')
            expect(dayButton(wrapper, '2026-10-05').classes()).toContain('cursor-default')

            await dayButton(wrapper, '2026-10-18').trigger('mouseenter')
            expect(dayButton(wrapper, '2026-10-15').classes()).not.toContain('bg-background-primary-brand-soft')

            await buttonByLabel(wrapper, 'Next month').trigger('click')
            expect(wrapper.text()).toContain('November')
        })
    })

    it('removes the padding when not boxed', () => {
        expect(factory().classes()).toContain('p-3')
        expect(factory({ isBoxed: false }).classes()).not.toContain('p-3')
    })

    it('adds the border classes only when isBoxed', () => {
        expect(factory().classes()).toContain('border')
        expect(factory({ isBoxed: false }).classes()).not.toContain('border')
    })

    it('formats names with the given locale', () => {
        const wrapper = factory({ locale: 'es-ES' })

        expect(wrapper.text().toLowerCase()).toContain('octubre')
    })

    it('uses the DS config texts for the navigation labels', () => {
        const wrapper = factory()

        expect(buttonByLabel(wrapper, 'Previous month').exists()).toBe(true)
        expect(buttonByLabel(wrapper, 'Next month').exists()).toBe(true)
    })

    describe('week mode', () => {
        const week = (props: Record<string, any> = {}) =>
            factory({ mode: CalendarMode.WEEK, modelValue: '2026-W41', ...props })

        it('selects the whole ISO week of the clicked day', async () => {
            const wrapper = week()

            await dayButton(wrapper, '2026-10-21').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-W43'])
        })

        it('highlights the seven days of the selected week, Monday to Sunday', () => {
            const wrapper = week()
            const selected = wrapper.findAll('[aria-selected="true"]').map((day) => day.attributes('data-date'))

            expect(selected).toEqual([
                '2026-10-05',
                '2026-10-06',
                '2026-10-07',
                '2026-10-08',
                '2026-10-09',
                '2026-10-10',
                '2026-10-11',
            ])
        })

        it('rounds only the ends of the week', () => {
            const wrapper = week({ isRounded: true })

            expect(dayButton(wrapper, '2026-10-05').classes()).toContain('rounded-l-full')
            expect(dayButton(wrapper, '2026-10-11').classes()).toContain('rounded-r-full')
            expect(dayButton(wrapper, '2026-10-07').classes().join(' ')).not.toContain('rounded')
        })

        it('always starts the week on Monday', () => {
            const wrapper = week({ firstDayOfWeek: 0 })

            expect(wrapper.findAll('[role="columnheader"]')[0]!.attributes('abbr')).toBe('Monday')
        })

        it('does not select days outside min and max', async () => {
            const wrapper = week({ min: '2026-W42' })

            await dayButton(wrapper, '2026-10-06').trigger('click')

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })

    describe('week numbers', () => {
        it('shows the ISO week number of each row', () => {
            const wrapper = factory({ hasWeekNumbers: true, firstDayOfWeek: 1 })
            const numbers = wrapper.findAll('[role="rowheader"]').map((cell) => cell.text())

            expect(numbers).toEqual(['40', '41', '42', '43', '44', '45'])
            expect(wrapper.findAll('[role="columnheader"]')[0]!.text()).toBe('Wk')
        })

        it('is hidden by default', () => {
            expect(factory().findAll('[role="rowheader"]')).toHaveLength(0)
        })
    })

    describe('month mode', () => {
        const month = (props: Record<string, any> = {}) =>
            factory({ mode: CalendarMode.MONTH, modelValue: '2026-10', ...props })

        it('starts on the months and highlights the selected one', () => {
            const wrapper = month()

            expect(wrapper.find('[role="grid"]').exists()).toBe(false)
            expect(buttonByText(wrapper, 'Oct').attributes('aria-current')).toBe('true')
        })

        it('emits YYYY-MM when a month is picked and keeps showing the months', async () => {
            const wrapper = month()

            await buttonByText(wrapper, 'Mar').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-03'])
            expect(wrapper.find('[role="grid"]').exists()).toBe(false)
        })

        it('picks a year and goes back to the months', async () => {
            const wrapper = month()

            await buttonByText(wrapper, '2026').trigger('click')
            await buttonByText(wrapper, '2020').trigger('click')

            expect(buttonByText(wrapper, 'Jan').exists()).toBe(true)
            expect(wrapper.text()).toContain('2020')
            expect(wrapper.find('[role="grid"]').exists()).toBe(false)
        })

        it('uses months as min and max', () => {
            const wrapper = month({ min: '2026-03', max: '2026-10' })

            expect(buttonByText(wrapper, 'Feb').attributes('disabled')).toBeDefined()
            expect(buttonByText(wrapper, 'Mar').attributes('disabled')).toBeUndefined()
            expect(buttonByText(wrapper, 'Oct').attributes('disabled')).toBeUndefined()
            expect(buttonByText(wrapper, 'Nov').attributes('disabled')).toBeDefined()
        })

        it('does not emit when readonly', async () => {
            const wrapper = month({ readonly: true })

            await buttonByText(wrapper, 'Mar').trigger('click')

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })
})
