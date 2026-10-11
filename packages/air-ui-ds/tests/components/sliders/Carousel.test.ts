import { mount } from '@vue/test-utils'
import Carousel from '@/components/sliders/Carousel.vue'
import { CarouselEasing, CarouselTransition } from '@/models/enums/sliders'

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
        [CarouselEasing.LINEAR, 'linear'],
        [CarouselEasing.EASE_IN_OUT, 'ease-in-out'],
        [CarouselEasing.BOUNCE, 'cubic-bezier(0.34, 1.56, 0.64, 1)'],
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

    it('advances automatically with autoplay', () => {
        vi.useFakeTimers()
        const wrapper = factory({ autoplay: true, autoplayInterval: 1000 })

        vi.advanceTimersByTime(1000)

        expect(wrapper.emitted('update:modelValue')![0]).toEqual([1])
        wrapper.unmount()
        vi.useRealTimers()
    })
})
