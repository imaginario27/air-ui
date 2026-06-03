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

    it('does not render buttons if buttons prop is empty', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'No Buttons',
                description: 'Some description',
                buttons: []
            }
        })

        expect(wrapper.findComponent(AlertButton).exists()).toBe(false)
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
