import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import DangerModalDialog from '@/components/modals/DangerModalDialog.vue'
import ModalDialog from '@/components/modals/ModalDialog.vue'
import ModalContent from '@/components/modals/ModalContent.vue'
import ModalHeaderGroup from '@/components/modals/ModalHeaderGroup.vue'
import ModalTitle from '@/components/modals/ModalTitle.vue'
import ModalDescription from '@/components/modals/ModalDescription.vue'
import ModalActions from '@/components/modals/ModalActions.vue'
import ActionButton from '@/components/buttons/ActionButton.vue'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'
import { Orientation } from '@/models/enums/orientations'

const factory = (
    props?: Partial<InstanceType<typeof DangerModalDialog>['$props']>,
    slots?: Record<string, any>
) => {
    return mount(DangerModalDialog, {
        props: {
            modelValue: true,
            buttonActionText: 'Delete',
            ...props
        },
        slots,
        global: {
            components: {
                ModalDialog,
                ModalContent,
                ModalHeaderGroup,
                ModalTitle,
                ModalDescription,
                ModalActions,
                ActionButton,
                ContainedIcon
            }
        },
        attachTo: document.body
    })
}

describe('DangerModalDialog.vue', () => {
    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('renders default title and no description', async () => {
        const wrapper = factory()
        await nextTick()

        expect(document.body.textContent).toContain('Modal title')
        expect(wrapper.findComponent(ModalDescription).exists()).toBe(false)
    })

    it('renders custom title and description', async () => {
        factory({
            title: 'Warning!',
            description: 'This cannot be undone.'
        })
        await nextTick()

        expect(document.body.textContent).toContain('Warning!')
        expect(document.body.textContent).toContain('This cannot be undone.')
    })

    it('renders both buttons with correct text', async () => {
        factory({
            buttonCloseText: 'Cancel',
            buttonActionText: 'Delete forever'
        })
        await nextTick()

        const buttons = document.querySelectorAll('button')
        expect(buttons[0]?.textContent).toBe('Cancel')
        expect(buttons[1]?.textContent).toBe('Delete forever')
    })

    it('emits update:modelValue and close when close button is clicked', async () => {
        const wrapper = factory()
        await nextTick()

        const buttons = wrapper.findAllComponents(ActionButton)
        await buttons[0]?.trigger('click')
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('emits action and update:modelValue when action button is clicked', async () => {
        const wrapper = factory()
        await nextTick()

        const buttons = wrapper.findAllComponents(ActionButton)
        await buttons[1]?.trigger('click')
        await nextTick()

        expect(wrapper.emitted('action')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    })

    it('renders vertically when orientation is VERTICAL', async () => {
        const wrapper = factory({ orientation: Orientation.VERTICAL })
        await nextTick()

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(true)
        expect(wrapper.html()).not.toContain('sm:flex-row')
    })

    it('renders horizontally when orientation is HORIZONTAL', async () => {
        const wrapper = factory({ orientation: Orientation.HORIZONTAL })
        await nextTick()

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(true)
        expect(document.body.innerHTML).toContain('sm:flex-row')
    })

    it('passes props to ModalDialog correctly', async () => {
        const wrapper = factory({
            closeOnClickOutside: true,
            hasCornerCloseButton: true,
            cardClasses: 'custom-card'
        })
        await nextTick()

        const modal = wrapper.findComponent(ModalDialog)
        expect(modal.props('closeOnClickOutside')).toBe(true)
        expect(modal.props('hasCornerCloseButton')).toBe(true)
        expect(modal.props('cardClasses')).toBe('custom-card')
    })

    it('passes props to ContainedIcon correctly', async () => {
        const wrapper = factory({ icon: 'mdi:bug' })
        await nextTick()

        const icon = wrapper.findComponent(ContainedIcon)
        expect(icon.props('icon')).toBe('mdi:bug')
        expect(icon.props('color')).toBe('danger')
    })

    it('uses default icon when icon prop is not provided', async () => {
        const wrapper = factory({ icon: undefined })
        await nextTick()

        const icon = wrapper.findComponent(ContainedIcon)
        expect(icon.props('icon')).toBe('mdi:alert-outline')
    })

    it('passes props to action buttons correctly', async () => {
        const wrapper = factory({
            buttonCloseText: 'Abort',
            buttonActionText: 'Remove',
            buttonActionIcon: 'mdi:trash-can',
            isLoading: true,
            loadingText: 'Deleting...'
        })
        await nextTick()

        const buttons = wrapper.findAllComponents(ActionButton)
        expect(buttons[0]?.props('text')).toBe('Abort')
        expect(buttons[1]?.props('text')).toBe('Remove')
        expect(buttons[1]?.props('icon')).toBe('mdi:trash-can')
        expect(buttons[1]?.props('isLoading')).toBe(true)
        expect(buttons[1]?.props('loadingText')).toBe('Deleting...')
    })

    it('does not render ModalActions when showModalActions is false', async () => {
        const wrapper = factory({ showModalActions: false })
        await nextTick()

        expect(wrapper.findComponent(ModalActions).exists()).toBe(false)
    })

    it('does not render when modelValue is false', async () => {
        const wrapper = factory({ modelValue: false })
        await nextTick()

        expect(wrapper.findComponent(ModalDialog).props('modelValue')).toBe(false)
    })
})
