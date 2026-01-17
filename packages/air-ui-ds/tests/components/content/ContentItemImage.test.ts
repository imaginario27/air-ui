import { mount } from '@vue/test-utils'
import ContentItemImage from '@/components/content/ContentItemImage.vue'
import { AspectRatio } from '#imports'
import { ImageHoverEffect } from '@/models/enums/effects'
import Icon from '@/components/icons/Icon.vue'

const defaultProps: Partial<InstanceType<typeof ContentItemImage>['$props']> = {
    src: 'https://example.com/image.jpg',
    alt: 'Sample image',
    aspectRatio: AspectRatio.AR_16_9,
    hoverEffect: ImageHoverEffect.ZOOM_IN,
    hoverIcon: 'mdi:eye-circle-outline'
}

const factory = (props = {}) => {
    return mount(ContentItemImage, {
        props: {
            ...defaultProps,
            ...props
        },
        global: {
            stubs: {
                Icon
            }
        }
    })
}

describe('ContentItemImage.vue', () => {
    describe('when src is provided', () => {
        it('renders image with correct src and alt', () => {
            const wrapper = factory()
            const img = wrapper.find('img')

            expect(img.exists()).toBe(true)
            expect(img.attributes('src')).toBe(defaultProps.src)
            expect(img.attributes('alt')).toBe(defaultProps.alt)
        })

        it('renders hover icon', () => {
            const wrapper = factory()
            const icons = wrapper.findAllComponents(Icon)

            const hoverIcon = icons.find(icon => icon.props('name') === defaultProps.hoverIcon)
            expect(hoverIcon).toBeTruthy()
        })

        it('renders overlay when hoverEffect is "overlay"', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.OVERLAY })
            const overlay = wrapper.find('.bg-background-neutral-filled-transparent')

            expect(overlay.exists()).toBe(true)
        })
    })

    describe('when src is not provided', () => {
        it('renders fallback icon with correct props', () => {
            const fallbackIcon = 'mdi:image-off-outline'
            const wrapper = factory({ fallbackIcon, src: undefined }) // omit src
            const icon = wrapper.findComponent(Icon)

            expect(wrapper.find('img').exists()).toBe(false)
            expect(icon.exists()).toBe(true)
            expect(icon.props('name')).toBe(fallbackIcon)
        })

        it('renders fallback icon when src is an empty string', () => {
            const wrapper = factory({ src: '' })
            const icon = wrapper.findComponent(Icon)

            expect(wrapper.find('img').exists()).toBe(false)
            expect(icon.exists()).toBe(true)
        })

        it('does not render hover overlay or hover icon', () => {
            const wrapper = factory({ src: '' })

            expect(wrapper.find('.group-hover\\:opacity-100').exists()).toBe(false)
            expect(wrapper.find('.bg-background-neutral-filled-transparent').exists()).toBe(false)
        })
    })

    describe('hoverEffect visual classes', () => {
        it('applies zoom-in class', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.ZOOM_IN })
            const img = wrapper.find('img')

            expect(img.attributes('class')).toMatch(/group-hover:scale-110/)
        })

        it('applies zoom-out class', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.ZOOM_OUT })
            const img = wrapper.find('img')

            expect(img.attributes('class')).toMatch(/group-hover:scale-100/)
        })

        it('applies blur class', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.BLUR })
            const img = wrapper.find('img')

            expect(img.attributes('class')).toMatch(/group-hover:blur-xs/)
        })

        it('applies default class when hoverEffect is unsupported', () => {
            const wrapper = factory({ hoverEffect: 'UNKNOWN_EFFECT' })
            const img = wrapper.find('img')

            expect(img.attributes('class')).toBe('w-full h-full object-cover')
        })
    })

    describe('aspect ratio logic', () => {
        it('applies correct class for AR_3_2', () => {
            const wrapper = factory({ aspectRatio: AspectRatio.AR_3_2 })
            const groupWrapper = wrapper.find('.group')

            expect(groupWrapper.classes()).toContain('aspect-[3/2]')
        })

        it('uses default aspect ratio class when unknown', () => {
            const wrapper = factory({ aspectRatio: 'invalid' })
            const groupWrapper = wrapper.find('.group')

            expect(groupWrapper.classes()).toContain('aspect-[16/9]')
        })
    })
})
