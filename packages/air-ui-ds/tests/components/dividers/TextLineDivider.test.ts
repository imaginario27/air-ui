import { mount } from '@vue/test-utils'
import TextLineDivider from '@/components/dividers/TextLineDivider.vue'
import Divider from '@/components/dividers/Divider.vue'
import { DividerSize, DividerStyle } from '@/models/enums/dividers'
import { Align } from '@/models/enums/positions'

describe('TextLineDivider.vue', () => {
    const factory = (props?: Record<string, unknown>) => {
        return mount(TextLineDivider, {
            props: {
                text: 'Test Label',
                ...props
            }
        })
    }

    it('renders the provided text', () => {
        const wrapper = factory({ text: 'Hello Divider' })
        expect(wrapper.text()).toContain('Hello Divider')
    })

    it('renders a leading Divider when align is CENTER (default)', () => {
        const wrapper = factory()
        const dividers = wrapper.findAllComponents(Divider)
        expect(dividers.length).toBe(2)
    })

    it('does not render leading Divider when align is LEFT', () => {
        const wrapper = factory({ align: Align.LEFT })
        const dividers = wrapper.findAllComponents(Divider)
        expect(dividers.length).toBe(1)
    })

    it('applies correct text size class for size XS (default)', () => {
        const wrapper = factory()
        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-xs')
    })

    it('applies correct text size class for size SM', () => {
        const wrapper = factory({ size: DividerSize.SM })
        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-sm')
    })

    it('applies correct text color class for styleType NEUTRAL (default)', () => {
        const wrapper = factory()
        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-text-neutral-subtle')
    })

    it('applies correct text color class for styleType PRIMARY_BRAND', () => {
        const wrapper = factory({ styleType: DividerStyle.PRIMARY_BRAND })
        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-text-primary-brand-default')
    })

    it('applies correct text color class for styleType SECONDARY_BRAND', () => {
        const wrapper = factory({ styleType: DividerStyle.SECONDARY_BRAND })
        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-text-secondary-brand-default')
    })

    it('renders correct structure and classes in full DOM', () => {
        const wrapper = factory()
        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('w-full')
        expect(rootDiv.classes()).toContain('flex')
        expect(rootDiv.classes()).toContain('items-center')
        expect(rootDiv.classes()).toContain('gap-4')
    })
})
