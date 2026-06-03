import { mount } from '@vue/test-utils'
import SelectableCard from '@/components/cards/specific/SelectableCard.vue'
import ActionButton from '@/components/buttons/ActionButton.vue'
import CardFooter from '@/components/cards/CardFooter.vue'
import CardHeader from '@/components/cards/CardHeader.vue'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'
import Icon from '@/components/icons/Icon.vue'
import { CardSelectionMode } from '@/models/enums/selects'
import { Align } from '@/models/enums/positions'

const factory = (props?: Record<string, any>, slots?: Record<string, any>) => {
    return mount(SelectableCard, {
        props: {
            title: 'Sample Title',
            description: 'Sample Description',
            ...props,
        },
        slots,
    })
}

describe('SelectableCard', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('renders title and description when no slots are provided', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Sample Title')
        expect(wrapper.text()).toContain('Sample Description')
    })

    it('renders slot content instead of description when default slot is used', () => {
        const wrapper = factory({}, {
            default: '<div class="custom-content">Custom Slot</div>',
        })

        expect(wrapper.find('.custom-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom Slot')
        expect(wrapper.text()).not.toContain('Sample Description')
    })

    it('renders ContainedIcon when icon prop is provided', () => {
        const wrapper = factory({ icon: 'mdi:check' })

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(true)
    })

    it('does not render check Icon if modelValue is false', () => {
        const wrapper = factory({ modelValue: false })

        expect(wrapper.findComponent(Icon).exists()).toBe(false)
    })

    it('renders check Icon if modelValue is true', () => {
        const wrapper = factory({ modelValue: true })

        expect(wrapper.findComponent(Icon).exists()).toBe(true)
    })

    it('adds active border class when selected', () => {
        const wrapper = factory({ modelValue: true })

        expect(wrapper.classes()).toContain('!border-border-primary-brand-active')
    })

    it('emits update:modelValue on card click in CARD mode', async () => {
        const wrapper = factory({ modelValue: false, selectMode: CardSelectionMode.CARD })

        await wrapper.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('does not emit update:modelValue when clicking ActionButton inside card', async () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.CARD,
            hasSecondaryBtn: true,
        })

        const button = wrapper.findComponent(ActionButton)
        await button.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('emits buttonClick when secondary ActionButton is clicked', async () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.CARD,
            hasSecondaryBtn: true,
        })

        const button = wrapper.findComponent(ActionButton)
        await button.trigger('click')

        expect(wrapper.emitted('buttonClick')).toBeTruthy()
    })

    it('emits update:modelValue when select button is clicked in BUTTON mode', async () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.BUTTON,
            hasSecondaryBtn: true,
        })

        const buttons = wrapper.findAllComponents(ActionButton)
        const selectButton = buttons[1] // secondary first, select second

        await selectButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('renders CardFooter when hasFooter is true', () => {
        const wrapper = factory({
            hasFooter: true,
            selectMode: CardSelectionMode.CARD,
        })

        expect(wrapper.findComponent(CardFooter).exists()).toBe(true)
    })

    it('renders footer slot when provided', () => {
        const wrapper = factory({}, {
            footer: '<div class="custom-footer">Footer Slot</div>',
        })

        const footer = wrapper.find('.custom-footer')
        expect(footer.exists()).toBe(true)
        expect(footer.text()).toBe('Footer Slot')
    })

    it('applies disabled class and disables ActionButtons', () => {
        const wrapper = factory({
            disabled: true,
            selectMode: CardSelectionMode.BUTTON,
        })

        const buttons = wrapper.findAllComponents(ActionButton)
        expect(buttons.length).toBeGreaterThan(0)
        buttons.forEach((btn) => {
            expect(btn.attributes('disabled')).toBeDefined()
        })

        expect(wrapper.classes()).toContain('cursor-not-allowed')
    })

    it('applies layout alignment class to CardHeader', () => {
        const wrapper = factory({ layoutAlign: Align.CENTER })
        const header = wrapper.findComponent(CardHeader)

        expect(header.classes()).toContain('items-center')
    })

    it('applies footer alignment class based on footerContentAlign', () => {
        const wrapper = factory({ footerContentAlign: Align.CENTER })
        const footer = wrapper.findComponent(CardFooter)

        expect(footer.classes()).toContain('justify-center')
    })

    it('renders only secondary button in CARD mode', () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.CARD,
            hasSecondaryBtn: true,
        })

        const buttons = wrapper.findAllComponents(ActionButton)
        expect(buttons).toHaveLength(1)
    })

    it('renders both buttons in BUTTON mode with secondary button enabled', () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.BUTTON,
            hasSecondaryBtn: true,
        })

        const buttons = wrapper.findAllComponents(ActionButton)
        expect(buttons).toHaveLength(2)
    })

    it('has role="checkbox" and aria-checked in CARD selection mode', () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.CARD,
            modelValue: true,
        })

        expect(wrapper.find('[role="checkbox"]').exists()).toBe(true)
        expect(wrapper.find('[role="checkbox"]').attributes('aria-checked')).toBe('true')
    })

    it('does not have role="checkbox" in BUTTON selection mode', () => {
        const wrapper = factory({
            selectMode: CardSelectionMode.BUTTON,
        })

        expect(wrapper.find('[role="checkbox"]').exists()).toBe(false)
    })
})
