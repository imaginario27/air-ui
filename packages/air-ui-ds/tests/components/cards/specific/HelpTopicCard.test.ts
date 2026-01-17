import { mount } from '@vue/test-utils'
import HelpTopicCard from '@/components/cards/specific/HelpTopicCard.vue'

const factory = (props = {}, options = {}) => {
    return mount(HelpTopicCard, {
        props,
        ...options
    })
}

describe('HelpTopicCard.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the default title and description', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Title')
        expect(wrapper.text()).toContain('Description')
    })

    it('renders custom title and description', () => {
        const wrapper = factory({
            title: 'Custom Help Title',
            description: 'Detailed help topic description'
        })
        expect(wrapper.text()).toContain('Custom Help Title')
        expect(wrapper.text()).toContain('Detailed help topic description')
    })

    it('renders the ContainedIcon with correct default and custom icon', () => {
        const defaultWrapper = factory()
        expect(
            defaultWrapper.findComponent({ name: 'ContainedIcon' }).props('icon')
        ).toBe('mdi:help')

        const customWrapper = factory({ icon: 'mdi:book' })
        expect(
            customWrapper.findComponent({ name: 'ContainedIcon' }).props('icon')
        ).toBe('mdi:book')
    })

    it('renders ActionButton with correct props', () => {
        const wrapper = factory({
            to: '/support/article',
            buttonText: 'Read more',
            buttonIcon: 'mdi:chevron-right'
        })
        const button = wrapper.findComponent({ name: 'ActionButton' })

        expect(button.props('text')).toBe('Read more')
        expect(button.props('icon')).toBe('mdi:chevron-right')
        expect(button.props('to')).toBe('/support/article')
        expect(button.props('styleType')).toBe('neutral-transparent')
        expect(button.props('actionType')).toBe('link')
        expect(button.props('iconPosition')).toBe('right')
    })

    it('renders button with default values when not specified', () => {
        const wrapper = factory()
        const button = wrapper.findComponent({ name: 'ActionButton' })
        expect(button.props('text')).toBe('Learn more')
        expect(button.props('icon')).toBe('mdi:arrow-right')
        expect(button.props('to')).toBe('/')
    })
})
