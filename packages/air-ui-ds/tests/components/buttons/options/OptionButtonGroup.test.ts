import { mount } from '@vue/test-utils'
import OptionButtonGroup from '@/components/buttons/options/OptionButtonGroup.vue'
import OptionButton from '@/components/buttons/options/OptionButton.vue'
import { ButtonStyleType } from '@/models/enums/buttons'

const createButtons = () => [
    {
        text: 'Option 1',
        value: 'option-1',
        ariaLabel: 'Select option one',
        action: vi.fn(),
    },
    {
        text: 'Option 2',
        value: 'option-2',
        ariaLabel: 'Select option two',
        action: vi.fn(),
    },
]

const factory = (props: Record<string, unknown> = {}) => {
    const buttons = createButtons()

    const wrapper = mount(OptionButtonGroup, {
        props: {
            modelValue: 'option-1',
            buttons,
            styleType: ButtonStyleType.NEUTRAL_OUTLINED,
            ...props,
        },
        global: {
            stubs: {
                OptionButton: true,
            },
        },
    })

    return { wrapper, buttons }
}

describe('OptionButtonGroup', () => {
    it('renders OptionButton components', () => {
        const { wrapper } = factory()

        expect(wrapper.findAllComponents(OptionButton)).toHaveLength(2)
    })

    it('passes ariaLabel to OptionButton from the buttons array', () => {
        const { wrapper } = factory()

        const optionButtons = wrapper.findAllComponents(OptionButton)

        expect(optionButtons[0].props('ariaLabel')).toBe('Select option one')
        expect(optionButtons[1].props('ariaLabel')).toBe('Select option two')
    })

    it('calls button action and emits update:modelValue when clicked', async () => {
        const { wrapper, buttons } = factory()

        const optionButtons = wrapper.findAllComponents(OptionButton)

        await optionButtons[1].trigger('click')

        expect(buttons[1].action).toHaveBeenCalledTimes(1)
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option-2'])
    })

    it('has role="group" with aria-label', () => {
        const { wrapper } = factory()

        expect(wrapper.attributes('role')).toBe('group')
        expect(wrapper.attributes('aria-label')).toBe('Options')
    })
})
