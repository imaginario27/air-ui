import { mount } from '@vue/test-utils'
import Heading from '@/components/layouts/Heading.vue'
import { HeadingSize, HeadingSpacing } from '@/models/enums/headings'
import { Align } from '@/models/enums/positions'

const factory = (props = {}) => {
    return mount(Heading, {
        props
    })
}

describe('Heading.vue', () => {
    it('renders default title if none is passed', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Heading title')
    })

    it('renders a custom title and tag', () => {
        const wrapper = factory({ title: 'Custom Title', headingTag: 'h2' })
        const heading = wrapper.find('h2')
        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('Custom Title')
    })

    it('renders overtitle when provided', () => {
        const wrapper = factory({ overtitle: 'Over the top' })
        expect(wrapper.find('span').text()).toBe('Over the top')
    })

    it('renders description when provided', () => {
        const wrapper = factory({ description: 'Some details below' })
        const p = wrapper.find('p')
        expect(p.exists()).toBe(true)
        expect(p.text()).toBe('Some details below')
    })

    it('renders overtitle in uppercase when isOverTitleUppercase is true', () => {
        const wrapper = factory({
            overtitle: 'Upper Overtitle',
            isOverTitleUppercase: true
        })
        const span = wrapper.find('span')
        expect(span.classes()).toContain('uppercase')
    })

    it('applies alignment classes correctly', () => {
        const wrapper = factory({
            align: Align.RIGHT
        })
        const root = wrapper.find('div')
        expect(root.classes().join(' ')).toMatch(/items-end.*text-right.*md:items-end.*md:text-right/)
    })

    it('centers content on mobile when isMobileCentered is true', () => {
        const wrapper = factory({
            align: Align.LEFT,
            isMobileCentered: true
        })
        const root = wrapper.find('div')
        expect(root.classes()).toContain('items-center')
        expect(root.classes()).toContain('text-center')
        expect(root.classes().join(' ')).toMatch(/md:items-start.*md:text-left/)
    })

    it('applies size classes based on size prop', () => {
        const wrapper = factory({
            size: HeadingSize.SM
        })
        const heading = wrapper.find('h1')
        expect(heading.classes()).toContain('text-2xl')
    })

    it('applies spacing class "spaced" for description', () => {
        const wrapper = factory({
            description: 'Spaced description',
            size: HeadingSize.LG,
            spacing: HeadingSpacing.SPACED
        })
        const p = wrapper.find('p')
        expect(p.classes()).toContain('mt-9')
    })

    it('applies custom classes when passed as props', () => {
        const wrapper = factory({
            overtitle: 'With class',
            overtitleClass: 'custom-overtitle',
            titleClass: 'custom-title',
            description: 'With class',
            descriptionClass: 'custom-description'
        })

        expect(wrapper.find('span').classes()).toContain('custom-overtitle')
        expect(wrapper.find('h1').classes()).toContain('custom-title')
        expect(wrapper.find('p').classes()).toContain('custom-description')
    })
})
