import { mount } from '@vue/test-utils'
import Drawer from '@/components/drawers/Drawer.vue'
import { Direction } from '@/models/enums/directions'

vi.mock('#imports', () => ({
    useHead: vi.fn(),
}))

describe('Drawer.vue', () => {
    const factory = (props = {}) => {
        return mount(Drawer, {
            props: {
                modelValue: true,
                ...props,
            },
            global: {
                stubs: {
                    Transition: false,
                    Teleport: true,
                    ActionIconButton: {
                        props: ['ariaLabel'],
                        template:
                            '<button data-test="close-btn" :aria-label="ariaLabel" @click="$emit(\'click\')" />',
                    },
                },
            },
            slots: {
                default: '<div data-test="content">Content</div>',
            },
        })
    }

    it('renders drawer when modelValue is true', () => {
        const wrapper = factory()

        expect(wrapper.find('aside').exists()).toBe(true)
        expect(wrapper.find('[data-test="content"]').exists()).toBe(true)
    })

    it('does not render drawer when modelValue is false', () => {
        const wrapper = factory({ modelValue: false })

        expect(wrapper.find('aside').exists()).toBe(false)
    })

    it('renders overlay when open and hasOverlay is true', () => {
        const wrapper = factory()

        expect(wrapper.find('.bg-background-overlay').exists()).toBe(true)
    })

    it('does not render overlay when hasOverlay is false', () => {
        const wrapper = factory({ hasOverlay: false })

        expect(wrapper.find('.bg-background-overlay').exists()).toBe(false)
    })

    it('emits update:modelValue false when overlay clicked and closeOnOverlayClick is true', async () => {
        const wrapper = factory()

        await wrapper.find('.bg-background-overlay').trigger('click')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('does not emit when overlay clicked and closeOnOverlayClick is false', async () => {
        const wrapper = factory({ closeOnOverlayClick: false })

        await wrapper.find('.bg-background-overlay').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('emits update:modelValue false when close button clicked', async () => {
        const wrapper = factory()

        await wrapper.find('[data-test="close-btn"]').trigger('click')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('does not render close button when hasCloseButton is false', () => {
        const wrapper = factory({ hasCloseButton: false })

        expect(wrapper.find('[data-test="close-btn"]').exists()).toBe(false)
    })

    it('renders title with correct heading tag and titleClass', () => {
        const wrapper = factory({
            title: 'My Drawer',
            titleHeadingTag: 'h3',
            titleClass: 'custom-title',
        })

        const heading = wrapper.find('h3')

        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('My Drawer')
        expect(heading.classes()).toContain('custom-title')
    })

    it('does not render header when hasHeader is false', () => {
        const wrapper = factory({ hasHeader: false })

        expect(wrapper.find('h2, h3, h4, h5, h6').exists()).toBe(false)
    })

    it('applies headerClass when provided', () => {
        const wrapper = factory({ headerClass: 'custom-header' })

        expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('applies drawerContentClass when provided', () => {
        const wrapper = factory({ drawerContentClass: 'custom-content' })

        expect(wrapper.find('.custom-content').exists()).toBe(true)
    })

    it('applies correct position classes for RIGHT direction', () => {
        const wrapper = factory({ direction: Direction.RIGHT })

        const classes = wrapper.find('aside').classes()

        expect(classes).toContain('right-0')
        expect(classes).toContain('top-0')
        expect(classes).toContain('h-full')
    })

    it('applies correct position classes for LEFT direction', () => {
        const wrapper = factory({ direction: Direction.LEFT })

        expect(wrapper.find('aside').classes()).toContain('left-0')
    })

    it('applies correct position classes for TOP direction', () => {
        const wrapper = factory({ direction: Direction.TOP })

        const classes = wrapper.find('aside').classes()

        expect(classes).toContain('top-0')
        expect(classes).toContain('w-full')
    })

    it('applies maxWidth style for horizontal directions', () => {
        const wrapper = factory({
            direction: Direction.RIGHT,
            maxSize: 500,
        })

        const aside = wrapper.find('aside').element as HTMLElement

        expect(aside.style.maxWidth).toBe('500px')
    })

    it('applies maxHeight style for vertical directions', () => {
        const wrapper = factory({
            direction: Direction.TOP,
            maxSize: 400,
        })

        const aside = wrapper.find('aside').element as HTMLElement

        expect(aside.style.maxHeight).toBe('400px')
    })

    it('applies correct border class per direction', () => {
        expect(factory({ direction: Direction.RIGHT }).find('aside').classes()).toContain('border-l')
        expect(factory({ direction: Direction.LEFT }).find('aside').classes()).toContain('border-r')
        expect(factory({ direction: Direction.TOP }).find('aside').classes()).toContain('border-b')
        expect(factory({ direction: Direction.BOTTOM }).find('aside').classes()).toContain('border-t')
    })

    it('does not apply border classes when hasBorder is false', () => {
        const wrapper = factory({
            direction: Direction.RIGHT,
            hasBorder: false,
        })

        const classes = wrapper.find('aside').classes()

        expect(classes).not.toContain('border-l')
        expect(classes).not.toContain('border-r')
        expect(classes).not.toContain('border-t')
        expect(classes).not.toContain('border-b')
    })

    it('uses default closeAriaLabel on close button', () => {
        const wrapper = factory()
        const btn = wrapper.find('[data-test="close-btn"]')
        expect(btn.attributes('aria-label')).toBe('Close')
    })

    it('forwards custom closeAriaLabel to close button', () => {
        const wrapper = factory({ closeAriaLabel: 'Cerrar' })
        const btn = wrapper.find('[data-test="close-btn"]')
        expect(btn.attributes('aria-label')).toBe('Cerrar')
    })

    it('applies custom drawerClass and overlayClass', () => {
        const wrapper = factory({
            drawerClass: 'custom-drawer',
            overlayClass: 'custom-overlay',
        })

        expect(wrapper.find('aside').classes()).toContain('custom-drawer')
        expect(wrapper.find('.bg-background-overlay').classes()).toContain('custom-overlay')
    })

    it('closes drawer when Escape key is pressed', async () => {
        const wrapper = factory({ modelValue: false })

        await wrapper.setProps({ modelValue: true })

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('adds Escape listener when modelValue becomes true', async () => {
        const addSpy = vi.spyOn(globalThis, 'addEventListener')

        const wrapper = factory({ modelValue: false })

        await wrapper.setProps({ modelValue: true })

        expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })

    it('removes Escape listener when modelValue becomes false', async () => {
        const removeSpy = vi.spyOn(globalThis, 'removeEventListener')

        const wrapper = factory({ modelValue: true })

        await wrapper.setProps({ modelValue: false })

        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })

    it('removes Escape listener on unmount', () => {
        const removeSpy = vi.spyOn(globalThis, 'removeEventListener')

        const wrapper = factory()

        wrapper.unmount()

        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })
})