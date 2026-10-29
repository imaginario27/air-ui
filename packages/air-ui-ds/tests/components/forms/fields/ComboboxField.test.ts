import { mount } from '@vue/test-utils'
import { GlowColorMode, GlowTrigger, GlowType } from '@/models/enums/glow'
import ComboboxField from '~/components/forms/fields/ComboboxField.vue'
import DropdownCombobox from '~/components/dropdowns/DropdownCombobox.vue'
import BadgeStack from '~/components/badges/BadgeStack.vue'
import { FormValidationMode } from '~/models/enums/formValidations'
import { Position } from '@/models/enums/positions'
import { SelectSize } from '@/models/enums/selects'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR),
}))

const defaultProps = {
    id: 'combobox-field',
    options: [
        { text: 'Option A', value: 'A' },
        { text: 'Option B', value: 'B' },
    ],
}

describe('ComboboxField', () => {
    it('renders a DropdownCombobox with the given options', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps } })

        const combobox = wrapper.findComponent(DropdownCombobox)
        expect(combobox.exists()).toBe(true)
        expect(combobox.props('options')).toHaveLength(2)
    })

    it('renders the label linked to the input', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, label: 'Choose', required: true } })

        const label = wrapper.find('label')
        expect(label.text()).toBe('Choose')
        expect(label.attributes('for')).toBe('combobox-field')
        expect(wrapper.find('input').attributes('id')).toBe('combobox-field')
    })

    it('shows the optional hint when the field is not required', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, label: 'Choose' } })

        expect(wrapper.find('label').text()).toContain('(optional)')
    })

    it('renders help text and error text', async () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, helpText: 'Helpful' } })
        expect(wrapper.find('p').text()).toBe('Helpful')

        await wrapper.setProps({ error: 'Something went wrong' })
        expect(wrapper.find('p').text()).toBe('Something went wrong')
        expect(wrapper.find('p').classes()).toContain('text-text-error')
    })

    it('renders help text above the combobox when helpTextPosition is top', () => {
        const wrapper = mount(ComboboxField, {
            props: { ...defaultProps, label: 'Choose', helpText: 'Pick one', helpTextPosition: Position.TOP },
        })

        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex((el) => el.tagName === 'P')

        expect(helpIdx).toBeGreaterThan(children.findIndex((el) => el.tagName === 'LABEL'))
        expect(helpIdx).toBeLessThan(children.length - 1)
    })

    it('passes error classes to the combobox box when there is an error', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, error: 'Invalid' } })

        const combobox = wrapper.findComponent(DropdownCombobox)
        expect(combobox.props('selectBoxClass')).toContain('border-border-error')
        expect(combobox.props('selectBoxClass')).toContain('text-text-error')
    })

    it('forwards update:modelValue from the combobox', async () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps } })

        await wrapper.findComponent(DropdownCombobox).vm.$emit('update:modelValue', 'B')

        expect(wrapper.emitted('update:modelValue')).toEqual([['B']])
    })

    it('forwards the search event from the combobox', async () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps } })

        await wrapper.findComponent(DropdownCombobox).vm.$emit('search', 'op')

        expect(wrapper.emitted('search')).toEqual([['op']])
    })

    it('forwards behavior props to the combobox', () => {
        const wrapper = mount(ComboboxField, {
            props: {
                ...defaultProps,
                allowCustomValue: true,
                allowDeselect: true,
                clearable: false,
                filterLocally: false,
                searchDebounce: 500,
                isLoading: true,
                multiple: true,
            },
        })

        const combobox = wrapper.findComponent(DropdownCombobox)
        expect(combobox.props('allowCustomValue')).toBe(true)
        expect(combobox.props('allowDeselect')).toBe(true)
        expect(combobox.props('clearable')).toBe(false)
        expect(combobox.props('filterLocally')).toBe(false)
        expect(combobox.props('searchDebounce')).toBe(500)
        expect(combobox.props('isLoading')).toBe(true)
        expect(combobox.props('multiple')).toBe(true)
    })

    it('forwards ariaLabel only when there is no visible label', () => {
        const withoutLabel = mount(ComboboxField, { props: { ...defaultProps, ariaLabel: 'Accessible' } })
        expect(withoutLabel.findComponent(DropdownCombobox).props('ariaLabel')).toBe('Accessible')

        const withLabel = mount(ComboboxField, { props: { ...defaultProps, label: 'Choose', ariaLabel: 'Accessible' } })
        expect(withLabel.findComponent(DropdownCombobox).props('ariaLabel')).toBeUndefined()
    })

    it('renders a badge stack when multiple and hasBadgeStack are true', () => {
        const wrapper = mount(ComboboxField, {
            props: { ...defaultProps, multiple: true, hasBadgeStack: true, modelValue: ['A', 'B'] },
        })

        const badges = wrapper.findComponent(BadgeStack)
        expect(badges.exists()).toBe(true)
        expect(badges.props('items')).toHaveLength(2)
    })

    it('removes a value when its badge is closed', async () => {
        const wrapper = mount(ComboboxField, {
            props: { ...defaultProps, multiple: true, hasBadgeStack: true, modelValue: ['A', 'B'] },
        })

        await wrapper.findComponent(BadgeStack).vm.$emit('close', { value: 'A' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['B']]])
    })

    it('emits update:error after modelValue changes and validation mode is BLUR', async () => {
        const validator = vi.fn().mockReturnValue('Invalid selection')
        const wrapper = mount(ComboboxField, {
            props: { ...defaultProps, validator, required: true, modelValue: 'A' },
        })

        await wrapper.setProps({ modelValue: 'B' })

        expect(validator).toHaveBeenCalledWith('B')
        expect(wrapper.emitted('update:error')).toEqual([['Invalid selection']])
    })

    it('does not validate when required is false', async () => {
        const validator = vi.fn()
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, validator, required: false } })

        await wrapper.setProps({ modelValue: 'A' })

        expect(validator).not.toHaveBeenCalled()
        expect(wrapper.emitted('update:error')).toBeUndefined()
    })
})

describe('ComboboxField glow', () => {
    const glowMount = (props: Record<string, any> = {}) =>
        mount(ComboboxField, { props: { ...defaultProps, ...props } })
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
        const classes = [
            ...glowBoxes(
                glowMount({
                    glowColorMode: GlowColorMode.DARK,
                    glowTrigger: GlowTrigger.ALWAYS,
                    glowType: GlowType.OUTER,
                }),
            )[0]!.classList,
        ]
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

describe('ComboboxField size', () => {
    it('defaults the size to MD', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps } })

        expect(wrapper.findComponent(DropdownCombobox).props('size')).toBe(SelectSize.MD)
    })

    it('forwards responsiveSize to the dropdown', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, responsiveSize: true } })

        expect(wrapper.findComponent(DropdownCombobox).props('responsiveSize')).toBe(true)
    })

    it('forwards an explicit size to the combobox', () => {
        const wrapper = mount(ComboboxField, { props: { ...defaultProps, size: SelectSize.LG } })

        expect(wrapper.findComponent(DropdownCombobox).props('size')).toBe(SelectSize.LG)
    })
})
