import { mount } from '@vue/test-utils'
import Section from '@/components/layouts/section/Section.vue'
import MaxWidthContainer from '@/components/layouts/MaxWidthContainer.vue'
import { SectionSpacing } from '@/models/enums/sections'

const factory = (props = {}, slots = {}) => {
    return mount(Section, {
        props,
        global: {
            stubs: {
                MaxWidthContainer: false
            }
        },
        slots: {
            default: '<p class="slot-content">Section Content</p>',
            ...slots
        }
    })
}

describe('Section.vue', () => {
    it('renders a <section> element', () => {
        const wrapper = factory()
        const section = wrapper.find('section')
        expect(section.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = factory()
        expect(wrapper.find('.slot-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Section Content')
    })

    it('applies default spacing classes', () => {
        const wrapper = factory()
        const section = wrapper.find('section')

        expect(section.classes()).toContain('py-[2vh]')
        expect(section.classes()).toContain('sm:py-section-xs')
    })

    it('applies top and bottom spacing when provided', () => {
        const wrapper = factory({
            topSpacing: SectionSpacing.LG,
            bottomSpacing: SectionSpacing.SM
        })

        const section = wrapper.find('section')
        expect(section.classes()).toContain('pt-[8vh]')
        expect(section.classes()).toContain('pb-[4vh]')
    })

    it('applies side padding when hasSidePadding is true', () => {
        const wrapper = factory({ hasSidePadding: true })
        expect(wrapper.find('section').classes()).toContain('px-content-side-padding-mobile')
    })

    it('does not apply side padding when hasSidePadding is false', () => {
        const wrapper = factory({ hasSidePadding: false })
        expect(wrapper.find('section').classes()).not.toContain('px-content-side-padding-mobile')
    })

    it('applies dark mode class when isDark is true', () => {
        const wrapper = factory({ isDark: true })
        expect(wrapper.find('section').classes()).toContain('dark')
    })

    it('adds id attribute when provided', () => {
        const wrapper = factory({ id: 'section-id' })
        expect(wrapper.find('section').attributes('id')).toBe('section-id')
    })

    it('does not add id attribute when not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('section').attributes('id')).toBeUndefined()
    })

    it('wraps slot content with MaxWidthContainer when hasContentMaxWidth is true', () => {
        const wrapper = factory({ hasContentMaxWidth: true })

        const container = wrapper.findComponent(MaxWidthContainer)
        expect(container.exists()).toBe(true)
        expect(container.find('.slot-content').exists()).toBe(true)
    })

    it('does not render MaxWidthContainer when hasContentMaxWidth is false', () => {
        const wrapper = factory({ hasContentMaxWidth: false })

        expect(wrapper.findComponent(MaxWidthContainer).exists()).toBe(false)
        expect(wrapper.find('.slot-content').exists()).toBe(true)
    })
})
