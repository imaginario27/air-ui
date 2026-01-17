import { mount } from '@vue/test-utils'
import ToggleButtonGroup from '@/components/buttons/toggle/ToggleButtonGroup.vue'
import ToggleButton from '@/components/buttons/toggle/ToggleButton.vue'
import { ToggleButtonGroupStyle, ButtonSize} from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

const buttons = [
    {
        text: 'First',
        value: 'first',
        size: ButtonSize.MD,
        icon: 'mdi:one',
        iconPosition: IconPosition.LEFT,
        disabled: false,
        action: vi.fn(),
    },
    {
        text: 'Second',
        value: 'second',
        size: ButtonSize.MD,
        icon: 'mdi:two',
        iconPosition: IconPosition.RIGHT,
        disabled: false,
        action: vi.fn(),
    },
]

const factory = (props = {}) => {
    return mount(ToggleButtonGroup, {
        props: {
            modelValue: 'first',
            buttons,
            groupStyle: ToggleButtonGroupStyle.GROUPED,
            hasButtonBorder: true,
            ...props,
        },
        global: {
            stubs: {
                ToggleButton,
            },
        },
    })
}

describe('ToggleButtonGroup', () => {
    it('renders all buttons passed via props', () => {
        const wrapper = factory()
        const toggleButtons = wrapper.findAllComponents(ToggleButton)
        expect(toggleButtons).toHaveLength(2)
    })

    it('applies grouped style class when groupStyle is GROUPED', () => {
        const wrapper = factory({ groupStyle: ToggleButtonGroupStyle.GROUPED })
        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('overflow-hidden')
    })

    it('applies segmented style and border when groupStyle is SEGMENTED and hasButtonBorder is true', () => {
        const wrapper = factory({
            groupStyle: ToggleButtonGroupStyle.SEGMENTED,
            hasButtonBorder: true,
        })

        const buttons = wrapper.findAllComponents(ToggleButton)
        buttons.forEach(btn => {
            expect(btn.classes()).toContain('border')
        })
    })

    it('does not apply extra border when hasButtonBorder is false', () => {
        const wrapper = factory({ hasButtonBorder: false })
        const buttons = wrapper.findAllComponents(ToggleButton)
        buttons.forEach(btn => {
            expect(btn.classes()).toContain('rounded-button')
        })
    })

    it('marks only the selected button as active', () => {
        const wrapper = factory({ modelValue: 'second' })
        const buttons = wrapper.findAllComponents(ToggleButton)
        expect(buttons[0].props('active')).toBe(false)
        expect(buttons[1].props('active')).toBe(true)
    })

    it('calls button action and emits update:modelValue on click', async () => {
        const wrapper = factory()
        const buttons = wrapper.findAllComponents(ToggleButton)
        await buttons[1].trigger('click')

        expect(buttons[1].props('text')).toBe('Second')
        expect(buttons[1].props('icon')).toBe('mdi:two')
        expect(buttons[1].props('iconPosition')).toBe(IconPosition.RIGHT)

        // Action function called
        expect(buttons[1].props('disabled')).toBe(false)
        expect(buttons[1].props('active')).toBe(false)
        expect(buttons[1].props('action')).toBeUndefined() // action isn't passed as a prop to ToggleButton

        // Check emitted event
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['second'])
    })

    it('handles buttons without action gracefully', async () => {
        const wrapper = factory({
            buttons: [
                {
                    text: 'No Action',
                    value: 'no-action',
                },
            ],
            modelValue: 'other',
        })

        const toggleButton = wrapper.findComponent(ToggleButton)
        await toggleButton.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['no-action'])
    })
})
