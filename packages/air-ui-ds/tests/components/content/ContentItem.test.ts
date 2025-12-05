import { mount } from '@vue/test-utils'
import ContentItem from '@/components/content/ContentItem.vue'
import Card from '@/components/cards/Card.vue'
import { ImageHoverEffect } from '@/models/enums/effects'
import { AspectRatio, ContentItemType } from '#imports'

const defaultProps: Partial<InstanceType<typeof ContentItem>['$props']> = {
    imgUrl: 'https://example.com/image.jpg',
    imgAlt: 'Test Image',
    title: 'My Portfolio Item',
    titleTag: 'h4',
    description: 'A sample portfolio project',
    to: '/portfolio/item-1',
    imgHoverEffect: ImageHoverEffect.ZOOM_IN,
    imgAspectRatio: AspectRatio.AR_16_9,
    type: ContentItemType.CARD
}

const factory = (props = {}, slots = {}) => {
    return mount(ContentItem, {
        props: {
            ...defaultProps,
            ...props
        },
        slots,
        global: {
            stubs: {
                NuxtLink: {
                    template: '<a :href="to"><slot /></a>',
                    props: ['to']
                },
                NuxtImg: {
                    template: '<img :src="src" :alt="alt" :class="imgClass" />',
                    props: ['src', 'alt']
                },
                MdiIcon: {
                    template: '<div class="mdi-icon-stub" />'
                }
            },
            components: {
                Card
            }
        }
    })
}

describe('ContentItem.vue', () => {
    it('renders NuxtLink with correct href', () => {
        const wrapper = factory()
        const link = wrapper.find('a')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBe(defaultProps.to)
    })

    it('renders image with correct src and alt', () => {
        const wrapper = factory()
        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe(defaultProps.imgUrl)
        expect(img.attributes('alt')).toBe(defaultProps.imgAlt)
    })

    it('applies zoom-in hover effect class', () => {
        const wrapper = factory({ imgHoverEffect: ImageHoverEffect.ZOOM_IN })
        const img = wrapper.find('img')
        expect(img.attributes('class')).toMatch(/group-hover:scale-110/)
    })

    it('applies blur hover effect class', () => {
        const wrapper = factory({ imgHoverEffect: ImageHoverEffect.BLUR })
        const img = wrapper.find('img')
        expect(img.attributes('class')).toMatch(/group-hover:blur-xs/)
    })

    it('renders title with correct tag, class, and text', () => {
        const wrapper = factory({ titleTag: 'h3', titleClass: 'text-xl font-bold' })
        const title = wrapper.find('h3')
        expect(title.exists()).toBe(true)
        expect(title.classes()).toContain('text-xl')
        expect(title.text()).toContain(defaultProps.title)
    })

    it('renders description when provided', () => {
        const wrapper = factory()
        const desc = wrapper.find('p')
        expect(desc.exists()).toBe(true)
        expect(desc.text()).toContain(defaultProps.description)
    })

    it('does not render description when not provided', () => {
        const wrapper = factory({ description: undefined })
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('trims title and description to max length', () => {
        const longTitle = 'T'.repeat(100)
        const longDesc = 'D'.repeat(200)
        const wrapper = factory({
            title: longTitle,
            description: longDesc,
            titleMaxLength: 20,
            descriptionMaxLength: 30
        })

        expect(wrapper.text()).toContain(longTitle.slice(0, 20))
        expect(wrapper.text()).toContain(longDesc.slice(0, 30))
    })

    it('renders content slot when provided', () => {
        const wrapper = factory({}, {
            content: '<div class="custom-slot">Custom Slot</div>'
        })
        expect(wrapper.find('.custom-slot').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom Slot')
    })

    it('renders default layout when content slot is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('h4').exists()).toBe(true)
        expect(wrapper.find('p').exists()).toBe(true)
    })

    it('uses Card as wrapper component when type is CARD', () => {
        const wrapper = factory({ type: ContentItemType.CARD })
        expect(wrapper.findComponent(Card).exists()).toBe(true)
    })

    it('uses div as wrapper component when type is BASIC', () => {
        const wrapper = factory({ type: ContentItemType.BASIC })
        expect(wrapper.findComponent(Card).exists()).toBe(false)
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('includes containerClass in computed wrapper class', () => {
        const wrapper = factory({ containerClass: 'custom-class' })
        const root = wrapper.findComponent(Card).exists()
            ? wrapper.findComponent(Card)
            : wrapper.find('div')

        expect(root.classes()).toContain('custom-class')
    })

    it('applies layout classes for BASIC type', () => {
        const wrapper = factory({ type: ContentItemType.BASIC })
        const root = wrapper.find('div')
        expect(root.classes()).toContain('flex')
        expect(root.classes()).toContain('flex-col')
    })

    it('passes hasShadow and hasBackgroundHover props to Card', () => {
        const wrapper = factory({
            hasCardShadow: false,
            hasCardBackgroundHover: true
        })

        const card = wrapper.findComponent(Card)
        expect(card.props()).toMatchObject({
            hasShadow: false,
            hasBackgroundHover: true
        })
    })

    it('applies imgContainerClass to image wrapper if provided', () => {
        const wrapper = factory({ imgContainerClass: 'img-container' })
        expect(wrapper.find('.img-container').exists()).toBe(true)
    })

    it('renders fallback icon if imgFallbackIcon is provided and no image', () => {
        const wrapper = factory({
            imgUrl: '',
            imgFallbackIcon: 'mdi-image-off'
        })

        expect(wrapper.find('.mdi-icon-stub').exists()).toBe(true)
    })

    it('renders hover icon container when image is present', () => {
        const wrapper = factory()
        const hoverIcon = wrapper.find('.group-hover\\:opacity-100')
        expect(hoverIcon.exists()).toBe(true)
    })

    it('does not render hover icon container when imgUrl is empty', () => {
        const wrapper = factory({ imgUrl: '' })
        const hoverIcon = wrapper.find('.group-hover\\:opacity-100')
        expect(hoverIcon.exists()).toBe(false)
    })
})
