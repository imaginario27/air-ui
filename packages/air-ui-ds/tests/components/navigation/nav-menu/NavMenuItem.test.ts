import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import NavMenuItem from '@/components/navigation/nav-menu/NavMenuItem.vue'
import { PrefetchOn } from '@/models/enums/prefetch'

const routeState = reactive({
    path: '/dashboard',
})

vi.mock('#app', () => ({
    useRoute: () => routeState,
}))

const factory = (props = {}) => {
    return mount(NavMenuItem, {
        props: {
            text: 'Dashboard',
            to: '/dashboard',
            ...props,
        },
        global: {
            stubs: {
                NuxtLink: {
                    name: 'NuxtLink',
                    template: '<a :href="to"><slot /></a>',
                    props: ['to', 'prefetchOn'],
                },
            },
        },
    })
}

describe('NavMenuItem.vue', () => {
    beforeEach(() => {
        routeState.path = '/dashboard'
    })

    it('renders menu item text', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Dashboard')
    })

    it('renders NuxtLink with target route', () => {
        const wrapper = factory({ to: '/dashboard' })
        const link = wrapper.find('a')

        expect(link.attributes('href')).toBe('/dashboard')
    })

    it('uses default prefetchOn strategy', () => {
        const wrapper = factory()
        const link = wrapper.findComponent({ name: 'NuxtLink' })

        expect(link.props('prefetchOn')).toBe(PrefetchOn.VISIBILITY)
    })

    it('passes custom prefetchOn strategy to NuxtLink', () => {
        const wrapper = factory({
            prefetchOn: PrefetchOn.INTERACTION,
        })
        const link = wrapper.findComponent({ name: 'NuxtLink' })

        expect(link.props('prefetchOn')).toBe(PrefetchOn.INTERACTION)
    })
})
