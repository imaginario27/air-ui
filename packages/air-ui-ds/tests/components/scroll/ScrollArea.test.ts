import { mount } from '@vue/test-utils'
import ScrollArea from '@/components/scroll/ScrollArea.vue'
import { ScrollOrientation } from '@/models/enums/scroll'
// Factory function
const factory = (props: Partial<InstanceType<typeof ScrollArea>['$props']> = {}, slots = {}) => {
    return mount(ScrollArea, {
        props: {
            ...props
        },
        slots
    })
}

describe('ScrollArea', () => {
    it('renders default structure and slot content', () => {
        const wrapper = factory({}, { default: 'Scroll Content' })

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('Scroll Content')
        expect(wrapper.classes()).toContain('scrollbar')
        expect(wrapper.classes()).toContain('flex')
        expect(wrapper.classes()).toContain('flex-col')
    })

    it('applies default maxHeight style', () => {
        const wrapper = factory()

        expect(wrapper.attributes('style')).toContain('max-height: 300px')
    })

    it('applies custom maxHeight style', () => {
        const wrapper = factory({ maxHeight: 500 })

        expect(wrapper.attributes('style')).toContain('max-height: 500px')
    })

    it('renders border classes when hasBorder is true', () => {
        const wrapper = factory({ hasBorder: true })

        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('border-border-default')
        expect(wrapper.classes()).toContain('rounded-md')
    })

    it('does not render border classes when hasBorder is false', () => {
        const wrapper = factory({ hasBorder: false })

        expect(wrapper.classes()).not.toContain('border')
        expect(wrapper.classes()).not.toContain('border-border-default')
        expect(wrapper.classes()).not.toContain('rounded-md')
    })

    it('applies vertical scroll classes when orientation is vertical', () => {
        const wrapper = factory({ scrollOrientation: ScrollOrientation.VERTICAL })

        expect(wrapper.classes()).toContain('overflow-y-auto')
        expect(wrapper.classes()).toContain('overflow-x-hidden')
    })

    it('applies horizontal scroll classes when orientation is horizontal', () => {
        const wrapper = factory({ scrollOrientation: ScrollOrientation.HORIZONTAL })

        expect(wrapper.classes()).toContain('overflow-x-auto')
        expect(wrapper.classes()).toContain('overflow-y-hidden')
    })

    it('applies both-axis scroll classes when orientation is both', () => {
        const wrapper = factory({ scrollOrientation: ScrollOrientation.BOTH })

        expect(wrapper.classes()).toContain('overflow-auto')
    })
})
