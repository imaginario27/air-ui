import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import InfoModalDialog from '@/components/modals/InfoModalDialog.vue'
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
    props?: Partial<InstanceType<typeof InfoModalDialog>['$props']>,
    slots?: Record<string, any>
) => {
    return mount(InfoModalDialog, {
        props: {
            modelValue: true,
            buttonActionText: 'Submit',
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

describe('InfoModalDialog.vue', () => {
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
            title: 'Heads up!',
            description: 'Please confirm your information.'
        })
        await nextTick()

        expect(document.body.textContent).toContain('Heads up!')
        expect(document.body.textContent).toContain('Please confirm your information.')
    })

    it('renders both buttons with correct text', async () => {
        factory({
            buttonCloseText: 'Close',
            buttonActionText: 'Submit'
        })
        await nextTick()

        const buttons = document.querySelectorAll('button')
        expect(buttons[0]?.textContent).toBe('Close')
        expect(buttons[1]?.textContent).toBe('Submit')
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
        const wrapper = factory({ icon: 'mdi:information' })
        await nextTick()

        const icon = wrapper.findComponent(ContainedIcon)
        expect(icon.props('icon')).toBe('mdi:information')
        expect(icon.props('color')).toBe('info')
    })

    it('passes props to action buttons correctly', async () => {
        const wrapper = factory({
            buttonCloseText: 'Dismiss',
            buttonActionText: 'Continue',
            buttonActionIcon: 'mdi:arrow-right',
            isLoading: true,
            loadingText: 'Processing...'
        })
        await nextTick()

        const buttons = wrapper.findAllComponents(ActionButton)
        expect(buttons[0]?.props('text')).toBe('Dismiss')
        expect(buttons[1]?.props('text')).toBe('Continue')
        expect(buttons[1]?.props('icon')).toBe('mdi:arrow-right')
        expect(buttons[1]?.props('isLoading')).toBe(true)
        expect(buttons[1]?.props('loadingText')).toBe('Processing...')
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
