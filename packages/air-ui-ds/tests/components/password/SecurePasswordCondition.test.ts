import { mount, type VueWrapper } from '@vue/test-utils'
import SecurePasswordCondition from '@/components/password/SecurePasswordCondition.vue'

type Props = {
    label?: string
    isValid: boolean
}

const factory = (props: Props): VueWrapper => {
    return mount(SecurePasswordCondition, {
        props,
        global: {
            stubs: {
                Icon: {
                    name: 'Icon',
                    template: '<div />',
                    props: ['name', 'iconClass', 'size']
                }
            }
        }
    })
}

describe('SecurePasswordCondition', () => {
    it('renders valid state', () => {
        const wrapper = factory({
            label: 'At least 8 characters',
            isValid: true
        })

        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
        expect(icon.props('iconClass')).toContain('!text-icon-success-subtle')

        const text = wrapper.find('span')
        expect(text.text()).toBe('At least 8 characters')
        expect(text.classes()).toContain('text-success-default')
    })

    it('renders invalid state', () => {
        const wrapper = factory({
            label: 'Contains a number',
            isValid: false
        })

        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:close')
        expect(icon.props('iconClass')).toContain('!text-text-neutral-subtle')

        const text = wrapper.find('span')
        expect(text.text()).toBe('Contains a number')
        expect(text.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders default label when label is not provided', () => {
        const wrapper = factory({
            isValid: false
        })

        const text = wrapper.find('span')
        expect(text.text()).toBe('Condition label')
    })
})
