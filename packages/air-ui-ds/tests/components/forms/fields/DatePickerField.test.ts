import { mount } from '@vue/test-utils'
import { GlowColorMode, GlowTrigger } from '@/models/enums/glow'
import { nextTick, ref } from 'vue'
import DatePickerField from '@/components/forms/fields/DatePickerField.vue'
import { CalendarMode, CalendarUnit, PickerVariant } from '@/models/enums/calendars'
import { Position } from '@/models/enums/positions'
import { useDSConfig } from '@/composables/useDSConfig'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur'),
}))

const factory = (props: Record<string, any> = {}) =>
    mount(DatePickerField, {
        props: { id: 'date', modelValue: '2026-10-15', ...props },
        attachTo: document.body,
    })

const calendarExists = (wrapper: ReturnType<typeof factory>) => wrapper.findComponent({ name: 'Calendar' }).exists()

const dayButton = (wrapper: ReturnType<typeof factory>, iso: string) => wrapper.find(`[data-date="${iso}"]`)

describe('DatePickerField.vue', () => {
    describe('field', () => {
        it('renders the label linked to the input', () => {
            const wrapper = factory({ label: 'Birth date', required: true })

            expect(wrapper.find('label').text()).toBe('Birth date')
            expect(wrapper.find('label').attributes('for')).toBe('date')
        })

        it('shows the optional label unless required', () => {
            expect(factory({ label: 'Date' }).find('label').text()).toContain('(optional)')
            expect(factory({ label: 'Date', required: true }).find('label').text()).not.toContain('(optional)')
        })

        it('hides the optional label when showOptionalLabel is false', () => {
            expect(factory({ label: 'Date', showOptionalLabel: false }).find('label').text()).toBe('Date')
        })

        it('uses the aria-label when there is no label', () => {
            expect(factory({ ariaLabel: 'Pick a date' }).find('input').attributes('aria-label')).toBe('Pick a date')
        })

        it('shows help text and the error', () => {
            const wrapper = factory({ helpText: 'Hint' })
            expect(wrapper.find('p.text-xs').text()).toBe('Hint')

            const withError = factory({ error: 'Required field' })
            expect(withError.find('p.text-xs').text()).toBe('Required field')
        })

        it('renders the help text before the field when helpTextPosition is top', () => {
            const wrapper = factory({ label: 'Date', helpText: 'Hint', helpTextPosition: Position.TOP })
            const children = Array.from(wrapper.element.children as HTMLCollection)

            expect(children.findIndex((el) => el.classList.contains('text-xs'))).toBeLessThan(
                children.findIndex((el) => el.classList.contains('relative')),
            )
        })

        it('uses the DS config placeholder', () => {
            expect(factory({ modelValue: null }).find('input').attributes('placeholder')).toBe('Select a date')
        })

        it('applies the error border', () => {
            expect(factory({ error: 'Nope' }).find('div.border').classes()).toContain('border-border-error')
        })
    })

    describe('input variant', () => {
        it('shows the formatted date in a read-only text input', () => {
            const input = factory().find('input')

            expect(input.attributes('type')).toBe('text')
            expect(input.attributes('readonly')).toBeDefined()
            expect((input.element as HTMLInputElement).value).toBe('10/15/2026')
        })

        it('formats with locale and displayFormat', () => {
            const wrapper = factory({ locale: 'es-ES', displayFormat: { dateStyle: 'long' } })

            expect((wrapper.find('input').element as HTMLInputElement).value).toBe('15 de octubre de 2026')
        })

        it('opens the calendar from the input and from the button', async () => {
            const byInput = factory()
            await byInput.find('input').trigger('click')
            expect(calendarExists(byInput)).toBe(true)

            const byButton = factory()
            await byButton.find('button[aria-label="Open calendar"]').trigger('click')
            expect(calendarExists(byButton)).toBe(true)
        })

        it.each(['Enter', ' ', 'ArrowDown'])('opens the calendar with the %j key', async (key) => {
            const wrapper = factory()

            await wrapper.find('input').trigger('keydown', { key })

            expect(calendarExists(wrapper)).toBe(true)
        })

        it('closes with Escape', async () => {
            const wrapper = factory()
            await wrapper.find('input').trigger('click')

            await wrapper.find('input').trigger('keydown', { key: 'Escape' })

            expect(calendarExists(wrapper)).toBe(false)
        })

        it('emits the ISO date and closes when a day is picked', async () => {
            const wrapper = factory()
            await wrapper.find('input').trigger('click')

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20'])
            expect(calendarExists(wrapper)).toBe(false)
        })

        it('stays open after picking when closeOnSelect is false', async () => {
            const wrapper = factory({ closeOnSelect: false })
            await wrapper.find('input').trigger('click')

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(calendarExists(wrapper)).toBe(true)
        })

        it('passes the calendar props through', async () => {
            const wrapper = factory({
                min: '2026-10-10',
                max: '2026-10-20',
                color: 'secondary-brand',
                isRounded: true,
                hasYearControls: true,
                isNavigationLocked: true,
                firstDayOfWeek: 1,
            })
            await wrapper.find('input').trigger('click')

            const calendar = wrapper.findComponent({ name: 'Calendar' })

            expect(calendar.props()).toMatchObject({
                min: '2026-10-10',
                max: '2026-10-20',
                color: 'secondary-brand',
                isRounded: true,
                hasYearControls: true,
                isNavigationLocked: true,
                firstDayOfWeek: 1,
            })
        })

        it('positions the calendar above the input when calendarPosition is top', async () => {
            const wrapper = factory({ calendarPosition: Position.TOP })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'Calendar' }).element.closest('.absolute')!.classList).toContain(
                'bottom-full',
            )
        })

        it('clears the value', async () => {
            const wrapper = factory()

            await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([null])
        })

        it('hides the clear button when there is no value or clearable is false', () => {
            expect(factory({ modelValue: null }).find('button[aria-label="Clear selection"]').exists()).toBe(false)
            expect(factory({ clearable: false }).find('button[aria-label="Clear selection"]').exists()).toBe(false)
        })

        it.each([{ disabled: true }, { readonly: true }])('does not open when %j', async (props) => {
            const wrapper = factory(props)

            await wrapper.find('input').trigger('click')

            expect(calendarExists(wrapper)).toBe(false)
        })

        it('uses custom aria labels from the DS config and props', () => {
            const config = useDSConfig()
            config.calendar.openText = () => 'Abrir calendario'
            expect(factory().find('button[aria-label="Abrir calendario"]').exists()).toBe(true)
            config.calendar.openText = () => 'Open calendar'

            expect(factory({ openAriaLabel: 'Open it' }).find('button[aria-label="Open it"]').exists()).toBe(true)
        })
    })

    describe('modes', () => {
        it('shows a range and closes when both ends are picked', async () => {
            const wrapper = factory({
                mode: CalendarMode.RANGE,
                modelValue: { start: '2026-10-10', end: '2026-10-14' },
            })

            expect((wrapper.find('input').element as HTMLInputElement).value).toBe('10/10/2026 – 10/14/2026')

            await wrapper.setProps({ modelValue: { start: '2026-10-10', end: null } })
            expect((wrapper.find('input').element as HTMLInputElement).value).toBe('10/10/2026 –')

            await wrapper.find('input').trigger('click')
            await dayButton(wrapper, '2026-10-12').trigger('click')
            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-10-10', end: '2026-10-12' }])
            expect(calendarExists(wrapper)).toBe(false)
        })

        it('stays open after picking the start of a range', async () => {
            const wrapper = factory({ mode: CalendarMode.RANGE, modelValue: { start: null, end: null } })
            await wrapper.find('input').trigger('click')

            await dayButton(wrapper, '2026-10-10').trigger('click')

            expect(calendarExists(wrapper)).toBe(true)
        })

        it('lists the dates in multiple mode and never closes', async () => {
            const wrapper = factory({ mode: CalendarMode.MULTIPLE, modelValue: ['2026-10-10', '2026-10-15'] })

            expect((wrapper.find('input').element as HTMLInputElement).value).toBe('10/10/2026, 10/15/2026')

            await wrapper.find('input').trigger('click')
            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2026-10-10', '2026-10-15', '2026-10-20']])
            expect(calendarExists(wrapper)).toBe(true)
        })

        it('closes with the done button in multiple mode', async () => {
            const wrapper = factory({ mode: CalendarMode.MULTIPLE, modelValue: ['2026-10-10'] })
            await wrapper.find('input').trigger('click')

            const done = wrapper.findAll('button').find((button) => button.text() === 'Done')!
            await done.trigger('click')

            expect(calendarExists(wrapper)).toBe(false)
        })

        it('clears the dates with the clear button and keeps the panel open', async () => {
            const wrapper = factory({ mode: CalendarMode.MULTIPLE, modelValue: ['2026-10-10'] })
            await wrapper.find('input').trigger('click')

            const clear = wrapper.findAll('button').find((button) => button.text() === 'Clear')!
            await clear.trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([[]])
            expect(calendarExists(wrapper)).toBe(true)
        })

        it('hides the clear button until a date is selected', async () => {
            const wrapper = factory({ mode: CalendarMode.MULTIPLE, modelValue: [] })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findAll('button').some((button) => button.text() === 'Clear')).toBe(false)

            await wrapper.setProps({ modelValue: ['2026-10-10'] })

            expect(wrapper.findAll('button').some((button) => button.text() === 'Clear')).toBe(true)
        })

        it('uses doneText and clearText for the footer buttons', async () => {
            const wrapper = factory({
                mode: CalendarMode.MULTIPLE,
                modelValue: ['2026-10-10'],
                doneText: 'Listo',
                clearText: 'Limpiar',
            })
            await wrapper.find('input').trigger('click')

            const texts = wrapper.findAll('button').map((button) => button.text())
            expect(texts).toContain('Listo')
            expect(texts).toContain('Limpiar')
        })

        it('uses doneText for the done button', async () => {
            const wrapper = factory({ mode: CalendarMode.MULTIPLE, modelValue: [], doneText: 'Listo' })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findAll('button').some((button) => button.text() === 'Listo')).toBe(true)
        })

        it.each([CalendarMode.SINGLE, CalendarMode.RANGE])('has no done button in %s mode', async (mode) => {
            const wrapper = factory({
                mode,
                modelValue: mode === CalendarMode.RANGE ? { start: null, end: null } : null,
            })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findAll('button').some((button) => button.text() === 'Done')).toBe(false)
        })

        it.each([
            [CalendarMode.SINGLE, null],
            [CalendarMode.MULTIPLE, []],
            [CalendarMode.RANGE, { start: null, end: null }],
        ])('clears to the empty value of %s mode', async (mode, empty) => {
            const value = {
                [CalendarMode.SINGLE]: '2026-10-15',
                [CalendarMode.MULTIPLE]: ['2026-10-15'],
                [CalendarMode.RANGE]: { start: '2026-10-15', end: null },
            }[mode]
            const wrapper = factory({ mode, modelValue: value })

            await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([empty])
        })
    })

    describe('inline variant', () => {
        const inline = (props: Record<string, any> = {}) => factory({ variant: PickerVariant.INLINE, ...props })

        it('renders the calendar without an input and keeps the label and help text', () => {
            const wrapper = inline({ label: 'Date', helpText: 'Hint' })

            expect(calendarExists(wrapper)).toBe(true)
            expect(wrapper.find('input').exists()).toBe(false)
            expect(wrapper.find('label').exists()).toBe(false)
            expect(wrapper.text()).toContain('Date')
            expect(wrapper.find('p.text-xs').text()).toBe('Hint')
        })

        it('emits the selection', async () => {
            const wrapper = inline()

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20'])
        })

        it('names the calendar after the label', () => {
            expect(inline({ label: 'Birth date' }).findComponent({ name: 'Calendar' }).props('ariaLabel')).toBe(
                'Birth date',
            )
        })

        it('passes the calendar props through, including isBoxed', () => {
            const calendar = inline({ isBoxed: false, readonly: true, min: '2026-10-01' }).findComponent({
                name: 'Calendar',
            })

            expect(calendar.props()).toMatchObject({ isBoxed: false, readonly: true, min: '2026-10-01' })
        })

        it('highlights the calendar border on error', () => {
            const wrapper = inline({ error: 'Required' })

            expect(wrapper.findComponent({ name: 'Calendar' }).classes()).toContain('!border-border-error')
            expect(wrapper.find('p.text-xs').text()).toBe('Required')
        })
    })

    describe('validation', () => {
        it('validates when the value changes in blur mode', async () => {
            const validator = vi.fn(() => 'Required')
            const wrapper = factory({ required: true, validator, modelValue: null })

            await wrapper.setProps({ modelValue: '2026-10-20' })
            await nextTick()

            expect(validator).toHaveBeenCalledWith('2026-10-20')
            expect(wrapper.emitted('update:error')![0]).toEqual(['Required'])
        })

        it('validates when the calendar closes without a value', async () => {
            const validator = vi.fn(() => 'Required')
            const wrapper = factory({ required: true, validator, modelValue: null })
            await wrapper.find('input').trigger('click')

            await wrapper.find('input').trigger('keydown', { key: 'Escape' })

            expect(validator).toHaveBeenCalledWith(null)
        })

        it('does not validate when the field is not required', async () => {
            const validator = vi.fn(() => 'Required')
            const wrapper = factory({ validator, modelValue: null })

            await wrapper.setProps({ modelValue: '2026-10-20' })

            expect(validator).not.toHaveBeenCalled()
        })
    })

    describe('type', () => {
        const typed = (type: string, props: Record<string, any> = {}) => factory({ type, modelValue: null, ...props })

        const display = (wrapper: ReturnType<typeof factory>) =>
            (wrapper.find('input').element as HTMLInputElement).value

        describe('month', () => {
            it('shows the month and picks it from the months view', async () => {
                const wrapper = typed('month', { modelValue: '2026-10' })

                expect(display(wrapper)).toBe('October 2026')

                await wrapper.find('input').trigger('click')
                expect(wrapper.findComponent({ name: 'Calendar' }).props('unit')).toBe(CalendarUnit.MONTH)
                await wrapper
                    .findAll('button')
                    .find((button) => button.text() === 'Mar')!
                    .trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-03'])
                expect(calendarExists(wrapper)).toBe(false)
            })

            it('uses the month placeholder', () => {
                expect(typed('month').find('input').attributes('placeholder')).toBe('Select a month')
            })
        })

        describe('week', () => {
            it('shows the week and picks the whole ISO week of a day', async () => {
                const wrapper = typed('week', { modelValue: '2026-W41' })

                expect(display(wrapper)).toBe('Week 41, 2026')

                await wrapper.find('input').trigger('click')
                expect(wrapper.findComponent({ name: 'Calendar' }).props()).toMatchObject({
                    unit: CalendarUnit.WEEK,
                    hasWeekNumbers: true,
                })

                await dayButton(wrapper, '2026-10-21').trigger('click')
                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-W43'])
                expect(calendarExists(wrapper)).toBe(false)
            })

            it('uses the week placeholder', () => {
                expect(typed('week').find('input').attributes('placeholder')).toBe('Select a week')
            })
        })

        describe('datetime-local', () => {
            it('shows the date and the time and renders both pickers', async () => {
                const wrapper = typed('datetime-local', { modelValue: '2026-10-15T19:30', locale: 'es-ES' })

                expect(display(wrapper)).toBe('15/10/2026 19:30')

                await wrapper.find('input').trigger('click')
                expect(calendarExists(wrapper)).toBe(true)
                expect(wrapper.findComponent({ name: 'TimePicker' }).exists()).toBe(true)
            })

            it('keeps the time when a day is picked and stays open', async () => {
                const wrapper = typed('datetime-local', { modelValue: '2026-10-15T19:30' })
                await wrapper.find('input').trigger('click')

                await dayButton(wrapper, '2026-10-20').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20T19:30'])
                expect(calendarExists(wrapper)).toBe(true)
            })

            it('defaults the time to midnight when picking the first day', async () => {
                const wrapper = typed('datetime-local')
                await wrapper.find('input').trigger('click')

                await wrapper.find('[data-date]').trigger('click')

                expect((wrapper.emitted('update:modelValue')![0]![0] as string).endsWith('T00:00')).toBe(true)
            })

            it('closes with the done button and clears with the clear button', async () => {
                const wrapper = typed('datetime-local', { modelValue: '2026-10-15T19:30' })
                await wrapper.find('input').trigger('click')

                const button = (text: string) => wrapper.findAll('button').find((item) => item.text() === text)!

                await button('Clear').trigger('click')
                expect(wrapper.emitted('update:modelValue')![0]).toEqual([null])
                expect(calendarExists(wrapper)).toBe(true)

                await button('Done').trigger('click')
                expect(calendarExists(wrapper)).toBe(false)
            })

            it('has no done button in the inline variant', () => {
                const wrapper = typed('datetime-local', { variant: PickerVariant.INLINE })

                expect(wrapper.findAll('button').some((item) => item.text() === 'Done')).toBe(false)
            })

            it('keeps the date when a time is picked', async () => {
                const wrapper = typed('datetime-local', { modelValue: '2026-10-15T19:30', locale: 'es-ES' })
                await wrapper.find('input').trigger('click')

                await wrapper
                    .find('[role="listbox"][aria-label="Hours"]')
                    .findAll('[role="option"]')
                    .find((option) => option.text() === '08')!
                    .trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-15T08:30'])
            })

            it('only applies the time limits on the day of the date limit', async () => {
                const wrapper = typed('datetime-local', {
                    modelValue: '2026-10-10T12:00',
                    min: '2026-10-10T09:00',
                    max: '2026-10-12T17:00',
                })
                await wrapper.find('input').trigger('click')

                expect(wrapper.findComponent({ name: 'TimePicker' }).props('min')).toBe('09:00')
                expect(wrapper.findComponent({ name: 'TimePicker' }).props('max')).toBeUndefined()
                expect(wrapper.findComponent({ name: 'Calendar' }).props('min')).toBe('2026-10-10')
            })

            it('clears to null', async () => {
                const wrapper = typed('datetime-local', { modelValue: '2026-10-15T19:30' })

                await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

                expect(wrapper.emitted('update:modelValue')![0]).toEqual([null])
            })

            it('renders both pickers in one box in the inline variant', () => {
                const wrapper = typed('datetime-local', { variant: PickerVariant.INLINE })

                expect(calendarExists(wrapper)).toBe(true)
                expect(wrapper.findComponent({ name: 'TimePicker' }).exists()).toBe(true)
                expect(wrapper.findComponent({ name: 'Calendar' }).props('isBoxed')).toBe(false)
            })
        })

        it('combines the mode with the type', async () => {
            const months = typed('month', {
                mode: CalendarMode.RANGE,
                modelValue: { start: '2026-10', end: '2026-12' },
            })
            expect(display(months)).toBe('October 2026 – December 2026')

            const weeks = typed('week', { mode: CalendarMode.MULTIPLE, modelValue: ['2026-W41', '2026-W43'] })
            expect(display(weeks)).toBe('Week 41, 2026, Week 43, 2026')

            const week = typed('week', { mode: CalendarMode.RANGE, modelValue: { start: '2026-W41', end: null } })
            expect(display(week)).toBe('Week 41, 2026 –')
        })

        it('picks a range of months and closes when the range is complete', async () => {
            const wrapper = typed('month', { mode: CalendarMode.RANGE, modelValue: { start: '2026-03', end: null } })
            await wrapper.find('input').trigger('click')

            await wrapper
                .findAll('button')
                .find((button) => button.text() === 'Jun')!
                .trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: '2026-03', end: '2026-06' }])
            expect(calendarExists(wrapper)).toBe(false)
        })

        it('stays open while picking several weeks', async () => {
            const wrapper = typed('week', { mode: CalendarMode.MULTIPLE, modelValue: ['2026-W41'] })
            await wrapper.find('input').trigger('click')

            await dayButton(wrapper, '2026-10-21').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2026-W41', '2026-W43']])
            expect(calendarExists(wrapper)).toBe(true)
        })

        it('clears a range of months to an empty range', async () => {
            const wrapper = typed('month', {
                mode: CalendarMode.RANGE,
                modelValue: { start: '2026-03', end: '2026-06' },
            })

            await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ start: null, end: null }])
        })

        it('keeps date and time as a single selection whatever the mode is', () => {
            const wrapper = typed('datetime-local', { mode: CalendarMode.RANGE, modelValue: '2026-10-15T19:30' })

            expect(display(wrapper)).toBe('10/15/2026 07:30 PM')
        })
    })

    describe('calendar markers, popover and events', () => {
        const markers = { '2026-10-20': [{ label: 'Review' }] }

        it('forwards the markers and the popover options to the calendar', async () => {
            const wrapper = factory({ markers, maxMarkers: 2, dayPopoverTrigger: 'click' })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'Calendar' }).props()).toMatchObject({
                markers,
                maxMarkers: 2,
                dayPopoverTrigger: 'click',
            })
            expect(dayButton(wrapper, '2026-10-20').findAll('span.rounded-full')).toHaveLength(1)
        })

        it('forwards the placement of the day popover to the calendar', async () => {
            const wrapper = factory({
                markers,
                dayPopoverPosition: 'top',
                dayPopoverAlign: 'right',
                dayPopoverAutoFlip: false,
            })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'Calendar' }).props()).toMatchObject({
                dayPopoverPosition: 'top',
                dayPopoverAlign: 'right',
                dayPopoverAutoFlip: false,
            })
        })

        it('renders the day-popover slot inside the calendar', async () => {
            const wrapper = mount(DatePickerField, {
                props: { id: 'date', modelValue: null, markers, dayPopoverTrigger: 'click', closeOnSelect: false },
                slots: {
                    'day-popover': '<template #day-popover="{ date }"><p data-test="content">{{ date }}</p></template>',
                },
                attachTo: document.body,
            })
            await wrapper.find('input').trigger('click')

            await dayButton(wrapper, '2026-10-20').trigger('click')

            expect(wrapper.find('[data-test="content"]').text()).toBe('2026-10-20')
        })

        it('re-emits the calendar events', async () => {
            const wrapper = factory({ closeOnSelect: false })
            await wrapper.find('input').trigger('click')

            await dayButton(wrapper, '2026-10-20').trigger('click')
            dayButton(wrapper, '2026-10-21').element.parentElement!.dispatchEvent(new MouseEvent('mouseenter'))
            await wrapper.find('[role="grid"]').trigger('mouseleave')
            await wrapper.find('button[aria-label="Next month"]').trigger('click')

            expect(wrapper.emitted('day-click')![0]).toEqual([
                { date: '2026-10-20', key: '2026-10-20', isDisabled: false },
            ])
            expect(wrapper.emitted('day-hover')![0]).toEqual([
                { date: '2026-10-21', key: '2026-10-21', isDisabled: false },
            ])
            expect(wrapper.emitted('day-hover-end')).toHaveLength(1)
            expect(wrapper.emitted('month-change')![0]).toEqual([
                { year: 2026, month: 11, from: '2026-11-01', to: '2026-11-30' },
            ])
        })
    })
})

describe('DatePickerField glow', () => {
    const glowMount = (props: Record<string, any> = {}) => factory(props)
    const glowBoxes = (wrapper: ReturnType<typeof glowMount>) =>
        wrapper.findAll('[class*="--glow-color"]').map((w) => w.element as HTMLElement)

    it('has no glow by default', () => {
        expect(glowBoxes(glowMount())).toHaveLength(0)
    })

    it('glows only the field box, not the label or the help text', () => {
        const wrapper = glowMount({ label: 'Name', helpText: 'Help', glowColorMode: GlowColorMode.BOTH })
        expect(glowBoxes(wrapper)).toHaveLength(1)
        expect(wrapper.find('label').classes().join(' ')).not.toContain('--glow-color')
    })

    it('shows the glow in dark mode only when glowColorMode is dark', () => {
        const classes = [...glowBoxes(glowMount({ glowColorMode: GlowColorMode.DARK }))[0]!.classList]
        expect(classes.some((c) => c.startsWith('[.dark_&]:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('uses focus-within for the focus trigger', () => {
        const classes = [
            ...glowBoxes(glowMount({ glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.FOCUS }))[0]!
                .classList,
        ]
        expect(classes.some((c) => c.startsWith('focus-within:shadow-['))).toBe(true)
    })

    it('turns the glow red on error', () => {
        const wrapper = glowMount({ glowColorMode: GlowColorMode.BOTH, error: 'Required' })
        expect(
            glowBoxes(wrapper).every((el) => el.classList.contains('[--glow-color:var(--color-border-error)]')),
        ).toBe(true)
    })
})
