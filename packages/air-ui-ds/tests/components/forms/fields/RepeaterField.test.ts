import { mount } from '@vue/test-utils'
import RepeaterField from '~/components/forms/fields/RepeaterField.vue'
import ActionIconButton from '~/components/buttons/ActionIconButton.vue'

const factory = (props: Record<string, unknown> = {}) => {
    return mount(RepeaterField, {
        props: {
            modelValue: [{ name: 'Item 1' }],
            defaultValue: { name: '' },
            ...props,
        },
        slots: {
            default: ({ index }: { index: number }) => `<div class="row-content">Row ${index + 1}</div>`,
        },
    })
}

describe('RepeaterField.vue', () => {
    it('renders add action button with default aria label', async () => {
        const wrapper = factory()
        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAllComponents(ActionIconButton)
        expect(buttons[0]?.props('ariaLabel')).toBe('Add item')
    })

    it('renders remove action button with default aria label when multiple items exist', async () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })
        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAllComponents(ActionIconButton)
        expect(buttons).toHaveLength(3)
        const ariaLabels = buttons.map(button => button.props('ariaLabel'))
        expect(ariaLabels).toContain('Remove item')
    })

    it('supports custom aria labels for add/remove actions', async () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
            addItemAriaLabel: 'Add another rule',
            removeItemAriaLabel: 'Delete this row',
        })
        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAllComponents(ActionIconButton)
        const ariaLabels = buttons.map(button => button.props('ariaLabel'))
        expect(ariaLabels).toContain('Delete this row')
        expect(ariaLabels).toContain('Add another rule')
    })
})
