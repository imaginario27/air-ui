import { mount } from '@vue/test-utils'
import { h } from 'vue'
import SlotField from '~/components/forms/fields/SlotField.vue'
import { Position } from '@/models/enums/positions'

const factory = (
    props: Record<string, unknown> = {},
    withSlot = false
) => {
    return mount(SlotField, {
        props: {
            id: 'slot-field-id',
            ...props
        },
        slots: withSlot
            ? {
                default: (slotProps: Record<string, unknown>) =>
                    h('div', { class: 'slot-props' }, [
                        h('span', { class: 'slot-aria-label' }, String(slotProps.ariaLabel)),
                        h('span', { class: 'slot-error' }, String(slotProps.error)),
                        h('span', { class: 'slot-has-error' }, String(slotProps.hasError)),
                        h('span', { class: 'slot-help-text' }, String(slotProps.helpText)),
                        h('span', { class: 'slot-disabled' }, String(slotProps.disabled)),
                        h('span', { class: 'slot-required' }, String(slotProps.required)),
                    ])
            }
            : undefined
    })
}

describe('SlotField.vue', () => {
    it('renders label when provided', () => {
        const wrapper = factory({ label: 'Custom Field' })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Custom Field')
    })

    it('renders help text with neutral class when there is no error', () => {
        const wrapper = factory({ helpText: 'Helpful text' })

        const helpText = wrapper.find('p.text-xs')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Helpful text')
        expect(helpText.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders help text before the slot container when helpTextPosition is top', () => {
        const wrapper = factory({ label: 'Custom', helpText: 'Slot hint', helpTextPosition: Position.TOP })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Slot hint')
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const labelIdx = children.findIndex(el => el.tagName === 'LABEL')
        expect(helpIdx).toBeGreaterThan(labelIdx)
        expect(helpIdx).toBeLessThan(children.length - 1)
    })

    it('renders error text with error class and updates label color', () => {
        const wrapper = factory({ label: 'Custom Field', error: 'Field is required' })

        const errorText = wrapper.find('p.text-xs')
        expect(errorText.exists()).toBe(true)
        expect(errorText.text()).toBe('Field is required')
        expect(errorText.classes()).toContain('text-text-error')

        const label = wrapper.find('label')
        expect(label.classes()).toContain('text-text-error')
    })

    it('applies disabled styles to the slot container', () => {
        const wrapper = factory({ disabled: true })

        const slotContainer = wrapper.findAll('div').at(1)
        expect(slotContainer?.classes()).toContain('cursor-not-allowed')
        expect(slotContainer?.classes()).toContain('opacity-disabled')
    })

    it('passes reactive state through scoped slot props', () => {
        const wrapper = factory(
            {
                helpText: 'Slot help text',
                error: 'Slot error',
                disabled: true,
                required: true,
            },
            true
        )

        expect(wrapper.find('.slot-props').exists()).toBe(true)
        expect(wrapper.find('.slot-error').text()).toBe('Slot error')
        expect(wrapper.find('.slot-has-error').text()).toBe('true')
        expect(wrapper.find('.slot-help-text').text()).toBe('Slot help text')
        expect(wrapper.find('.slot-disabled').text()).toBe('true')
        expect(wrapper.find('.slot-required').text()).toBe('true')
    })

    it('passes ariaLabel through scoped slot props', () => {
        const wrapper = factory(
            {
                ariaLabel: 'Custom control label',
            },
            true
        )

        expect(wrapper.find('.slot-aria-label').text()).toBe('Custom control label')
    })
})
