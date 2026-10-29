import { mount } from '@vue/test-utils'
import InputField from '~/components/forms/fields/InputField.vue'
import { Position } from '@/models/enums/positions'
import { InputSize } from '@/models/enums/formFields'
import { useDSConfig } from '@/composables/useDSConfig'
import { GlowColorMode, GlowTrigger, GlowType } from '@/models/enums/glow'
import { nextTick, ref } from 'vue'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur'),
}))

const factory = (props: Record<string, any> = {}) => {
    return mount(InputField, {
        props: {
            id: 'test-input',
            ...props,
        },
    })
}

describe('InputField.vue', () => {
    it('renders label and input', () => {
        const wrapper = factory({ label: 'Name', required: true })
        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Name')

        const input = wrapper.find('input')
        expect(input.exists()).toBe(true)
    })

    it('keeps a single size on every screen when responsiveSize is not set', () => {
        const container = factory().find('input').element.parentElement!
        expect(container.classList).not.toContain('lg:h-[36px]')
    })

    it('uses LG on mobile and MD from lg up when responsiveSize is true', () => {
        const container = factory({ responsiveSize: true }).find('input').element.parentElement!
        expect(container.classList).toContain('h-[44px]')
        expect(container.classList).toContain('lg:h-[36px]')
    })

    it('follows the global config unless responsiveSize is set', () => {
        const dsConfig = useDSConfig()
        dsConfig.forms.responsiveSize = true

        try {
            const container = factory().find('input').element.parentElement!
            expect(container.classList).toContain('lg:h-[36px]')

            const containerOff = factory({ responsiveSize: false }).find('input').element.parentElement!
            expect(containerOff.classList).not.toContain('lg:h-[36px]')
        } finally {
            dsConfig.forms.responsiveSize = false
        }
    })

    it.each([
        [InputSize.MD, 'h-[36px]', 'h-[44px]'],
        [InputSize.LG, 'h-[44px]', 'h-[36px]'],
    ])('keeps a fixed height when size is %s', (size, expected, notExpected) => {
        const container = factory({ size }).find('input').element.parentElement!
        expect(container.classList).toContain(expected)
        expect(container.classList).not.toContain(notExpected)
        expect(container.classList).not.toContain('lg:h-[36px]')
    })

    describe('date and time display', () => {
        const shownValue = (props: Record<string, any>) =>
            (factory(props).find('input').element as HTMLInputElement).value

        it.each([
            ['en-US', '10/15/2026'],
            ['es-ES', '15/10/2026'],
            ['de-DE', '15.10.2026'],
        ])('writes the date following the %s locale', (locale, expected) => {
            expect(shownValue({ type: 'date', modelValue: '2026-10-15', locale })).toBe(expected)
        })

        it.each([
            ['en-US', 'October 15, 2026'],
            ['es-ES', '15 de octubre de 2026'],
        ])('applies displayFormat in the %s locale', (locale, expected) => {
            const value = shownValue({
                type: 'date',
                modelValue: '2026-10-15',
                locale,
                displayFormat: { dateStyle: 'long' },
            })
            expect(value).toBe(expected)
        })

        it('writes the time following the locale', () => {
            expect(shownValue({ type: 'time', modelValue: '19:30', locale: 'es-ES' })).toBe('19:30')
            expect(shownValue({ type: 'time', modelValue: '19:30', locale: 'en-US' })).toContain('PM')
        })
    })

    it('displays help text when provided', () => {
        const wrapper = factory({ helpText: 'This is help text' })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('This is help text')
    })

    it('renders help text before the input when helpTextPosition is top', () => {
        const wrapper = factory({ label: 'Name', helpText: 'Hint', helpTextPosition: Position.TOP })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Hint')
        // help text is a direct child of the wrapper and appears before the input container
        const children = Array.from(wrapper.element.children as HTMLCollection)
        const helpIdx = children.findIndex((el) => el.classList.contains('text-xs'))
        const inputContainerIdx = children.findIndex((el) => el.classList.contains('border'))
        expect(helpIdx).toBeGreaterThan(-1)
        expect(helpIdx).toBeLessThan(inputContainerIdx)
    })

    it('displays error message when error exists', async () => {
        const wrapper = factory({ error: 'Required field' })
        await nextTick()

        const paragraph = wrapper.find('p.text-xs')
        expect(paragraph.exists()).toBe(true)
        expect(paragraph.text()).toBe('Required field')
    })

    it('emits updated modelValue on input', async () => {
        const wrapper = factory()
        const input = wrapper.find('input')
        await input.setValue('Hello')

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe('Hello')
    })

    it('applies filterAlphabetic correctly', async () => {
        const wrapper = factory({ filterAlphabetic: true })
        const input = wrapper.find('input')
        await input.setValue('123abcABC!@#')

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe('abcABC')
    })

    it('formats tel input with pattern and emits formatted value', async () => {
        const wrapper = factory({
            type: 'tel',
            pattern: '[0-9]*',
        })
        const input = wrapper.find('input')
        await input.setValue('1234567890')

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe('123-456-7890')
    })

    it('enforces non-negative numbers and min/max constraints', async () => {
        const wrapper = factory({
            type: 'number',
            min: '5',
            max: '10',
            permitNegativeNumber: false,
        })
        const input = wrapper.find('input')

        await input.setValue('-20')
        await input.setValue('3')
        await input.setValue('12')

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe('5') // -20 → 0 → clamped to 5
        expect(emits?.[1]?.[0]).toBe('5') // 3 → clamped to 5
        expect(emits?.[2]?.[0]).toBe('10') // 12 → clamped to 10
    })

    it('keeps partial decimals as typed and allows clearing a number field', async () => {
        const wrapper = factory({ type: 'number', modelValue: '1' })
        const input = wrapper.find('input')

        await input.setValue('1.')
        await input.setValue('1.5')
        await input.setValue('')

        const emits = wrapper.emitted('update:modelValue')
        expect(emits?.[1]?.[0]).toBe('1.5')
        expect(emits?.[2]?.[0]).toBe('')
    })

    it('calls validator on blur if validation mode is "blur"', async () => {
        const mockValidator = vi.fn().mockReturnValue('Invalid')
        const wrapper = factory({
            validator: mockValidator,
            required: true,
            modelValue: '',
        })

        const input = wrapper.find('input')
        await input.trigger('focus')
        await input.trigger('blur')

        expect(mockValidator).toHaveBeenCalled()

        const emits = wrapper.emitted('update:error')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe('Invalid')
    })

    it('emits click:suffix when suffix icon is clicked', async () => {
        const wrapper = factory({ suffixIcon: 'mdi:eye' })
        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
        await button.trigger('click')

        const emits = wrapper.emitted('click:suffix')
        expect(emits).toBeTruthy()
        expect(emits?.length).toBeGreaterThan(0)
    })

    it('displays NavLink when linkText and linkUrl are provided', () => {
        const wrapper = factory({
            label: 'Password',
            linkText: 'Forgot password?',
            linkUrl: '/forgot',
        })
        const navLink = wrapper.findComponent({ name: 'NavLink' })
        expect(navLink.exists()).toBe(true)
        expect(navLink.props('text')).toBe('Forgot password?')
        expect(navLink.props('to')).toBe('/forgot')
    })

    it('displays color swatch and value when type is "color"', () => {
        const wrapper = factory({
            type: 'color',
            modelValue: '#ff0000',
        })
        const span = wrapper.findAll('span').find((el) => el.text() === '#ff0000')
        expect(span).toBeTruthy()
    })

    it('applies autofocus and readonly props correctly', () => {
        const wrapper = factory({
            autofocus: true,
            readonly: true,
        })
        const input = wrapper.find('input')
        expect(input.attributes('autofocus')).toBeDefined()
        expect(input.attributes('readonly')).toBeDefined()
    })

    it('disables input when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        const input = wrapper.find('input')
        expect(input.attributes('disabled')).toBeDefined()
    })

    it('toggles password visibility when no suffixIcon is provided', async () => {
        const wrapper = factory({
            type: 'password',
            modelValue: 'secret',
            hasShowPasswordButton: true,
        })

        const buttons = wrapper.findAll('button')
        const toggleBtn = buttons.find((btn) => btn.findComponent({ name: 'Icon' }).exists())
        expect(toggleBtn).toBeTruthy()

        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe('password')

        await toggleBtn!.trigger('click')

        await nextTick()
        expect(input.attributes('type')).toBe('text')
    })

    it('shows "(optional)" hint next to the label when field is not required', () => {
        const wrapper = factory({ label: 'Name', required: false })
        const label = wrapper.find('label')
        expect(label.text()).toContain('(optional)')
    })

    it('does not show "(optional)" hint when field is required', () => {
        const wrapper = factory({ label: 'Name', required: true })
        const label = wrapper.find('label')
        expect(label.text()).not.toContain('(optional)')
    })

    it('hides the "(optional)" hint when showOptionalLabel is false', () => {
        const wrapper = factory({ label: 'Name', required: false, showOptionalLabel: false })
        const label = wrapper.find('label')
        expect(label.text()).not.toContain('(optional)')
    })

    it('renders the optional hint text from the shared DS config resolver', () => {
        const config = useDSConfig()
        config.forms.optionalLabelText = () => '(opcional)'

        const wrapper = factory({ label: 'Name', required: false })
        const label = wrapper.find('label')
        expect(label.text()).toContain('(opcional)')

        config.forms.optionalLabelText = () => '(optional)'
    })

    it('uses the optionalLabel prop over the shared DS config when provided', () => {
        const config = useDSConfig()
        config.forms.optionalLabelText = () => '(opcional)'

        const wrapper = factory({ label: 'Name', required: false, optionalLabel: '(not required)' })
        const label = wrapper.find('label')
        expect(label.text()).toContain('(not required)')
        expect(label.text()).not.toContain('(opcional)')

        config.forms.optionalLabelText = () => '(optional)'
    })

    it('uses aria-label when visual label is hidden', () => {
        const wrapper = factory({
            label: '',
            ariaLabel: 'Accessible input',
        })

        const input = wrapper.find('input')

        expect(wrapper.find('label').exists()).toBe(false)
        expect(input.attributes('aria-label')).toBe('Accessible input')
    })

    it('applies bg-background-field when transparent is false', () => {
        const wrapper = factory({ transparent: false })
        const container = wrapper.find('div.border')
        expect(container.classes()).toContain('bg-background-field')
    })

    it('does not apply background when transparent is true', () => {
        const wrapper = factory({ transparent: true })
        const container = wrapper.find('div.border')
        expect(container.classes()).not.toContain('bg-background-field')
    })

    it('applies inputClass to the input element', () => {
        const wrapper = factory({ inputClass: 'custom-input-class' })
        const input = wrapper.find('input')
        expect(input.classes()).toContain('custom-input-class')
    })

    it('does not apply inputClass when not provided', () => {
        const wrapper = factory()
        const input = wrapper.find('input')
        expect(input.classes()).not.toContain('custom-input-class')
    })

    describe('type date', () => {
        const dateFactory = (props: Record<string, any> = {}) =>
            factory({ type: 'date', modelValue: '2026-10-15', ...props })

        it('shows the formatted date in a read-only text input', () => {
            const input = dateFactory().find('input')

            expect(input.attributes('type')).toBe('text')
            expect(input.attributes('readonly')).toBeDefined()
            expect((input.element as HTMLInputElement).value).toBe('10/15/2026')
        })

        it('formats the date with the locale prop', () => {
            const input = dateFactory({ locale: 'es-ES' }).find('input')

            expect((input.element as HTMLInputElement).value).toBe('15/10/2026')
        })

        it('opens the calendar when the input is clicked', async () => {
            const wrapper = dateFactory()
            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(false)

            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(true)
        })

        it('opens the calendar from the calendar button', async () => {
            const wrapper = dateFactory()

            await wrapper.find('button[aria-label="Open calendar"]').trigger('click')

            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(true)
        })

        it.each(['Enter', ' ', 'ArrowDown'])('opens the calendar with the %j key', async (key) => {
            const wrapper = dateFactory()

            await wrapper.find('input').trigger('keydown', { key })

            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(true)
        })

        it('emits the ISO date and closes when a day is picked', async () => {
            const wrapper = dateFactory()
            await wrapper.find('input').trigger('click')

            await wrapper.find('[data-date="2026-10-20"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-10-20'])
            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(false)
        })

        it('closes the calendar with Escape', async () => {
            const wrapper = dateFactory()
            await wrapper.find('input').trigger('click')

            await wrapper.find('input').trigger('keydown', { key: 'Escape' })

            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(false)
        })

        it('passes min and max to the calendar', async () => {
            const wrapper = dateFactory({ min: '2026-10-10', max: '2026-10-20' })
            await wrapper.find('input').trigger('click')

            const calendar = wrapper.findComponent({ name: 'Calendar' })

            expect(calendar.props('min')).toBe('2026-10-10')
            expect(calendar.props('max')).toBe('2026-10-20')
        })

        it('clears the value', async () => {
            const wrapper = dateFactory()

            await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
        })

        it('does not show the clear button without a value', () => {
            expect(dateFactory({ modelValue: '' }).find('button[aria-label="Clear selection"]').exists()).toBe(false)
        })

        it.each([{ disabled: true }, { readonly: true }])('does not open the calendar when %j', async (props) => {
            const wrapper = dateFactory(props)

            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(false)
        })

        it('keeps the native behavior for other types', () => {
            const wrapper = factory({ type: 'text' })

            expect(wrapper.find('input').attributes('type')).toBe('text')
            expect(wrapper.find('button[aria-label="Open calendar"]').exists()).toBe(false)
        })
    })

    describe.each([
        ['month', '2026-10', 'October 2026', 'Calendar'],
        ['week', '2026-W41', 'Week 41, 2026', 'Calendar'],
        ['datetime-local', '2026-10-15T19:30', '10/15/2026 07:30 PM', 'Calendar'],
        ['time', '19:30', '07:30 PM', 'TimePicker'],
    ])('type %s', (type, value, expected, pickerName) => {
        it('renders a read-only text input with the formatted value', () => {
            const wrapper = factory({ type, modelValue: value })
            const input = wrapper.find('input')

            expect(input.attributes('type')).toBe('text')
            expect(input.attributes('readonly')).toBeDefined()
            expect((input.element as HTMLInputElement).value).toBe(expected)
        })

        it('opens the picker instead of the native one', async () => {
            const wrapper = factory({ type, modelValue: value })

            await wrapper.find('input').trigger('click')

            expect(wrapper.findComponent({ name: pickerName }).exists()).toBe(true)
        })

        it('emits an empty string when cleared', async () => {
            const wrapper = factory({ type, modelValue: value })

            await wrapper.find('button[aria-label="Clear selection"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
        })
    })
})

describe('InputField glow', () => {
    const box = (props: Record<string, any> = {}) =>
        factory({ label: 'Name', helpText: 'Help', ...props }).find('input').element.parentElement!
    const hasGlow = (classes: string[]) => classes.some((c) => c.includes('--glow-color'))

    it('has no glow by default', () => {
        expect(hasGlow([...box().classList])).toBe(false)
    })

    it('glows only the input box, not the label or the help text', () => {
        const wrapper = factory({ label: 'Name', helpText: 'Help', glowColorMode: GlowColorMode.BOTH })
        const input = wrapper.find('input').element.parentElement!
        expect(hasGlow([...input.classList])).toBe(true)
        expect(hasGlow(wrapper.find('label').classes())).toBe(false)
        expect(wrapper.findAll('[class*="--glow-color"]')).toHaveLength(1)
    })

    it('shows the glow in dark mode only when glowColorMode is dark', () => {
        const classes = [
            ...box({ glowColorMode: GlowColorMode.DARK, glowTrigger: GlowTrigger.ALWAYS, glowType: GlowType.OUTER })
                .classList,
        ]
        expect(classes.some((c) => c.startsWith('[.dark_&]:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('glows on the inside while it has focus by default', () => {
        const classes = [...box({ glowColorMode: GlowColorMode.BOTH }).classList]
        expect(classes.some((c) => c.startsWith('focus-within:shadow-[inset_'))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('uses focus-within for the focus trigger', () => {
        const classes = [...box({ glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.FOCUS }).classList]
        expect(classes.some((c) => c.startsWith('focus-within:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('focus-visible:'))).toBe(false)
    })

    it('turns the glow red on error', () => {
        const classes = [...box({ glowColorMode: GlowColorMode.BOTH, error: 'Required' }).classList]
        expect(classes).toContain('[--glow-color:var(--color-border-error)]')
    })

    it.each(['date', 'time'])('passes the glow to the picker used by the %s type', (type) => {
        const wrapper = factory({ type, modelValue: '', glowColorMode: GlowColorMode.BOTH })
        expect(wrapper.findAll('[class*="--glow-color"]')).toHaveLength(1)
    })
})

describe('InputField date and time segments', () => {
    const segmentsOf = (props: Record<string, any>) =>
        factory(props)
            .findComponent({ name: 'DateTimeSegments' })
            .findAll('input')
            .map((input) => input.attributes('placeholder'))

    it.each([
        ['date', 'en-US', ['mm', 'dd', 'yyyy']],
        ['date', 'es-ES', ['dd', 'mm', 'yyyy']],
        ['month', 'en-US', ['mm', 'yyyy']],
        ['week', 'en-US', ['ww', 'yyyy']],
        ['datetime-local', 'es-ES', ['dd', 'mm', 'yyyy', 'hh', 'mm']],
        ['time', 'es-ES', ['hh', 'mm']],
        ['time', 'en-US', ['hh', 'mm', '--']],
    ])('writes the %s type in the pattern of %s when hasDateTimeSegments is set', (type, locale, expected) => {
        expect(segmentsOf({ type, locale, hasDateTimeSegments: true })).toEqual(expected)
    })

    it('keeps the picker input unless hasDateTimeSegments is set', () => {
        const wrapper = factory({ type: 'date' })

        expect(wrapper.findComponent({ name: 'DateTimeSegments' }).exists()).toBe(false)
    })

    it('emits the typed date as an ISO string', async () => {
        const wrapper = factory({ type: 'date', locale: 'es-ES', hasDateTimeSegments: true })
        const [day, month, year] = wrapper.findComponent({ name: 'DateTimeSegments' }).findAll('input')

        for (const [input, text] of [
            [day, '15'],
            [month, '10'],
            [year, '2026'],
        ] as const) {
            for (const char of text) {
                input!.element.dispatchEvent(
                    new InputEvent('beforeinput', {
                        data: char,
                        inputType: 'insertText',
                        bubbles: true,
                        cancelable: true,
                    }),
                )
            }
        }
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toEqual([['2026-10-15']])
    })
})

describe('InputField hour format and seconds', () => {
    const placeholdersOf = (props: Record<string, any>) =>
        factory({ hasDateTimeSegments: true, ...props })
            .findComponent({ name: 'DateTimeSegments' })
            .findAll('input')
            .map((input) => input.attributes('placeholder'))

    it.each([
        ['time', 'en-US', {}, ['hh', 'mm', '--']],
        ['time', 'en-US', { hourFormat: '24' }, ['hh', 'mm']],
        ['time', 'es-ES', { hourFormat: '12' }, ['hh', 'mm', '--']],
        ['time', 'es-ES', { hasSeconds: true }, ['hh', 'mm', 'ss']],
        ['datetime-local', 'es-ES', { hasSeconds: true }, ['dd', 'mm', 'yyyy', 'hh', 'mm', 'ss']],
        ['datetime-local', 'en-US', { hourFormat: '24' }, ['mm', 'dd', 'yyyy', 'hh', 'mm']],
    ])('writes the %s type in %s with %o', (type, locale, props, expected) => {
        expect(placeholdersOf({ type, locale, ...props })).toEqual(expected)
    })
})
