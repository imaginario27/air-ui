import { mount } from '@vue/test-utils'
import IconBadge from '@/components/badges/IconBadge.vue'
import Icon from '~/components/icons/Icon.vue'
import { IconSize } from '@/models/enums/icons'

describe('IconBadge', () => {
    const factory = (props: Partial<InstanceType<typeof IconBadge>['$props']> = {}) => {
        return mount(IconBadge, {
            props,
        })
    }

    it('renders the MdiIcon with default props', () => {
        const wrapper = factory()

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:help')
        expect(icon.props('size')).toBe(IconSize.SM)
    })

    it('renders the MdiIcon with provided icon', () => {
        const wrapper = factory({ icon: 'mdi:check' })
        expect(wrapper.findComponent(Icon).exists()).toBe(true)
    })
})
