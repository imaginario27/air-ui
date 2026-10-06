import { mount, type VueWrapper } from '@vue/test-utils'
import StepSwitch from '~/components/forms/fields/switch/StepSwitch.vue'
import { ControlFieldSize, SwitchStyle } from '#imports'

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

describe('StepSwitch.vue', () => {
    const factory = (props: Record<string, any> = {}) => {
        return mount(StepSwitch, {
            props: {
                id: 'step-switch',
                steps,
                modelValue: 'low',
                ...props,
            },
        })
    }

    it('renders a hidden native range input with the given id', () => {
        const wrapper = factory()

        const input = wrapper.find('input[type="range"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('id')).toBe('step-switch')
        expect(input.classes()).toContain('sr-only')
    })

    it('renders one step per item', () => {
        const wrapper = factory()

        expect(wrapper.findAll('[data-step]')).toHaveLength(3)
    })

    it('limits rendered steps to maxSteps', () => {
        const wrapper = factory({
            steps: [
                { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 },
            ],
            modelValue: 1,
        })

        expect(wrapper.findAll('[data-step]')).toHaveLength(5)
    })

    it('uses 5 as the default maxSteps', () => {
        expect(StepSwitch.props.maxSteps.default).toBe(5)
    })

    it('respects a custom maxSteps', () => {
        const wrapper = factory({ maxSteps: 2 })

        expect(wrapper.findAll('[data-step]')).toHaveLength(2)
    })

    it('sets range input bounds from the number of steps', () => {
        const wrapper = factory({ modelValue: 'medium' })
        const input = wrapper.find('input[type="range"]')

        expect(input.attributes('min')).toBe('0')
        expect(input.attributes('max')).toBe('2')
        expect((input.element as HTMLInputElement).value).toBe('1')
    })

    it('exposes the selected step label as aria-valuetext', () => {
        const wrapper = factory({ modelValue: 'high' })

        expect(wrapper.find('input[type="range"]').attributes('aria-valuetext')).toBe('High')
    })

    it('falls back to the first step when modelValue does not match any step', () => {
        const wrapper = factory({ modelValue: 'unknown' })

        expect((wrapper.find('input[type="range"]').element as HTMLInputElement).value).toBe('0')
    })

    it('emits update:modelValue with the step value when a step is clicked', async () => {
        const wrapper = factory()

        await pointerDownOnStep(wrapper, 2)

        expect(wrapper.emitted('update:modelValue')).toEqual([['high']])
    })

    it('does not emit when clicking the already selected step', async () => {
        const wrapper = factory({ modelValue: 'medium' })

        await pointerDownOnStep(wrapper, 1)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:modelValue when the native range input changes', async () => {
        const wrapper = factory()

        await wrapper.find('input[type="range"]').setValue(1)

        expect(wrapper.emitted('update:modelValue')).toEqual([['medium']])
    })

    it('supports numeric step values', async () => {
        const wrapper = factory({
            steps: [{ value: 10 }, { value: 20 }, { value: 30 }],
            modelValue: 10,
        })

        await pointerDownOnStep(wrapper, 1)

        expect(wrapper.emitted('update:modelValue')).toEqual([[20]])
    })

    it('does not emit when disabled', async () => {
        const wrapper = factory({ disabled: true })

        await pointerDownOnStep(wrapper, 2)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        expect(wrapper.find('input[type="range"]').attributes('disabled')).toBeDefined()
        expect(wrapper.find('div.cursor-not-allowed').exists()).toBe(true)
    })

    it('moves the handle to the selected step', () => {
        const first = factory({ modelValue: 'low' }).find('[data-handle]')
        const last = factory({ modelValue: 'high' }).find('[data-handle]')

        // MD: cell 28, handle 16 -> left = index * 28 + 6
        expect(first.attributes('style')).toContain('left: 6px')
        expect(last.attributes('style')).toContain('left: 62px')
    })

    it('sizes the track from the number of steps', () => {
        const wrapper = factory({ size: ControlFieldSize.MD })
        const track = wrapper.find('div[aria-hidden="true"]')

        // 3 steps * 28px + 2px border
        expect(track.attributes('style')).toContain('width: 86px')
        expect(track.attributes('style')).toContain('height: 24px')
    })

    it.each([
        [ControlFieldSize.XS, 'height: 16px'],
        [ControlFieldSize.SM, 'height: 20px'],
        [ControlFieldSize.MD, 'height: 24px'],
        [ControlFieldSize.LG, 'height: 32px'],
    ])('applies the %s track height', (size, expected) => {
        const wrapper = factory({ size })

        expect(wrapper.find('div[aria-hidden="true"]').attributes('style')).toContain(expected)
    })

    it.each([
        [SwitchStyle.BRAND, 'bg-background-primary-brand-checked'],
        [SwitchStyle.SUCCESS, 'bg-background-success-bold'],
    ])('applies the %s filled background', (styleType, expected) => {
        const wrapper = factory({ styleType })

        expect(wrapper.find('div.absolute.left-0').classes()).toContain(expected)
    })

    it('fills the track up to the selected step', () => {
        const wrapper = factory({ modelValue: 'medium' })

        // 2 steps * 28px
        expect(wrapper.find('div.absolute.left-0').attributes('style')).toContain('width: 56px')
    })

    it('selects the steps passed over while dragging the handle', async () => {
        const wrapper = factory()
        const track = mockTrackRect(wrapper)

        await track.trigger('pointerdown', { clientX: stepX(0), pointerId: 1 })
        await track.trigger('pointermove', { clientX: stepX(1), pointerId: 1 })
        await track.trigger('pointermove', { clientX: stepX(2), pointerId: 1 })

        expect(wrapper.emitted('update:modelValue')).toEqual([['medium'], ['high']])
    })

    it('makes the handle follow the pointer while dragging and disables its transition', async () => {
        const wrapper = factory()
        const track = mockTrackRect(wrapper)

        await track.trigger('pointerdown', { clientX: stepX(0), pointerId: 1 })
        await track.trigger('pointermove', { clientX: 40, pointerId: 1 })

        const handle = wrapper.find('[data-handle]')
        // center = 39 (40 - 1px border) -> left = 39 - 16 / 2
        expect(handle.attributes('style')).toContain('left: 31px')
        expect(handle.classes()).not.toContain('transition-all')
    })

    it('clamps the dragged handle inside the track', async () => {
        const wrapper = factory()
        const track = mockTrackRect(wrapper)

        await track.trigger('pointerdown', { clientX: stepX(0), pointerId: 1 })
        await track.trigger('pointermove', { clientX: 500, pointerId: 1 })

        // Last step is selected and the handle stays centered on it: 2 * 28 + 6
        expect(wrapper.emitted('update:modelValue')).toEqual([['high']])
        expect(wrapper.find('[data-handle]').attributes('style')).toContain('left: 62px')
    })

    it('stops following the pointer after pointerup and snaps back to the step', async () => {
        const wrapper = factory({ modelValue: 'medium' })
        const track = mockTrackRect(wrapper)

        await track.trigger('pointerdown', { clientX: stepX(1), pointerId: 1 })
        await track.trigger('pointermove', { clientX: 40, pointerId: 1 })
        await track.trigger('pointerup', { clientX: 40, pointerId: 1 })
        await track.trigger('pointermove', { clientX: stepX(2), pointerId: 1 })

        const handle = wrapper.find('[data-handle]')
        expect(handle.classes()).toContain('transition-all')
        // medium: 1 * 28 + 6
        expect(handle.attributes('style')).toContain('left: 34px')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not start dragging when disabled', async () => {
        const wrapper = factory({ disabled: true })
        const track = mockTrackRect(wrapper)

        await track.trigger('pointerdown', { clientX: stepX(0), pointerId: 1 })
        await track.trigger('pointermove', { clientX: stepX(2), pointerId: 1 })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('shows the step dots in both the active and the inactive part of the track', () => {
        const wrapper = factory({ modelValue: 'medium' })

        const dots = wrapper.findAll('[data-step] > span')
        expect(dots).toHaveLength(3)
        expect(dots[0]!.classes()).toContain('bg-icon-neutral-on-filled-bg')
        expect(dots[1]!.classes()).toContain('bg-icon-neutral-on-filled-bg')
        expect(dots[2]!.classes()).toContain('bg-icon-neutral-subtlest')
        dots.forEach(dot => expect(dot.classes()).not.toContain('opacity-0'))
    })

    it('falls back to "Select step" as aria-label when ariaLabel is not provided', () => {
        const wrapper = factory()

        expect(wrapper.find('input[type="range"]').attributes('aria-label')).toBe('Select step')
    })

    it('uses the provided ariaLabel', () => {
        const wrapper = factory({ ariaLabel: 'Effort' })

        expect(wrapper.find('input[type="range"]').attributes('aria-label')).toBe('Effort')
    })
})
