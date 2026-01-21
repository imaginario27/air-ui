import { mount, flushPromises } from '@vue/test-utils'
import LoadingScreen from '@/components/loaders/LoadingScreen.vue'
import Loading from '@/components/loaders/Loading.vue'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'
import ActionButton from '@/components/buttons/ActionButton.vue'

vi.useFakeTimers()

const factory = (props = {}, slots = {}) => {
    return mount(LoadingScreen, {
        props,
        slots,
        global: {
            stubs: {
                Loading,
                ContainedIcon,
                ActionButton,
                Icon: {
                    name: 'Icon',
                    props: ['name', 'iconClass', 'mode'],
                    template: '<i class="stub-icon" />'
                }
            },
        },
    })
}

describe('LoadingScreen.vue', () => {
    it('renders loading state with default text', () => {
        const wrapper = factory({ isLoading: true })

        const loading = wrapper.findComponent(Loading)
        expect(loading.exists()).toBe(true)
        expect(loading.props('text')).toBe('Loading')
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
    })

    it('renders loading with custom loading text', () => {
        const wrapper = factory({ isLoading: true, loadingText: 'Please wait...' })
        const loading = wrapper.findComponent(Loading)
        expect(loading.props('text')).toBe('Please wait...')
    })

    it('renders error state with title and helpText', () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Network error',
            title: 'Something broke',
            helpText: 'Try again later',
        })

        expect(wrapper.findComponent(Loading).exists()).toBe(false)
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(true)
        expect(wrapper.findComponent(ActionButton).exists()).toBe(true)
        expect(wrapper.text()).toContain('Network error')
        expect(wrapper.text()).toContain('Something broke')
        expect(wrapper.text()).toContain('Try again later')
    })

    it('uses default props when not provided', () => {
        const wrapper = factory()

        expect(wrapper.props()).toMatchObject({
            isLoading: true,
            loadingText: 'Loading',
            error: null,
            title: 'Oops! Something went wrong!',
            helpText: 'Please try again or report the error to us. Thank you!',
            goBackText: 'Go back',
            goBackLink: '/',
            goBackIcon: 'mdi:keyboard-backspace',
            isFullScreen: true,
            containerClass: 'py-20',
        })
    })

    it('does not render anything when not loading and no error', () => {
        const wrapper = factory({ isLoading: false, error: null })
        expect(wrapper.findAll('*').length).toBe(0)
    })

    it('applies custom containerClass and handles isFullScreen correctly', () => {
        const wrapper = factory({ isLoading: true, containerClass: 'custom-class', isFullScreen: false })
        const container = wrapper.find('div')
        expect(container.classes()).toContain('custom-class')
        expect(container.classes()).not.toContain('h-screen')
    })

    it('applies isFullScreen classes in error state', () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Something went wrong',
            isFullScreen: true,
        })
        const container = wrapper.find('div')
        expect(container.classes()).toContain('py-[10vw]')
    })

    it('passes correct props to go back button', () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Something went wrong',
            goBackText: 'Return Home',
            goBackLink: '/home',
            goBackIcon: 'mdi:home-outline',
        })

        const button = wrapper.findComponent(ActionButton)
        expect(button.props('text')).toBe('Return Home')
        expect(button.props('to')).toBe('/home')
        expect(button.props('icon')).toBe('mdi:home-outline')
    })

    it('emits retry event on retry button click', async () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Error',
            hasRetryButton: true,
            hasGoBackButton: false,
            maxRetryCycles: 5,
        })

        const retryButton = wrapper.findComponent(ActionButton)
        await retryButton.trigger('click')

        vi.advanceTimersByTime(500)
        await flushPromises()
        expect(wrapper.emitted('retry')).toBeTruthy()
    })

    it('disables retry button after reaching maxRetries and shows cooldown text', async () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Error',
            hasRetryButton: true,
            hasGoBackButton: false,
            maxRetries: 2,
            cooldownSeconds: 3,
            maxRetryCycles: 5,
        })

        const clickRetry = async () => {
            const button = wrapper.findComponent(ActionButton)
            await button.trigger('click')

            // Wait for debounce
            vi.advanceTimersByTime(500)
            await flushPromises()

            // Wait for temporarilyDisabled to clear (1000ms)
            vi.advanceTimersByTime(1000)
            await flushPromises()
        }

        // First retry
        await clickRetry()

        // Second retry (after 1500ms total)
        await clickRetry()

        const emits = wrapper.emitted('retry') ?? []
        expect(emits.length).toBe(2)

        // After maxRetries, should show cooldown message
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch(/Retry in \d+s/)
    })

    it('locks retry after reaching maxRetryCycles', async () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Error',
            hasRetryButton: true,
            hasGoBackButton: false,
            maxRetries: 1,
            maxRetryCycles: 1,
            cooldownSeconds: 1,
        })

        const clickRetry = async () => {
            const button = wrapper.findComponent(ActionButton)
            if (button.exists()) {
                await button.trigger('click')
                vi.advanceTimersByTime(500)
                await flushPromises()
            }
        }

        await clickRetry() // triggers cooldown
        vi.advanceTimersByTime(1000)
        await flushPromises()

        await clickRetry() // should now be locked

        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
        expect(wrapper.text()).toContain('Retry limit reached')
    })

    it('renders graphic slot when provided and hides default icon', () => {
        const wrapper = factory(
            {
                isLoading: false,
                error: 'Error',
            },
            {
                graphic: '<div class="custom-graphic">Custom Graphic</div>',
            }
        )

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
        expect(wrapper.find('.custom-graphic').exists()).toBe(true)
    })

    it('renders actions slot and hides default buttons', () => {
        const wrapper = factory(
            {
                isLoading: false,
                error: 'Error',
                hasGoBackButton: true,
                hasRetryButton: true,
            },
            {
                actions: '<div class="custom-actions">Retry Now</div>',
            }
        )

        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
        expect(wrapper.find('.custom-actions').exists()).toBe(true)
    })

    it('shows correct retry cooldown text countdown', async () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Oops',
            hasRetryButton: true,
            hasGoBackButton: false,
            maxRetries: 1,
            cooldownSeconds: 2,
            retryText: 'Try again',
            cooldownText: 'Retry in',
            maxRetryCycles: 10,
        })

        const retryButton = wrapper.findComponent(ActionButton)
        await retryButton.trigger('click')
        vi.advanceTimersByTime(500)
        await flushPromises()

        vi.advanceTimersByTime(1000)
        await flushPromises()

        expect(wrapper.text()).toContain('Retry in 1s')
    })

    it('resets retry count after cooldown ends and allows retry again', async () => {
        const wrapper = factory({
            isLoading: false,
            error: 'Oops',
            hasRetryButton: true,
            hasGoBackButton: false,
            maxRetries: 1,
            cooldownSeconds: 2,
            maxRetryCycles: 2,
        })

        const clickRetry = async () => {
            const button = wrapper.findComponent(ActionButton)
            if (button.exists()) {
                await button.trigger('click')
                vi.advanceTimersByTime(500)
                await flushPromises()
            }
        }

        // First retry triggers cooldown
        await clickRetry()
        vi.advanceTimersByTime(2000)
        await flushPromises()

        // Should be allowed to retry again
        await clickRetry()

        const emits = wrapper.emitted('retry') ?? []
        expect(emits.length).toBe(2)
    })
})
