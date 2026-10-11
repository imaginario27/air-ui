import { mount } from '@vue/test-utils'
import TimePicker from '@/components/time-pickers/TimePicker.vue'
import { HourFormat } from '@/models/enums/calendars'

const factory = (props: Record<string, any> = {}) =>
    mount(TimePicker, {
        props: { modelValue: '19:30', locale: 'es-ES', ...props },
        attachTo: document.body,
    })

const column = (wrapper: ReturnType<typeof factory>, label: string) =>
    wrapper.find(`[role="listbox"][aria-label="${label}"]`)

const option = (wrapper: ReturnType<typeof factory>, label: string, text: string) =>
    column(wrapper, label)
        .findAll('[role="option"]')
        .find((button) => button.text() === text)!

describe('TimePicker.vue', () => {
    it('renders hour and minute columns in 24-hour format for the locale', () => {
        const wrapper = factory()

        expect(wrapper.findAll('[role="listbox"]')).toHaveLength(2)
        expect(column(wrapper, 'Hours').findAll('[role="option"]')).toHaveLength(24)
        expect(column(wrapper, 'Minutes').findAll('[role="option"]')).toHaveLength(60)
    })

    it('marks the selected hour and minute', () => {
        const wrapper = factory()

        expect(option(wrapper, 'Hours', '19').attributes('aria-selected')).toBe('true')
        expect(option(wrapper, 'Hours', '20').attributes('aria-selected')).toBe('false')
        expect(option(wrapper, 'Minutes', '30').attributes('aria-selected')).toBe('true')
    })

    it('emits HH:mm when an hour or minute is picked', async () => {
        const wrapper = factory()

        await option(wrapper, 'Hours', '08').trigger('click')
        await option(wrapper, 'Minutes', '45').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([['08:30'], ['19:45']])
    })

    it('starts from 00 when there is no value', async () => {
        const wrapper = factory({ modelValue: null })

        await option(wrapper, 'Minutes', '15').trigger('click')

        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['00:15'])
    })

    it('adds a seconds column and emits HH:mm:ss', async () => {
        const wrapper = factory({ hasSeconds: true, modelValue: '19:30:10' })

        expect(column(wrapper, 'Seconds').exists()).toBe(true)

        await option(wrapper, 'Seconds', '20').trigger('click')

        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['19:30:20'])
    })

    it('uses the steps for minutes and seconds', () => {
        const wrapper = factory({ hasSeconds: true, minuteStep: 15, secondStep: 30 })

        expect(
            column(wrapper, 'Minutes')
                .findAll('[role="option"]')
                .map((item) => item.text()),
        ).toEqual(['00', '15', '30', '45'])
        expect(column(wrapper, 'Seconds').findAll('[role="option"]')).toHaveLength(2)
    })

    describe('12-hour format', () => {
        const twelve = (props: Record<string, any> = {}) =>
            factory({ locale: 'en-US', hourFormat: HourFormat.HOURS_12, ...props })

        it('shows 12 hours and an AM/PM column', () => {
            const wrapper = twelve()

            expect(column(wrapper, 'Hours').findAll('[role="option"]')).toHaveLength(12)
            expect(option(wrapper, 'Hours', '7').attributes('aria-selected')).toBe('true')
            expect(option(wrapper, 'AM/PM', 'PM').attributes('aria-selected')).toBe('true')
        })

        it('keeps the period when picking an hour', async () => {
            const wrapper = twelve()

            await option(wrapper, 'Hours', '9').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['21:30'])
        })

        it('maps 12 AM and 12 PM to 00 and 12', async () => {
            const am = twelve({ modelValue: '08:00' })
            await option(am, 'Hours', '12').trigger('click')
            expect(am.emitted('update:modelValue')![0]).toEqual(['00:00'])

            const pm = twelve({ modelValue: '20:00' })
            await option(pm, 'Hours', '12').trigger('click')
            expect(pm.emitted('update:modelValue')![0]).toEqual(['12:00'])
        })

        it('switches the period keeping the hour', async () => {
            const wrapper = twelve()

            await option(wrapper, 'AM/PM', 'AM').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['07:30'])
        })

        it('is picked from the locale when hourFormat is not set', () => {
            expect(factory({ locale: 'en-US' }).find('[aria-label="AM/PM"]').exists()).toBe(true)
            expect(factory({ locale: 'es-ES' }).find('[aria-label="AM/PM"]').exists()).toBe(false)
        })
    })

    describe('min and max', () => {
        it('disables the options outside the bounds', () => {
            const wrapper = factory({ min: '09:00', max: '17:30', modelValue: '10:00' })

            expect(option(wrapper, 'Hours', '08').attributes('disabled')).toBeDefined()
            expect(option(wrapper, 'Hours', '09').attributes('disabled')).toBeUndefined()
            expect(option(wrapper, 'Hours', '18').attributes('disabled')).toBeDefined()
        })

        it('disables the minutes that are out of range for the selected hour', () => {
            const wrapper = factory({ min: '09:30', modelValue: '09:45' })

            expect(option(wrapper, 'Minutes', '29').attributes('disabled')).toBeDefined()
            expect(option(wrapper, 'Minutes', '30').attributes('disabled')).toBeUndefined()
        })
    })

    describe('disabled and readonly', () => {
        it('disables every option when disabled', () => {
            const wrapper = factory({ disabled: true })

            expect(wrapper.classes()).toContain('opacity-disabled')
            expect(wrapper.findAll('[role="option"]').every((item) => item.attributes('disabled') !== undefined)).toBe(
                true,
            )
        })

        it('does not emit when readonly', async () => {
            const wrapper = factory({ readonly: true })

            await option(wrapper, 'Hours', '08').trigger('click')

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
            expect(column(wrapper, 'Hours').attributes('aria-readonly')).toBe('true')
        })
    })

    describe('keyboard', () => {
        it('moves between the options of a column with the arrow keys', async () => {
            const wrapper = factory()
            const selected = option(wrapper, 'Hours', '19')
            ;(selected.element as HTMLElement).focus()

            await selected.trigger('keydown', { key: 'ArrowDown' })

            expect(document.activeElement).toBe(option(wrapper, 'Hours', '20').element)
        })

        it('moves to the selected option of the next column with ArrowRight', async () => {
            const wrapper = factory()
            const selected = option(wrapper, 'Hours', '19')
            ;(selected.element as HTMLElement).focus()

            await selected.trigger('keydown', { key: 'ArrowRight' })

            expect(document.activeElement).toBe(option(wrapper, 'Minutes', '30').element)
        })

        it('has one tab stop per column', () => {
            const wrapper = factory()

            expect(column(wrapper, 'Hours').findAll('[tabindex="0"]')).toHaveLength(1)
            expect(option(wrapper, 'Hours', '19').attributes('tabindex')).toBe('0')
        })
    })

    it('adds the box classes only when isBoxed', () => {
        expect(factory().classes()).toContain('border')
        expect(factory({ isBoxed: false }).classes()).not.toContain('border')
    })

    it.each([
        ['primary-brand', 'bg-background-primary-brand-default'],
        ['secondary-brand', 'bg-background-secondary-brand-default'],
    ])('colors the selected option for %s', (color, expected) => {
        expect(option(factory({ color }), 'Hours', '19').classes()).toContain(expected)
    })

    it('rounds the options when isRounded', () => {
        expect(option(factory({ isRounded: true }), 'Hours', '19').classes()).toContain('rounded-full')
    })
})
