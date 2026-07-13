import { mount } from '@vue/test-utils'
import DragPlaceholder from '@/components/placeholders/DragPlaceholder.vue'

const factory = (props?: Partial<InstanceType<typeof DragPlaceholder>['$props']>) => {
    return mount(DragPlaceholder, {
        props,
    })
}

describe('DragPlaceholder', () => {
    it('renders a dashed placeholder with the default text', () => {
        const wrapper = factory()

        expect(wrapper.classes()).toContain('border-dashed')
        expect(wrapper.find('span').exists()).toBe(true)
        expect(wrapper.find('span').text()).toBe('Drop here')
    })

    it('renders the provided text centered inside the placeholder', () => {
        const wrapper = factory({ text: 'Insert row' })

        const span = wrapper.find('span')
        expect(span.exists()).toBe(true)
        expect(span.text()).toBe('Insert row')
    })

    it('hides the text when showText is false', () => {
        const wrapper = factory({ showText: false })

        expect(wrapper.find('span').exists()).toBe(false)
    })

    it('hides the text when text is empty even if showText is true', () => {
        const wrapper = factory({ text: '' })

        expect(wrapper.find('span').exists()).toBe(false)
    })

    it('applies textClass to the text span', () => {
        const wrapper = factory({ textClass: 'font-semibold' })

        expect(wrapper.find('span').classes()).toContain('font-semibold')
    })

    it('forwards native listeners and attributes to the root element', () => {
        const wrapper = mount(DragPlaceholder, {
            attrs: {
                'aria-hidden': 'true',
                class: 'custom-class',
            },
        })

        expect(wrapper.attributes('aria-hidden')).toBe('true')
        expect(wrapper.classes()).toContain('custom-class')
    })
})
