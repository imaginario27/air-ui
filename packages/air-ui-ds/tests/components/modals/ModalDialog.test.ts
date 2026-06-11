import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ModalDialog from '@/components/modals/ModalDialog.vue'

const factory = (
    props?: Partial<InstanceType<typeof ModalDialog>['$props']>,
    slots?: { default?: string }
) => {
    return mount(ModalDialog, {
        props: {
            modelValue: true,
            ...props
        },
        slots: {
            default: slots?.default ?? '<p>Modal content</p>'
        },
        attachTo: document.body,
        global: {
            stubs: {
                ActionIconButton: {
                    props: ['ariaLabel'],
                    template: '<button data-test="close-btn" :aria-label="ariaLabel" @click="$emit(\'click\')" />'
                }
            }
        }
    })
}

describe('ModalDialog', () => {
    afterEach(() => {
        document.body.innerHTML = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        document.body.className = ''
        vi.restoreAllMocks()
    })

    it('renders slot content when modelValue is true', () => {
        factory()
        expect(document.body.innerHTML).toContain('Modal content')
    })

    it('does not render overlay when modelValue is false', () => {
        factory({ modelValue: false })
        expect(document.querySelector('.bg-background-overlay')).toBeNull()
    })

    it('applies id and custom classes correctly', () => {
        factory({
            id: 'my-modal',
            overlayClass: 'custom-overlay',
            containerClass: 'custom-container',
            cardClass: 'custom-card'
        })

        const overlay = document.querySelector('#my-modal')
        expect(overlay).not.toBeNull()
        expect(overlay?.classList.contains('custom-overlay')).toBe(true)

        const container = document.querySelector('.modal-container')
        expect(container?.classList.contains('custom-container')).toBe(true)

        expect(document.querySelector('.custom-card')).not.toBeNull()
    })

    it('emits close events when close button is clicked', async () => {
        const wrapper = factory({ hasCornerCloseButton: true })

        const button = document.querySelector('[data-test="close-btn"]')
        expect(button).not.toBeNull()

        button!.dispatchEvent(new Event('click'))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('closes when clicking container itself and closeOnClickOutside is true', async () => {
        const wrapper = factory({ closeOnClickOutside: true })

        const container = document.querySelector('.modal-container')
        container!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not close when clicking inside modal card content', async () => {
        const wrapper = factory({ closeOnClickOutside: true })

        const card = document.querySelector('.bg-background-surface')
        card!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
        expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('does not close on container click when closeOnClickOutside is false', async () => {
        const wrapper = factory({ closeOnClickOutside: false })

        const container = document.querySelector('.modal-container')
        container!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
        expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('closes on Escape key when enabled', async () => {
        const wrapper = factory({
            closeOnClickOutside: true,
            modelValue: false
        })

        // Trigger watcher to register ESC listener
        await wrapper.setProps({ modelValue: true })
        await nextTick()

        globalThis.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('adds and removes Escape listener when modelValue changes', async () => {
        const addSpy = vi.spyOn(globalThis, 'addEventListener')
        const removeSpy = vi.spyOn(globalThis, 'removeEventListener')

        const wrapper = factory({ modelValue: false })

        await wrapper.setProps({ modelValue: true })
        expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

        await wrapper.setProps({ modelValue: false })
        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })

    it('removes Escape listener on unmount', () => {
        const removeSpy = vi.spyOn(globalThis, 'removeEventListener')

        const wrapper = factory()
        wrapper.unmount()

        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })

    it('locks body scroll while open and restores it when closed', async () => {
        const wrapper = factory({ modelValue: false })

        await wrapper.setProps({ modelValue: true })
        await nextTick()

        expect(document.body.style.overflow).toBe('hidden')

        await wrapper.setProps({ modelValue: false })
        await nextTick()

        expect(document.body.style.overflow).toBe('')
    })

    it('adds gutter compensation when scrollbar-gutter is not stable', async () => {
        const wrapper = factory({ modelValue: false })

        document.body.style.paddingRight = '8px'
        vi.spyOn(document.documentElement, 'clientWidth', 'get')
            .mockReturnValueOnce(1180)
            .mockReturnValueOnce(1200)

        await wrapper.setProps({ modelValue: true })
        await nextTick()

        expect(document.body.style.paddingRight).toBe('28px')

        await wrapper.setProps({ modelValue: false })
        await nextTick()

        expect(document.body.style.paddingRight).toBe('8px')
    })

    it('does not add gutter compensation when locking keeps viewport width stable', async () => {
        const wrapper = factory({ modelValue: false })

        document.body.style.paddingRight = '8px'
        vi.spyOn(document.documentElement, 'clientWidth', 'get')
            .mockReturnValueOnce(1180)
            .mockReturnValueOnce(1180)

        await wrapper.setProps({ modelValue: true })
        await nextTick()

        expect(document.body.style.paddingRight).toBe('8px')
    })

    it('does not render close button when hasCornerCloseButton is false', () => {
        factory({ hasCornerCloseButton: false })
        expect(document.querySelector('[data-test="close-btn"]')).toBeNull()
    })

    it('has role="dialog" and aria-modal="true"', async () => {
        factory()
        await nextTick()

        const dialog = document.querySelector('[role="dialog"]')
        expect(dialog).not.toBeNull()
        expect(dialog?.getAttribute('aria-modal')).toBe('true')
    })

    it('applies aria-labelledby when provided', async () => {
        factory({ ariaLabelledby: 'modal-title' })
        await nextTick()

        const dialog = document.querySelector('[role="dialog"]')
        expect(dialog?.getAttribute('aria-labelledby')).toBe('modal-title')
    })

    it('uses default closeAriaLabel on close button', async () => {
        factory()
        await nextTick()

        const btn = document.querySelector('[data-test="close-btn"]')
        expect(btn?.getAttribute('aria-label')).toBe('Close')
    })

    it('forwards custom closeAriaLabel to close button', async () => {
        factory({ closeAriaLabel: 'Cerrar' })
        await nextTick()

        const btn = document.querySelector('[data-test="close-btn"]')
        expect(btn?.getAttribute('aria-label')).toBe('Cerrar')
    })
})