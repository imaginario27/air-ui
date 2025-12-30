import { mount } from '@vue/test-utils'
import Footer from '~/components/layouts/Footer.vue'
import MaxWidthContainer from '~/components/layouts/MaxWidthContainer.vue'
import type { MenuItem, SocialNetwork } from '@/models/types/navigation'
import { copyToClipboard } from '#imports'

const defaultMenuItems: MenuItem[] = [
    { to: '/about', text: 'About' },
    { to: '/contact', text: 'Contact' }
]

const defaultSocialNetworks: SocialNetwork[] = [
    { name: 'Twitter', link: 'https://twitter.com', icon: '/twitter.svg' },
    { name: 'LinkedIn', link: 'https://linkedin.com', icon: '/linkedin.svg' }
]

const defaultProps = {
    credits: '© 2025 Test Company. All rights reserved.',
    menuItems: defaultMenuItems,
    socialNetworks: defaultSocialNetworks,
    hasContentMaxWidth: true,
    hasSidePadding: true,
    isMobileCentered: true
}

const factory = (props = {}, slots = {}) => {
    return mount(Footer, {
        props: {
            ...defaultProps,
            ...props
        },
        global: {
            stubs: {
                MaxWidthContainer,
                NuxtLink: {
                    props: ['to'],
                    template: '<a :href="to"><slot /></a>'
                }
            }
        },
        slots
    })
}

describe('Footer', () => {
    it('renders default credits text when no slot is provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain(defaultProps.credits)
    })

    it('renders menu items when provided', () => {
        const wrapper = factory()
        const menuLinks = wrapper.findAll('nav ul li a')
        expect(menuLinks).toHaveLength(defaultMenuItems.length)

        defaultMenuItems.forEach((item, i) => {
            const link = menuLinks[i]
            expect(link).toBeTruthy()
            expect(link!.text()).toBe(item.text)
            expect(link!.attributes('href')).toBe(item.to)
        })
    })


    it('renders social network icons with correct attributes', () => {
        const wrapper = factory()
        const icons = wrapper.findAll('a[rel="noopener noreferrer"]')
        expect(icons).toHaveLength(defaultSocialNetworks.length)

        defaultSocialNetworks.forEach((network, i) => {
            const icon = icons[i]
            expect(icon).toBeTruthy()
            expect(icon!.attributes('href')).toBe(network.link)
            expect(icon!.attributes('aria-label')).toBe(network.name)

            const img = icon!.find('img')
            expect(img.exists()).toBe(true)
            expect(img.attributes('src')).toBe(network.icon)
            expect(img.attributes('alt')).toBe(`${network.name} icon`)
        })
    })

    it('applies side padding class when hasSidePadding is true', () => {
        const wrapper = factory({ hasSidePadding: true })
        const footer = wrapper.find('footer')
        expect(footer.classes()).toContain('px-content-side-padding-mobile')
    })

    it('omits side padding class when hasSidePadding is false', () => {
        const wrapper = factory({ hasSidePadding: false })
        const footer = wrapper.find('footer')
        expect(footer.classes()).not.toContain('px-content-side-padding-mobile')
    })

    it('removes max-width constraint when hasContentMaxWidth is false', () => {
        const wrapper = factory({ hasContentMaxWidth: false })
        const maxWidthContainer = wrapper.findComponent(MaxWidthContainer)
        expect(maxWidthContainer.classes()).toContain('!max-w-full')
    })

    it('centers content when isMobileCentered is true', () => {
        const wrapper = factory({ isMobileCentered: true })

        const flexWrappers = wrapper.findAll('div.flex')

        const contentWrapper = flexWrappers.find(w => {
            const classes = w.classes()
            return classes.includes('items-center') && classes.includes('text-center')
        })

        expect(contentWrapper).toBeTruthy()
    })

    it('renders slot content when provided instead of default layout', () => {
        const wrapper = factory({}, { default: '<p class="custom-slot">Custom Content</p>' })
        expect(wrapper.find('.custom-slot').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom Content')
        expect(wrapper.text()).not.toContain(defaultProps.credits)
    })

    it('renders only credits if menuItems and socialNetworks are undefined', () => {
        const wrapper = factory({ menuItems: undefined, socialNetworks: undefined })
        expect(wrapper.text()).toContain(defaultProps.credits)
        expect(wrapper.find('nav').exists()).toBe(false)
        expect(wrapper.findAll('a[rel="noopener noreferrer"]')).toHaveLength(0)
    })
})
