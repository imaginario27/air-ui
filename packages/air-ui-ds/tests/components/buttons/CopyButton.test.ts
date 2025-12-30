import { mount } from '@vue/test-utils'
import CopyButton from '~/components/buttons/CopyButton.vue'
import ActionButton from '~/components/buttons/ActionButton.vue'
import ActionIconButton from '~/components/buttons/ActionIconButton.vue'

import { ButtonType, ButtonStyleType, ButtonSize } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'
import { copyToClipboard } from '../../../../air-ui-utils/utils/events'

vi.mock('../../../../air-ui-utils/utils/events', () => ({
    copyToClipboard: vi.fn(),
}))

const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
}

vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $toast: mockToast,
    }),
}))

const DEFAULT_PROPS = {
    textToCopy: 'Copied content',
    text: 'Copy',
    icon: 'mdiContentCopy',
    buttonType: ButtonType.ACTION_ICON_BUTTON,
    styleType: ButtonStyleType.NEUTRAL_OUTLINED,
    size: ButtonSize.SM,
    iconPosition: IconPosition.RIGHT,
    resetAfter: 100,
    disabled: false,
    showToast: true,
    copySuccessText: 'Copied!',
    copyErrorText: 'Failed!',
}

const factory = (
    props: Partial<InstanceType<typeof CopyButton>['$props']> = {}
) =>
    mount(CopyButton, {
        props: {
            ...DEFAULT_PROPS,
            ...props,
        },
    })

describe('CopyButton.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('renders ActionIconButton when buttonType is ACTION_ICON_BUTTON', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(ActionIconButton).exists()).toBe(true)
        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
    })

    it('renders ActionButton when buttonType is ACTION_BUTTON', () => {
        const wrapper = factory({ buttonType: ButtonType.ACTION_BUTTON })
        expect(wrapper.findComponent(ActionButton).exists()).toBe(true)
        expect(wrapper.findComponent(ActionIconButton).exists()).toBe(false)
    })

    it('emits success when copy succeeds', async () => {
        vi.mocked(copyToClipboard).mockResolvedValue(true)

        const wrapper = factory()
        wrapper.findComponent(ActionIconButton).vm.$emit('click')

        vi.advanceTimersByTime(DEFAULT_PROPS.resetAfter)
        await wrapper.vm.$nextTick()

        expect(copyToClipboard).toHaveBeenCalledWith('Copied content')
        expect(wrapper.emitted('success')).toBeTruthy()
    })

    it('emits error when copy fails', async () => {
        vi.mocked(copyToClipboard).mockResolvedValue(false)

        const wrapper = factory()

        wrapper.findComponent(ActionIconButton).vm.$emit('click')

        vi.advanceTimersByTime(DEFAULT_PROPS.resetAfter)
        await wrapper.vm.$nextTick()

        expect(copyToClipboard).toHaveBeenCalledWith('Copied content')
        expect(wrapper.emitted('error')).toBeTruthy()
        expect(wrapper.emitted('success')).toBeFalsy()
    })

    it('adds success icon class for supported NEUTRAL styles', async () => {
        vi.mocked(copyToClipboard).mockResolvedValue(true)

        const wrapper = factory({
            styleType: ButtonStyleType.NEUTRAL_TRANSPARENT,
        })

        await wrapper.find('button').trigger('click')
        vi.advanceTimersByTime(DEFAULT_PROPS.resetAfter)

        expect(wrapper.html()).toContain('text-icon-success')
    })

    it('does not show toast when showToast is false', async () => {
        vi.mocked(copyToClipboard).mockResolvedValue(true)

        const wrapper = factory({ showToast: false })
        await wrapper.find('button').trigger('click')

        vi.advanceTimersByTime(DEFAULT_PROPS.resetAfter)

        expect(mockToast.success).not.toHaveBeenCalled()
        expect(wrapper.emitted('success')).toBeTruthy()
    })

    it('disables the button when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })
})
