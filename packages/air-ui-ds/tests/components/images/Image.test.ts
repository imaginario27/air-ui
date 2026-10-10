import { mount } from '@vue/test-utils'
import Image from '@/components/images/Image.vue'

const IconStub = { props: ['name', 'size'], template: '<i class="icon" :data-name="name" />' }

const LightboxStub = {
    props: ['modelValue', 'images'],
    emits: ['update:modelValue'],
    template: '<div class="lightbox-stub" />',
}

const NuxtImgStub = {
    props: ['src', 'sizes', 'densities'],
    template: '<img class="nuxt-img" :src="src" :sizes="sizes" :data-densities="densities" />',
}

const factory = (props: Record<string, unknown> = {}) =>
    mount(Image, {
        props: { src: '/dog.png', alt: 'Image of a dog', ...props },
        global: { stubs: { Icon: IconStub, Lightbox: LightboxStub, NuxtImg: NuxtImgStub } },
    })

describe('Image', () => {
    it('renders the image with cleaned alt text, dimensions and lazy loading', () => {
        const image = factory({ width: 200, height: 100 }).get('img')

        expect(image.attributes('src')).toBe('/dog.png')
        expect(image.attributes('alt')).toBe('a dog')
        expect(image.attributes('width')).toBe('200')
        expect(image.attributes('height')).toBe('100')
        expect(image.attributes('loading')).toBe('lazy')
    })

    it('is not interactive by default', () => {
        const wrapper = factory()

        expect(wrapper.find('button').exists()).toBe(false)
        expect(wrapper.find('.lightbox-stub').exists()).toBe(false)
    })

    describe('aspect ratio', () => {
        it('keeps the natural size without a ratio', () => {
            const wrapper = factory()

            expect(wrapper.get('img').classes()).toContain('h-auto')
            expect(wrapper.html()).not.toContain('aspect-[')
        })

        it('applies the ratio class and fills the box', () => {
            const wrapper = factory({ aspectRatio: AspectRatio.AR_16_9 })

            expect(wrapper.get('.group').classes()).toContain('aspect-[16/9]')
            expect(wrapper.get('img').classes()).toContain('h-full')
            expect(wrapper.get('img').classes()).toContain('object-cover')
        })

        it('contains the image with the contain fit', () => {
            const wrapper = factory({ aspectRatio: AspectRatio.AR_1_1, fit: ImageFit.CONTAIN })

            expect(wrapper.get('img').classes()).toContain('object-contain')
        })
    })

    describe('Nuxt Image', () => {
        it('uses a plain img by default', () => {
            expect(factory().find('.nuxt-img').exists()).toBe(false)
        })

        it('renders NuxtImg and forwards sizes and densities when enabled', () => {
            const image = factory({ useNuxtImg: true, sizes: '100vw', densities: 'x1 x2' }).get('.nuxt-img')

            expect(image.attributes('sizes')).toBe('100vw')
            expect(image.attributes('data-densities')).toBe('x1 x2')
        })
    })

    describe('hover effects', () => {
        it.each([
            [ImageHoverEffect.ZOOM_IN, 'group-hover:scale-110'],
            [ImageHoverEffect.ZOOM_OUT, 'scale-110'],
            [ImageHoverEffect.BLUR, 'group-hover:blur-xs'],
            [ImageHoverEffect.GRAYSCALE, 'grayscale'],
        ])('applies the %s classes', (hoverEffect, className) => {
            expect(factory({ hoverEffect }).get('img').classes()).toContain(className)
        })

        it('adds no effect by default', () => {
            const image = factory().get('img')

            expect(image.classes().some(name => name.startsWith('group-hover'))).toBe(false)
        })

        it('shows the overlay with a zoom icon when the lightbox is on', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.OVERLAY, useLightbox: true })

            expect(wrapper.get('.icon').attributes('data-name')).toBe('mdi:magnify-plus-outline')
        })

        it('uses an eye icon without the lightbox, and a custom icon when given', () => {
            const defaultIcon = factory({ hoverEffect: ImageHoverEffect.OVERLAY })
            const customIcon = factory({ hoverEffect: ImageHoverEffect.OVERLAY, hoverIcon: 'mdi:heart' })

            expect(defaultIcon.get('.icon').attributes('data-name')).toBe('mdi:eye-outline')
            expect(customIcon.get('.icon').attributes('data-name')).toBe('mdi:heart')
        })

        it('hides the overlay icon when hasHoverIcon is off', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.OVERLAY, hasHoverIcon: false })

            expect(wrapper.find('.icon').exists()).toBe(false)
        })

        it('renders two aria-hidden chromatic layers for the split zoom', () => {
            const wrapper = factory({ hoverEffect: ImageHoverEffect.SPLIT_ZOOM })

            expect(wrapper.findAll('[aria-hidden="true"]')).toHaveLength(2)
            expect(wrapper.findAll('img')).toHaveLength(3)
        })

        it('moves the split layers along the chosen direction', () => {
            const horizontal = factory({ hoverEffect: ImageHoverEffect.SPLIT_ZOOM, hoverSplitDirection: ImageHoverSplitDirection.HORIZONTAL })
            const vertical = factory({ hoverEffect: ImageHoverEffect.SPLIT_ZOOM, hoverSplitDirection: ImageHoverSplitDirection.VERTICAL })

            expect(horizontal.html()).toContain('group-hover:-translate-x-1.5')
            expect(horizontal.html()).not.toContain('translate-y')
            expect(vertical.html()).toContain('group-hover:-translate-y-1.5')
        })
    })

    describe('caption', () => {
        it('shows nothing without a caption', () => {
            expect(factory().find('figcaption').exists()).toBe(false)
        })

        it('hides the caption by default, even when provided', () => {
            expect(factory({ caption: 'A good dog' }).text()).not.toContain('A good dog')
        })

        it('renders the caption below when showCaption is on', () => {
            expect(factory({ caption: 'A good dog', showCaption: true }).get('figcaption').text()).toBe('A good dog')
        })

        it('renders the caption over the image for the other placements', () => {
            const hover = factory({ caption: 'A good dog', showCaption: true, captionPlacement: ImageCaptionPlacement.HOVER })
            const overlay = factory({ caption: 'A good dog', showCaption: true, captionPlacement: ImageCaptionPlacement.OVERLAY_BOTTOM })

            expect(hover.find('figcaption').exists()).toBe(false)
            expect(hover.get('.group').text()).toContain('A good dog')
            expect(overlay.get('.group').text()).toContain('A good dog')
        })

        it('hides the caption with the none placement', () => {
            const wrapper = factory({ caption: 'A good dog', showCaption: true, captionPlacement: ImageCaptionPlacement.NONE })

            expect(wrapper.text()).not.toContain('A good dog')
        })
    })

    describe('lightbox', () => {
        it('wraps the image in a button labelled from the DS config', () => {
            expect(factory({ useLightbox: true }).get('button').attributes('aria-label')).toBe('Open image')
            expect(factory({ useLightbox: true, openAriaLabel: 'Zoom' }).get('button').attributes('aria-label')).toBe('Zoom')
        })

        it('stays closed until clicked', async () => {
            const wrapper = factory({ useLightbox: true })
            expect(wrapper.getComponent(LightboxStub).props('modelValue')).toBe(false)

            await wrapper.get('button').trigger('click')

            expect(wrapper.getComponent(LightboxStub).props('modelValue')).toBe(true)
        })

        it('closes when the lightbox asks to', async () => {
            const wrapper = factory({ useLightbox: true })
            await wrapper.get('button').trigger('click')

            wrapper.getComponent(LightboxStub).vm.$emit('update:modelValue', false)
            await wrapper.vm.$nextTick()

            expect(wrapper.getComponent(LightboxStub).props('modelValue')).toBe(false)
        })

        it('opens the image with its caption, preferring the full size source', () => {
            const wrapper = factory({ useLightbox: true, caption: 'A good dog', lightboxSrc: '/dog-large.png' })

            expect(wrapper.getComponent(LightboxStub).props('images')).toEqual([
                { id: '/dog.png', src: '/dog-large.png', alt: 'Image of a dog', caption: 'A good dog' },
            ])
        })
    })

    describe('click', () => {
        it('emits click on a clickable image without opening a lightbox', async () => {
            const wrapper = factory({ isClickable: true })

            await wrapper.get('button').trigger('click')

            expect(wrapper.emitted('click')).toHaveLength(1)
            expect(wrapper.find('.lightbox-stub').exists()).toBe(false)
        })

        it('does not emit click when not interactive', async () => {
            const wrapper = factory()

            await wrapper.get('.group').trigger('click')

            expect(wrapper.emitted('click')).toBeUndefined()
        })
    })

    it('applies the custom classes', () => {
        const wrapper = factory({ containerClass: 'c-root', wrapperClass: 'c-wrap', imageClass: 'c-img', caption: 'x', showCaption: true, captionClass: 'c-cap' })

        expect(wrapper.get('figure').classes()).toContain('c-root')
        expect(wrapper.get('.group').classes()).toContain('c-wrap')
        expect(wrapper.get('img').classes()).toContain('c-img')
        expect(wrapper.get('figcaption').classes()).toContain('c-cap')
    })
})
