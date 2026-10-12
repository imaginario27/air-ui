import { mount } from '@vue/test-utils'
import Carousel from '@/components/sliders/Carousel.vue'
import { CarouselTransition } from '@/models/enums/sliders'
import { Easing } from '@/models/enums/easings'
import { useDSConfig } from '@/composables/useDSConfig'

const items = ['One', 'Two', 'Three', 'Four']

const factory = (props: Partial<InstanceType<typeof Carousel>['$props']> = {}) => {
    return mount(Carousel, {
        props: { items, ariaLabel: 'Gallery', ...props },
        slots: {
            default: `<template #default="{ item }"><span class="slide">{{ item }}</span></template>`,
        },
    })
}

describe('Carousel', () => {
    it('uses the slide transition by default', () => {
        const wrapper = factory()

        expect(wrapper.find('ul').classes()).toContain('flex')
        expect(wrapper.find('ul').attributes('style')).toContain('translateX')
    })

    it.each([CarouselTransition.FADE, CarouselTransition.ZOOM])('stacks the slides with %s', (transition) => {
        const wrapper = factory({ transition, slidesPerView: 3 })
        const slides = wrapper.findAll('li')

        expect(wrapper.find('ul').classes()).toContain('grid')
        expect(wrapper.find('ul').attributes('style')).not.toContain('translateX')
        expect(slides[0]!.classes()).toContain('opacity-100')
        expect(slides[1]!.classes()).toContain('opacity-0')
        expect(wrapper.findAll('button[aria-label^="Go to slide"]')).toHaveLength(4)
    })

    it('has no animation with the none transition', () => {
        const wrapper = factory({ transition: CarouselTransition.NONE })

        expect(wrapper.find('ul').attributes('style')).toContain('0ms')
    })

    it.each([
        [Easing.SMOOTH, 'cubic-bezier(0.22, 1, 0.36, 1)'],
        [Easing.EASE, 'ease'],
        [Easing.EASE_IN, 'ease-in'],
        [Easing.EASE_OUT, 'ease-out'],
        [Easing.LINEAR, 'linear'],
        [Easing.EASE_IN_OUT, 'ease-in-out'],
        [Easing.BOUNCE, 'cubic-bezier(0.34, 1.56, 0.64, 1)'],
    ])('applies the %s easing', (easing, css) => {
        const wrapper = factory({ easing })

        expect(wrapper.find('ul').attributes('style')).toContain(css)
    })

    it('renders every item through the scoped slot', () => {
        const wrapper = factory()

        expect(wrapper.findAll('.slide').map((slide) => slide.text())).toEqual(items)
    })

    it('exposes carousel semantics', () => {
        const wrapper = factory()

        expect(wrapper.element.tagName).toBe('SECTION')
        expect(wrapper.attributes('aria-roledescription')).toBe('carousel')
        expect(wrapper.attributes('aria-label')).toBe('Gallery')
        expect(wrapper.findAll('[aria-roledescription="slide"]')).toHaveLength(items.length)
    })

    it('renders one dot per page', () => {
        expect(factory().findAll('button[aria-label^="Go to slide"]')).toHaveLength(4)
        expect(factory({ slidesPerView: 2 }).findAll('button[aria-label^="Go to slide"]')).toHaveLength(3)
    })

    it('hides arrows and dots when disabled', () => {
        const wrapper = factory({ hasArrows: false, hasDots: false })

        expect(wrapper.findAll('button')).toHaveLength(0)
    })

    it('goes to a slide when clicking a dot and emits update:modelValue', async () => {
        const wrapper = factory()

        await wrapper.findAll('button[aria-label^="Go to slide"]')[2]!.trigger('click')

        expect(wrapper.emitted('update:modelValue')![0]).toEqual([2])
        expect(wrapper.emitted('change')![0]).toEqual([2])
    })

    it('navigates with the arrow keys', async () => {
        const wrapper = factory()

        await wrapper.trigger('keydown', { key: 'ArrowRight' })
        await wrapper.trigger('keydown', { key: 'ArrowLeft' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[1], [0]])
    })

    it('does not go before the first slide unless looping', async () => {
        const wrapper = factory()
        await wrapper.trigger('keydown', { key: 'ArrowLeft' })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()

        const looping = factory({ isLoop: true })
        await looping.trigger('keydown', { key: 'ArrowLeft' })

        expect(looping.emitted('update:modelValue')![0]).toEqual([3])
    })

    it('follows modelValue', async () => {
        const wrapper = factory({ modelValue: 0 })
        await wrapper.setProps({ modelValue: 2 })

        expect(wrapper.find('button[aria-current="true"]').attributes('aria-label')).toBe('Go to slide 3')
    })

    describe('labels', () => {
        afterEach(() => {
            const config = useDSConfig()
            config.slides.previousText = () => 'Previous slide'
            config.slides.nextText = () => 'Next slide'
            config.slides.goToSlideText = () => 'Go to slide'
        })

        it('uses the default labels from the DS config', () => {
            const wrapper = factory()

            expect(wrapper.find('[aria-label="Previous slide"]').exists()).toBe(true)
            expect(wrapper.find('[aria-label="Next slide"]').exists()).toBe(true)
        })

        it('lets a global config override change the labels', () => {
            const config = useDSConfig()
            config.slides.previousText = () => 'Diapositiva anterior'
            config.slides.nextText = () => 'Diapositiva siguiente'
            config.slides.goToSlideText = () => 'Ir a la diapositiva'

            const wrapper = factory()

            expect(wrapper.find('[aria-label="Diapositiva anterior"]').exists()).toBe(true)
            expect(wrapper.find('[aria-label="Diapositiva siguiente"]').exists()).toBe(true)
            expect(wrapper.findAll('button[aria-label^="Ir a la diapositiva"]')).toHaveLength(4)
        })

        it('lets the props win over the global config', () => {
            const wrapper = factory({
                previousAriaLabel: 'Back',
                nextAriaLabel: 'Forward',
                dotAriaLabel: 'Slide',
            })

            expect(wrapper.find('[aria-label="Back"]').exists()).toBe(true)
            expect(wrapper.find('[aria-label="Forward"]').exists()).toBe(true)
            expect(wrapper.findAll('button[aria-label^="Slide "]')).toHaveLength(4)
        })
    })

    it('advances automatically with autoplay', () => {
        vi.useFakeTimers()
        const wrapper = factory({ autoplay: true, autoplayInterval: 1000 })

        vi.advanceTimersByTime(1000)

        expect(wrapper.emitted('update:modelValue')![0]).toEqual([1])
        wrapper.unmount()
        vi.useRealTimers()
    })
})
