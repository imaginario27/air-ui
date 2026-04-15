import { mount } from '@vue/test-utils'
import DropdownMenuItem from '@/components/dropdowns/DropdownMenuItem.vue'
import { DropdownActionType, DropdownItemType } from '~/models/enums/dropdowns'
import { NuxtLink } from '#components'
import Icon from '@/components/icons/Icon.vue'
import { PrefetchOn } from '@/models/enums/prefetch'

vi.mock('@/assets/images/placeholders/missing-image-placeholder.png', () => ({
    default: '/mocked/missing-image.png'
}))

const defaultProps = {
    actionType: DropdownActionType.ACTION,
    text: 'Test Item'
}

const factory = (props?: Record<string, any>) => {
    return mount(DropdownMenuItem, {
        props: {
            ...defaultProps,
            ...props
        },
        global: {
            stubs: {
                NuxtLink: {
                    name: 'NuxtLink',
                    template: '<a><slot /></a>',
                    props: ['to', 'target', 'rel', 'external', 'prefetchOn'],
                },
                Icon
            }
        }
    })
}

describe('DropdownMenuItem.vue', () => {
    it('renders as a div when actionType is ACTION', () => {
        const wrapper = factory({ actionType: DropdownActionType.ACTION })
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders as a NuxtLink when actionType is LINK', () => {
        const wrapper = factory({
            actionType: DropdownActionType.LINK,
            to: '/test'
        })
        expect(wrapper.findComponent(NuxtLink).exists()).toBe(true)
    })

    it('uses visibility prefetch strategy by default for link action type', () => {
        const wrapper = factory({
            actionType: DropdownActionType.LINK,
            to: '/test',
        })

        const link = wrapper.findComponent(NuxtLink)
        expect(link.props('prefetchOn')).toBe(PrefetchOn.VISIBILITY)
    })

    it('passes custom prefetch strategy for link action type', () => {
        const wrapper = factory({
            actionType: DropdownActionType.LINK,
            to: '/test',
            prefetchOn: PrefetchOn.INTERACTION,
        })

        const link = wrapper.findComponent(NuxtLink)
        expect(link.props('prefetchOn')).toBe(PrefetchOn.INTERACTION)
    })

    it('emits click and close when clicked and actionType is ACTION', async () => {
        const wrapper = factory({ actionType: DropdownActionType.ACTION })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not emit click and close when disabled is true', async () => {
        const wrapper = factory({
            actionType: DropdownActionType.ACTION,
            disabled: true,
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeFalsy()
        expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('displays the correct text', () => {
        const wrapper = factory({ text: 'Hello world' })
        expect(wrapper.text()).toContain('Hello world')
    })

    describe('icon rendering', () => {
        it('renders Icon when type is ICON and icon prop is provided', () => {
            const wrapper = factory({
                type: DropdownItemType.ICON,
                icon: 'mdi:account'
            })

            const icon = wrapper.findComponent(Icon)
            expect(icon.exists()).toBe(true)
            expect(icon.props('name')).toBe('mdi:account')
        })

        it('renders Icon when type is DANGER_ICON and icon is provided', () => {
            const wrapper = factory({
                type: DropdownItemType.DANGER_ICON,
                icon: 'mdi:delete'
            })

            const icon = wrapper.findComponent(Icon)
            expect(icon.exists()).toBe(true)
            expect(icon.props('name')).toBe('mdi:delete')
        })
    })

    describe('image rendering', () => {
        it('renders imgUrl when provided and image loads', () => {
            const wrapper = factory({
                type: DropdownItemType.IMAGE,
                imgUrl: 'https://example.com/image.jpg'
            })

            const img = wrapper.find('img')
            expect(img.exists()).toBe(true)
            expect(img.attributes('src')).toBe('https://example.com/image.jpg')
        })

        it('renders fallback image when original image fails to load', async () => {
            const wrapper = factory({
                type: DropdownItemType.IMAGE,
                imgUrl: 'broken-image.jpg'
            })

            const originalImg = wrapper.find('img')
            expect(originalImg.exists()).toBe(true)

            await originalImg.trigger('error')

            const fallbackImg = wrapper.find('img')
            expect(fallbackImg.attributes('src')).toBe('/mocked/missing-image.png')
        })
    })

    describe('danger text type', () => {
        it('applies danger text style when type is DANGER_TEXT', () => {
            const wrapper = factory({
                type: DropdownItemType.DANGER_TEXT,
                text: 'Delete item'
            })

            const root = wrapper.find('[class*="text-text-delete"]')
            expect(wrapper.text()).toContain('Delete item')
            expect(root.exists()).toBe(true)
        })
    })

    it('applies disabled interaction styles when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        const classes = wrapper.classes()

        expect(classes).toContain('opacity-disabled')
        expect(classes).toContain('cursor-not-allowed')
        expect(classes).toContain('pointer-events-none')
    })

    it('renders right chevron when hasNestedLevels is true', () => {
        const wrapper = factory({ hasNestedLevels: true })
        const icons = wrapper.findAllComponents(Icon)
        const chevronIcon = icons.find(icon => icon.props('name') === 'mdi:chevron-right')

        expect(chevronIcon).toBeTruthy()
    })
})
