import { mount } from '@vue/test-utils'
import SelectableCardField from '@/components/forms/fields/SelectableCardField.vue'
import SelectableCard from '@/components/cards/specific/SelectableCard.vue'
import Loading from '@/components/loaders/Loading.vue'
import { CardSelectionMode } from '@/models/enums/selects'
import { FormValidationMode } from '@/models/enums/formValidations'
import { Position } from '@/models/enums/positions'

vi.mock('@/composables/useValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR),
}))

const factory = (props?: Record<string, any>) => {
    return mount(SelectableCardField, {
        props: {
            id: 'test-card-field',
            modelValue: null,
            options: [
                { value: 'one', title: 'Option One', description: 'Desc 1' },
                { value: 'two', title: 'Option Two', description: 'Desc 2' },
            ],
            ...props,
        },
    })
}

describe('SelectableCardField', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the label when provided', () => {
        const wrapper = factory({ label: 'Select one' })

        expect(wrapper.find('label').text()).toBe('Select one')
        expect(wrapper.find('label').attributes('for')).toBe('test-card-field')
    })

    it('does not render label if not provided', () => {
        const wrapper = factory()

        expect(wrapper.find('label').exists()).toBe(false)
    })

    it('shows loading indicator when loading state is enabled', () => {
        const wrapper = factory({
            isLoading: true,
            showLoadingState: true,
        })

        expect(wrapper.findComponent(Loading).exists()).toBe(true)
    })

    it('does not show loading indicator when isLoading is false', () => {
        const wrapper = factory({
            isLoading: false,
            showLoadingState: true,
        })

        expect(wrapper.findComponent(Loading).exists()).toBe(false)
    })

    it('renders a SelectableCard for each option when not loading', () => {
        const wrapper = factory()

        const cards = wrapper.findAllComponents(SelectableCard)
        expect(cards).toHaveLength(2)
    })

    it('passes correct props to SelectableCard', () => {
        const wrapper = factory({ selectMode: CardSelectionMode.BUTTON })

        const firstCard = wrapper.findComponent(SelectableCard)
        expect(firstCard.props('title')).toBe('Option One')
        expect(firstCard.props('selectMode')).toBe(CardSelectionMode.BUTTON)
    })

    it('emits updated model value in single-select mode', async () => {
        const wrapper = factory({ modelValue: null })

        const card = wrapper.findAllComponents(SelectableCard)[0]
        await card.vm.$emit('update:modelValue')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0][0]).toBe('one')
    })

    it('emits updated model value in multi-select mode (add/remove)', async () => {
        const wrapper = factory({
            modelValue: ['one'],
            multiple: true,
        })

        const card = wrapper.findAllComponents(SelectableCard)[0]
        await card.vm.$emit('update:modelValue')

        // Remove 'one'
        expect(wrapper.emitted('update:modelValue')![0][0]).toEqual([])
    })

    it('emits model with both values selected in multiple mode', async () => {
        const wrapper = factory({
            modelValue: ['one'],
            multiple: true,
        })

        const secondCard = wrapper.findAllComponents(SelectableCard)[1]
        await secondCard.vm.$emit('update:modelValue')

        expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['one', 'two'])
    })

    it('emits buttonClick when SelectableCard triggers it', async () => {
        const callback = vi.fn()
        const wrapper = factory({
            options: [
                { value: 'one', title: 'One', secondaryBtnCallback: callback },
            ],
        })

        const card = wrapper.findComponent(SelectableCard)
        await card.vm.$emit('buttonClick')

        expect(callback).toHaveBeenCalled()
    })

    it('displays helpText when no error is present', () => {
        const wrapper = factory({
            helpText: 'Helpful tip here.',
        })

        const help = wrapper.find('p.text-xs')
        expect(help.text()).toBe('Helpful tip here.')
        expect(help.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders help text before the cards when helpTextPosition is top', () => {
        const wrapper = factory({ label: 'Options', helpText: 'Choose one', helpTextPosition: Position.TOP })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Choose one')
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const labelIdx = children.findIndex(el => el.tagName === 'LABEL')
        expect(helpIdx).toBeGreaterThan(labelIdx)
        expect(helpIdx).toBeLessThan(children.length - 1)
    })

    it('displays error message when hasError is true', () => {
        const wrapper = factory({
            error: 'Field is required',
        })

        const error = wrapper.find('p.text-xs')
        expect(error.text()).toBe('Field is required')
        expect(error.classes()).toContain('text-text-error')
    })
})
