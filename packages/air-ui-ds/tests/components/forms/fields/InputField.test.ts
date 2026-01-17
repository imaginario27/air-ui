import { mount } from '@vue/test-utils'
import InputField from '~/components/forms/fields/InputField.vue'
import { nextTick, ref } from 'vue'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, any> = {}) => {
    return mount(InputField, {
        props: {
            id: 'test-input',
            ...props
        }
    })
}

describe('InputField.vue', () => {
    it('renders label and input', () => {
        const wrapper = factory({ label: 'Name' })
        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Name')

        const input = wrapper.find('input')
        expect(input.exists()).toBe(true)
    })

    it('displays help text when provided', () => {
        const wrapper = factory({ helpText: 'This is help text' })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('This is help text')
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
        expect(emits?.[0]?.[0]).toBe('5')   // -20 → 0 → clamped to 5
        expect(emits?.[1]?.[0]).toBe('5')   // 3 → clamped to 5
        expect(emits?.[2]?.[0]).toBe('10')  // 12 → clamped to 10
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
            linkText: 'Forgot password?',
            linkUrl: '/forgot'
        })
        const navLink = wrapper.findComponent({ name: 'NavLink' })
        expect(navLink.exists()).toBe(true)
        expect(navLink.props('text')).toBe('Forgot password?')
        expect(navLink.props('to')).toBe('/forgot')
    })

    it('displays color swatch and value when type is "color"', () => {
        const wrapper = factory({
            type: 'color',
            modelValue: '#ff0000'
        })
        const span = wrapper.findAll('span').find(el => el.text() === '#ff0000')
        expect(span).toBeTruthy()
    })

    it('applies autofocus and readonly props correctly', () => {
        const wrapper = factory({
            autofocus: true,
            readonly: true
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
            hasShowPasswordButton: true
        })

        const buttons = wrapper.findAll('button')
        const toggleBtn = buttons.find(btn => btn.findComponent({ name: 'Icon' }).exists())
        expect(toggleBtn).toBeTruthy()

        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe('password')

        await toggleBtn!.trigger('click')

        await nextTick()
        expect(input.attributes('type')).toBe('text')
    })
})
