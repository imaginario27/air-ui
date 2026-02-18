import { mount } from '@vue/test-utils'
import ToggleButtonGroup from '@/components/buttons/toggle/ToggleButtonGroup.vue'
import ToggleButton from '@/components/buttons/toggle/ToggleButton.vue'
import ToggleIconButton from '@/components/buttons/toggle/ToggleIconButton.vue'
import { ToggleButtonGroupStyle, ButtonSize } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

const createButtons = () => [
    {
        text: 'First',
        value: 'first',
        size: ButtonSize.MD,
        icon: 'mdi:one',
        iconPosition: IconPosition.LEFT,
        action: vi.fn(),
    },
    {
        text: 'Second',
        value: 'second',
        size: ButtonSize.MD,
        icon: 'mdi:two',
        iconPosition: IconPosition.RIGHT,
        action: vi.fn(),
    },
]

const factory = (props: Record<string, unknown> = {}) => {
    const buttons = createButtons()

    const wrapper = mount(ToggleButtonGroup, {
        props: {
            modelValue: 'first',
            buttons,
            groupStyle: ToggleButtonGroupStyle.GROUPED,
            hasButtonBorder: true,
            disabled: false,
            onlyIcon: false,
            ...props,
        },
        global: {
            stubs: {
                ToggleButton: true,
                ToggleIconButton: true,
            },
        },
    })

    return { wrapper, buttons }
}

describe('ToggleButtonGroup', () => {
    it('renders ToggleButton components when onlyIcon is false', () => {
        const { wrapper } = factory()

        expect(wrapper.findAllComponents(ToggleButton)).toHaveLength(2)
        expect(wrapper.findAllComponents(ToggleIconButton)).toHaveLength(0)
    })

    it('renders ToggleIconButton components when onlyIcon is true', () => {
        const { wrapper } = factory({ onlyIcon: true })

        expect(wrapper.findAllComponents(ToggleIconButton)).toHaveLength(2)
        expect(wrapper.findAllComponents(ToggleButton)).toHaveLength(0)
    })

    it('applies grouped container classes when groupStyle is GROUPED', () => {
        const { wrapper } = factory({
            groupStyle: ToggleButtonGroupStyle.GROUPED,
        })

        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('border-border-default')
        expect(wrapper.classes()).not.toContain('flex-wrap')
    })

    it('applies segmented container classes when groupStyle is SEGMENTED', () => {
        const { wrapper } = factory({
            groupStyle: ToggleButtonGroupStyle.SEGMENTED,
        })

        expect(wrapper.classes()).toContain('flex-wrap')
        expect(wrapper.classes()).toContain('gap-3')
        expect(wrapper.classes()).not.toContain('border-border-default')
    })

    it('applies border classes to children when segmented and hasButtonBorder is true', () => {
        const { wrapper } = factory({
            groupStyle: ToggleButtonGroupStyle.SEGMENTED,
            hasButtonBorder: true,
        })

        const toggleButtons = wrapper.findAllComponents(ToggleButton)

        toggleButtons.forEach(btn => {
            expect(btn.classes()).toContain('border')
            expect(btn.classes()).toContain('rounded-button')
        })
    })

    it('applies rounded-button class only when hasButtonBorder is false', () => {
        const { wrapper } = factory({
            groupStyle: ToggleButtonGroupStyle.SEGMENTED,
            hasButtonBorder: false,
        })

        const toggleButtons = wrapper.findAllComponents(ToggleButton)

        toggleButtons.forEach(btn => {
            expect(btn.classes()).toContain('rounded-button')
            expect(btn.classes()).not.toContain('border')
        })
    })

    it('marks the correct button as active based on modelValue', () => {
        const { wrapper } = factory({ modelValue: 'second' })

        const toggleButtons = wrapper.findAllComponents(ToggleButton)

        expect(toggleButtons[0].props('active')).toBe(false)
        expect(toggleButtons[1].props('active')).toBe(true)
    })

    it('calls button action and emits update:modelValue when clicked', async () => {
        const { wrapper, buttons } = factory()

        const toggleButtons = wrapper.findAllComponents(ToggleButton)

        await toggleButtons[1].trigger('click')

        expect(buttons[1].action).toHaveBeenCalledTimes(1)

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['second'])
    })

    it('does not call action or emit event when disabled is true', async () => {
        const { wrapper, buttons } = factory({
            disabled: true,
        })

        const toggleButtons = wrapper.findAllComponents(ToggleButton)

        await toggleButtons[1].trigger('click')

        expect(buttons[1].action).not.toHaveBeenCalled()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:modelValue when button has no action', async () => {
        const wrapper = mount(ToggleButtonGroup, {
            props: {
                modelValue: 'other',
                buttons: [
                    {
                        text: 'No Action',
                        value: 'no-action',
                    },
                ],
            },
            global: {
                stubs: {
                    ToggleButton: true,
                    ToggleIconButton: true,
                },
            },
        })

        const toggleButton = wrapper.findComponent(ToggleButton)

        await toggleButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['no-action'])
    })

    it('renders no buttons when buttons array is empty', () => {
        const wrapper = mount(ToggleButtonGroup, {
            props: {
                buttons: [],
            },
            global: {
                stubs: {
                    ToggleButton: true,
                    ToggleIconButton: true,
                },
            },
        })

        expect(wrapper.findAllComponents(ToggleButton)).toHaveLength(0)
        expect(wrapper.findAllComponents(ToggleIconButton)).toHaveLength(0)
    })
})
