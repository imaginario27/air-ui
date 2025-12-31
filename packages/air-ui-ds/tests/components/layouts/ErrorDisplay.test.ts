import { mount } from '@vue/test-utils'
import ErrorDisplay from '~/components/layouts/ErrorDisplay.vue'
import ContainedIcon from '~/components/icons/ContainedIcon.vue'
import ActionButton from '~/components/buttons/ActionButton.vue'
import { nextTick } from 'vue'

type MountOptions = {
    props?: Record<string, unknown>
    slots?: Record<string, any>
}

const factory = ({ props = {}, slots = {} }: MountOptions = {}) => {
    return mount(ErrorDisplay, {
        props: {
            statusCode: 404,
            ...props
        },
        slots,
        global: {
            components: {
                ContainedIcon,
                ActionButton
            }
        }
    })
}

describe('ErrorDisplay.vue', () => {
    it('renders default error layout with default props', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Page not found')
        expect(wrapper.text()).toContain('404')
        expect(wrapper.find('p').text()).toContain('The page you are looking for does not exist or may have been moved.')
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(true)
        expect(wrapper.findComponent(ActionButton).exists()).toBe(true)
    })

    it('does not render icon if showIcon is false', () => {
        const wrapper = factory({
            props: { showIcon: false }
        })

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
    })

    it('does not render error code if showErrorCode is false', () => {
        const wrapper = factory({
            props: { showErrorCode: false }
        })

        expect(wrapper.text()).not.toContain('404')
    })

    it('uses fallback error mapping if statusCode is unknown', () => {
        const wrapper = factory({
            props: { statusCode: 9999 }
        })

        expect(wrapper.text()).toContain('Unexpected error')
        expect(wrapper.text()).toContain('An unknown error occurred. Please try again.')
    })

    it('renders custom error mapping if provided', () => {
        const wrapper = factory({
            props: {
                statusCode: 401,
                errorMappings: [
                    {
                        statusCode: 401,
                        title: 'Custom Unauthorized',
                        message: 'Custom unauthorized message'
                    }
                ]
            }
        })

        expect(wrapper.text()).toContain('Custom Unauthorized')
        expect(wrapper.text()).toContain('Custom unauthorized message')
    })

    it('renders all slot areas', () => {
        const wrapper = factory({
            slots: {
                'visual-left': '<div id="left-visual">Left Visual</div>',
                'visual-top': '<div id="top-visual">Top Visual</div>',
                'description': '<p id="custom-description">Custom description</p>',
                'actions': '<button id="custom-action">Custom Action</button>',
                'visual-right': '<div id="right-visual">Right Visual</div>'
            }
        })

        expect(wrapper.find('#left-visual').exists()).toBe(true)
        expect(wrapper.find('#top-visual').exists()).toBe(true)
        expect(wrapper.find('#custom-description').exists()).toBe(true)
        expect(wrapper.find('#custom-action').exists()).toBe(true)
        expect(wrapper.find('#right-visual').exists()).toBe(true)
    })

    it('hides default icon and action button when slots are provided', () => {
        const wrapper = factory({
            slots: {
                'visual-top': '<div>Top Slot</div>',
                'actions': '<div>Actions Slot</div>'
            }
        })

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
    })

    it('updates document title based on resolved error mapping', async () => {
        factory()
        await nextTick()

        expect(document.title).toContain('Page not found')
    })

    it('does not set document title when setPageTitle is false', async () => {
        const originalTitle = 'Original Title'
        document.title = originalTitle

        factory({
            props: {
                statusCode: 403,
                setPageTitle: false
            }
        })

        await nextTick()

        expect(document.title).toBe(originalTitle)
    })
})
