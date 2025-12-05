// tests/components/cards/ContactDetailsCard.spec.ts
import { mount } from '@vue/test-utils'
import ContactDetailsCard from '@/components/cards/specific/ContactDetailsCard.vue'

const factory = (props = {}) => {
    return mount(ContactDetailsCard, {
        props: {
            ...props
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

    it('conditionally renders email when provided', () => {
        const email = 'jane@example.com'
        const wrapper = factory({ email })

        const emailRow = wrapper.find('div.text-text-primary-brand-default')
        expect(emailRow.exists()).toBe(true)
        expect(emailRow.text()).toContain(email)

        const icon = emailRow.findComponent({ name: 'MdiIcon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props()).toMatchObject({
            icon: 'mdiAt',
            size: '20'
        })
    })

    it('does not render email block when email is not provided', () => {
        const wrapper = factory()
        const emailRow = wrapper.find('div.text-text-primary-brand-default')

        expect(emailRow.exists()).toBe(false)
    })

    it('conditionally renders phone when provided', () => {
        const phone = '+1234567890'
        const wrapper = factory({ phone })

        const phoneRow = wrapper.find('div.text-text-neutral-subtle')
        expect(phoneRow.exists()).toBe(true)
        expect(phoneRow.text()).toContain(phone)

        const icon = phoneRow.findComponent({ name: 'MdiIcon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props()).toMatchObject({
            icon: 'mdiPhoneOutline',
            size: '20'
        })
    })

    it('does not render phone block when phone is not provided', () => {
        const wrapper = factory()
        const phoneRow = wrapper.find('div.text-text-neutral-subtle')

        expect(phoneRow.exists()).toBe(false)
    })
})
