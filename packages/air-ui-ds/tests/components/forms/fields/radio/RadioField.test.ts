import { mount } from '@vue/test-utils'
import RadioField from '~/components/forms/fields/radio/RadioField.vue'

const defaultProps = {
    id: 'radio-1',
    name: 'group',
    value: 'option1',
    modelValue: null,
    label: 'Test Label',
    helpText: 'Helpful text',
}

describe('RadioField', () => {
    const factory = (props = {}) => {
        return mount(RadioField, {
            props: {
                ...defaultProps,
                ...props,
            },
        })
    }

    it('renders label and helpText correctly', () => {
        const wrapper = factory()

        expect(wrapper.find('label').exists()).toBe(true)
        expect(wrapper.find('label').text()).toBe('Test Label')

        const helpText = wrapper.find('p')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Helpful text')
    })

    it('renders input as checked when modelValue matches value', () => {
        const wrapper = factory({ modelValue: 'option1' })
        const input = wrapper.get('input[type="radio"]')
        expect((input.element as HTMLInputElement).checked).toBe(true)

        const checkedIcon = wrapper.find('.bg-icon-neutral-on-filled-bg')
        expect(checkedIcon.exists()).toBe(true)
    })

    it('does not emit when disabled and clicked', async () => {
        const wrapper = factory({ disabled: true })

        await wrapper.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:modelValue when clicked and not disabled', async () => {
        const wrapper = factory()

        const radio = wrapper.findAll('div').find(div => div.classes().includes('cursor-pointer'))
        await radio!.trigger('click')
        
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option1'])
    })

    it('applies disabled styles when disabled', () => {
        const wrapper = factory({ disabled: true })

        const label = wrapper.find('label')
        expect(label.classes()).toContain('text-text-neutral-disabled')

        const radioBox = wrapper.findAll('div').find(div => div.classes().includes('cursor-not-allowed'))
        expect(radioBox).toBeTruthy()
    })

    it('applies correct size class for md (default)', () => {
        const wrapper = factory()
        const radio = wrapper.findAll('div').find(div => div.classes().includes('w-[24px]'))
        expect(radio).toBeTruthy()
    })

    it('applies correct size class for lg', () => {
        const wrapper = factory({ size: 'lg' })
        const radio = wrapper.findAll('div').find(div => div.classes().includes('w-[32px]'))
        expect(radio).toBeTruthy()

        const label = wrapper.find('label')
        expect(label.classes()).toContain('text-base')
    })

    it('renders label on correct side when inverse is false', () => {
        const wrapper = factory({ inverse: false })

        const labels = wrapper.findAll('label')
        expect(labels.length).toBe(1)

        // Label should appear after the radio button
        const html = wrapper.html()
        const inputIndex = html.indexOf('<input')
        const labelIndex = html.indexOf('<label')

        expect(labelIndex).toBeGreaterThan(inputIndex)
    })

    it('renders label on correct side when inverse is true', () => {
        const wrapper = factory({ inverse: true })

        const labels = wrapper.findAll('label')
        expect(labels.length).toBe(1)

        // Label should appear before the radio button
        const html = wrapper.html()
        const inputIndex = html.indexOf('<input')
        const labelIndex = html.indexOf('<label')

        expect(labelIndex).toBeLessThan(inputIndex)
    })

    it('does not render helpText if not provided', () => {
        const wrapper = factory({ helpText: undefined })

        expect(wrapper.find('p').exists()).toBe(false)
    })
})
