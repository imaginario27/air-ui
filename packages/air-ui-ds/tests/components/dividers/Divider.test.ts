import { mount } from '@vue/test-utils'
import Divider from '@/components/dividers/Divider.vue'
import { Orientation } from '@/models/enums/orientations'

describe('Divider.vue', () => {
    it('renders a horizontal divider by default', () => {
        const wrapper = mount(Divider)

        const hr = wrapper.find('hr')
        expect(hr.exists()).toBe(true)
        expect(hr.classes()).toContain('w-full')
        expect(hr.classes()).toContain('border-xs')
        expect(hr.classes()).toContain('border-border-default')
    })

    it('renders a vertical divider when orientation is vertical', () => {
        const wrapper = mount(Divider, {
            props: {
                orientation: Orientation.VERTICAL
            }
        })

        const hr = wrapper.find('hr')
        expect(hr.classes()).toContain('h-full')
        expect(hr.classes()).toContain('w-px')
        expect(hr.classes()).toContain('bg-border-default')
    })

    it('applies `hidden md:block` class when `hideOnMobile` is true', () => {
        const wrapper = mount(Divider, {
            props: {
                hideOnMobile: true
            }
        })

        const hr = wrapper.find('hr')
        expect(hr.classes()).toContain('hidden')
        expect(hr.classes()).toContain('md:block')
    })

    it('does not apply `hidden` class when `hideOnMobile` is false', () => {
        const wrapper = mount(Divider, {
            props: {
                hideOnMobile: false
            }
        })

        const hr = wrapper.find('hr')
        expect(hr.classes()).not.toContain('hidden')
        expect(hr.classes()).not.toContain('md:block')
    })
})
