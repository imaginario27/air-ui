import { mount, type VueWrapper } from '@vue/test-utils'
import StepSwitchField from '~/components/forms/fields/switch/StepSwitchField.vue'
import { FormValidationMode } from '~/models/enums/formValidations'
import { ControlFieldSize, SwitchStyle } from '#imports'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const steps = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]

// MD size: cell = 28px, 1px track border. Targets the center of a step.
const stepX = (index: number) => index * 28 + 14 + 1

const mockTrackRect = (wrapper: VueWrapper) => {
    const track = wrapper.find('div[aria-hidden="true"]')
    track.element.getBoundingClientRect = () => ({ left: 0, top: 0, right: 86, bottom: 24, width: 86, height: 24, x: 0, y: 0, toJSON: () => ({}) })
    return track
}

const pointerDownOnStep = async (wrapper: VueWrapper, index: number) => {
    await mockTrackRect(wrapper).trigger('pointerdown', { clientX: stepX(index), pointerId: 1 })
}

const defaultProps = {
    id: 'step-switch-id',
    steps,
    modelValue: 'low',
}

const factory = (props: Record<string, unknown> = {}) => {
    return mount(StepSwitchField, {
        props: {
            ...defaultProps,
            ...props
        }
    })
}

describe('StepSwitchField', () => {
    it('renders legend when provided', () => {
        const wrapper = factory({ legend: 'Effort', required: true })

        const legend = wrapper.find('legend')
        expect(legend.exists()).toBe(true)
        expect(legend.text()).toBe('Effort')
    })

    it('renders label when provided', () => {
        const wrapper = factory({ label: 'Effort level' })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toContain('Effort level')
        expect(label.attributes('for')).toBe('step-switch-id')
    })

    it('renders one step per item and respects maxSteps', () => {
        expect(factory().findAll('[data-step]')).toHaveLength(3)
        expect(factory({ maxSteps: 2 }).findAll('[data-step]')).toHaveLength(2)
    })

    it('applies size and style classes to the switch', () => {
        const wrapper = factory({
            size: ControlFieldSize.LG,
            styleType: SwitchStyle.SUCCESS,
        })

        expect(wrapper.find('div.absolute.left-0').classes()).toContain('bg-background-success-bold')
        expect(wrapper.find('div[aria-hidden="true"]').attributes('style')).toContain('height: 32px')
    })

    it('renders help text when provided and no error is present', () => {
        const wrapper = factory({ helpText: 'Helpful info' })

        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful info')
        expect(help.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders error text when error is present', () => {
        const wrapper = factory({ error: 'Required field' })

        const error = wrapper.find('p')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('Required field')
        expect(error.classes()).toContain('text-text-error')
    })

    it('emits update:modelValue when a step is clicked', async () => {
        const wrapper = factory()

        await pointerDownOnStep(wrapper, 1)

        expect(wrapper.emitted('update:modelValue')).toEqual([['medium']])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({ disabled: true })

        await pointerDownOnStep(wrapper, 1)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error from selection when validator fails', async () => {
        const validator = vi.fn().mockReturnValue('Validation failed')

        const wrapper = factory({ required: true, validator })

        await pointerDownOnStep(wrapper, 2)
        await nextTick()

        expect(validator).toHaveBeenCalledWith('low')

        const emits = wrapper.emitted('update:error') ?? []
        expect(emits.length).toBeGreaterThanOrEqual(1)
        expect(emits[0]).toEqual(['Validation failed'])
    })

    it('emits update:error on modelValue change via watch', async () => {
        const validator = vi.fn().mockReturnValue('Invalid')

        const wrapper = factory({ required: true, validator, error: '' })

        await wrapper.setProps({ modelValue: 'high' })

        expect(validator).toHaveBeenCalledWith('high')
        expect(wrapper.emitted('update:error')).toEqual([['Invalid']])
    })

    it('does not validate when required is false', async () => {
        const validator = vi.fn()

        const wrapper = factory({ required: false, validator })

        await wrapper.setProps({ modelValue: 'high' })

        expect(validator).not.toHaveBeenCalled()
    })

    it('shows the optional label next to the legend when not required', () => {
        const wrapper = factory({ legend: 'Effort', optionalLabel: '(optional)' })

        expect(wrapper.find('legend').text()).toContain('(optional)')
    })

    it('hides the optional label when showOptionalLabel is false', () => {
        const wrapper = factory({ legend: 'Effort', showOptionalLabel: false })

        expect(wrapper.find('legend').text()).toBe('Effort')
    })

    it('renders icon when icon prop is provided', () => {
        const wrapper = factory({ icon: 'mdi:mdi-test' })

        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:mdi-test')
    })

    it('adjusts width to content when fitToContent is enabled', () => {
        const wrapper = factory({ label: 'Effort', fitToContent: true })

        const mainWrapper = wrapper
            .findAll('div')
            .find(div => div.classes().includes('items-center') && div.classes().includes('gap-3'))

        expect(mainWrapper).toBeDefined()
        expect(mainWrapper!.classes()).toContain('w-max')
    })

    it('uses ariaLabel fallback when visual label is hidden', () => {
        const wrapper = factory({ ariaLabel: 'Effort level' })

        expect(wrapper.find('label').exists()).toBe(false)
        expect(wrapper.find('input[type="range"]').attributes('aria-label')).toBe('Effort level')
    })

    it('renders rich markup passed via the label slot', () => {
        const wrapper = mount(StepSwitchField, {
            props: defaultProps,
            slots: {
                label: '<strong>Bold</strong> effort'
            }
        })

        const label = wrapper.find('label')
        expect(label.find('strong').exists()).toBe(true)
        expect(label.text()).toBe('Bold effort')
    })
})
