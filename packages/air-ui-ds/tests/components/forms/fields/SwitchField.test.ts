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

describe('SwitchField', () => {
    it('renders legend when provided', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                legend: 'Settings'
            }
        })

        const legend = wrapper.find('legend')
        expect(legend.exists()).toBe(true)
        expect(legend.text()).toBe('Settings')
    })

    it('renders label when provided', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                label: 'Enable feature'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toContain('Enable feature')
    })

    it('applies correct size and switch styling classes', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                size: ControlFieldSize.LG,
                styleType: SwitchStyle.SUCCESS,
                modelValue: true
            }
        })

        const switchWrapper = wrapper.find('div.relative.flex.items-center')
        expect(switchWrapper.classes()).toContain('bg-background-success-bold')
        expect(switchWrapper.classes()).toContain('w-[56px]')
    })

    it('renders help text when provided and no error is present', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                helpText: 'Helpful info'
            }
        })

        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful info')
        expect(help.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders error text when error is present', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                error: 'Required field'
            }
        })

        const error = wrapper.find('p')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('Required field')
        expect(error.classes()).toContain('text-text-error')
    })

    it('emits update:modelValue when switch is toggled', async () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                modelValue: false
            }
        })

        const toggle = wrapper.find('div.relative.flex.items-center')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                modelValue: false,
                disabled: true
            }
        })

        const toggle = wrapper.find('div.relative.flex.items-center')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error from toggle when validator fails', async () => {
        const validator = vi.fn().mockReturnValue('Validation failed')

        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                modelValue: false,
                required: true,
                validator
            }
        })

        const toggle = wrapper.find('div.relative.flex.items-center')
        await toggle.trigger('click')
        await nextTick()

        expect(validator).toHaveBeenCalledWith(false)

        // Allow for either one or two emissions
        const emits = wrapper.emitted('update:error') ?? []
        expect(emits.length).toBeGreaterThanOrEqual(1)
        expect(emits[0]).toEqual(['Validation failed'])
    })

    it('emits update:error on modelValue change via watch', async () => {
        const validator = vi.fn().mockReturnValue('Invalid')

        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                required: true,
                validator,
                modelValue: false,
                error: ''
            }
        })

        await wrapper.setProps({ modelValue: true })

        expect(validator).toHaveBeenCalledWith(true)
        expect(wrapper.emitted('update:error')).toEqual([['Invalid']])
    })

    it('does not validate when required is false', async () => {
        const validator = vi.fn()

        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                required: false,
                validator,
                modelValue: true
            }
        })

        await wrapper.setProps({ modelValue: false })

        expect(validator).not.toHaveBeenCalled()
    })

    it('renders icon when `icon` prop is provided', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                icon: 'mdiTest'
            }
        })

        const icon = wrapper.findComponent({ name: 'MdiIcon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiTest')
    })

    it('renders custom icon when `customIcon` is provided', () => {
        const wrapper = mount(SwitchField, {
            props: {
                ...defaultProps,
                customIcon: '<svg></svg>'
            }
        })

        const customIcon = wrapper.find('div[role="img"], div:has(svg)')
        expect(customIcon.exists()).toBe(true)
    })
})
