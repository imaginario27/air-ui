import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NotificationListItem from '@/components/notifications/NotificationListItem.vue'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'
import Icon from '@/components/icons/Icon.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'

const defaultProps = {
    title: 'New Notification',
    description: 'This is a test description.',
    timeAgo: '5 minutes ago',
    author: 'John Doe',
}

const factory = (props: Record<string, unknown> = {}) =>
    mount(NotificationListItem, {
        props: { ...defaultProps, ...props },
        global: {
            stubs: { ContainedIcon: true, ActionIconButton: true },
        },
    })

describe('NotificationListItem.vue', () => {
    it('renders title, description, timeAgo and author', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('New Notification')
        expect(wrapper.text()).toContain('This is a test description.')
        expect(wrapper.text()).toContain('5 minutes ago')
        expect(wrapper.text()).toContain('John Doe')
    })

    it('applies unread background class when modelValue is false', () => {
        const wrapper = factory({ modelValue: false })
        expect(wrapper.html()).toContain('bg-background-neutral-subtlest')
    })

    it('does not apply unread background class when modelValue is true', () => {
        const wrapper = factory({ modelValue: true })
        expect(wrapper.html()).not.toContain('bg-background-neutral-subtlest')
    })

    it('renders ContainedIcon when icon is provided and isIconContained is true', () => {
        const wrapper = factory({ icon: 'mdi:bell-outline', isIconContained: true })
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(true)
    })

    it('renders plain Icon when icon is provided and isIconContained is false', () => {
        const wrapper = mount(NotificationListItem, {
            props: { ...defaultProps, icon: 'mdi:bell-outline', isIconContained: false },
        })
        const icons = wrapper.findAllComponents(Icon)
        expect(icons.some(i => i.props('name') === 'mdi:bell-outline')).toBe(true)
    })

    it('renders no icon element when icon prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
    })

    it('emits update:modelValue with true when an unread item is clicked', async () => {
        const wrapper = factory({ modelValue: false })
        await wrapper.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('does not emit update:modelValue when item is already read', async () => {
        const wrapper = factory({ modelValue: true })
        await wrapper.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('emits remove when the close button is clicked', async () => {
        const wrapper = factory()
        await wrapper.findComponent(ActionIconButton).trigger('click')
        expect(wrapper.emitted('remove')).toBeTruthy()
    })

    it('renders custom content slot and hides default content', () => {
        const wrapper = mount(NotificationListItem, {
            props: defaultProps,
            slots: { content: '<div class="custom-content">Custom</div>' },
        })
        expect(wrapper.find('.custom-content').exists()).toBe(true)
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders description slot and hides the default description paragraph', async () => {
        const wrapper = mount(NotificationListItem, {
            props: defaultProps,
            slots: { description: '<span class="custom-desc">Rich desc</span>' },
        })
        await nextTick()
        expect(wrapper.find('.custom-desc').exists()).toBe(true)
        expect(wrapper.find('p').exists()).toBe(false)
    })
})
