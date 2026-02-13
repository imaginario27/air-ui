import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Heading from '@/components/layouts/Heading.vue'
import { HeadingSize, HeadingSpacing } from '@/models/enums/headings'
import { Align } from '@/models/enums/positions'

const factory = (
    props: Record<string, unknown> = {},
    slots: Record<string, string> = {}
): VueWrapper => {
    return mount(Heading, {
        props,
        slots
    })
}

describe('Heading.vue', () => {
    it.concurrent('renders default title when no title is provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Heading title')
    })

    it.concurrent('renders custom title with specified heading tag', () => {
        const wrapper = factory({ title: 'Custom Title', headingTag: 'h2' })

        const heading = wrapper.find('h2')

        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('Custom Title')
    })

    it.concurrent('falls back to h1 when invalid headingTag is passed', () => {
        const wrapper = factory({
            // @ts-expect-error testing invalid tag
            headingTag: 'invalid'
        })

        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('invalid').exists()).toBe(false)
    })

    it.concurrent('renders overtitle when provided', () => {
        const wrapper = factory({ overtitle: 'Over the top' })

        const overtitle = wrapper.find('span')

        expect(overtitle.exists()).toBe(true)
        expect(overtitle.text()).toBe('Over the top')
    })

    it.concurrent('renders description when provided', () => {
        const wrapper = factory({ description: 'Some details below' })

        const description = wrapper.find('p')

        expect(description.exists()).toBe(true)
        expect(description.text()).toBe('Some details below')
    })

    it.concurrent('adds uppercase class to overtitle when isOverTitleUppercase is true', () => {
        const wrapper = factory({
            overtitle: 'Upper Overtitle',
            isOverTitleUppercase: true
        })

        expect(wrapper.find('span').classes()).toContain('uppercase')
    })

    it.concurrent('applies RIGHT alignment classes', () => {
        const wrapper = factory({ align: Align.RIGHT })

        const classes = wrapper.find('div').classes()

        expect(classes).toContain('items-end')
        expect(classes).toContain('text-right')
        expect(classes).toContain('md:items-end')
        expect(classes).toContain('md:text-right')
    })

    it.concurrent('applies mobile-centered classes when isMobileCentered is true', () => {
        const wrapper = factory({
            align: Align.LEFT,
            isMobileCentered: true
        })

        const classes = wrapper.find('div').classes()

        expect(classes).toContain('items-center')
        expect(classes).toContain('text-center')
        expect(classes).toContain('md:items-start')
        expect(classes).toContain('md:text-left')
    })

    it.concurrent('uses correct title size class for size SM', () => {
        const wrapper = factory({ size: HeadingSize.SM })

        expect(wrapper.find('h1').classes()).toContain('text-2xl')
    })

    it.concurrent('applies spaced class on description when spacing is SPACED', () => {
        const wrapper = factory({
            description: 'Spaced description',
            size: HeadingSize.LG,
            spacing: HeadingSpacing.SPACED
        })

        expect(wrapper.find('p').classes()).toContain('mt-9')
    })

    it.concurrent('adds custom classes to overtitle, title, and description when provided', () => {
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

    it.concurrent('renders overtitle slot content when provided', () => {
        const wrapper = factory(
            { overtitle: 'Fallback' },
            { overtitle: '<span data-test="slot-overtitle">Slot Overtitle</span>' }
        )

        expect(wrapper.find('[data-test="slot-overtitle"]').exists()).toBe(true)
        expect(wrapper.text()).not.toContain('Fallback')
    })

    it.concurrent('renders title slot content when provided', () => {
        const wrapper = factory(
            { title: 'Fallback Title' },
            { title: '<span data-test="slot-title">Slot Title</span>' }
        )

        expect(wrapper.find('[data-test="slot-title"]').exists()).toBe(true)
        expect(wrapper.text()).not.toContain('Fallback Title')
    })

    it.concurrent('renders description slot content when provided', () => {
        const wrapper = factory(
            { description: 'Fallback Description' },
            { description: '<span data-test="slot-description">Slot Description</span>' }
        )

        expect(wrapper.find('[data-test="slot-description"]').exists()).toBe(true)
        expect(wrapper.text()).not.toContain('Fallback Description')
    })

    it.concurrent('renders default classes for invalid size or spacing values', () => {
        const wrapper = factory({
            // @ts-expect-error testing invalid size
            size: 'invalid',
            // @ts-expect-error testing invalid spacing
            spacing: 'invalid',
            description: 'Check spacing'
        })

        const heading = wrapper.find('h1')
        const description = wrapper.find('p')

        expect(heading.classes()).toContain('text-4xl')
        expect(description.classes()).toContain('mt-6')
    })
})
