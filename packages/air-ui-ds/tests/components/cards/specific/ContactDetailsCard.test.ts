import { mount } from '@vue/test-utils'
import ContactDetailsCard from '@/components/cards/specific/ContactDetailsCard.vue'
import Icon from '@/components/icons/Icon.vue'

const factory = (props = {}) => {
    return mount(ContactDetailsCard, {
        props: {
            ...props
        },
        global: {
            stubs: {
                Icon
            }
        }
    })
}

describe('ContactDetailsCard.vue', () => {
    it('renders with default name', () => {
        const wrapper = factory()
        const title = wrapper.findComponent({ name: 'CardTitle' })

        expect(title.exists()).toBe(true)
        expect(title.props('title')).toBe('John Doe')
    })

    it('renders name prop correctly', () => {
        const wrapper = factory({ name: 'Jane Smith' })
        const title = wrapper.findComponent({ name: 'CardTitle' })

        expect(title.props('title')).toBe('Jane Smith')
    })

    it('renders email block when email is provided', () => {
        const email = 'jane@example.com'
        const wrapper = factory({ email })

        const emailRow = wrapper.find('div.text-text-primary-brand-default')
        expect(emailRow.exists()).toBe(true)
        expect(emailRow.text()).toContain(email)

        const icon = emailRow.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:at')
    })

    it('does not render email block when email is not provided', () => {
        const wrapper = factory()
        const emailRow = wrapper.find('div.text-text-primary-brand-default')

        expect(emailRow.exists()).toBe(false)
    })

    it('renders phone block when phone is provided', () => {
        const phone = '+1234567890'
        const wrapper = factory({ phone })

        const phoneRow = wrapper.find('div.text-text-neutral-subtle')
        expect(phoneRow.exists()).toBe(true)
        expect(phoneRow.text()).toContain(phone)

        const icon = phoneRow.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:phone-outline')
    })

    it('does not render phone block when phone is not provided', () => {
        const wrapper = factory()
        const phoneRow = wrapper.find('div.text-text-neutral-subtle')

        expect(phoneRow.exists()).toBe(false)
    })
})
