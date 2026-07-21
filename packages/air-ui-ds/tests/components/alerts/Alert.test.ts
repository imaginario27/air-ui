import { mount } from '@vue/test-utils'
import Alert from '@/components/alerts/Alert.vue'
import AlertButton from '@/components/buttons/AlertButton.vue'
import AlertIconButton from '@/components/buttons/AlertIconButton.vue'
import Icon from '@/components/icons/Icon.vue'
import { AlertType } from '@/models/enums/alerts' 
import { ButtonActionType } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

const defaultProps = {
    title: 'Test Title',
    description: 'This is a test description',
    type: AlertType.SUCCESS,
    hasActionButtons: true,
    buttons: [
        {
            text: 'OK',
            actionType: ButtonActionType.ACTION,
            icon: 'mdi:check',
            iconPosition: IconPosition.LEFT,
            disabled: false,
            to: '',
            isExternal: false
        }
    ]
}

describe('Alert.vue', () => {
    it('renders with description', () => {
        const wrapper = mount(Alert, {
            props: defaultProps
        })

        expect(wrapper.text()).toContain(defaultProps.title)
        expect(wrapper.text()).toContain(defaultProps.description)
        expect(wrapper.findComponent(Icon).exists()).toBe(true)
        expect(wrapper.findComponent(AlertButton).exists()).toBe(true)
    })

    it('renders without description', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'No Description',
                description: '',
                buttons: defaultProps.buttons
            }
        })

        expect(wrapper.text()).toContain('No Description')
        expect(wrapper.find('p').exists()).toBe(false)
        expect(wrapper.findComponent(Icon).exists()).toBe(true)
    })

    it('renders description slot content instead of the description prop when both are provided', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Slot Test',
                description: 'Prop description'
            },
            slots: {
                description: '<span class="custom-desc">Slot description</span>'
            }
        })

        expect(wrapper.find('.custom-desc').exists()).toBe(true)
        expect(wrapper.text()).not.toContain('Prop description')
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders the with-description layout when only the description slot is provided', () => {
        const wrapper = mount(Alert, {
            props: { title: 'Slot Only' },
            slots: {
                description: '<span class="custom-desc">Slot description</span>'
            }
        })

        expect(wrapper.find('.custom-desc').exists()).toBe(true)
        expect(wrapper.classes()).toContain('p-4')
        expect(wrapper.classes()).not.toContain('px-4')
    })

    it('uses compact padding when neither description prop nor description slot is provided', () => {
        const wrapper = mount(Alert, {
            props: { title: 'No Description' }
        })

        expect(wrapper.classes()).toContain('px-4')
        expect(wrapper.classes()).toContain('py-2')
    })

    it('uses full padding when the description prop is provided', () => {
        const wrapper = mount(Alert, {
            props: { title: 'With Description', description: 'Some description' }
        })

        expect(wrapper.classes()).toContain('p-4')
    })

    it('does not render buttons if buttons prop is empty', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'No Buttons',
                description: 'Some description',
                hasActionButtons: true,
                buttons: []
            }
        })

        expect(wrapper.findComponent(AlertButton).exists()).toBe(false)
    })

    it('does not render buttons when hasActionButtons is false and there is a description', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'With Description',
                description: 'Some description',
                buttons: defaultProps.buttons
            }
        })

        expect(wrapper.findComponent(AlertButton).exists()).toBe(false)
    })

    it('does not render buttons when hasActionButtons is false and there is no description', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'No Description',
                description: '',
                buttons: defaultProps.buttons
            }
        })

        expect(wrapper.findComponent(AlertButton).exists()).toBe(false)
    })

    it('renders buttons when hasActionButtons is true and there is no description', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'No Description',
                description: '',
                hasActionButtons: true,
                buttons: defaultProps.buttons
            }
        })

        expect(wrapper.findComponent(AlertButton).exists()).toBe(true)
    })

    it('renders close button when hasCloseButton is true', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'With Close',
                description: '',
                hasCloseButton: true
            }
        })

        expect(wrapper.findComponent(AlertIconButton).exists()).toBe(true)
    })

    it('does not render close button when hasCloseButton is false', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Without Close',
                description: '',
                hasCloseButton: false
            }
        })

        expect(wrapper.findComponent(AlertIconButton).exists()).toBe(false)
    })

    it('renders close button when hasCloseButton is true and description is provided', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'With Close',
                description: 'Some description',
                hasCloseButton: true
            }
        })

        expect(wrapper.findComponent(AlertIconButton).exists()).toBe(true)
    })

    it('does not render close button when hasCloseButton is false and description is provided', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Without Close',
                description: 'Some description',
                hasCloseButton: false
            }
        })

        expect(wrapper.findComponent(AlertIconButton).exists()).toBe(false)
    })

    it('emits close event when close button is clicked', async () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Emit Close',
                description: '',
                hasCloseButton: true
            }
        })

        const closeBtn = wrapper.findComponent(AlertIconButton)
        await closeBtn.trigger('click')

        expect(wrapper.emitted('close')).toBeTruthy()
        expect(wrapper.emitted('close')?.length).toBe(1)
    })

    it('emits close event when close button is clicked with a description', async () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Emit Close',
                description: 'Some description',
                hasCloseButton: true
            }
        })

        const closeBtn = wrapper.findComponent(AlertIconButton)
        await closeBtn.trigger('click')

        expect(wrapper.emitted('close')).toBeTruthy()
        expect(wrapper.emitted('close')?.length).toBe(1)
    })

    it.each([
        [AlertType.WARNING, 'mdi:alert-outline'],
        [AlertType.DANGER, 'mdi:close-octagon-outline'],
        [AlertType.SUCCESS, 'mdi:check-circle-outline'],
        [AlertType.INFO, 'mdi:information-outline']
    ])('renders correct icon for alert type %s', (type, expectedIcon) => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Icon Test',
                description: 'Test',
                type
            }
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.props('name')).toBe(expectedIcon)
    })

    it('has role="alert" for screen reader announcement', () => {
        const wrapper = mount(Alert, {
            props: { title: 'A11y Test' }
        })

        expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    })
})
