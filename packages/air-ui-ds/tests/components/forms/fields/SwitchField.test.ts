import { mount } from '@vue/test-utils'
import SwitchField from '~/components/forms/fields/SwitchField.vue'
import { FormValidationMode } from '~/models/enums/formValidations'
import { ControlFieldSize, SwitchStyle } from '#imports'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const defaultProps = {
    id: 'switch-id'
}

const factory = (props: Record<string, unknown> = {}) => {
    return mount(SwitchField, {
        props: {
            ...defaultProps,
            ...props
        }
    })
}

describe('SwitchField', () => {
    it('renders legend when provided', () => {
        const wrapper = factory({ legend: 'Settings' })

        const legend = wrapper.find('legend')
        expect(legend.exists()).toBe(true)
        expect(legend.text()).toBe('Settings')
    })

    it('renders label when provided', () => {
        const wrapper = factory({ label: 'Enable feature' })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toContain('Enable feature')
    })

    it('applies correct size and switch styling classes', () => {
        const wrapper = factory({
            size: ControlFieldSize.LG,
            styleType: SwitchStyle.SUCCESS,
            modelValue: true
        })

        const switchWrapper = wrapper.find('div.relative.flex.items-center')
        expect(switchWrapper.classes()).toContain('bg-background-success-bold')
        expect(switchWrapper.classes()).toContain('w-[56px]')
    })

    it('renders help text when provided and no error is present', () => {
        const wrapper = factory({ helpText: 'Helpful info' })

        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful info')
        expect(help.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders error text when error is present', () => {
        const wrapper = factory({ error: 'Required field' })

        const error = wrapper.find('p')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('Required field')
        expect(error.classes()).toContain('text-text-error')
    })

    it('emits update:modelValue when switch is toggled', async () => {
        const wrapper = factory({ modelValue: false })

        const toggle = wrapper.find('div.relative.flex.items-center')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({
            modelValue: false,
            disabled: true
        })

        const toggle = wrapper.find('div.relative.flex.items-center')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error from toggle when validator fails', async () => {
        const validator = vi.fn().mockReturnValue('Validation failed')

        const wrapper = factory({
            modelValue: false,
            required: true,
            validator
        })

        const toggle = wrapper.find('div.relative.flex.items-center')
        await toggle.trigger('click')
        await nextTick()

        expect(validator).toHaveBeenCalledWith(false)

        const emits = wrapper.emitted('update:error') ?? []
        expect(emits.length).toBeGreaterThanOrEqual(1)
        expect(emits[0]).toEqual(['Validation failed'])
    })

    it('emits update:error on modelValue change via watch', async () => {
        const validator = vi.fn().mockReturnValue('Invalid')

        const wrapper = factory({
            required: true,
            validator,
            modelValue: false,
            error: ''
        })

        await wrapper.setProps({ modelValue: true })

        expect(validator).toHaveBeenCalledWith(true)
        expect(wrapper.emitted('update:error')).toEqual([['Invalid']])
    })

    it('does not validate when required is false', async () => {
        const validator = vi.fn()

        const wrapper = factory({
            required: false,
            validator,
            modelValue: true
        })

        await wrapper.setProps({ modelValue: false })

        expect(validator).not.toHaveBeenCalled()
    })

    it('renders icon when icon prop is provided', () => {
        const wrapper = factory({ icon: 'mdi:mdi-test' })

        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:mdi-test')
    })

    it('places switch next to label when fitToContent is enabled', () => {
        const wrapper = factory({
            label: 'Enable feature',
            fitToContent: true
        })

        const mainWrapper = wrapper
            .findAll('div')
            .find(div => div.classes().includes('items-center'))

        expect(mainWrapper).toBeDefined()
        expect(mainWrapper!.classes()).toContain('w-max')
        expect(mainWrapper!.classes()).toContain('gap-3')
    })
})
