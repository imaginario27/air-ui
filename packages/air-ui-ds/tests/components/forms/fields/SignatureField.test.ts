import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import SignatureField from '~/components/forms/fields/SignatureField.vue'
import SignaturePad from '~/components/signature-pads/SignaturePad.vue'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, unknown> = {}) => {
    return mount(SignatureField, {
        props: {
            id: 'signature',
            modelValue: [],
            ...props,
        },
    })
}

describe('SignatureField.vue', () => {
    it('renders label and help text', () => {
        const wrapper = factory({ label: 'Signature', helpText: 'Sign inside the box', required: true })

        expect(wrapper.find('label').text()).toBe('Signature')
        expect(wrapper.text()).toContain('Sign inside the box')
    })

    it('links the label to the pad through aria-labelledby', () => {
        const wrapper = factory({ label: 'Signature' })

        expect(wrapper.find('label').attributes('id')).toBe('signature-label')
        expect(wrapper.find('[data-testid="signature-pad-surface"]').attributes('aria-labelledby')).toBe('signature-label')
    })

    it('passes pad props to the SignaturePad component', () => {
        const wrapper = factory({ height: 300, strokeSize: 3, showGuide: false, placeholder: 'Sign', readOnly: true, name: 'sig' })
        const pad = wrapper.findComponent(SignaturePad)

        expect(pad.props('height')).toBe(300)
        expect(pad.props('strokeSize')).toBe(3)
        expect(pad.props('showGuide')).toBe(false)
        expect(pad.props('placeholder')).toBe('Sign')
        expect(pad.props('readOnly')).toBe(true)
        expect(pad.props('name')).toBe('sig')
    })

    it('forwards update:modelValue, draw-end and clear from the pad', async () => {
        const wrapper = factory()
        const pad = wrapper.findComponent(SignaturePad)

        await pad.vm.$emit('update:modelValue', ['M 0 0 L 1 1'])
        await pad.vm.$emit('draw-end', { paths: ['M 0 0 L 1 1'] })
        await pad.vm.$emit('clear')

        expect(wrapper.emitted('update:modelValue')).toEqual([[['M 0 0 L 1 1']]])
        expect(wrapper.emitted('draw-end')).toHaveLength(1)
        expect(wrapper.emitted('clear')).toHaveLength(1)
    })

    it('validates required fields in blur mode', async () => {
        const validator = vi.fn(() => 'Signature is required')
        const wrapper = factory({ required: true, validator })

        await wrapper.findComponent(SignaturePad).vm.$emit('update:modelValue', [])

        expect(validator).toHaveBeenCalledWith([])
        expect(wrapper.emitted('update:error')).toEqual([['Signature is required']])
    })

    it('shows error text over help text when error exists', () => {
        const wrapper = factory({ helpText: 'Helpful note', error: 'Required field' })

        expect(wrapper.find('p').text()).toBe('Required field')
    })

    it('renders help text before the pad when helpTextPosition is top', () => {
        const wrapper = factory({ helpText: 'Sign here', helpTextPosition: Position.TOP })
        const children = Array.from(wrapper.element.children)

        expect(children[0]!.tagName).toBe('P')
    })
})
