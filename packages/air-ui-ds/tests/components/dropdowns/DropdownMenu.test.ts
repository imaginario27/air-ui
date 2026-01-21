import { mount, VueWrapper } from '@vue/test-utils'
import DropdownMenu from '@/components/dropdowns/DropdownMenu.vue'
import DropdownMenuItem from '@/components/dropdowns/DropdownMenuItem.vue'
import { DropdownPosition } from '@/models/enums/positions'

const factory = (options: {
    props?: Record<string, unknown>
    slots?: Record<string, any>
} = {}): VueWrapper => {
    return mount(DropdownMenu, {
        props: {
            items: [],
            shouldTeleport: false, // force dropdown into wrapper DOM
            ...options.props,
        },
        slots: {
            activator: '<template #activator="{ isOpen }"><button>Open</button></template>',
            ...options.slots,
        },
        global: {
            components: {
                DropdownMenuItem,
            },
        },
        attachTo: document.body,
    })
}

describe('DropdownMenu.vue', () => {
    it('renders the root container', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the activator slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Open')
    })

    it('toggles dropdown open and closed on activator click', async () => {
        const wrapper = factory()
        const activator = wrapper.find('.dropdown-activator')

        await activator.trigger('click')
        await wrapper.vm.$nextTick()

        expect((wrapper.vm as any).isOpen).toBe(true)

        await activator.trigger('click')
        expect((wrapper.vm as any).isOpen).toBe(false)
    })

    it('calls callback and closes dropdown on item click', async () => {
        const mockCallback = vi.fn()

        const wrapper = factory({
            props: {
                items: [{ text: 'Item', callback: mockCallback }],
            },
        })

        await wrapper.find('.dropdown-activator').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const item = wrapper.findComponent(DropdownMenuItem)
        expect(item.exists()).toBe(true)

        // emit a click from the actual component
        await item.vm.$emit('click')
        await wrapper.vm.$nextTick()

        expect(mockCallback).toHaveBeenCalled()
        expect((wrapper.vm as any).isOpen).toBe(false)
    })

    it('renders dropdown with default positioning class when no positionClass is provided', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.BOTTOM_LEFT,
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('.dropdown-activator').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        expect(dropdown.exists()).toBe(true)

        const classAttr = dropdown.attributes('class') || ''
        expect(classAttr.includes('left-0')).toBe(true)
        expect(classAttr.includes('top-full')).toBe(true)
    })

    it('applies positionClass override when provided', async () => {
        const wrapper = factory({
            props: {
                positionClass: 'fixed bottom-0 left-0',
                items: [{ text: 'Positioned' }],
            },
        })

        await wrapper.find('.dropdown-activator').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        expect(dropdown.exists()).toBe(true)
        expect(dropdown.classes()).toContain('fixed')
        expect(dropdown.classes()).toContain('bottom-0')
        expect(dropdown.classes()).toContain('left-0')
    })

    it('does not render shadow when hasShadow is false', async () => {
        const wrapper = factory({
            props: {
                hasShadow: false,
                items: [{ text: 'No Shadow' }],
            },
        })

        await wrapper.find('.dropdown-activator').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        expect(dropdown.exists()).toBe(true)
        expect(dropdown.classes()).not.toContain('shadow-lg')
    })

    it('adds relative class when isRelative is true', () => {
        const wrapper = factory({ props: { isRelative: true } })
        const container = wrapper.find('[data-test="dropdown-container"]')
        expect(container.classes()).toContain('relative')
    })

    it('omits relative class when isRelative is false', () => {
        const wrapper = factory({ props: { isRelative: false } })
        const container = wrapper.find('[data-test="dropdown-container"]')
        expect(container.classes()).not.toContain('relative')
    })

    it('cleans up global event listeners on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
        const wrapper = factory()

        wrapper.unmount()
        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('renders custom slot content when provided in "items" slot', async () => {
        const wrapper = factory({
            slots: {
                items: '<div class="custom-item">Custom</div>',
            },
        })

        await wrapper.find('.dropdown-activator').trigger('click')
        await wrapper.vm.$nextTick()

        const customSlot = wrapper.find('.custom-item')
        expect(customSlot.exists()).toBe(true)
    })

    it('renders fallback items when slot is not provided', async () => {
        const wrapper = factory({
            props: {
                items: [{ text: 'Fallback' }],
            },
        })

        await wrapper.find('.dropdown-activator').trigger('click')
        await wrapper.vm.$nextTick()

        const item = wrapper.findComponent(DropdownMenuItem)
        expect(item.exists()).toBe(true)
    })
})
