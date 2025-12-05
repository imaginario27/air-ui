import { mount } from '@vue/test-utils'
import IconBadge from '@/components/badges/IconBadge.vue'
import { MdiIcon } from '#components'

describe('IconBadge', () => {
    const factory = (props: Partial<InstanceType<typeof IconBadge>['$props']> = {}) => {
        return mount(IconBadge, {
            props,
        })
    }

    it('renders the MdiIcon with default props', () => {
        const wrapper = factory()

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHelp')
        expect(icon.props('size')).toBe('16px')
    })

    it('renders the MdiIcon with provided icon', () => {
        const wrapper = factory({ icon: 'mdiCheck' })
        expect(wrapper.findComponent(MdiIcon).exists()).toBe(true)
    })
})
