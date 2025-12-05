import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ModalDialog from '@/components/modals/ModalDialog.vue'

const factory = (props?: Partial<InstanceType<typeof ModalDialog>['$props']>, slots?: { default?: string }) => {
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
                    template: '<button @click="$emit(\'click\')">X</button>'
                }
            }
        }
    })
}

describe('ModalDialog', () => {
    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('renders content when modelValue is true', () => {
        factory()
        expect(document.body.innerHTML).toContain('Modal content')
    })

    it('does not render content when modelValue is false', () => {
        const wrapper = factory({ modelValue: false })
        expect(wrapper.html()).not.toContain('Modal content')
    })

    it('applies custom cardClasses and id', () => {
        factory({
            cardClasses: 'custom-card',
            id: 'my-modal'
        })

        const modal = document.querySelector('#my-modal')
        expect(modal).not.toBeNull()
        expect(modal!.querySelector('.custom-card')).not.toBeNull()
    })

    it('emits update:modelValue and close when close button clicked', async () => {
        const wrapper = factory({ hasCornerCloseButton: true, closeOnClickOutside: true })

        const button = document.querySelector('button')
        expect(button).not.toBeNull()

        await button!.dispatchEvent(new Event('click'))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('emits update:modelValue and close on overlay click when closeOnClickOutside is true', async () => {
        const wrapper = factory({ closeOnClickOutside: true })

        const overlay = document.querySelector('.modal-container')
        expect(overlay).not.toBeNull()

        await overlay!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not emit close events on overlay click when closeOnClickOutside is false', async () => {
        const wrapper = factory({ closeOnClickOutside: false })

        const overlay = document.querySelector('.bg-background-overlay')
        expect(overlay).not.toBeNull()

        await overlay!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
        expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('emits update:modelValue and close on Escape key when closeOnClickOutside is true', async () => {
        const wrapper = factory({ closeOnClickOutside: true, modelValue: false })

        // Manually update modelValue to trigger the watcher
        await wrapper.setProps({ modelValue: true })
        await nextTick()

        // Dispatch Escape key event
        const event = new KeyboardEvent('keydown', { key: 'Escape' })
        window.dispatchEvent(event)
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })


    it('does not emit close events on Escape key when closeOnClickOutside is false', async () => {
        const wrapper = factory({ closeOnClickOutside: false })

        await nextTick()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
        expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('does not render close button when hasCornerCloseButton is false', () => {
        factory({ hasCornerCloseButton: false })

        const button = document.querySelector('button')
        expect(button).toBeNull()
    })
})
