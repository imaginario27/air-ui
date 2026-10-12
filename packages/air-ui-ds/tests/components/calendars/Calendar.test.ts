import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Calendar from '@/components/calendars/Calendar.vue'
import { CalendarMode, CalendarUnit } from '@/models/enums/calendars'
import { ColorAccent } from '@/models/enums/colors'
import { Trigger } from '@/models/enums/triggers'
import { Align, Position } from '@/models/enums/positions'

const factory = (props: Record<string, any> = {}) =>
    mount(Calendar, {
        props: { modelValue: '2026-10-15', ...props },
        attachTo: document.body,
    })

const buttonByLabel = (wrapper: ReturnType<typeof factory>, label: string) =>
    wrapper.find(`button[aria-label="${label}"]`)

const buttonByText = (wrapper: ReturnType<typeof factory>, text: string) =>
    wrapper.findAll('button').find((button) => button.text() === text)!

// The pointer enters the cell of the day (mouseenter does not bubble from the button)
const hoverDay = async (wrapper: ReturnType<typeof factory>, iso: string) => {
    dayButton(wrapper, iso).element.parentElement!.dispatchEvent(new MouseEvent('mouseenter'))
    await nextTick()
}

const leaveDay = async (wrapper: ReturnType<typeof factory>, iso: string) => {
    dayButton(wrapper, iso).element.parentElement!.dispatchEvent(new MouseEvent('mouseleave'))
    await nextTick()
}

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
            ['primary-brand', 'bg-background-primary-brand-active'],
            ['secondary-brand', 'bg-background-secondary-brand-default'],
        ])('colors the selected day for %s', (color, expected) => {
            const wrapper = factory({ color })

            expect(dayButton(wrapper, '2026-10-15').classes()).toContain(expected)
        })

        it('falls back to primary brand for an unknown color', () => {
            const wrapper = factory({ color: 'unknown' })

            expect(dayButton(wrapper, '2026-10-15').classes()).toContain('bg-background-primary-brand-active')
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

            await hoverDay(wrapper, '2026-10-18')
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
            factory({ unit: CalendarUnit.WEEK, modelValue: '2026-W41', ...props })

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
            factory({ unit: CalendarUnit.MONTH, modelValue: '2026-10', ...props })

        it('starts on the months and highlights the selected one', () => {
            const wrapper = month()

            expect(wrapper.find('[role="grid"]').exists()).toBe(false)
            expect(buttonByText(wrapper, 'Oct').attributes('aria-pressed')).toBe('true')
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

    describe('unit and mode combine', () => {
        const buttonsText = (wrapper: ReturnType<typeof factory>) =>
            wrapper.findAll('button').map((button) => button.text())

        describe('weeks', () => {
            it('picks several weeks in multiple mode', async () => {
                const wrapper = factory({
                    unit: CalendarUnit.WEEK,
                    mode: CalendarMode.MULTIPLE,
                    modelValue: ['2026-W41'],
                })

                await dayButton(wrapper, '2026-10-20').trigger('click')
                expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2026-W41', '2026-W43']])

                await dayButton(wrapper, '2026-10-07').trigger('click')
                expect(wrapper.emitted('update:modelValue')![1]).toEqual([[]])
            })

            it('highlights every selected week', () => {
                const wrapper = factory({
                    unit: CalendarUnit.WEEK,
                    mode: CalendarMode.MULTIPLE,
                    modelValue: ['2026-W41', '2026-W43'],
                })
                const selected = wrapper.findAll('[aria-selected="true"]').map((day) => day.attributes('data-date'))

                expect(selected).toHaveLength(14)
                expect(selected).toContain('2026-10-05')
                expect(selected).toContain('2026-10-25')
                expect(selected).not.toContain('2026-10-14')
            })

            it('picks a range of weeks', async () => {
                const wrapper = factory({
                    unit: CalendarUnit.WEEK,
                    mode: CalendarMode.RANGE,
                    modelValue: { start: '2026-W41', end: null },
                })

                await dayButton(wrapper, '2026-10-21').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-W41', end: '2026-W43' }])
            })

            it('fills the weeks at the ends of the range and softens the ones between', () => {
                const wrapper = factory({
                    unit: CalendarUnit.WEEK,
                    mode: CalendarMode.RANGE,
                    modelValue: { start: '2026-W41', end: '2026-W43' },
                })

                expect(dayButton(wrapper, '2026-10-05').attributes('aria-selected')).toBe('true')
                expect(dayButton(wrapper, '2026-10-11').attributes('aria-selected')).toBe('true')
                expect(dayButton(wrapper, '2026-10-14').attributes('aria-selected')).toBe('false')
                expect(dayButton(wrapper, '2026-10-14').classes()).toContain('bg-background-primary-brand-soft')
                expect(dayButton(wrapper, '2026-10-20').attributes('aria-selected')).toBe('true')
            })

            it('previews the range of weeks with the hovered week', async () => {
                const wrapper = factory({
                    unit: CalendarUnit.WEEK,
                    mode: CalendarMode.RANGE,
                    modelValue: { start: '2026-W41', end: null },
                })

                await hoverDay(wrapper, '2026-10-22')

                expect(dayButton(wrapper, '2026-10-14').classes()).toContain('bg-background-primary-brand-soft')
                expect(dayButton(wrapper, '2026-10-22').attributes('aria-selected')).toBe('true')
            })

            it('rounds only the ends of the whole range band', () => {
                const wrapper = factory({
                    unit: CalendarUnit.WEEK,
                    mode: CalendarMode.RANGE,
                    isRounded: true,
                    modelValue: { start: '2026-W41', end: '2026-W42' },
                })

                expect(dayButton(wrapper, '2026-10-05').classes()).toContain('rounded-l-full')
                expect(dayButton(wrapper, '2026-10-18').classes()).toContain('rounded-r-full')
                expect(dayButton(wrapper, '2026-10-11').classes().join(' ')).not.toContain('rounded')
            })

            it('ignores values that are not weeks', () => {
                const wrapper = factory({ unit: CalendarUnit.WEEK, modelValue: '2026-10-15' })

                expect(wrapper.findAll('[aria-selected="true"]')).toHaveLength(0)
            })
        })

        describe('months', () => {
            const monthsMode = (mode: CalendarMode, modelValue: unknown) =>
                factory({ unit: CalendarUnit.MONTH, mode, modelValue })

            it('picks several months in multiple mode', async () => {
                const wrapper = monthsMode(CalendarMode.MULTIPLE, ['2026-10'])

                await buttonByText(wrapper, 'Mar').trigger('click')
                expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2026-03', '2026-10']])

                await buttonByText(wrapper, 'Oct').trigger('click')
                expect(wrapper.emitted('update:modelValue')![1]).toEqual([[]])
            })

            it('marks every selected month', () => {
                const wrapper = monthsMode(CalendarMode.MULTIPLE, ['2026-03', '2026-10'])

                expect(buttonByText(wrapper, 'Mar').attributes('aria-pressed')).toBe('true')
                expect(buttonByText(wrapper, 'Apr').attributes('aria-pressed')).toBe('false')
                expect(buttonByText(wrapper, 'Oct').attributes('aria-pressed')).toBe('true')
            })

            it('picks a range of months', async () => {
                const wrapper = monthsMode(CalendarMode.RANGE, { start: '2026-03', end: null })

                await buttonByText(wrapper, 'Jun').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-03', end: '2026-06' }])
            })

            it('restarts the range of months when clicking before the start', async () => {
                const wrapper = monthsMode(CalendarMode.RANGE, { start: '2026-06', end: null })

                await buttonByText(wrapper, 'Mar').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-03', end: null }])
            })

            it('fills the ends of the range of months and softens the ones between', () => {
                const wrapper = monthsMode(CalendarMode.RANGE, { start: '2026-03', end: '2026-06' })

                expect(buttonByText(wrapper, 'Mar').attributes('aria-pressed')).toBe('true')
                expect(buttonByText(wrapper, 'Jun').attributes('aria-pressed')).toBe('true')
                expect(buttonByText(wrapper, 'Apr').attributes('aria-pressed')).toBe('false')
                expect(buttonByText(wrapper, 'Apr').classes()).toContain('bg-background-primary-brand-soft')
                expect(buttonByText(wrapper, 'Jul').classes()).not.toContain('bg-background-primary-brand-soft')
            })

            it('previews the range of months with the hovered month', async () => {
                const wrapper = monthsMode(CalendarMode.RANGE, { start: '2026-03', end: null })

                await buttonByText(wrapper, 'Jun').trigger('mouseenter')

                expect(buttonByText(wrapper, 'Apr').classes()).toContain('bg-background-primary-brand-soft')
                expect(buttonByText(wrapper, 'Jun').attributes('aria-pressed')).toBe('true')
            })

            it('does not preview the range when readonly', async () => {
                const wrapper = factory({
                    unit: CalendarUnit.MONTH,
                    mode: CalendarMode.RANGE,
                    readonly: true,
                    modelValue: { start: '2026-03', end: null },
                })

                await buttonByText(wrapper, 'Jun').trigger('mouseenter')

                expect(buttonByText(wrapper, 'Apr').classes()).not.toContain('bg-background-primary-brand-soft')
            })

            it('keeps showing the months and goes back to them after picking a year', async () => {
                const wrapper = monthsMode(CalendarMode.MULTIPLE, ['2026-10'])

                await buttonByText(wrapper, '2026').trigger('click')
                await buttonByText(wrapper, '2020').trigger('click')

                expect(buttonsText(wrapper)).toContain('Jan')
                expect(wrapper.find('[role="grid"]').exists()).toBe(false)
            })

            it('picks months of other years', async () => {
                const wrapper = monthsMode(CalendarMode.RANGE, { start: '2026-10', end: null })

                await buttonByLabel(wrapper, 'Next year').trigger('click')
                await buttonByText(wrapper, 'Feb').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10', end: '2027-02' }])
            })
        })

        it('keeps the day unit as the default for every mode', async () => {
            const wrapper = factory({ mode: CalendarMode.RANGE, modelValue: { start: '2026-10-10', end: null } })

            await dayButton(wrapper, '2026-10-14').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10-10', end: '2026-10-14' }])
        })
    })

    describe('markers', () => {
        const markers = {
            '2026-10-15': [{ color: ColorAccent.DANGER, label: 'Deploy' }],
            '2026-10-20': [{ label: 'One' }, { label: 'Two' }, { label: 'Three' }, { label: 'Four' }],
        }

        const dots = (wrapper: ReturnType<typeof factory>, iso: string) =>
            dayButton(wrapper, iso).findAll('span.rounded-full')

        it('shows a dot under the days that have markers', () => {
            const wrapper = factory({ markers, modelValue: null })

            expect(dots(wrapper, '2026-10-15')).toHaveLength(1)
            expect(dots(wrapper, '2026-10-16')).toHaveLength(0)
        })

        it('colors each dot with its accent and falls back to primary brand', () => {
            const wrapper = factory({ markers, modelValue: null })

            expect(dots(wrapper, '2026-10-15')[0]!.classes()).toContain('bg-icon-danger')
            expect(dots(wrapper, '2026-10-20')[0]!.classes()).toContain('bg-icon-primary-brand-default')
        })

        it('shows at most maxMarkers dots', () => {
            const wrapper = factory({ markers, modelValue: null })

            expect(dots(wrapper, '2026-10-20')).toHaveLength(3)
            expect(dots(factory({ markers, modelValue: null, maxMarkers: 1 }), '2026-10-20')).toHaveLength(1)
        })

        it('uses the on-filled color on a selected day', () => {
            const wrapper = factory({ markers })

            expect(dots(wrapper, '2026-10-15')[0]!.classes()).toContain('bg-text-neutral-on-filled')
        })

        it('adds the labels of all the markers to the aria-label of the day', () => {
            const wrapper = factory({ markers, modelValue: null })

            expect(dayButton(wrapper, '2026-10-15').attributes('aria-label')).toMatch(/, Deploy$/)
            expect(dayButton(wrapper, '2026-10-20').attributes('aria-label')).toMatch(/, One, Two, Three, Four$/)
            expect(dayButton(wrapper, '2026-10-16').attributes('aria-label')).not.toContain(',,')
        })

        it('does not change the layout of the grid', () => {
            const wrapper = factory({ markers })

            expect(wrapper.findAll('[role="gridcell"]')).toHaveLength(42)
        })
    })

    describe('events', () => {
        it('emits day-click with the date, key and disabled state, also for disabled days', async () => {
            const wrapper = factory({ min: '2026-10-10' })

            await dayButton(wrapper, '2026-10-20').trigger('click')
            await dayButton(wrapper, '2026-10-05').trigger('click')

            expect(wrapper.emitted('day-click')).toEqual([
                [{ date: '2026-10-20', key: '2026-10-20', isDisabled: false }],
                [{ date: '2026-10-05', key: '2026-10-05', isDisabled: true }],
            ])
        })

        it('emits the key of the unit the day belongs to', async () => {
            const wrapper = factory({ unit: CalendarUnit.WEEK })

            await dayButton(wrapper, '2026-10-21').trigger('click')

            expect(wrapper.emitted('day-click')![0]).toEqual([
                { date: '2026-10-21', key: '2026-W43', isDisabled: false },
            ])
        })

        it('still emits day-click when readonly', async () => {
            const wrapper = factory({ readonly: true })

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.emitted('day-click')).toHaveLength(1)
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })

        it('emits day-hover when the pointer enters a day and day-hover-end when it leaves the grid', async () => {
            const wrapper = factory()

            await hoverDay(wrapper, '2026-10-20')
            expect(wrapper.emitted('day-hover')![0]).toEqual([
                { date: '2026-10-20', key: '2026-10-20', isDisabled: false },
            ])

            await wrapper.find('[role="grid"]').trigger('mouseleave')
            expect(wrapper.emitted('day-hover-end')).toHaveLength(1)
        })

        it('emits month-change with the visible month and its first and last day', async () => {
            const wrapper = factory()

            await buttonByLabel(wrapper, 'Next month').trigger('click')

            expect(wrapper.emitted('month-change')![0]).toEqual([
                { year: 2026, month: 11, from: '2026-11-01', to: '2026-11-30' },
            ])
        })

        it('emits month-change when the month changes with the keyboard or the pickers', async () => {
            const wrapper = factory({ modelValue: '2026-10-31' })

            await dayButton(wrapper, '2026-10-31').trigger('keydown', { key: 'ArrowRight' })
            expect(wrapper.emitted('month-change')![0]).toEqual([
                { year: 2026, month: 11, from: '2026-11-01', to: '2026-11-30' },
            ])

            await buttonByText(wrapper, 'November').trigger('click')
            await buttonByText(wrapper, 'Feb').trigger('click')
            expect(wrapper.emitted('month-change')![1]![0]).toMatchObject({ year: 2026, month: 2 })
        })

        it('does not emit month-change on mount', () => {
            expect(factory().emitted('month-change')).toBeUndefined()
        })
    })

    describe('day popover', () => {
        const markers = { '2026-10-15': [{ label: 'Deploy' }], '2026-10-20': [{ label: 'Review' }] }

        const withPopover = (props: Record<string, any> = {}) =>
            mount(Calendar, {
                props: { modelValue: null, markers, dayPopoverTrigger: Trigger.CLICK, ...props },
                slots: {
                    'day-popover': `<template #day-popover="{ date, markers, close }">
                        <p data-test="content">{{ date }}: {{ markers.map((marker) => marker.label).join() }}</p>
                        <button data-test="close" @click="close">Close</button>
                    </template>`,
                },
                attachTo: document.body,
                global: { stubs: { transition: true } },
            })

        const popover = (wrapper: ReturnType<typeof withPopover>) => wrapper.find('[role="dialog"]')

        describe('click trigger', () => {
            it('opens for a day with markers and renders the slot with the date and markers', async () => {
                const wrapper = withPopover()

                await dayButton(wrapper, '2026-10-15').trigger('click')

                expect(popover(wrapper).exists()).toBe(true)
                expect(wrapper.find('[data-test="content"]').text()).toBe('2026-10-15: Deploy')
                expect(dayButton(wrapper, '2026-10-15').attributes('aria-haspopup')).toBe('dialog')
                expect(dayButton(wrapper, '2026-10-15').attributes('aria-expanded')).toBe('true')
            })

            it('does not open for a day without markers', async () => {
                const wrapper = withPopover()

                await dayButton(wrapper, '2026-10-16').trigger('click')

                expect(popover(wrapper).exists()).toBe(false)
                expect(dayButton(wrapper, '2026-10-16').attributes('aria-haspopup')).toBeUndefined()
            })

            it('toggles on the same day and moves to another one', async () => {
                const wrapper = withPopover()

                await dayButton(wrapper, '2026-10-15').trigger('click')
                await dayButton(wrapper, '2026-10-20').trigger('click')
                expect(wrapper.find('[data-test="content"]').text()).toBe('2026-10-20: Review')

                await dayButton(wrapper, '2026-10-20').trigger('click')
                expect(popover(wrapper).exists()).toBe(false)
            })

            it('closes when clicking a day without a popover', async () => {
                const wrapper = withPopover()
                await dayButton(wrapper, '2026-10-15').trigger('click')

                await dayButton(wrapper, '2026-10-16').trigger('click')

                expect(popover(wrapper).exists()).toBe(false)
            })

            it('still selects the day', async () => {
                const wrapper = withPopover()

                await dayButton(wrapper, '2026-10-15').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-15'])
            })

            it('opens when readonly, since it only shows information', async () => {
                const wrapper = withPopover({ readonly: true })

                await dayButton(wrapper, '2026-10-15').trigger('click')

                expect(popover(wrapper).exists()).toBe(true)
                expect(wrapper.emitted('update:modelValue')).toBeUndefined()
            })

            it('closes with the close function of the slot', async () => {
                const wrapper = withPopover()
                await dayButton(wrapper, '2026-10-15').trigger('click')

                await wrapper.find('[data-test="close"]').trigger('click')

                expect(popover(wrapper).exists()).toBe(false)
            })

            it('closes with Escape, returns the focus to the day and keeps the event from bubbling', async () => {
                const parentKeydown = vi.fn()
                const wrapper = withPopover()
                wrapper.element.parentElement!.addEventListener('keydown', parentKeydown)
                await dayButton(wrapper, '2026-10-15').trigger('click')

                await wrapper.find('[data-test="content"]').trigger('keydown', { key: 'Escape' })

                expect(popover(wrapper).exists()).toBe(false)
                expect(parentKeydown).not.toHaveBeenCalled()
            })

            it('lets Escape bubble when no popover is open', async () => {
                const parentKeydown = vi.fn()
                const wrapper = withPopover()
                wrapper.element.parentElement!.addEventListener('keydown', parentKeydown)

                await dayButton(wrapper, '2026-10-15').trigger('keydown', { key: 'Escape' })

                expect(parentKeydown).toHaveBeenCalled()
            })

            it('closes when the visible month changes', async () => {
                const wrapper = withPopover()
                await dayButton(wrapper, '2026-10-15').trigger('click')

                await buttonByLabel(wrapper, 'Next month').trigger('click')

                expect(popover(wrapper).exists()).toBe(false)
            })

            it('closes when clicking outside', async () => {
                const wrapper = withPopover()
                await dayButton(wrapper, '2026-10-15').trigger('click')

                // The click inside and the one outside are in different ticks, as they are for a user
                await new Promise((resolve) => setTimeout(resolve, 0))
                document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
                await nextTick()

                expect(popover(wrapper).exists()).toBe(false)
            })

            it('does not use the arrow keys typed inside the popover to move the days', async () => {
                const wrapper = withPopover()
                await dayButton(wrapper, '2026-10-15').trigger('click')

                await wrapper.find('[data-test="content"]').trigger('keydown', { key: 'ArrowRight' })

                expect(dayButton(wrapper, '2026-10-15').attributes('tabindex')).toBe('0')
            })

            it('aligns the popover of the first and last columns inwards', async () => {
                const wrapper = withPopover({ markers: { '2026-10-11': [{}], '2026-10-17': [{}], '2026-10-14': [{}] } })

                await dayButton(wrapper, '2026-10-11').trigger('click')
                expect(popover(wrapper).element.parentElement!.classList).toContain('left-0')

                await dayButton(wrapper, '2026-10-17').trigger('click')
                expect(popover(wrapper).element.parentElement!.classList).toContain('right-0')

                await dayButton(wrapper, '2026-10-14').trigger('click')
                expect(popover(wrapper).element.parentElement!.classList).toContain('left-1/2')
            })
        })

        describe('hover trigger', () => {
            const hoverPopover = (props: Record<string, any> = {}) =>
                withPopover({ dayPopoverTrigger: Trigger.HOVER, ...props })

            beforeEach(() => vi.useFakeTimers())
            afterEach(() => vi.useRealTimers())

            it('opens when the pointer enters a day with markers and not on click', async () => {
                const wrapper = hoverPopover()

                await dayButton(wrapper, '2026-10-16').trigger('click')
                expect(popover(wrapper).exists()).toBe(false)

                await hoverDay(wrapper, '2026-10-15')
                expect(popover(wrapper).exists()).toBe(true)
            })

            it('closes shortly after the pointer leaves, and stays open if it comes back', async () => {
                const wrapper = hoverPopover()
                await hoverDay(wrapper, '2026-10-15')

                await leaveDay(wrapper, '2026-10-15')
                await hoverDay(wrapper, '2026-10-15')
                vi.advanceTimersByTime(300)
                await nextTick()
                expect(popover(wrapper).exists()).toBe(true)

                await leaveDay(wrapper, '2026-10-15')
                vi.advanceTimersByTime(200)
                await nextTick()
                expect(popover(wrapper).exists()).toBe(false)
            })

            it('opens with the keyboard focus on the day', async () => {
                const wrapper = hoverPopover()

                await dayButton(wrapper, '2026-10-15').trigger('focusin')

                expect(popover(wrapper).exists()).toBe(true)
            })

            it('moves to the next day with a popover', async () => {
                const wrapper = hoverPopover()
                await hoverDay(wrapper, '2026-10-15')

                await leaveDay(wrapper, '2026-10-15')
                await hoverDay(wrapper, '2026-10-20')

                expect(wrapper.find('[data-test="content"]').text()).toBe('2026-10-20: Review')
            })
        })

        describe('configuration', () => {
            it('is off by default', async () => {
                const wrapper = withPopover({ dayPopoverTrigger: undefined })

                await dayButton(wrapper, '2026-10-15').trigger('click')
                await hoverDay(wrapper, '2026-10-15')

                expect(popover(wrapper).exists()).toBe(false)
            })

            it('needs the slot', async () => {
                const wrapper = factory({ markers, dayPopoverTrigger: Trigger.CLICK })

                await dayButton(wrapper, '2026-10-15').trigger('click')

                expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
            })

            it('uses hasDayPopover instead of the markers when given', async () => {
                const wrapper = withPopover({ hasDayPopover: (date: string) => date === '2026-10-16' })

                await dayButton(wrapper, '2026-10-15').trigger('click')
                expect(popover(wrapper).exists()).toBe(false)

                await dayButton(wrapper, '2026-10-16').trigger('click')
                expect(popover(wrapper).exists()).toBe(true)
            })

            it('does not open when disabled', async () => {
                const wrapper = withPopover({ disabled: true })

                await dayButton(wrapper, '2026-10-15').trigger('click')

                expect(popover(wrapper).exists()).toBe(false)
            })
        })
    })

    describe('day popover placement', () => {
        const markers = { '2026-10-15': [{ label: 'Deploy' }], '2026-10-11': [{ label: 'Edge' }] }

        const withPopover = (props: Record<string, any> = {}) =>
            mount(Calendar, {
                props: { modelValue: null, markers, dayPopoverTrigger: Trigger.CLICK, ...props },
                slots: { 'day-popover': '<template #day-popover="{ date }"><p>{{ date }}</p></template>' },
                attachTo: document.body,
                global: { stubs: { transition: true } },
            })

        const open = async (wrapper: ReturnType<typeof withPopover>, iso = '2026-10-15') => {
            await dayButton(wrapper, iso).trigger('click')
            await nextTick()
            await nextTick()
        }

        const panel = (wrapper: ReturnType<typeof withPopover>) =>
            wrapper.find('[role="dialog"]').element.parentElement!

        // jsdom has no layout: the rectangles of the day cell and of the popover are made up
        const mockLayout = (cell: Partial<DOMRect>, panelRect: (placement: 'top' | 'bottom') => Partial<DOMRect>) => {
            Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
            Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })

            return vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
                this: HTMLElement,
            ) {
                const rect = this.classList.contains('z-50')
                    ? panelRect(this.classList.contains('bottom-full') ? 'top' : 'bottom')
                    : this.getAttribute('role') === 'presentation'
                      ? cell
                      : {}

                return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, ...rect } as DOMRect
            })
        }

        afterEach(() => vi.restoreAllMocks())

        it('opens below the day and centered by default', async () => {
            const wrapper = withPopover()

            await open(wrapper)

            expect(panel(wrapper).classList).toContain('top-full')
            expect(panel(wrapper).classList).toContain('left-1/2')
        })

        it('opens above the day with dayPopoverPosition top', async () => {
            const wrapper = withPopover({ dayPopoverPosition: Position.TOP })

            await open(wrapper)

            expect(panel(wrapper).classList).toContain('bottom-full')
            expect(panel(wrapper).classList).not.toContain('top-full')
        })

        it.each([
            [Align.LEFT, 'left-0'],
            [Align.CENTER, 'left-1/2'],
            [Align.RIGHT, 'right-0'],
        ])('aligns the popover to %s whatever the column is', async (align, expected) => {
            const wrapper = withPopover({ dayPopoverAlign: align })

            await open(wrapper, '2026-10-11')

            expect(panel(wrapper).classList).toContain(expected)
        })

        describe('flip', () => {
            // The day is near the bottom of an 800px window, with 700px of room above
            const nearBottom = { top: 700, bottom: 740, left: 400, right: 440 }
            const tall = (placement: 'top' | 'bottom') =>
                placement === 'bottom'
                    ? { top: 745, bottom: 945, left: 300, right: 500 }
                    : { top: 495, bottom: 695, left: 300, right: 500 }

            it('flips to the top when it does not fit below and there is more room above', async () => {
                mockLayout(nearBottom, tall)
                const wrapper = withPopover()

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('bottom-full')
                expect(panel(wrapper).classList).not.toContain('top-full')
            })

            it('does not flip with dayPopoverAutoFlip off', async () => {
                mockLayout(nearBottom, tall)
                const wrapper = withPopover({ dayPopoverAutoFlip: false })

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('top-full')
            })

            it('does not flip when it fits', async () => {
                mockLayout({ top: 100, bottom: 140, left: 400, right: 440 }, () => ({
                    top: 145,
                    bottom: 345,
                    left: 300,
                    right: 500,
                }))
                const wrapper = withPopover()

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('top-full')
            })

            it('does not flip when there is no more room on the other side', async () => {
                mockLayout({ top: 20, bottom: 60, left: 400, right: 440 }, () => ({
                    top: 65,
                    bottom: 865,
                    left: 300,
                    right: 500,
                }))
                const wrapper = withPopover()

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('top-full')
            })

            it('flips back to the bottom when a popover on top is cut by the window', async () => {
                mockLayout({ top: 30, bottom: 70, left: 400, right: 440 }, (placement) =>
                    placement === 'top'
                        ? { top: -170, bottom: 25, left: 300, right: 500 }
                        : { top: 75, bottom: 275, left: 300, right: 500 },
                )
                const wrapper = withPopover({ dayPopoverPosition: Position.TOP })

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('top-full')
            })

            it('aligns to the right when it overflows the right side of the window', async () => {
                mockLayout({ top: 100, bottom: 140, left: 900, right: 940 }, () => ({
                    top: 145,
                    bottom: 345,
                    left: 850,
                    right: 1060,
                }))
                const wrapper = withPopover()

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('right-0')
                expect(panel(wrapper).classList).not.toContain('left-1/2')
            })

            it('aligns to the left when it overflows the left side of the window', async () => {
                mockLayout({ top: 100, bottom: 140, left: 20, right: 60 }, () => ({
                    top: 145,
                    bottom: 345,
                    left: -40,
                    right: 170,
                }))
                const wrapper = withPopover({ dayPopoverAlign: Align.RIGHT })

                await open(wrapper)

                expect(panel(wrapper).classList).toContain('left-0')
            })

            it('measures again for the next day', async () => {
                mockLayout(nearBottom, tall)
                const wrapper = withPopover({ dayPopoverTrigger: Trigger.HOVER })

                await hoverDay(wrapper, '2026-10-15')
                await nextTick()
                await nextTick()
                expect(panel(wrapper).classList).toContain('bottom-full')

                vi.restoreAllMocks()
                await leaveDay(wrapper, '2026-10-15')
                await hoverDay(wrapper, '2026-10-11')
                await nextTick()
                await nextTick()

                expect(panel(wrapper).classList).toContain('top-full')
            })
        })
    })
})
