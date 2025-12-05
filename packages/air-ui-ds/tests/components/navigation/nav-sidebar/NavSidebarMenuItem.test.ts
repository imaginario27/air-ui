import { mount } from '@vue/test-utils'
import NavSidebarMenuItem from '@/components/navigation/nav-sidebar/NavSidebarMenuItem.vue'
import { MdiIcon } from '#components'
describe('NavSidebarMenuItem.vue', () => {
    const globalStubs = {
        NuxtLink: {
            template: `<a :href="to"><slot /></a>`,
            props: ['to']
        }
    }

    it('renders NuxtLink with correct href', () => {
        const wrapper = mount(NavSidebarMenuItem, {
            props: {
                to: '/settings'
            },
            global: {
                stubs: globalStubs
            }
        })

        const link = wrapper.find('a')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBe('/settings')
    })

    it('renders text in span', () => {
        const wrapper = mount(NavSidebarMenuItem, {
            props: {
                text: 'Settings'
            },
            global: {
                stubs: globalStubs
            }
        })

        const span = wrapper.find('span')
        expect(span.exists()).toBe(true)
        expect(span.text()).toBe('Settings')
    })

    it('renders MdiIcon when icon prop is provided', () => {
        const wrapper = mount(NavSidebarMenuItem, {
            props: {
                icon: 'mdiHome'
            },
            global: {
                stubs: globalStubs,
                components: {
                    MdiIcon // ✅ manually registered
                }
            }
        })

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHome')
    })

    it('does not render MdiIcon when icon prop is not provided', () => {
        const wrapper = mount(NavSidebarMenuItem, {
            global: {
                stubs: globalStubs,
                components: {
                    MdiIcon
                }
            }
        })

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(false)
    })
})
