import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ContextMenu from '@/components/dropdowns/ContextMenu.vue'
import ContextMenuDropdown from '@/components/dropdowns/ContextMenuDropdown.vue'
import DropdownMenuContextItem from '@/components/dropdowns/DropdownMenuContextItem.vue'
import DropdownMenuContextItemsTree from '@/components/dropdowns/DropdownMenuContextItemsTree.vue'
import DropdownSectionItem from '@/components/dropdowns/DropdownSectionItem.vue'
import Divider from '@/components/dividers/Divider.vue'
import Kbd from '@/components/content/Kbd.vue'

const wrappers: Array<ReturnType<typeof mount>> = []

const factory = (props?: Record<string, unknown>) => {
    const wrapper = mount(ContextMenu, {
        props: {
            items: [{ text: 'Rename' }],
            ...props,
        },
        slots: {
            default: '<div class="target">Right click target</div>',
        },
        attachTo: document.body,
        global: {
            components: {
                ContextMenuDropdown,
                DropdownMenuContextItem,
                DropdownMenuContextItemsTree,
                DropdownSectionItem,
                Divider,
                Kbd,
            },
            stubs: {
                Icon: true,
                User: true,
                NuxtLink: {
                    name: 'NuxtLink',
                    template: '<a><slot /></a>',
                    props: ['to', 'target', 'rel', 'external', 'prefetchOn'],
                },
            },
        },
    })

    wrappers.push(wrapper)
    return wrapper
}

const openContextMenu = async (
    wrapper: ReturnType<typeof factory>,
    coordinates?: { clientX: number; clientY: number },
) => {
    const pointer = coordinates ?? { clientX: 120, clientY: 64 }
    const target = wrapper.find('[data-test="context-menu-target"]')
    const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        ...pointer,
    })

    target.element.dispatchEvent(event)
    await nextTick()
    await nextTick()

    return event
}

describe('ContextMenu.vue', () => {
    beforeEach(() => {
        vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
            callback(0)
            return 0
        })
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        wrappers.splice(0).forEach(wrapper => wrapper.unmount())
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        document.body.innerHTML = ''
    })

    it('opens the menu at the cursor position on right click', async () => {
        const wrapper = factory()

        const event = await openContextMenu(wrapper, { clientX: 160, clientY: 96 })
        const panel = document.body.querySelector('[data-context-menu-panel]') as HTMLElement | null

        expect(event.defaultPrevented).toBe(true)
        expect(panel).not.toBeNull()
        expect(panel?.style.left).toBe('160px')
        expect(panel?.style.top).toBe('96px')
        expect(panel?.style.width).toBe('240px')
        expect(document.body.querySelector('[data-dropdown-menu-panel]')).not.toBeNull()
    })

    it('locks page scrolling while the menu is open and restores it when closed', async () => {
        const wrapper = factory()

        await openContextMenu(wrapper)

        expect(document.body.style.overflow).toBe('hidden')
        expect(document.documentElement.style.overflow).toBe('')

        document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
        await nextTick()
        await nextTick()

        expect(document.body.style.overflow).toBe('')
        expect(document.documentElement.style.overflow).toBe('')
    })

    it('preserves scrollbar gutter space while locking scroll', async () => {
        const wrapper = factory()

        document.body.style.paddingRight = '8px'
        vi.spyOn(document.documentElement, 'clientWidth', 'get')
            .mockReturnValueOnce(1180)
            .mockReturnValueOnce(1200)

        await openContextMenu(wrapper)

        expect(document.body.style.overflow).toBe('hidden')
        expect(document.body.style.paddingRight).toBe('28px')

        document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
        await nextTick()
        await nextTick()

        expect(document.body.style.paddingRight).toBe('8px')
    })

    it('does not add padding compensation when locking keeps viewport width stable', async () => {
        const wrapper = factory()

        document.body.style.paddingRight = '8px'
        vi.spyOn(document.documentElement, 'clientWidth', 'get')
            .mockReturnValueOnce(1180)
            .mockReturnValueOnce(1180)

        await openContextMenu(wrapper)

        expect(document.body.style.paddingRight).toBe('8px')
    })

    it('applies a custom fixed width when width prop is provided', async () => {
        const wrapper = factory({
            width: 300,
        })

        await openContextMenu(wrapper)

        const panel = document.body.querySelector('[data-context-menu-panel]') as HTMLElement | null
        expect(panel?.style.width).toBe('300px')
    })

    it('renders divider entries in the fallback item tree', async () => {
        const wrapper = factory({
            items: [
                { text: 'Rename' },
                { divider: true },
                { text: 'Delete' },
            ],
        })

        await openContextMenu(wrapper)

        expect(wrapper.findComponent(Divider).exists()).toBe(true)
    })

    it('runs the item callback and closes the menu after selection', async () => {
        const callback = vi.fn()
        const wrapper = factory({
            items: [{ text: 'Rename', callback }],
        })

        await openContextMenu(wrapper)

        const item = wrapper.findComponent(DropdownMenuContextItem)
        await item.trigger('click')
        await nextTick()
        await nextTick()

        expect(callback).toHaveBeenCalledTimes(1)
        expect(document.body.querySelector('[data-dropdown-menu-panel]')).toBeNull()
    })

    it('does not open when disabled', async () => {
        const wrapper = factory({
            disabled: true,
        })

        await openContextMenu(wrapper)

        expect(document.body.querySelector('[data-dropdown-menu-panel]')).toBeNull()
    })
})