import { mount } from '@vue/test-utils'
import Heading from '@/components/layouts/Heading.vue'
import { HeadingSize, HeadingSpacing } from '@/models/enums/headings'
import { Align } from '@/models/enums/positions'

const factory = (props = {}, slots = {}) => {
    return mount(Heading, {
        props,
        slots
    })
}

describe('Heading.vue', () => {
    it('renders default title when no title is provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Heading title')
    })

    it('renders custom title with specified heading tag', () => {
        const wrapper = factory({ title: 'Custom Title', headingTag: 'h2' })
        const heading = wrapper.find('h2')
        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('Custom Title')
    })

    it('renders overtitle when provided', () => {
        const wrapper = factory({ overtitle: 'Over the top' })
        const overtitle = wrapper.find('span')
        expect(overtitle.exists()).toBe(true)
        expect(overtitle.text()).toBe('Over the top')
    })

    it('renders description when provided', () => {
        const wrapper = factory({ description: 'Some details below' })
        const description = wrapper.find('p')
        expect(description.exists()).toBe(true)
        expect(description.text()).toBe('Some details below')
    })

    it('adds uppercase class to overtitle when isOverTitleUppercase is true', () => {
        const wrapper = factory({
            overtitle: 'Upper Overtitle',
            isOverTitleUppercase: true
        })
        expect(wrapper.find('span').classes()).toContain('uppercase')
    })

    it('applies alignment classes for RIGHT alignment', () => {
        const wrapper = factory({ align: Align.RIGHT })
        const root = wrapper.find('div')
        const classes = root.classes().join(' ')
        expect(classes).toMatch(/items-end.*text-right.*md:items-end.*md:text-right/)
    })

    it('applies mobile-centered classes when isMobileCentered is true', () => {
        const wrapper = factory({
            align: Align.LEFT,
            isMobileCentered: true
        })
        const classes = wrapper.find('div').classes()
        expect(classes).toContain('items-center')
        expect(classes).toContain('text-center')
        expect(classes.join(' ')).toMatch(/md:items-start.*md:text-left/)
    })

    it('uses correct title size class for size SM', () => {
        const wrapper = factory({ size: HeadingSize.SM })
        const heading = wrapper.find('h1')
        expect(heading.classes()).toContain('text-2xl')
    })

    it('applies spaced class on description when spacing is SPACED', () => {
        const wrapper = factory({
            description: 'Spaced description',
            size: HeadingSize.LG,
            spacing: HeadingSpacing.SPACED
        })
        const description = wrapper.find('p')
        expect(description.classes()).toContain('mt-9')
    })

    it('adds custom classes to overtitle, title, and description when provided', () => {
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

    it('renders overtitle slot content when provided', () => {
        const wrapper = factory(
            { overtitle: 'Fallback' },
            { overtitle: '<span>Slot Overtitle</span>' }
        )
        expect(wrapper.html()).toContain('Slot Overtitle')
        expect(wrapper.text()).not.toContain('Fallback')
    })

    it('renders title slot content when provided', () => {
        const wrapper = factory(
            { title: 'Fallback Title' },
            { title: '<span>Slot Title</span>' }
        )
        expect(wrapper.html()).toContain('Slot Title')
        expect(wrapper.text()).not.toContain('Fallback Title')
    })

    it('renders description slot content when provided', () => {
        const wrapper = factory(
            { description: 'Fallback Description' },
            { description: '<span>Slot Description</span>' }
        )
        expect(wrapper.html()).toContain('Slot Description')
        expect(wrapper.text()).not.toContain('Fallback Description')
    })

    it('renders default classes for undefined size or spacing values', () => {
        const wrapper = factory({
            // @ts-expect-error: testing invalid size
            size: 'invalid',
            // @ts-expect-error: testing invalid spacing
            spacing: 'invalid',
            description: 'Check spacing'
        })
        const heading = wrapper.find('h1')
        const description = wrapper.find('p')

        expect(heading.classes()).toContain('text-4xl')
        expect(description.classes()).toContain('mt-6')
    })
})
