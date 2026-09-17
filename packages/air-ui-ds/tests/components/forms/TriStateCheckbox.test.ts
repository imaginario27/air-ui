import { mount } from '@vue/test-utils'
import TriStateCheckbox from '~/components/forms/fields/checkbox/TriStateCheckbox.vue'
import { TriStateValue } from '#imports'

describe('TriStateCheckbox.vue', () => {
    const factory = (props: Record<string, any> = {}) => {
        return mount(TriStateCheckbox, {
            props: {
                id: 'checkbox-control',
                ...props,
            },
        })
    }

    it('renders hidden native checkbox input', () => {
        const wrapper = factory()

        const input = wrapper.find('input[type="checkbox"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('id')).toBe('checkbox-control')
    })

    it('emits update:modelValue with CHECKED when clicked from UNCHECKED', async () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })

        const box = wrapper.find('div.cursor-pointer')
        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[TriStateValue.CHECKED]])
    })

    it('emits update:modelValue with UNCHECKED when clicked from CHECKED', async () => {
        const wrapper = factory({ modelValue: TriStateValue.CHECKED })

        const box = wrapper.find('div.cursor-pointer')
        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[TriStateValue.UNCHECKED]])
    })

    it('emits update:modelValue with CHECKED when clicked from INDETERMINATE', async () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })

        const box = wrapper.find('div.cursor-pointer')
        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[TriStateValue.CHECKED]])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED, disabled: true })

        const box = wrapper.find('div.cursor-not-allowed')
        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('applies large size classes when size is lg', () => {
        const wrapper = factory({ size: 'lg', modelValue: TriStateValue.CHECKED })

        const box = wrapper.find('div.cursor-pointer')
        expect(box.classes()).toContain('w-[32px]')
        expect(box.classes()).toContain('h-[32px]')
    })

    it('uses sr-only instead of hidden on native input', () => {
        const wrapper = factory()
        const input = wrapper.find('input[type="checkbox"]')

        expect(input.classes()).toContain('sr-only')
        expect(input.classes()).not.toContain('hidden')
    })

    it('has role="checkbox" and aria-checked="true" when checked', () => {
        const wrapper = factory({ modelValue: TriStateValue.CHECKED })
        const box = wrapper.find('[role="checkbox"]')

        expect(box.exists()).toBe(true)
        expect(box.attributes('aria-checked')).toBe('true')
    })

    it('sets aria-checked="false" when unchecked', () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })
        const box = wrapper.find('[role="checkbox"]')

        expect(box.attributes('aria-checked')).toBe('false')
    })

    it('sets aria-checked="mixed" when indeterminate', () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })
        const box = wrapper.find('[role="checkbox"]')

        expect(box.attributes('aria-checked')).toBe('mixed')
    })

    it('renders the check icon when checked', () => {
        const wrapper = factory({ modelValue: TriStateValue.CHECKED })
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check-bold')
    })

    it('renders the minus icon when indeterminate', () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:minus-thick')
    })

    it('renders no icon when unchecked', () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(icon.exists()).toBe(false)
    })
})
