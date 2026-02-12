import { mount } from '@vue/test-utils'
import FeatureCard from '@/components/cards/specific/FeatureCard.vue'
import { Align } from '~/models/enums/positions'
import { IconContainerShape, IconContainerStyleType } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'
import CardHeader from '~/components/cards/CardHeader.vue'
import CardTitle from '~/components/cards/CardTitle.vue'
import ContainedIcon from '~/components/icons/ContainedIcon.vue'
import CardFooter from '~/components/cards/CardFooter.vue'

const factory = (props: Record<string, unknown> = {}, options: Record<string, unknown> = {}) => {
    return mount(FeatureCard, {
        props,
        global: {
            stubs: {
                Card: {
                    template: '<div><slot /></div>'
                }
            }
        },
        ...options
    })
}

describe('FeatureCard.vue', () => {
    it('renders component', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default title and description', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Feature title')
        expect(wrapper.text()).toContain('Feature description')
    })

    it('renders custom title and description', () => {
        const wrapper = factory({
            title: 'Custom Feature',
            description: 'Custom feature description'
        })

        expect(wrapper.text()).toContain('Custom Feature')
        expect(wrapper.text()).toContain('Custom feature description')
    })

    it('does not render ContainedIcon when icon prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
    })

    it('renders ContainedIcon when icon prop is provided', () => {
        const wrapper = factory({ icon: 'mdi:home' })

        const icon = wrapper.findComponent(ContainedIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdi:home')
    })

    it('passes correct default enum values to ContainedIcon', () => {
        const wrapper = factory({ icon: 'mdi:home' })

        const icon = wrapper.findComponent(ContainedIcon)

        expect(icon.props('shape')).toBe(IconContainerShape.CIRCLE)
        expect(icon.props('styleType')).toBe(IconContainerStyleType.FILLED)
        expect(icon.props('color')).toBe(ColorAccent.SECONDARY_BRAND)
    })

    it('passes custom enum values to ContainedIcon', () => {
        const wrapper = factory({
            icon: 'mdi:home',
            containedIconShape: IconContainerShape.SQUARE,
            containedIconStyleType: IconContainerStyleType.FILLED,
            containedIconColor: ColorAccent.PRIMARY_BRAND
        })

        const icon = wrapper.findComponent(ContainedIcon)

        expect(icon.props('shape')).toBe(IconContainerShape.SQUARE)
        expect(icon.props('styleType')).toBe(IconContainerStyleType.FILLED)
        expect(icon.props('color')).toBe(ColorAccent.PRIMARY_BRAND)
    })

    it('applies center alignment styles when align is CENTER', () => {
        const wrapper = factory({ align: Align.CENTER })

        expect(wrapper.findComponent(CardHeader).classes()).toContain('items-center')
        expect(wrapper.findComponent(CardTitle).classes()).toContain('text-center')
        expect(wrapper.find('p.text-sm').classes()).toContain('text-center')
    })

    it('does not apply center alignment styles when align is LEFT', () => {
        const wrapper = factory({ align: Align.LEFT })

        expect(wrapper.findComponent(CardHeader).classes()).not.toContain('items-center')
        expect(wrapper.findComponent(CardTitle).classes()).not.toContain('text-center')
        expect(wrapper.find('p.text-sm').classes()).not.toContain('text-center')
    })

    it('renders footer slot when provided', () => {
        const wrapper = factory(
            {},
            {
                slots: {
                    footer: '<button data-test="footer-btn">Click me</button>'
                }
            }
        )

        const footer = wrapper.findComponent(CardFooter)
        expect(footer.exists()).toBe(true)
        expect(wrapper.find('[data-test="footer-btn"]').exists()).toBe(true)
    })

    it('does not render CardFooter when footer slot is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(CardFooter).exists()).toBe(false)
    })
})
