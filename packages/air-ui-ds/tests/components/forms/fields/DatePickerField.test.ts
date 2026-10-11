import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import DatePickerField from '@/components/forms/fields/DatePickerField.vue'
import { CalendarMode, DatePickerVariant } from '@/models/enums/calendars'
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
                children.findIndex((el) => el.classList.contains('border')),
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

            expect(wrapper.findComponent({ name: 'Calendar' }).classes()).toContain('bottom-full')
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
        const inline = (props: Record<string, any> = {}) => factory({ variant: DatePickerVariant.INLINE, ...props })

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
})
