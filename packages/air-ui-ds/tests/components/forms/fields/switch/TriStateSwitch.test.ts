import { mount } from '@vue/test-utils'
import TriStateSwitch from '~/components/forms/fields/switch/TriStateSwitch.vue'
import { ControlFieldSize, SwitchStyle, TriStateValue } from '#imports'

describe('TriStateSwitch.vue', () => {
    const factory = (props: Record<string, any> = {}) => {
        return mount(TriStateSwitch, {
            props: {
                id: 'switch-control',
                ...props,
            },
        })
    }

    it('renders hidden native checkbox input', () => {
        const wrapper = factory()

        const input = wrapper.find('input[type="checkbox"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('id')).toBe('switch-control')
    })

    it('emits update:modelValue with CHECKED when clicked from UNCHECKED', async () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })

        const toggle = wrapper.find('div.cursor-pointer')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[TriStateValue.CHECKED]])
    })

    it('emits update:modelValue with UNCHECKED when clicked from CHECKED', async () => {
        const wrapper = factory({ modelValue: TriStateValue.CHECKED })

        const toggle = wrapper.find('div.cursor-pointer')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[TriStateValue.UNCHECKED]])
    })

    it('emits update:modelValue with CHECKED when clicked from INDETERMINATE', async () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })

        const toggle = wrapper.find('div.cursor-pointer')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[TriStateValue.CHECKED]])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED, disabled: true })

        const toggle = wrapper.find('div.cursor-not-allowed')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('applies large size classes when size is lg', () => {
        const wrapper = factory({ size: ControlFieldSize.LG, modelValue: TriStateValue.CHECKED })

        const toggle = wrapper.find('[role="switch"]')
        expect(toggle.classes()).toContain('w-[56px]')
        expect(toggle.classes()).toContain('h-[32px]')
    })

    it('applies success background class when styleType is success and checked', () => {
        const wrapper = factory({ styleType: SwitchStyle.SUCCESS, modelValue: TriStateValue.CHECKED })

        const toggle = wrapper.find('[role="switch"]')
        expect(toggle.classes()).toContain('bg-background-success-bold')
    })

    it('applies checked background class when indeterminate', () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })

        const toggle = wrapper.find('[role="switch"]')
        expect(toggle.classes()).toContain('bg-background-primary-brand-checked')
    })

    it('sets aria-checked="mixed" when indeterminate', () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-checked')).toBe('mixed')
    })

    it('sets aria-checked="true" when checked', () => {
        const wrapper = factory({ modelValue: TriStateValue.CHECKED })
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-checked')).toBe('true')
    })

    it('sets aria-checked="false" when unchecked', () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-checked')).toBe('false')
    })

    it('renders a single, always-present handle element across all states (for a smooth transition)', () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })
        expect(wrapper.findAll('[role="switch"] > div')).toHaveLength(1)
    })

    it('renders a small centered pill-shaped handle when indeterminate', () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE, size: ControlFieldSize.MD })
        const handle = wrapper.find('[role="switch"] > div')

        expect(handle.classes()).toContain('w-[12px]')
        expect(handle.classes()).toContain('h-[4px]')
        expect(handle.classes()).toContain('translate-x-[16px]')
    })

    it('renders a larger circular handle offset to a side when checked or unchecked', () => {
        const uncheckedWrapper = factory({ modelValue: TriStateValue.UNCHECKED, size: ControlFieldSize.MD })
        const uncheckedHandle = uncheckedWrapper.find('[role="switch"] > div')
        expect(uncheckedHandle.classes()).toContain('w-[16px]')
        expect(uncheckedHandle.classes()).toContain('h-[16px]')
        expect(uncheckedHandle.classes()).toContain('translate-x-1')

        const checkedWrapper = factory({ modelValue: TriStateValue.CHECKED, size: ControlFieldSize.MD })
        const checkedHandle = checkedWrapper.find('[role="switch"] > div')
        expect(checkedHandle.classes()).toContain('w-[16px]')
        expect(checkedHandle.classes()).toContain('h-[16px]')
        expect(checkedHandle.classes()).toContain('translate-x-6')
    })

    it('falls back to "Toggle" as aria-label when ariaLabel is not provided', () => {
        const wrapper = factory()
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-label')).toBe('Toggle')
    })
})
