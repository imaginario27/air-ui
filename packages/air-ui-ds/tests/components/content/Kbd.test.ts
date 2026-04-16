import { mount } from '@vue/test-utils'
import Kbd from '@/components/kbds/Kbd.vue'

describe('Kbd.vue', () => {
    it('renders the provided keyboard label', () => {
        const wrapper = mount(Kbd, {
            props: {
                text: 'Ctrl',
            },
        })

        expect(wrapper.text()).toBe('Ctrl')
    })

    it('applies the keycap styling classes', () => {
        const wrapper = mount(Kbd)

        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('rounded')
    })
})