import { mount } from '@vue/test-utils'
import Feature from '@/components/features/Feature.vue'
import Icon from '@/components/icons/Icon.vue'
import { ColorAccent } from '@/models/enums/colors'
import { IconSize } from '@/models/enums/icons'

type FeatureProps = {
    title?: string
    description?: string
    icon?: string
    iconColor?: ColorAccent
    iconClass?: string
}

describe('Feature.vue', () => {
    const factory = (props: FeatureProps = {}) => {
        return mount(Feature, {
            props,
            global: {
                components: {
                    Icon
                }
            }
        })
    }

    it('renders default title when no props are passed', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Title')
    })

    it('renders custom title and description', () => {
        const wrapper = factory({
            title: 'Custom Title',
            description: 'Custom description'
        })

        expect(wrapper.text()).toContain('Custom Title')
        expect(wrapper.text()).toContain('Custom description')
    })

    it('does not render description if not provided', () => {
        const wrapper = factory({
            title: 'Title Only'
        })

        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders icon when icon prop is provided', () => {
        const wrapper = factory({
            icon: 'check'
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('check')
        expect(icon.props('size')).toBe(IconSize.LG)
    })

    it('does not render icon when icon prop is not provided', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(false)
    })

    it('passes iconColor prop to Icon', () => {
        const wrapper = factory({
            icon: 'bell',
            iconColor: ColorAccent.WARNING
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.props('color')).toBe(ColorAccent.WARNING)
    })

    it('passes iconClass prop to Icon', () => {
        const wrapper = factory({
            icon: 'alert',
            iconClass: 'custom-class'
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.props('iconClass')).toBe('custom-class')
    })
})
