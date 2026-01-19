import { mount } from '@vue/test-utils'
import ToggleButton from '@/components/buttons/toggle/ToggleButton.vue'
import { IconPosition } from '@/models/enums/icons'
import { ButtonSize } from '@/models/enums/buttons'
import Icon from '@/components/icons/Icon.vue'

const defaultProps = {
    text: 'Test Button',
    size: ButtonSize.LG,
    icon: 'mdi:test',
    iconPosition: IconPosition.NONE,
    disabled: false,
    active: false,
}
const factory = (props = {}) => {
    return mount(ToggleButton, {
        props: {
            ...defaultProps,
            ...props,
        },
        global: {
            components: {
                Icon,
            },
        },
    })
}

describe('ToggleButton', () => {
    it('renders button text', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Test Button')
    })

    it('applies active styling when active is true', () => {
        const wrapper = factory({ active: true })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('bg-background-primary-brand-subtle-active')
        expect(button.classes()).toContain('text-text-primary-brand-on-soft-bg')
    })

    it('applies inactive styling when active is false', () => {
        const wrapper = factory({ active: false })
        const button = wrapper.find('button')
        expect(button.classes()).toContain('text-text-neutral-inactive')
    })

    it('disables button when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        const button = wrapper.find('button')
        expect(button.attributes('disabled')).toBeDefined()
        expect(button.classes()).toContain('cursor-not-allowed')
        expect(button.classes()).toContain('opacity-disabled')
    })

    it('does not disable button when disabled is false', () => {
        const wrapper = factory({ disabled: false })
        expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })

    it('emits click event when button is clicked and not disabled', async () => {
        const wrapper = factory({ disabled: false })
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('does not emit click event when button is disabled', async () => {
        const wrapper = factory({ disabled: true })
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('renders left icon when iconPosition is LEFT', () => {
        const wrapper = factory({ iconPosition: IconPosition.LEFT })
        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
    })

    it('renders right icon when iconPosition is RIGHT', () => {
        const wrapper = factory({ iconPosition: IconPosition.RIGHT })
        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
    })

    it('does not render icon when iconPosition is NONE', () => {
        const wrapper = factory({ iconPosition: IconPosition.NONE })
        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(false)
    })

    it('applies correct size-based classes', () => {
        const sizeProps = [
            { size: ButtonSize.XS, expectedHeight: 'h-[24px]' },
            { size: ButtonSize.SM, expectedHeight: 'h-[28px]' },
            { size: ButtonSize.MD, expectedHeight: 'h-[32px]' },
            { size: ButtonSize.LG, expectedHeight: 'h-[36px]' },
            { size: ButtonSize.XL, expectedHeight: 'h-[40px]' },
            { size: ButtonSize.XXL, expectedHeight: 'h-[48px]' },
        ]

        sizeProps.forEach(({ size, expectedHeight }) => {
            const wrapper = factory({ size })
            const button = wrapper.find('button')
            expect(button.classes()).toContain(expectedHeight)
        })
    })
})
