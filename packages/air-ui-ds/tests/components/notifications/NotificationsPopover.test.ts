import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NotificationsPopover from '@/components/notifications/NotificationsPopover.vue'
import NotificationListItem from '@/components/notifications/NotificationListItem.vue'
import ActionButton from '@/components/buttons/ActionButton.vue'
import NavLink from '@/components/navigation/links/NavLink.vue'

const makeSampleList = () => [
    { id: '1', read: false, title: 'Unread A', description: 'Desc A', timeAgo: '1m ago', author: 'Alice', link: '' },
    { id: '2', read: true,  title: 'Read B',   description: 'Desc B', timeAgo: '2m ago', author: 'Bob',   link: '' },
    { id: '3', read: false, title: 'Unread C', description: 'Desc C', timeAgo: '3m ago', author: 'Carol', link: '' },
]

const factory = (props: Record<string, unknown> = {}) => {
    const onClose = vi.fn()
    const wrapper = mount(NotificationsPopover, {
        props: { list: makeSampleList(), ...props },
        global: {
            stubs: {
                Popover: {
                    template: '<div><slot name="content" :onClose="onClose" /></div>',
                    setup: () => ({ onClose }),
                },
                ToggleButtonsGroupField: {
                    name: 'ToggleButtonsGroupField',
                    template: '<div />',
                    props: ['modelValue', 'buttons', 'groupStyle', 'id'],
                    emits: ['update:modelValue'],
                },
                NotificationListItem: {
                    name: 'NotificationListItem',
                    template: '<div />',
                    props: ['modelValue', 'title', 'icon', 'to'],
                    emits: ['update:modelValue', 'remove', 'itemClick'],
                },
            },
        },
    })

    return Object.assign(wrapper, { onClose })
}

describe('NotificationsPopover.vue', () => {
    describe('list rendering', () => {
        it('renders all items by default', () => {
            const wrapper = factory()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(3)
        })

        it('shows empty text when list is empty', () => {
            const wrapper = factory({ list: [] })
            expect(wrapper.text()).toContain('No notifications available.')
        })

        it('syncs internalList when list prop changes', async () => {
            const wrapper = factory()
            await wrapper.setProps({ list: [makeSampleList()[0]] })
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(1)
        })
    })

    describe('limit', () => {
        it('renders all items by default when under the default limit', () => {
            const wrapper = factory()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(3)
        })

        it('caps the rendered items to the limit prop', () => {
            const wrapper = factory({ limit: 2 })
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(2)
        })

        it('applies the limit after filtering to unread items', async () => {
            const wrapper = factory({ limit: 1 })
            const toggle = wrapper.findComponent({ name: 'ToggleButtonsGroupField' })
            await toggle.vm.$emit('update:modelValue', 'unread')
            await nextTick()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(1)
        })
    })

    describe('filtering', () => {
        it('shows only unread items when filter changes to unread', async () => {
            const wrapper = factory()
            const toggle = wrapper.findComponent({ name: 'ToggleButtonsGroupField' })
            await toggle.vm.$emit('update:modelValue', 'unread')
            await nextTick()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(2)
        })

        it('restores all items when filter changes back to all', async () => {
            const wrapper = factory()
            const toggle = wrapper.findComponent({ name: 'ToggleButtonsGroupField' })
            await toggle.vm.$emit('update:modelValue', 'unread')
            await nextTick()
            await toggle.vm.$emit('update:modelValue', 'all')
            await nextTick()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(3)
        })
    })

    describe('remove', () => {
        it('removes the item from the list when remove is emitted', async () => {
            const wrapper = factory()
            const items = wrapper.findAllComponents(NotificationListItem)
            await items[0].vm.$emit('remove')
            await nextTick()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(2)
        })

        it('emits remove with the affected id as payload', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(NotificationListItem)[0].vm.$emit('remove')
            await nextTick()
            expect(wrapper.emitted('remove')).toBeTruthy()
            expect(wrapper.emitted('remove')?.[0]).toEqual([{ id: '1' }])
        })
    })

    describe('badge counter', () => {
        it('shows only the unread count', () => {
            const wrapper = factory()
            // sampleList has 2 unread items (id 1 and 3)
            expect(wrapper.text()).toContain('2')
        })

        it('hides the badge when all items are read', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(ActionButton)[0].trigger('click')
            await nextTick()
            expect(wrapper.text()).not.toContain('2')
        })
    })

    describe('read status', () => {
        it('marks an item as read when update:modelValue is emitted from it', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(NotificationListItem)[0].vm.$emit('update:modelValue', true)
            await nextTick()
            // After marking id='1' as read, only id='3' remains unread
            const toggle = wrapper.findComponent({ name: 'ToggleButtonsGroupField' })
            await toggle.vm.$emit('update:modelValue', 'unread')
            await nextTick()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(1)
        })

        it('marks all items as read and emits markAllAsRead', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(ActionButton)[0].trigger('click')
            expect(wrapper.emitted('markAllAsRead')).toBeTruthy()
            const toggle = wrapper.findComponent({ name: 'ToggleButtonsGroupField' })
            await toggle.vm.$emit('update:modelValue', 'unread')
            await nextTick()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(0)
        })
    })

    describe('clear all', () => {
        it('clears all items and emits clearAll', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(ActionButton)[1].trigger('click')
            await nextTick()
            expect(wrapper.emitted('clearAll')).toBeTruthy()
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(0)
        })

        it('hides badge counter, filters, and footer after clear all', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(ActionButton)[1].trigger('click')
            await nextTick()
            expect(wrapper.findComponent({ name: 'ToggleButtonsGroupField' }).exists()).toBe(false)
            expect(wrapper.findAllComponents(ActionButton)).toHaveLength(0)
            expect(wrapper.text()).not.toContain('2')
        })
    })

    describe('loading and error states', () => {
        it('shows loading spinner and hides list when isLoading is true', () => {
            const wrapper = factory({ isLoading: true })
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(0)
            expect(wrapper.html()).toContain('Loading')
        })

        it('shows error text and hides list when errorText is set', () => {
            const wrapper = factory({ errorText: 'Something went wrong' })
            expect(wrapper.text()).toContain('Something went wrong')
            expect(wrapper.findAllComponents(NotificationListItem)).toHaveLength(0)
        })
    })

    describe('view all link', () => {
        it('closes the popover when clicked without a viewAllLink', async () => {
            const wrapper = factory()
            await wrapper.findComponent(NavLink).trigger('click')
            expect(wrapper.onClose).toHaveBeenCalled()
        })

        it('closes the popover when clicked with a viewAllLink provided', async () => {
            const wrapper = factory({ viewAllLink: '/notifications' })
            await wrapper.findComponent(NavLink).trigger('click')
            expect(wrapper.onClose).toHaveBeenCalled()
        })
    })

    describe('list item click', () => {
        it('closes the popover when itemClick is emitted from a list item', async () => {
            const wrapper = factory()
            await wrapper.findAllComponents(NotificationListItem)[0]?.vm.$emit('itemClick')
            expect(wrapper.onClose).toHaveBeenCalled()
        })
    })
})
