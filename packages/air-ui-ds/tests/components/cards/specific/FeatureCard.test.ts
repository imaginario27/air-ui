import { mount } from '@vue/test-utils'
import FeatureCard from '@/components/cards/specific/FeatureCard.vue'
import { Align } from '~/models/enums/positions'
import { IconContainerShape, IconContainerStyleType } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'
import CardHeader from '~/components/cards/CardHeader.vue'
import CardTitle from '~/components/cards/CardTitle.vue'

const factory = (props = {}, options = {}) => {
    return mount(FeatureCard, {
        props,
        ...options
    })
}

describe('FeatureCard.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the default title and description', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Feature title')
        expect(wrapper.text()).toContain('Feature description')
    })

    it('renders a custom title and description', () => {
        const wrapper = factory({
            title: 'Custom Feature',
            description: 'Custom feature description'
        })
        expect(wrapper.text()).toContain('Custom Feature')
        expect(wrapper.text()).toContain('Custom feature description')
    })

    it('renders with a custom icon', () => {
        const wrapper = factory({ icon: 'mdiHome' })
        const iconProp = wrapper.findComponent({ name: 'ContainedIcon' }).props('icon')
        expect(iconProp).toBe('mdiHome')
    })

    it('renders with the correct containedIconShape, styleType, and color', () => {
        const wrapper = factory({
            containedIconShape: IconContainerShape.SQUARE,
            containedIconStyleType: IconContainerStyleType.FILLED,
            containedIconColor: ColorAccent.PRIMARY_BRAND
        })
        const icon = wrapper.findComponent({ name: 'ContainedIcon' })
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
})
