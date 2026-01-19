import { mount } from '@vue/test-utils'
import Badge from '@/components/badges/Badge.vue'
import Icon from '~/components/icons/Icon.vue'

const factory = (props = {}) => {
    return mount(Badge, {
        props
    })
}

describe('Badge.vue', () => {
    it('renders with default props', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Badge')
        expect(wrapper.classes()).toContain('border')
    })

    it('renders dot when showDot is true', async () => {
        const wrapper = factory({ showDot: true })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('span').exists()).toBe(true)
    })

    it('renders icon when showIcon is true', () => {
        const wrapper = factory({ showIcon: true, icon: 'mdi:check' })
        expect(wrapper.findComponent(Icon).exists()).toBe(true)
    })

    it('renders close button when closeable is true', async () => {
        const wrapper = factory({ closeable: true })
        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)

        await button.trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })
})
