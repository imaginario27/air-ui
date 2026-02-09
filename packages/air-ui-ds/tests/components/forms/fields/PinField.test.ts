import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import PinField from '~/components/forms/fields/PinField.vue'

const defaultProps = {
    id: 'pin-input',
    modelValue: '',
    length: 4
}

const factory = (
    props: Record<string, unknown> = {},
    options: Record<string, unknown> = {}
) => {
    return mount(PinField, {
        props: {
            ...defaultProps,
            ...props
        },
        global: {
            provide: {
                formValidationMode: ref('blur')
            },
            ...options
        }
    })
}

describe('PinField.vue', () => {
    it('renders correct number of inputs', () => {
        const wrapper = factory({ length: 6 })
        expect(wrapper.findAll('input')).toHaveLength(6)
    })

    it('renders label if provided', () => {
        const wrapper = factory({ label: 'Enter PIN' })
        expect(wrapper.find('label').text()).toBe('Enter PIN')
    })

    it('applies error styling when error is present', () => {
        const wrapper = factory({ error: 'Invalid code' })
        wrapper.findAll('input').forEach(input => {
            expect(input.classes()).toContain('border-border-error')
        })
        const message = wrapper.find('p')
        expect(message.exists()).toBe(true)
        expect(message.text()).toBe('Invalid code')
    })

    it('disables inputs if disabled is true', () => {
        const wrapper = factory({ disabled: true })
        wrapper.findAll('input').forEach(input => {
            expect((input.element as HTMLInputElement).disabled).toBe(true)
        })
    })

    it('renders help text if provided and no error', () => {
        const wrapper = factory({ helpText: 'Enter your 4-digit code' })
        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Enter your 4-digit code')
    })

    it('masks input when mask is true', async () => {
        const wrapper = factory({ mask: true, modelValue: '1234' })
        await nextTick()
        wrapper.findAll('input').forEach(input => {
            expect((input.element as HTMLInputElement).value).toBe('•')
        })
    })

    it('transforms input to uppercase when uppercase is true', async () => {
        const wrapper = factory({ uppercase: true })
        const input = wrapper.findAll('input')[0]
        await input.setValue('a')
        expect((input.element as HTMLInputElement).value).toBe('A')
    })

    it('handles OTP autofill correctly', async () => {
        const wrapper = factory({ otp: true, type: 'number' })
        const input = wrapper.findAll('input')[0]
        const el = input.element as HTMLInputElement
        el.value = '1234'
        await input.trigger('input')
        await nextTick()
        wrapper.findAll('input').forEach((input, index) => {
            expect((input.element as HTMLInputElement).value).toBe(String(index + 1))
        })
        expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['1234'])
    })

    it('validates on blur when validation mode is blur', async () => {
        const validatorMock = vi.fn().mockReturnValue('Error')
        const wrapper = factory({
            modelValue: '1234',
            validator: validatorMock,
            required: true
        })
        await wrapper.find('input').trigger('blur')
        expect(validatorMock).toHaveBeenCalledWith('1234')
        expect(wrapper.emitted()['update:error']?.[0]).toEqual(['Error'])
    })

    it('emits modelValue on input change', async () => {
        const wrapper = factory()
        const input = wrapper.findAll('input')[0]
        await input.setValue('1')
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['1'])
    })

    it('moves focus to next input on character input', async () => {
        const wrapper = factory()
        const inputs = wrapper.findAll('input')
        const focusSpy = vi.spyOn(inputs[1].element, 'focus')
        await inputs[0].setValue('1')
        expect(focusSpy).toHaveBeenCalled()
    })

    it('moves focus to previous input on backspace when current input is empty', async () => {
        const wrapper = factory()
        const inputs = wrapper.findAll('input')
        const focusSpy = vi.spyOn(inputs[0].element, 'focus')
        await inputs[1].trigger('keydown', { key: 'Backspace' })
        expect(focusSpy).toHaveBeenCalled()
    })

    it('reacts to modelValue changes', async () => {
        const wrapper = factory({ modelValue: '12' })
        await wrapper.setProps({ modelValue: '34' })
        const inputs = wrapper.findAll('input')
        expect((inputs[0].element as HTMLInputElement).value).toBe('3')
        expect((inputs[1].element as HTMLInputElement).value).toBe('4')
    })

    it('reacts to length change', async () => {
        const wrapper = factory({ modelValue: '1234', length: 4 })
        await wrapper.setProps({ length: 6 })
        const inputs = wrapper.findAll('input')
        expect(inputs).toHaveLength(6)
        expect(wrapper.emitted()['update:modelValue']?.at(-1)).toEqual(['1234'])
    })

    it('focuses first input if autofocus is enabled', async () => {
        vi.stubGlobal('requestAnimationFrame', fn => fn())
        const focusMock = vi.fn()
        const wrapper = factory({ autofocus: true })
        await nextTick()
        wrapper.vm['inputs'][0] = { focus: focusMock } as HTMLInputElement
        wrapper.vm['focusFirst']()
        await nextTick()
        expect(focusMock).toHaveBeenCalled()
    })
})
