import { mount } from '@vue/test-utils'
import ConfirmationDetailsCard from '@/components/cards/specific/ConfirmationDetailsCard.vue'
import { Align } from '~/models/enums/positions'

const factory = (props = {}) => {
    return mount(ConfirmationDetailsCard, {
        props: {
            description: 'Test description',
            ...props,
        },
    })
}

describe('ConfirmationDetailsCard.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the default scope and title', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Scope')
        expect(wrapper.text()).toContain('Title')
    })

    it('renders custom scope and title', () => {
        const wrapper = factory({
            scope: 'Category',
            title: 'My Confirmation',
        })
        expect(wrapper.text()).toContain('Category')
        expect(wrapper.text()).toContain('My Confirmation')
    })

    it('renders the chevron-right icon', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:chevron-right')
    })

    it('applies justify-start by default (left alignment)', () => {
        const wrapper = factory()
        const contentDiv = wrapper.find('.flex.gap-1.w-full')
        expect(contentDiv.classes()).toContain('justify-start')
        expect(contentDiv.classes()).not.toContain('justify-center')
        expect(contentDiv.classes()).not.toContain('justify-end')
    })

    it('applies justify-center when alignement is CENTER', () => {
        const wrapper = factory({ alignement: Align.CENTER })
        const contentDiv = wrapper.find('.flex.gap-1.w-full')
        expect(contentDiv.classes()).toContain('justify-center')
        expect(contentDiv.classes()).not.toContain('justify-start')
    })

    it('applies justify-end when alignement is RIGHT', () => {
        const wrapper = factory({ alignement: Align.RIGHT })
        const contentDiv = wrapper.find('.flex.gap-1.w-full')
        expect(contentDiv.classes()).toContain('justify-end')
        expect(contentDiv.classes()).not.toContain('justify-start')
    })

    it('applies custom scopeClass to the scope span', () => {
        const wrapper = factory({ scopeClass: 'text-red-500' })
        const scopeSpan = wrapper.find('span.text-red-500')
        expect(scopeSpan.exists()).toBe(true)
        expect(scopeSpan.text()).toBe('Scope')
    })

    it('applies custom titleClass to the title span', () => {
        const wrapper = factory({ titleClass: 'text-blue-500' })
        const titleSpan = wrapper.find('span.font-bold.text-blue-500')
        expect(titleSpan.exists()).toBe(true)
    })

    it('applies custom iconClass to the icon', () => {
        const wrapper = factory({ iconClass: 'text-primary' })
        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.props('iconClass')).toContain('text-primary')
    })

    it('uses default prop values when none are provided', () => {
        const wrapper = factory()
        expect(wrapper.props()).toMatchObject({
            scope: 'Scope',
            title: 'Title',
            alignement: Align.LEFT,
        })
    })
})
