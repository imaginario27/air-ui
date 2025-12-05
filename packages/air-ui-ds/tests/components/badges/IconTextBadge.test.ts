import { mount } from '@vue/test-utils'
import IconTextBadge from '@/components/badges/IconTextBadge.vue'
import IconBadge from '@/components/badges/IconBadge.vue'
import { MdiIcon } from '#components'

describe('IconTextBadge', () => {
    const factory = (props: Partial<InstanceType<typeof IconTextBadge>['$props']> = {}) => {
        return mount(IconTextBadge, {
            props,
            global: {
                components: {
                    IconBadge,
                    MdiIcon
                }
            }
        })
    }

    it('renders the badge text correctly', () => {
        const wrapper = factory({ text: 'Hello Badge' })

        expect(wrapper.text()).toContain('Hello Badge')
    })

    it('renders the IconBadge component', () => {
        const wrapper = factory({ icon: 'mdiCheck' })

        const iconBadge = wrapper.findComponent(IconBadge)
        expect(iconBadge.exists()).toBe(true)
    })

    it('renders the MdiIcon inside IconBadge with correct icon prop', () => {
        const wrapper = factory({ icon: 'mdiCheck' })

        const mdiIcon = wrapper.findComponent(MdiIcon)
        expect(mdiIcon.exists()).toBe(true)
        expect(mdiIcon.props('icon')).toBe('mdiCheck')
        expect(mdiIcon.props('size')).toBe('16px')
    })

})
