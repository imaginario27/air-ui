import { mount } from '@vue/test-utils'
import SelectField from '~/components/forms/fields/SelectField.vue'
import DropdownSelect from '~/components/dropdowns/DropdownSelect.vue'
import BadgeStack from '~/components/badges/BadgeStack.vue'
import { FormValidationMode } from '~/models/enums/formValidations'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const defaultProps = {
    id: 'select-field',
    maxLength: 50,
    options: [
        { label: 'Option A', value: 'A', text: 'Option A' },
        { label: 'Option B', value: 'B', text: 'Option B' }
    ]
}

describe('SelectField', () => {
    it('renders with minimal props', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.exists()).toBe(true)
        expect(dropdown.props('options')).toHaveLength(2)
    })

    it('renders label when provided', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                label: 'Choose'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Choose')
        expect(label.attributes('for')).toBe('select-field')
    })

    it('renders helpText if provided and no error', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                helpText: 'Helpful'
            }
        })

        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful')
        expect(help.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders help text before the dropdown when helpTextPosition is top', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                label: 'Choose',
                helpText: 'Pick one',
                helpTextPosition: Position.TOP,
            }
        })

        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Pick one')
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const labelIdx = children.findIndex(el => el.tagName === 'LABEL')
        expect(helpIdx).toBeGreaterThan(labelIdx)
        expect(helpIdx).toBeLessThan(children.length - 1)
    })

    it('renders error if present', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                error: 'Something went wrong'
            }
        })

        const error = wrapper.find('p')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('Something went wrong')
        expect(error.classes()).toContain('text-text-error')
    })

    it('passes error border classes to dropdown select box when has error', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                error: 'Something went wrong'
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.props('selectBoxClass')).toContain('border-border-error')
        expect(dropdown.props('selectBoxClass')).toContain('text-text-error')
    })

    it('emits update:modelValue on value change', async () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        await dropdown.vm.$emit('update:modelValue', 'B')

        expect(wrapper.emitted('update:modelValue')).toEqual([['B']])
    })

    it('deselects if allowDeselect is true and same value is selected again', async () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                modelValue: 'A',
                allowDeselect: true
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        await dropdown.vm.$emit('update:modelValue', 'A')

        expect(wrapper.emitted('update:modelValue')).toEqual([[null]])
    })

    it('renders badge stack when multiple and hasBadgeStack are true', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                multiple: true,
                hasBadgeStack: true,
                modelValue: ['A', 'B']
            }
        })

        const badges = wrapper.findComponent(BadgeStack)
        expect(badges.exists()).toBe(true)
        expect(badges.props('items')).toHaveLength(2)
    })

    it('removes item from badge when badge close event is triggered', async () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                multiple: true,
                hasBadgeStack: true,
                modelValue: ['A', 'B']
            }
        })

        const badgeStack = wrapper.findComponent(BadgeStack)
        await badgeStack.vm.$emit('close', { label: 'Option A', value: 'A' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['B']]])
    })

    it('displays loading placeholder if options are loading and showLoadingState is true', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                options: [],
                isLoading: true,
                showLoadingState: true,
                loadingOptionsPlaceholder: 'Loading...'
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.props('placeholder')).toBe('Loading...')
        expect(dropdown.props('isLoading')).toBe(true)
    })

    it('uses fallback placeholder when not loading', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                placeholder: 'Pick one',
                isLoading: false
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.props('placeholder')).toBe('Pick one')
    })

    it('emits update:error after modelValue changes and validation mode is BLUR', async () => {
        const validator = vi.fn().mockReturnValue('Invalid selection')

        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                validator,
                required: true,
                modelValue: 'A',
                error: ''
            }
        })

        await wrapper.setProps({ modelValue: 'B' })

        expect(validator).toHaveBeenCalledWith('B')
        expect(wrapper.emitted('update:error')).toEqual([['Invalid selection']])
    })

    it('does not validate when required is false', async () => {
        const validator = vi.fn()

        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                validator,
                required: false
            }
        })

        await wrapper.setProps({ modelValue: 'A' })

        expect(validator).not.toHaveBeenCalled()
        expect(wrapper.emitted('update:error')).toBeUndefined()
    })

    it('emits empty error if validator is not defined', async () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                required: true
            }
        })

        await wrapper.setProps({ modelValue: 'A' })

        expect(wrapper.emitted('update:error')).toEqual([['']])
    })

    it('forwards ariaLabel when visual label is hidden', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                label: '',
                ariaLabel: 'Accessible select field',
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)

        expect(wrapper.find('label').exists()).toBe(false)
        expect(dropdown.props('ariaLabel')).toBe('Accessible select field')
    })

    it('forwards clearSelectionAriaLabel to DropdownSelect', () => {
        const wrapper = mount(SelectField, {
            props: {
                ...defaultProps,
                clearSelectionAriaLabel: 'Limpiar selección',
            }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.props('clearSelectionAriaLabel')).toBe('Limpiar selección')
    })

    it('forwards transparent prop to DropdownSelect', () => {
        const wrapper = mount(SelectField, {
            props: { ...defaultProps, transparent: true }
        })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.props('transparent')).toBe(true)
    })

    it('passes transparent false by default to DropdownSelect', () => {
        const wrapper = mount(SelectField, { props: { ...defaultProps } })

        const dropdown = wrapper.findComponent(DropdownSelect)
        expect(dropdown.props('transparent')).toBe(false)
    })
})
