import { mount } from '@vue/test-utils'
import Checkbox from '~/components/forms/Checkbox.vue'

describe('Checkbox.vue', () => {
    const factory = (props: Record<string, any> = {}) => {
        return mount(Checkbox, {
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

    it('emits update:modelValue when clicked', async () => {
        const wrapper = factory({ modelValue: false })

        const box = wrapper.find('div.cursor-pointer')
        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({ modelValue: false, disabled: true })

        const box = wrapper.find('div.cursor-not-allowed')
        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('applies large size classes when size is lg', () => {
        const wrapper = factory({ size: 'lg', modelValue: true })

        const box = wrapper.find('div.cursor-pointer')
        expect(box.classes()).toContain('w-[32px]')
        expect(box.classes()).toContain('h-[32px]')
    })
})
