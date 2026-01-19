import { mount } from '@vue/test-utils'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import Icon from '@/components/icons/Icon.vue' 
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'

vi.mock('#components', () => ({
    NuxtLink: {
        template: '<a><slot /></a>'
    }
}))

vi.mock('vue-router', async () => {
    const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
    return {
        ...actual,
        useRoute: vi.fn()
    }
})

describe('Breadcrumbs', () => {
    const mockRoute = (path: string) => {
        (useRoute as Mock).mockReturnValue(
            reactive({
                get path() {
                    return path
                }
            })
        )
    }

    const factory = (props: Partial<InstanceType<typeof Breadcrumbs>['$props']> = {}) => {
        return mount(Breadcrumbs, {
            props,
            global: {
                components: {
                    Icon
                }
            }
        })
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders home icon when showHome is true (default)', () => {
        mockRoute('/dashboard/settings')
        const wrapper = factory()
        expect(wrapper.findComponent({ name: 'NuxtLink' }).exists()).toBe(true)
    })

    it('does not render home icon when showHome is false', () => {
        mockRoute('/dashboard')
        const wrapper = factory({ showHome: false })

        const homeLink = wrapper.find('li:first-child a')
        expect(homeLink.exists()).toBe(false)
    })

    it('renders only home icon on root path', () => {
        mockRoute('/')
        const wrapper = factory()

        const allCrumbs = wrapper.findAll('li')
        expect(allCrumbs.length).toBe(1)
    })

    it('does not show separator before first crumb when home is hidden', () => {
        mockRoute('/about')
        const wrapper = factory({ showHome: false })

        const separatorIcons = wrapper.findAllComponents(Icon).filter(icon => {
            return icon.props('name') === 'mdi:chevron-right'
        })

        expect(separatorIcons.length).toBe(0)
    })
})
