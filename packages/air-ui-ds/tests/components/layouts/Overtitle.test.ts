import { mount } from '@vue/test-utils'
import Overtitle from '@/components/layouts/Overtitle.vue'
import { ColorAccent } from '@/models/enums/colors'

const factory = (props = {}) => {
    return mount(Overtitle, {
        props
    })
}

describe('Overtitle.vue', () => {
    it('renders default title when no props are passed', () => {
        const wrapper = factory()
        expect(wrapper.text()).toBe('Overtitle')
    })

    it('renders custom title when provided', () => {
        const wrapper = factory({ title: 'Custom Overtitle' })
        expect(wrapper.text()).toBe('Custom Overtitle')
    })

    it('applies text-sm and font-medium classes by default', () => {
        const wrapper = factory()
        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-sm')
        expect(span.classes()).toContain('font-medium')
    })

    it('applies uppercase class when isUppercase is true', () => {
        const wrapper = factory({ isUppercase: true })
        expect(wrapper.find('span').classes()).toContain('uppercase')
    })

    it('does not apply uppercase class when isUppercase is false', () => {
        const wrapper = factory({ isUppercase: false })
        expect(wrapper.find('span').classes()).not.toContain('uppercase')
    })

    it('applies primary brand color class', () => {
        const wrapper = factory({ color: ColorAccent.PRIMARY_BRAND })
        expect(wrapper.find('span').classes()).toContain('text-text-primary-brand-default')
    })

    it('applies secondary brand color class (default)', () => {
        const wrapper = factory()
        expect(wrapper.find('span').classes()).toContain('text-text-secondary-brand-default')
    })

    it('applies neutral color class', () => {
        const wrapper = factory({ color: ColorAccent.NEUTRAL })
        expect(wrapper.find('span').classes()).toContain('text-text-default')
    })
})
