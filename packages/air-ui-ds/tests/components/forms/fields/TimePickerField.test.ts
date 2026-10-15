import { mount } from '@vue/test-utils'
import { GlowColorMode, GlowTrigger } from '@/models/enums/glow'
import { nextTick, ref } from 'vue'
import TimePickerField from '@/components/forms/fields/TimePickerField.vue'
import { HourFormat, PickerVariant } from '@/models/enums/calendars'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur'),
}))

const factory = (props: Record<string, any> = {}) =>
    mount(TimePickerField, {
        props: { id: 'time', modelValue: '19:30', locale: 'es-ES', ...props },
        attachTo: document.body,
    })

const pickerExists = (wrapper: ReturnType<typeof factory>) => wrapper.findComponent({ name: 'TimePicker' }).exists()

const option = (wrapper: ReturnType<typeof factory>, label: string, text: string) =>
    wrapper
        .find(`[role="listbox"][aria-label="${label}"]`)
        .findAll('[role="option"]')
        .find((button) => button.text() === text)!

describe('TimePickerField.vue', () => {
    describe('field', () => {
        it('renders the label linked to the input and the optional text', () => {
            const wrapper = factory({ label: 'Starts at' })

            expect(wrapper.find('label').attributes('for')).toBe('time')
            expect(wrapper.find('label').text()).toContain('(optional)')
            expect(factory({ label: 'Starts at', required: true }).find('label').text()).toBe('Starts at')
        })

        it('uses the aria-label when there is no label', () => {
            expect(factory({ ariaLabel: 'Pick a time' }).find('input').attributes('aria-label')).toBe('Pick a time')
        })

        it('shows help text and the error', () => {
            expect(factory({ helpText: 'Hint' }).find('p.text-xs').text()).toBe('Hint')
            expect(factory({ error: 'Required field' }).find('p.text-xs').text()).toBe('Required field')
            expect(factory({ error: 'Nope' }).find('div.border').classes()).toContain('border-border-error')
        })

        it('renders the help text before the field when helpTextPosition is top', () => {
            const wrapper = factory({ label: 'Time', helpText: 'Hint', helpTextPosition: Position.TOP })
            const children = Array.from(wrapper.element.children as HTMLCollection)

            expect(children.findIndex((el) => el.classList.contains('text-xs'))).toBeLessThan(
                children.findIndex((el) => el.classList.contains('relative')),
            )
        })

        it('uses the DS config placeholder', () => {
            expect(factory({ modelValue: null }).find('input').attributes('placeholder')).toBe('Select a time')
        })
    })

    describe('input variant', () => {
        it('shows the formatted time in a read-only text input', () => {
            const input = factory().find('input')

            expect(input.attributes('type')).toBe('text')
            expect(input.attributes('readonly')).toBeDefined()
            expect((input.element as HTMLInputElement).value).toBe('19:30')
        })

        it('formats with the locale, the hour format and the seconds', () => {
            const twelve = factory({ locale: 'en-US', hourFormat: HourFormat.HOURS_12 })
            expect((twelve.find('input').element as HTMLInputElement).value).toBe('07:30 PM')

            const seconds = factory({ modelValue: '19:30:15', hasSeconds: true })
            expect((seconds.find('input').element as HTMLInputElement).value).toBe('19:30:15')
        })

        it('opens from the input, the button and the keyboard', async () => {
            const byInput = factory()
            await byInput.find('input').trigger('click')
            expect(pickerExists(byInput)).toBe(true)

            const byButton = factory()
            await byButton.find('button[aria-label="Open time picker"]').trigger('click')
            expect(pickerExists(byButton)).toBe(true)

            for (const key of ['Enter', ' ', 'ArrowDown']) {
                const byKey = factory()
                await byKey.find('input').trigger('keydown', { key })
                expect(pickerExists(byKey)).toBe(true)
            }
        })

        it('closes with Escape', async () => {
            const wrapper = factory()
            await wrapper.find('input').trigger('click')

            await wrapper.find('input').trigger('keydown', { key: 'Escape' })

            expect(pickerExists(wrapper)).toBe(false)
        })

        it('emits the time and stays open so that the minutes can be picked', async () => {
            const wrapper = factory()
            await wrapper.find('input').trigger('click')

            await option(wrapper, 'Hours', '08').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['08:30'])
            expect(pickerExists(wrapper)).toBe(true)
        })

        it('passes the time picker props through', async () => {
            const wrapper = factory({
                hasSeconds: true,
                minuteStep: 15,
                min: '09:00',
                max: '17:00',
                color: 'secondary-brand',
                isRounded: true,
            })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'TimePicker' }).props()).toMatchObject({
                hasSeconds: true,
                minuteStep: 15,
                min: '09:00',
                max: '17:00',
                color: 'secondary-brand',
                isRounded: true,
            })
        })

        it('positions the picker above the input when pickerPosition is top', async () => {
            const wrapper = factory({ pickerPosition: Position.TOP })
            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'TimePicker' }).element.parentElement!.classList).toContain(
                'bottom-full',
            )
        })

        it('clears the value', async () => {
            const wrapper = factory()

            await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([null])
        })

        it('hides the clear button without a value or when clearable is false', () => {
            expect(factory({ modelValue: null }).find('button[aria-label="Clear selection"]').exists()).toBe(false)
            expect(factory({ clearable: false }).find('button[aria-label="Clear selection"]').exists()).toBe(false)
        })

        it.each([{ disabled: true }, { readonly: true }])('does not open when %j', async (props) => {
            const wrapper = factory(props)

            await wrapper.find('input').trigger('click')

            expect(pickerExists(wrapper)).toBe(false)
        })
    })

    describe('inline variant', () => {
        const inline = (props: Record<string, any> = {}) => factory({ variant: PickerVariant.INLINE, ...props })

        it('renders the time picker without an input and keeps the label and help text', () => {
            const wrapper = inline({ label: 'Starts at', helpText: 'Hint' })

            expect(pickerExists(wrapper)).toBe(true)
            expect(wrapper.find('input').exists()).toBe(false)
            expect(wrapper.find('label').exists()).toBe(false)
            expect(wrapper.text()).toContain('Starts at')
            expect(wrapper.find('p.text-xs').text()).toBe('Hint')
        })

        it('emits the selection', async () => {
            const wrapper = inline()

            await option(wrapper, 'Minutes', '45').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['19:45'])
        })

        it('passes isBoxed and highlights the border on error', () => {
            const wrapper = inline({ isBoxed: false, error: 'Required' })
            const picker = wrapper.findComponent({ name: 'TimePicker' })

            expect(picker.props('isBoxed')).toBe(false)
            expect(picker.classes()).toContain('!border-border-error')
        })
    })

    describe('validation', () => {
        it('validates when the value changes', async () => {
            const validator = vi.fn(() => 'Required')
            const wrapper = factory({ required: true, validator, modelValue: null })

            await wrapper.setProps({ modelValue: '10:00' })
            await nextTick()

            expect(validator).toHaveBeenCalledWith('10:00')
            expect(wrapper.emitted('update:error')![0]).toEqual(['Required'])
        })

        it('validates when the picker closes', async () => {
            const validator = vi.fn(() => 'Required')
            const wrapper = factory({ required: true, validator, modelValue: null })
            await wrapper.find('input').trigger('click')

            await wrapper.find('input').trigger('keydown', { key: 'Escape' })

            expect(validator).toHaveBeenCalledWith(null)
        })

        it('does not validate when the field is not required', async () => {
            const validator = vi.fn(() => 'Required')
            const wrapper = factory({ validator, modelValue: null })

            await wrapper.setProps({ modelValue: '10:00' })

            expect(validator).not.toHaveBeenCalled()
        })
    })
})

describe('TimePickerField glow', () => {
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
