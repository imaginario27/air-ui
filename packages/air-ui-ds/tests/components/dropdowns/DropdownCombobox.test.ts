import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import DropdownCombobox from '@/components/dropdowns/DropdownCombobox.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import { useDSConfig } from '@/composables/useDSConfig'

const options = [
    { text: 'Apple', value: 'apple' },
    { text: 'Banana', value: 'banana' },
    { text: 'Cherry', value: 'cherry', disabled: true },
    { text: 'Date', value: 'date' },
]

// Mimics the manual-trigger DropdownMenu API (isOpen/open/close/toggle) the combobox relies on
const DropdownMenuStub = defineComponent({
    setup(_, { expose }) {
        const isOpen = ref(false)
        expose({
            isOpen,
            open: () => (isOpen.value = true),
            close: () => (isOpen.value = false),
            toggle: () => (isOpen.value = !isOpen.value),
        })
        return { isOpen }
    },
    template: `
        <div>
            <slot name="activator" :isOpen="isOpen" />
            <div v-if="isOpen"><slot name="items" /></div>
        </div>
    `,
})

const factory = (props: Record<string, any> = {}) =>
    mount(DropdownCombobox, {
        props: { id: 'combobox', options, ...props },
        global: { stubs: { DropdownMenu: DropdownMenuStub } },
        attachTo: document.body,
    })

const optionTexts = (wrapper: ReturnType<typeof factory>) =>
    wrapper.findAll('[role="option"]').map((option) => option.text())

describe('DropdownCombobox.vue', () => {
    it('renders a combobox input with the placeholder', () => {
        const wrapper = factory({ placeholder: 'Pick a fruit' })
        const input = wrapper.find('input')

        expect(input.attributes('role')).toBe('combobox')
        expect(input.attributes('id')).toBe('combobox')
        expect(input.attributes('placeholder')).toBe('Pick a fruit')
        expect(input.attributes('aria-expanded')).toBe('false')
    })

    it('shows the label of the selected option in the input', () => {
        const wrapper = factory({ modelValue: 'banana' })

        expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Banana')
    })

    it('updates the input when modelValue changes', async () => {
        const wrapper = factory({ modelValue: 'banana' })
        await wrapper.setProps({ modelValue: 'date' })

        expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Date')
    })

    it('opens the list when the input is clicked', async () => {
        const wrapper = factory()
        await wrapper.find('input').trigger('click')

        expect(wrapper.find('input').attributes('aria-expanded')).toBe('true')
        expect(optionTexts(wrapper)).toEqual(['Apple', 'Banana', 'Cherry', 'Date'])
    })

    it('filters options while typing', async () => {
        const wrapper = factory()
        await wrapper.find('input').setValue('an')

        expect(optionTexts(wrapper)).toEqual(['Banana'])
    })

    it('shows the no results text when nothing matches', async () => {
        const wrapper = factory({ noResultsFoundText: 'Nothing here' })
        await wrapper.find('input').setValue('zzz')

        expect(wrapper.text()).toContain('Nothing here')
    })

    it('keeps every option when filterLocally is false', async () => {
        const wrapper = factory({ filterLocally: false })
        await wrapper.find('input').setValue('an')

        expect(optionTexts(wrapper)).toHaveLength(4)
    })

    it('emits update:modelValue and shows the label when an option is clicked', async () => {
        const wrapper = factory()
        await wrapper.find('input').trigger('click')
        await wrapper.findAll('[role="option"]')[1]!.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([['banana']])
        expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Banana')
        expect(wrapper.find('input').attributes('aria-expanded')).toBe('false')
    })

    it('does not select disabled options', async () => {
        const wrapper = factory()
        await wrapper.find('input').trigger('click')
        await wrapper.findAll('[role="option"]')[2]!.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('marks the selected option with aria-selected', async () => {
        const wrapper = factory({ modelValue: 'apple' })
        await wrapper.find('input').trigger('click')

        const selected = wrapper.findAll('[role="option"]').map((option) => option.attributes('aria-selected'))
        expect(selected).toEqual(['true', 'false', 'false', 'false'])
    })

    it('deselects the selected option when allowDeselect is true', async () => {
        const wrapper = factory({ modelValue: 'apple', allowDeselect: true })
        await wrapper.find('input').trigger('click')
        await wrapper.findAll('[role="option"]')[0]!.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[null]])
    })

    describe('keyboard', () => {
        it('opens with ArrowDown and selects the highlighted option with Enter', async () => {
            const wrapper = factory()
            const input = wrapper.find('input')

            await input.trigger('keydown', { key: 'ArrowDown' })
            expect(input.attributes('aria-expanded')).toBe('true')
            expect(input.attributes('aria-activedescendant')).toBe('combobox-option-0')

            await input.trigger('keydown', { key: 'Enter' })
            expect(wrapper.emitted('update:modelValue')).toEqual([['apple']])
        })

        it('skips disabled options when moving the highlight', async () => {
            const wrapper = factory()
            const input = wrapper.find('input')

            await input.trigger('keydown', { key: 'ArrowDown' })
            await input.trigger('keydown', { key: 'ArrowDown' })
            await input.trigger('keydown', { key: 'ArrowDown' })

            expect(input.attributes('aria-activedescendant')).toBe('combobox-option-3')
        })

        it('wraps around with ArrowUp', async () => {
            const wrapper = factory()
            const input = wrapper.find('input')

            await input.trigger('keydown', { key: 'ArrowUp' })

            expect(input.attributes('aria-activedescendant')).toBe('combobox-option-3')
        })

        it('highlights the current selection when opening', async () => {
            const wrapper = factory({ modelValue: 'banana' })
            const input = wrapper.find('input')

            await input.trigger('keydown', { key: 'ArrowDown' })

            expect(input.attributes('aria-activedescendant')).toBe('combobox-option-1')
        })

        it('closes with Escape and restores the selected label', async () => {
            const wrapper = factory({ modelValue: 'banana' })
            const input = wrapper.find('input')

            await input.setValue('che')
            await input.trigger('keydown', { key: 'Escape' })

            expect((input.element as HTMLInputElement).value).toBe('Banana')
            expect(input.attributes('aria-expanded')).toBe('false')
        })
    })

    describe('blur', () => {
        it('restores the selected label and closes when leaving the input', async () => {
            const wrapper = factory({ modelValue: 'banana' })
            const input = wrapper.find('input')

            await input.setValue('che')
            await input.trigger('blur')

            expect((input.element as HTMLInputElement).value).toBe('Banana')
            expect(input.attributes('aria-expanded')).toBe('false')
        })

        it('clears the input when nothing is selected', async () => {
            const wrapper = factory()
            const input = wrapper.find('input')

            await input.setValue('che')
            await input.trigger('blur')

            expect((input.element as HTMLInputElement).value).toBe('')
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })

    describe('multiple', () => {
        it('adds and removes values and keeps the list open', async () => {
            const wrapper = factory({ multiple: true, modelValue: ['apple'] })
            await wrapper.find('input').trigger('click')

            await wrapper.findAll('[role="option"]')[1]!.trigger('click')
            await wrapper.findAll('[role="option"]')[0]!.trigger('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([[['apple', 'banana']], [[]]])
            expect(wrapper.find('input').attributes('aria-expanded')).toBe('true')
        })

        it('keeps the input as a search box and summarizes selections in the placeholder', () => {
            const wrapper = factory({ multiple: true, modelValue: ['apple', 'banana'] })
            const input = wrapper.find('input')

            expect((input.element as HTMLInputElement).value).toBe('')
            expect(input.attributes('placeholder')).toBe('Apple, Banana')
        })

        it('flags the listbox as multiselectable', async () => {
            const wrapper = factory({ multiple: true })
            await wrapper.find('input').trigger('click')

            expect(wrapper.find('[role="listbox"]').attributes('aria-multiselectable')).toBe('true')
        })
    })

    describe('clear button', () => {
        it('clears a single selection', async () => {
            const wrapper = factory({ modelValue: 'apple' })
            await wrapper.findComponent(ActionIconButton).trigger('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([[null]])
            expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
        })

        it('clears a multiple selection', async () => {
            const wrapper = factory({ multiple: true, modelValue: ['apple'] })
            await wrapper.findComponent(ActionIconButton).trigger('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([[[]]])
        })

        it('is hidden when there is nothing to clear, when clearable is false and when disabled', () => {
            expect(factory().findComponent(ActionIconButton).exists()).toBe(false)
            expect(factory({ modelValue: 'apple', clearable: false }).findComponent(ActionIconButton).exists()).toBe(
                false,
            )
            expect(factory({ modelValue: 'apple', disabled: true }).findComponent(ActionIconButton).exists()).toBe(
                false,
            )
        })
    })

    describe('allowCustomValue', () => {
        it('emits the typed text when Enter is pressed', async () => {
            const wrapper = factory({ allowCustomValue: true })
            const input = wrapper.find('input')

            await input.setValue('Elderberry')
            await input.trigger('keydown', { key: 'Enter' })

            expect(wrapper.emitted('update:modelValue')).toEqual([['Elderberry']])
        })

        it('emits the typed text on blur', async () => {
            const wrapper = factory({ allowCustomValue: true })
            const input = wrapper.find('input')

            await input.setValue('Elderberry')
            await input.trigger('blur')

            expect(wrapper.emitted('update:modelValue')).toEqual([['Elderberry']])
        })

        it('resolves a typed label to the matching option value', async () => {
            const wrapper = factory({ allowCustomValue: true })
            const input = wrapper.find('input')

            await input.setValue('banana')
            await input.trigger('blur')

            expect(wrapper.emitted('update:modelValue')).toEqual([['banana']])
        })

        it('shows a custom value that is not part of the options', () => {
            const wrapper = factory({ allowCustomValue: true, modelValue: 'Elderberry' })

            expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Elderberry')
        })

        it('adds custom values to the selection in multiple mode', async () => {
            const wrapper = factory({ allowCustomValue: true, multiple: true, modelValue: ['apple'] })
            const input = wrapper.find('input')

            await input.setValue('Elderberry')
            await input.trigger('keydown', { key: 'Enter' })

            expect(wrapper.emitted('update:modelValue')).toEqual([[['apple', 'Elderberry']]])
            expect((input.element as HTMLInputElement).value).toBe('')
        })

        it('ignores typed text that is not an option when allowCustomValue is false', async () => {
            const wrapper = factory()
            const input = wrapper.find('input')

            await input.setValue('Elderberry')
            await input.trigger('keydown', { key: 'Enter' })

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })

    describe('search event', () => {
        beforeEach(() => vi.useFakeTimers())
        afterEach(() => vi.useRealTimers())

        it('emits search after the debounce delay', async () => {
            const wrapper = factory({ searchDebounce: 300 })
            const input = wrapper.find('input')

            await input.setValue('a')
            await input.setValue('ap')
            expect(wrapper.emitted('search')).toBeUndefined()

            vi.advanceTimersByTime(300)

            expect(wrapper.emitted('search')).toEqual([['ap']])
        })
    })

    describe('loading and disabled', () => {
        it('shows the loading text instead of the options while loading', async () => {
            const wrapper = factory({ isLoading: true, loadingText: 'Fetching...' })
            await wrapper.find('input').trigger('click')

            expect(wrapper.text()).toContain('Fetching...')
            expect(wrapper.findAll('[role="option"]')).toHaveLength(0)
        })

        it('disables the input and does not open', async () => {
            const wrapper = factory({ disabled: true })
            const input = wrapper.find('input')

            await input.trigger('click')

            expect(input.attributes('disabled')).toBeDefined()
            expect(input.attributes('aria-expanded')).toBe('false')
        })
    })

    describe('sections', () => {
        const sectioned = [
            { text: 'Fruits', value: 'section-fruits', sectionTitle: true },
            ...options.filter((option) => !option.disabled),
        ]

        it('renders section titles when there is no query', async () => {
            const wrapper = factory({ options: sectioned })
            await wrapper.find('input').trigger('click')

            expect(wrapper.text()).toContain('Fruits')
            expect(optionTexts(wrapper)).toEqual(['Apple', 'Banana', 'Date'])
        })

        it('drops section titles while filtering', async () => {
            const wrapper = factory({ options: sectioned })
            await wrapper.find('input').setValue('fru')

            expect(wrapper.text()).not.toContain('Fruits')
        })
    })

    describe('global config', () => {
        afterEach(() => {
            const config = useDSConfig()
            config.forms.selectPlaceholderText = () => 'Select an option'
            config.forms.noResultsText = () => 'No results found'
        })

        it('falls back to the global placeholder', () => {
            expect(factory().find('input').attributes('placeholder')).toBe('Select an option')
        })

        it('lets the placeholder prop win over a global override', () => {
            useDSConfig().forms.selectPlaceholderText = () => 'Elige una opción'

            expect(factory().find('input').attributes('placeholder')).toBe('Elige una opción')
            expect(factory({ placeholder: 'Pick one' }).find('input').attributes('placeholder')).toBe('Pick one')
        })

        it('uses the global no results text', async () => {
            useDSConfig().forms.noResultsText = () => 'Sin resultados'

            const wrapper = factory()
            await wrapper.find('input').setValue('zzz')
            await nextTick()

            expect(wrapper.text()).toContain('Sin resultados')
        })
    })
})
