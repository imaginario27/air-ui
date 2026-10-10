import { mount } from '@vue/test-utils'
import Marquee from '@/components/sliders/Marquee.vue'
import { Orientation } from '@/models/enums/orientations'

const factory = (props: Partial<InstanceType<typeof Marquee>['$props']> = {}, slots = {}) => {
    return mount(Marquee, {
        props: { ...props },
        slots: { default: '<span class="item">Item</span>', ...slots },
    })
}

describe('Marquee', () => {
    it('renders the slot in two copies by default', () => {
        const wrapper = factory()

        expect(wrapper.findAll('.item')).toHaveLength(2)
    })

    it('hides cloned copies from assistive technology', () => {
        const wrapper = factory()
        const copies = wrapper.findAll('[style*="animation-name"]')

        expect(copies[0]!.attributes('aria-hidden')).toBeUndefined()
        expect(copies[1]!.attributes('aria-hidden')).toBe('true')
    })

    it('applies aria-label and group role', () => {
        const wrapper = factory({ ariaLabel: 'Partners' })

        expect(wrapper.attributes('role')).toBe('group')
        expect(wrapper.attributes('aria-label')).toBe('Partners')
    })

    it('uses the horizontal animation by default', () => {
        const wrapper = factory()

        expect(wrapper.attributes('data-orientation')).toBe('horizontal')
        expect(wrapper.html()).toContain('air-marquee-horizontal')
    })

    it('uses the vertical animation and column layout', () => {
        const wrapper = factory({ orientation: Orientation.VERTICAL })

        expect(wrapper.classes()).toContain('flex-col')
        expect(wrapper.html()).toContain('air-marquee-vertical')
    })

    it('reverses the animation direction', () => {
        const wrapper = factory({ isReversed: true })

        expect(wrapper.html()).toContain('animation-direction: reverse')
    })

    it('uses a finite iteration count when loopCount is set', () => {
        const wrapper = factory({ loopCount: 3 })

        expect(wrapper.html()).toContain('animation-iteration-count: 3')
    })

    it('runs infinitely by default', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('animation-iteration-count: infinite')
    })

    it('applies delay and gap', () => {
        const wrapper = factory({ delay: 2, gap: '2rem' })

        expect(wrapper.html()).toContain('animation-delay: 2s')
        expect(wrapper.attributes('style')).toContain('gap: 2rem')
    })

    it('pauses when isPaused is true', () => {
        const wrapper = factory({ isPaused: true })

        expect(wrapper.html()).toContain('animation-play-state: paused')
    })

    it('pauses on hover only when pauseOnHover is enabled', async () => {
        const wrapper = factory({ pauseOnHover: true })

        expect(wrapper.html()).toContain('animation-play-state: running')
        await wrapper.trigger('mouseenter')
        expect(wrapper.html()).toContain('animation-play-state: paused')
        await wrapper.trigger('mouseleave')
        expect(wrapper.html()).toContain('animation-play-state: running')
    })

    it('does not pause on hover by default', async () => {
        const wrapper = factory()

        await wrapper.trigger('mouseenter')
        expect(wrapper.html()).toContain('animation-play-state: running')
    })

    it('applies a fade mask when hasFadeEdges is true', () => {
        const wrapper = factory({ hasFadeEdges: true })

        expect(wrapper.attributes('style')).toContain('mask-image')
    })

    it('does not apply a fade mask by default', () => {
        const wrapper = factory()

        expect(wrapper.attributes('style')).not.toContain('mask-image')
    })

    it('uses fadeSize for the fade mask', () => {
        const wrapper = factory({ hasFadeEdges: true, fadeSize: 20 })

        expect(wrapper.attributes('style')).toContain('black 20%')
        expect(wrapper.attributes('style')).toContain('black 80%')
    })

    it('emits loopComplete and complete from the first copy', async () => {
        const wrapper = factory()
        const first = wrapper.findAll('[style*="animation-name"]')[0]!

        await first.trigger('animationiteration')
        await first.trigger('animationend')

        expect(wrapper.emitted('loopComplete')).toHaveLength(1)
        expect(wrapper.emitted('complete')).toHaveLength(1)
    })
})
