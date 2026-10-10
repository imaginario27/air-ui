import { mount } from '@vue/test-utils'
import SignaturePad from '~/components/signature-pads/SignaturePad.vue'

const factory = (props: Record<string, unknown> = {}) => {
    return mount(SignaturePad, {
        props,
        global: {
            stubs: {
                ActionButton: {
                    props: ['text', 'disabled'],
                    emits: ['click'],
                    template: '<button :disabled="disabled" @click="$emit(\'click\')">{{ text }}</button>',
                },
            },
        },
    })
}

const draw = async (wrapper: ReturnType<typeof factory>) => {
    const surface = wrapper.find('[data-testid="signature-pad-surface"]')

    await surface.trigger('pointerdown', { clientX: 10, clientY: 10, pointerId: 1 })
    await surface.trigger('pointermove', { clientX: 20, clientY: 25, pointerId: 1 })
    await surface.trigger('pointermove', { clientX: 40, clientY: 30, pointerId: 1 })
    await surface.trigger('pointerup', { clientX: 40, clientY: 30, pointerId: 1 })
}

describe('SignaturePad.vue', () => {
    it('renders the placeholder and guide when empty', () => {
        const wrapper = factory()

        expect(wrapper.find('[data-testid="signature-pad-guide"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="signature-pad-placeholder"]').text()).toBe('Sign here')
    })

    it('hides the guide when showGuide is false', () => {
        const wrapper = factory({ showGuide: false })

        expect(wrapper.find('[data-testid="signature-pad-guide"]').exists()).toBe(false)
    })

    it('hides the placeholder once there are strokes', () => {
        const wrapper = factory({ modelValue: ['M 0 0 L 5 5'] })

        expect(wrapper.find('[data-testid="signature-pad-placeholder"]').exists()).toBe(false)
        expect(wrapper.findAll('[data-testid="signature-pad-path"]')).toHaveLength(1)
    })

    it('applies the height and stroke size', () => {
        const wrapper = factory({ height: 320, strokeSize: 4, modelValue: ['M 0 0 L 5 5'] })

        expect((wrapper.element.firstElementChild as HTMLElement).style.height).toBe('320px')
        expect(wrapper.find('[data-testid="signature-pad-path"]').attributes('stroke-width')).toBe('4')
    })

    it('applies the min width', () => {
        expect(factory().find('[data-testid="signature-pad-root"]').attributes('style')).toContain('min-width: 240px')
        expect(factory({ minWidth: 320 }).find('[data-testid="signature-pad-root"]').attributes('style')).toContain('min-width: 320px')
    })

    it('emits draw, update:modelValue and draw-end after a stroke', async () => {
        const wrapper = factory()

        await draw(wrapper)

        expect(wrapper.emitted('draw')).toBeTruthy()
        const update = wrapper.emitted('update:modelValue')![0]![0] as string[]
        expect(update).toHaveLength(1)
        expect(update[0]).toMatch(/^M /)
        expect(wrapper.emitted('draw-end')![0]![0]).toEqual({ paths: update })
    })

    it.each([
        ['disabled', { disabled: true }],
        ['readOnly', { readOnly: true }],
    ])('does not draw when %s', async (_name, props) => {
        const wrapper = factory(props)

        await draw(wrapper)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('clears the strokes and emits clear', async () => {
        const wrapper = factory({ modelValue: ['M 0 0 L 5 5'] })

        await wrapper.find('[data-testid="signature-pad-clear"]').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[[]]])
        expect(wrapper.emitted('clear')).toHaveLength(1)
    })

    it('hides the clear button when showClearButton is false', () => {
        const wrapper = factory({ showClearButton: false, modelValue: ['M 0 0 L 5 5'] })

        expect(wrapper.find('[data-testid="signature-pad-clear"]').exists()).toBe(false)
    })

    it('shows the clear button only when something has been drawn', async () => {
        const wrapper = factory()

        expect(wrapper.find('[data-testid="signature-pad-clear"]').exists()).toBe(false)

        await wrapper.setProps({ modelValue: ['M 0 0 L 5 5'] })

        expect(wrapper.find('[data-testid="signature-pad-clear"]').exists()).toBe(true)
    })

    it('uses clearAriaLabel as the accessible label of the clear button', () => {
        const wrapper = factory({ modelValue: ['M 0 0 L 5 5'] })

        expect(wrapper.find('[data-testid="signature-pad-clear"]').attributes('aria-label')).toBe('Clear signature')
        expect(factory({ modelValue: ['M 0 0 L 5 5'], clearAriaLabel: 'Reset' }).find('[data-testid="signature-pad-clear"]').attributes('aria-label')).toBe('Reset')
    })

    it('passes clearIcon to the clear button', () => {
        const wrapper = mount(SignaturePad, { props: { modelValue: ['M 0 0 L 5 5'], clearIcon: 'mdi:close' } })

        expect(wrapper.findComponent({ name: 'ActionIconButton' }).props('icon')).toBe('mdi:close')
    })

    it('renders a hidden input with the serialized paths when name is set', () => {
        const wrapper = factory({ name: 'signature', modelValue: ['M 0 0 L 5 5'] })
        const input = wrapper.find('[data-testid="signature-pad-hidden-input"]')

        expect(input.attributes('name')).toBe('signature')
        expect((input.element as HTMLInputElement).value).toBe('["M 0 0 L 5 5"]')
    })

    it('exposes clear and getDataUrl', () => {
        const wrapper = factory()

        expect(typeof wrapper.vm.clear).toBe('function')
        expect(typeof wrapper.vm.getDataUrl).toBe('function')
    })
})
