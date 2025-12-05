import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SuccessModalDialog from '@/components/modals/SuccessModalDialog.vue'
import ActionButton from '@/components/buttons/ActionButton.vue'
import ModalDialog from '@/components/modals/ModalDialog.vue'
import ModalContent from '@/components/modals/ModalContent.vue'
import ModalHeaderGroup from '@/components/modals/ModalHeaderGroup.vue'
import ModalTitle from '@/components/modals/ModalTitle.vue'
import ModalDescription from '@/components/modals/ModalDescription.vue'
import ModalActions from '@/components/modals/ModalActions.vue'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'

const factory = (
    props?: Partial<InstanceType<typeof SuccessModalDialog>['$props']>,
    slots?: Record<string, any>
) => {
    return mount(SuccessModalDialog, {
        props: {
            modelValue: true,
            ...props
        },
        slots,
        global: {
            components: {
                ActionButton,
                ModalDialog,
                ModalContent,
                ModalHeaderGroup,
                ModalTitle,
                ModalDescription,
                ModalActions,
                ContainedIcon
            }
        },
        attachTo: document.body
    })
}

describe('SuccessModalDialog.vue', () => {
    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('renders default title and button text when no props are provided', async () => {
        factory()
        await nextTick()

        expect(document.body.textContent).toContain('Modal title')
        expect(document.body.textContent).toContain('Close')
    })

    it('does not render description if not provided', async () => {
        const wrapper = factory()
        await nextTick()

        const description = wrapper.findComponent(ModalDescription)
        expect(description.exists()).toBe(false)
    })

    it('renders provided title, description, and button text', async () => {
        factory({
            title: 'Success!',
            description: 'Your submission was successful.',
            buttonText: 'Done'
        })
        await nextTick()

        expect(document.body.textContent).toContain('Success!')
        expect(document.body.textContent).toContain('Your submission was successful.')
        expect(document.body.textContent).toContain('Done')
    })

    it('emits "update:modelValue" and "close" when ActionButton is clicked', async () => {
        const wrapper = factory()
        await nextTick()

        const button = wrapper.findComponent(ActionButton)
        await button.trigger('click')
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not render slot content when default slot is not provided', async () => {
        const wrapper = factory()
        await nextTick()

        expect(wrapper.find('.slot-content').exists()).toBe(false)
    })

    it('passes icon prop to ContainedIcon', async () => {
        const wrapper = factory({ icon: 'mdiRocketLaunch' })
        await nextTick()

        const icon = wrapper.findComponent(ContainedIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiRocketLaunch')
    })

    it('renders ContainedIcon with default icon when icon prop is not passed', async () => {
        const wrapper = factory({ icon: undefined })
        await nextTick()

        const icon = wrapper.findComponent(ContainedIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiCheckBold') // default value
    })

    it('passes modal-related props to ModalDialog', async () => {
        const wrapper = factory({
            closeOnClickOutside: true,
            hasCornerCloseButton: true,
            cardClasses: 'custom-class'
        })
        await nextTick()

        const modalDialog = wrapper.findComponent(ModalDialog)
        expect(modalDialog.props('closeOnClickOutside')).toBe(true)
        expect(modalDialog.props('hasCornerCloseButton')).toBe(true)
        expect(modalDialog.props('cardClasses')).toBe('custom-class')
    })

    it('does not render ModalActions when showModalActions is false', async () => {
        const wrapper = factory({ showModalActions: false })
        await nextTick()

        const actions = wrapper.findComponent(ModalActions)
        expect(actions.exists()).toBe(false)
    })

    it('does not render modal when modelValue is false', async () => {
        const wrapper = factory({ modelValue: false })
        await nextTick()

        const modalDialog = wrapper.findComponent(ModalDialog)
        expect(modalDialog.props('modelValue')).toBe(false)
    })
})
