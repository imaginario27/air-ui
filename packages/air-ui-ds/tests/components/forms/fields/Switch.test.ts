import { mount } from '@vue/test-utils'
import Switch from '~/components/forms/fields/Switch.vue'
import { ControlFieldSize, SwitchStyle } from '#imports'

describe('Switch.vue', () => {
    const factory = (props: Record<string, any> = {}) => {
        return mount(Switch, {
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

    it('emits update:modelValue when clicked', async () => {
        const wrapper = factory({ modelValue: false })

        const toggle = wrapper.find('div.cursor-pointer')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({ modelValue: false, disabled: true })

        const toggle = wrapper.find('div.cursor-not-allowed')
        await toggle.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('applies large size classes when size is lg', () => {
        const wrapper = factory({ size: ControlFieldSize.LG, modelValue: true })

        const toggle = wrapper.find('[role="switch"]')
        expect(toggle.classes()).toContain('w-[56px]')
        expect(toggle.classes()).toContain('h-[32px]')
    })

    it('applies success background class when styleType is success and checked', () => {
        const wrapper = factory({ styleType: SwitchStyle.SUCCESS, modelValue: true })

        const toggle = wrapper.find('[role="switch"]')
        expect(toggle.classes()).toContain('bg-background-success-bold')
    })

    it('uses sr-only instead of hidden on native input', () => {
        const wrapper = factory()
        const input = wrapper.find('input[type="checkbox"]')

        expect(input.classes()).toContain('sr-only')
        expect(input.classes()).not.toContain('hidden')
    })

    it('has role="switch" and aria-checked on custom element', () => {
        const wrapper = factory({ modelValue: true })
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.exists()).toBe(true)
        expect(toggle.attributes('aria-checked')).toBe('true')
    })

    it('sets aria-checked="false" when unchecked', () => {
        const wrapper = factory({ modelValue: false })
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-checked')).toBe('false')
    })

    it('falls back to "Toggle" as aria-label when ariaLabel is not provided', () => {
        const wrapper = factory()
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-label')).toBe('Toggle')
    })

    it('uses the provided ariaLabel', () => {
        const wrapper = factory({ ariaLabel: 'Enable notifications' })
        const toggle = wrapper.find('[role="switch"]')

        expect(toggle.attributes('aria-label')).toBe('Enable notifications')
    })

    it.each([
        [ControlFieldSize.XS, 'translate-x-0.5', 'translate-x-[18px]'],
        [ControlFieldSize.SM, 'translate-x-0.5', 'translate-x-[22px]'],
        [ControlFieldSize.MD, 'translate-x-1', 'translate-x-6'],
        [ControlFieldSize.LG, 'translate-x-1', 'translate-x-7'],
    ])('positions the handle with an equal gap on both sides for size %s', (size, uncheckedOffset, checkedOffset) => {
        const uncheckedWrapper = factory({ size, modelValue: false })
        const uncheckedHandle = uncheckedWrapper.find('[role="switch"] > div')
        expect(uncheckedHandle.classes()).toContain(uncheckedOffset)

        const checkedWrapper = factory({ size, modelValue: true })
        const checkedHandle = checkedWrapper.find('[role="switch"] > div')
        expect(checkedHandle.classes()).toContain(checkedOffset)
    })
})
