import { mount } from '@vue/test-utils'
import MetricCard from '@/components/cards/specific/MetricCard.vue'
import { Align } from '~/models/enums/positions'

const factory = (props = {}, options = {}) => {
    return mount(MetricCard, {
        props,
        ...options
    })
}

describe('MetricCard.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the default title', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Card title')
    })

    it('renders a custom title', () => {
        const wrapper = factory({ title: 'Custom Title' })
        expect(wrapper.text()).toContain('Custom Title')
    })

    it('renders the value correctly', () => {
        const wrapper = factory({ value: 123 })
        expect(wrapper.text()).toContain('123')
    })

    it('renders the description if provided', () => {
        const wrapper = factory({ description: 'This is a test description' })
        expect(wrapper.text()).toContain('This is a test description')
        expect(wrapper.find('p.text-text-neutral-subtle').exists()).toBe(true)
    })

    it('does not render the description if not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('p.text-text-neutral-subtle').exists()).toBe(false)
    })

    it('applies text-center class when align is CENTER', () => {
        const wrapper = factory({ align: Align.CENTER })
        const alignedDiv = wrapper.find('.flex.flex-col.text-center')
        expect(alignedDiv.classes()).toContain('text-center')
    })

    it('does not apply text-center class when align is LEFT', () => {
        const wrapper = factory({ align: Align.LEFT })
        const alignedDiv = wrapper.find('.flex.flex-col')
        expect(alignedDiv.classes()).not.toContain('text-center')
    })
})
