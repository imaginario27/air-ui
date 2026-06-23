import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import NavMenu from '@/components/navigation/nav-menu/NavMenu.vue'
import { PrefetchOn } from '@/models/enums/prefetch'

const routeState = reactive({
    path: '/docs',
})

vi.mock('#app', () => ({
    useRoute: () => routeState,
}))

describe('NavMenu.vue', () => {
    const factory = (props = {}) => {
        return mount(NavMenu, {
            props: {
                menuItems: [
                    { text: 'Docs', to: '/docs' },
                    {
                        text: 'Guides',
                        to: '/guides',
                        children: [
                            { text: 'Intro', to: '/guides/intro' },
                        ],
                    },
                ],
                ...props,
            },
            global: {
                stubs: {
                    DropdownMenu: {
                        name: 'DropdownMenu',
                        template: '<div class="dropdown-menu-stub"><slot name="activator" :isOpen="false" /><slot name="items" /></div>',
                        props: ['positionYOffset', 'trigger', 'dropdownClass', 'isSticky', 'zIndex'],
                    },
                    DropdownMenuItem: {
                        name: 'DropdownMenuItem',
                        template: '<div class="dropdown-menu-item-stub">{{ text }}</div>',
                        props: ['text', 'to'],
                    },
                    NavMenuItem: {
                        name: 'NavMenuItem',
                        template: '<div class="nav-menu-item-stub">{{ text }}</div>',
                        props: ['text', 'to', 'detectActive', 'prefetchOn'],
                    },
                    Icon: {
                        name: 'Icon',
                        template: '<i class="icon-stub" />',
                        props: ['name'],
                    },
                },
            },
        })
    }

    it('renders simple items through NavMenuItem', () => {
        const wrapper = factory()
        const items = wrapper.findAllComponents({ name: 'NavMenuItem' })

        expect(items).toHaveLength(1)
        expect(items[0]?.props('text')).toBe('Docs')
    })

    it('passes default prefetchOn strategy to NavMenuItem', () => {
        const wrapper = factory()
        const item = wrapper.findComponent({ name: 'NavMenuItem' })

        expect(item.props('prefetchOn')).toBe(PrefetchOn.VISIBILITY)
    })

    it('passes custom prefetchOn strategy to NavMenuItem', () => {
        const wrapper = factory({ prefetchOn: PrefetchOn.INTERACTION })
        const item = wrapper.findComponent({ name: 'NavMenuItem' })

        expect(item.props('prefetchOn')).toBe(PrefetchOn.INTERACTION)
    })

    it('renders dropdown for items with children', () => {
        const wrapper = factory()

        expect(wrapper.findComponent({ name: 'DropdownMenu' }).exists()).toBe(true)
    })

    it('passes isSticky false to DropdownMenu by default', () => {
        const wrapper = factory()
        const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })

        expect(dropdown.props('isSticky')).toBe(false)
    })

    it('forwards isSticky true to DropdownMenu', () => {
        const wrapper = factory({ isSticky: true })
        const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })

        expect(dropdown.props('isSticky')).toBe(true)
    })

    it('passes default dropdownZIndex to DropdownMenu', () => {
        const wrapper = factory()
        const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })

        expect(dropdown.props('zIndex')).toBe('50')
    })

    it('forwards custom dropdownZIndex to DropdownMenu', () => {
        const wrapper = factory({ dropdownZIndex: '100' })
        const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })

        expect(dropdown.props('zIndex')).toBe('100')
    })
})
