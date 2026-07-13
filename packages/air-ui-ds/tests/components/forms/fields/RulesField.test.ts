import { mount } from '@vue/test-utils'
import RulesField from '~/components/forms/fields/RulesField.vue'
import SelectField from '~/components/forms/fields/SelectField.vue'
import InputField from '~/components/forms/fields/InputField.vue'
import ActionIconButton from '~/components/buttons/ActionIconButton.vue'
import { Position } from '@/models/enums/positions'
import ActionButton from '~/components/buttons/ActionButton.vue'
import { FormValidationMode } from '~/models/enums/formValidations'
import { ButtonStyleType } from '~/models/enums/buttons'
import { RulesFieldSortingType } from '~/models/enums/formFields'
import type { SelectOption } from '~/models/types/selects'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const itemOptions = [
    { value: 'age', text: 'Age', inputType: 'number' as const },
    { value: 'status', text: 'Status', inputType: 'text' as const },
]

const operatorOptions: SelectOption[] = [
    { value: 'eq', text: 'Equals', applicableTypes: ['text', 'number', 'date'] },
    { value: 'gt', text: 'Greater than', applicableTypes: ['number', 'date'] },
]

const factory = (props: Record<string, unknown> = {}) => {
    return mount(RulesField, {
        props: {
            id: 'rules-field',
            itemOptions,
            operatorOptions,
            ...props,
        },
    })
}

describe('RulesField.vue', () => {
    it('renders field label and help text', () => {
        const wrapper = factory({
            label: 'Rules',
            helpText: 'Use conditions to filter data',
        })

        const label = wrapper.find('label')
        const helpText = wrapper.find('p')

        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Rules')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Use conditions to filter data')
    })

    it('renders help text before the rules rows when helpTextPosition is top', () => {
        const wrapper = factory({
            label: 'Conditions',
            helpText: 'Add filters',
            helpTextPosition: Position.TOP,
        })

        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Add filters')
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const labelIdx = children.findIndex(el => el.tagName === 'LABEL')
        expect(helpIdx).toBeGreaterThan(labelIdx)
        expect(helpIdx).toBeLessThan(children.length - 1)
    })

    it('renders a default single row when modelValue is empty', () => {
        const wrapper = factory({ modelValue: [] })

        expect(wrapper.findAllComponents(SelectField)).toHaveLength(2)
        expect(wrapper.findAllComponents(InputField)).toHaveLength(1)
        expect(wrapper.findAllComponents(ActionIconButton)).toHaveLength(1)
    })

    it('applies custom placeholders to select and input fields', () => {
        const wrapper = factory({
            modelValue: [{ item: null, operator: null, value: '' }],
            itemPlaceholder: 'Pick item',
            operatorPlaceholder: 'Pick operator',
            valuePlaceholder: 'Type value',
        })

        const selects = wrapper.findAllComponents(SelectField)
        const input = wrapper.findComponent(InputField)

        expect(selects[0]?.props('placeholder')).toBe('Pick item')
        expect(selects[1]?.props('placeholder')).toBe('Pick operator')
        expect(input.props('placeholder')).toBe('Type value')
    })

    it('forwards per-row type to each row InputField', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'gt', value: 21, type: 'number' },
                { item: 'createdAt', operator: 'eq', value: '2026-01-01', type: 'date' },
            ],
        })

        const inputs = wrapper.findAllComponents(InputField)

        expect(inputs).toHaveLength(2)
        expect(inputs[0]?.props('type')).toBe('number')
        expect(inputs[1]?.props('type')).toBe('date')
    })

    it('uses transparent neutral style for plus icon and transparent delete style for minus icon', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '10' },
                { item: 'status', operator: 'gt', value: 'active' },
            ],
        })

        const rowButtons = wrapper.findAllComponents(ActionIconButton)

        expect(rowButtons).toHaveLength(2)
        expect(rowButtons[0]?.props('icon')).toBe('mdi:minus-circle-outline')
        expect(rowButtons[0]?.props('styleType')).toBe(ButtonStyleType.DELETE_TRANSPARENT)
        expect(rowButtons[1]?.props('icon')).toBe('mdi:plus-circle-outline')
        expect(rowButtons[1]?.props('styleType')).toBe(ButtonStyleType.NEUTRAL_TRANSPARENT)
    })

    it('allows overriding plus and minus icons via props', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '10' },
                { item: 'status', operator: 'gt', value: 'active' },
            ],
            addIcon: 'mdi:plus',
            removeIcon: 'mdi:minus',
        })

        const rowButtons = wrapper.findAllComponents(ActionIconButton)

        expect(rowButtons).toHaveLength(2)
        expect(rowButtons[0]?.props('icon')).toBe('mdi:minus')
        expect(rowButtons[0]?.props('styleType')).toBe(ButtonStyleType.DELETE_TRANSPARENT)
        expect(rowButtons[1]?.props('icon')).toBe('mdi:plus')
        expect(rowButtons[1]?.props('styleType')).toBe(ButtonStyleType.NEUTRAL_TRANSPARENT)
    })

    it('uses default mobile action button texts', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '10' },
                { item: 'status', operator: 'gt', value: 'active' },
            ],
        })

        const mobileButtons = wrapper.findAllComponents(ActionButton)

        expect(mobileButtons).toHaveLength(2)
        expect(mobileButtons[0]?.props('text')).toBe('Remove rule')
        expect(mobileButtons[1]?.props('text')).toBe('Add rule')
    })

    it('allows overriding mobile action button texts via props', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '10' },
                { item: 'status', operator: 'gt', value: 'active' },
            ],
            mobileBtnAddText: 'Add condition',
            mobileBtnRemoveText: 'Remove condition',
        })

        const mobileButtons = wrapper.findAllComponents(ActionButton)

        expect(mobileButtons).toHaveLength(2)
        expect(mobileButtons[0]?.props('text')).toBe('Remove condition')
        expect(mobileButtons[1]?.props('text')).toBe('Add condition')
    })

    it('does not emit update:modelValue when changing item, operator, or value directly', async () => {
        const wrapper = factory({
            modelValue: [{ item: null, operator: null, value: '' }],
        })

        const selects = wrapper.findAllComponents(SelectField)
        const input = wrapper.findComponent(InputField)

        await selects[0]?.vm.$emit('update:modelValue', 'age')
        await selects[1]?.vm.$emit('update:modelValue', 'eq')
        await input.vm.$emit('update:modelValue', '18')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('commits accumulated local changes to update:modelValue on Enter', async () => {
        const wrapper = factory({
            modelValue: [{ item: null, operator: null, value: '' }],
        })

        const selects = wrapper.findAllComponents(SelectField)
        await selects[0]?.vm.$emit('update:modelValue', 'age')
        await selects[1]?.vm.$emit('update:modelValue', 'eq')

        const input = wrapper.findComponent(InputField)
        await input.vm.$emit('update:modelValue', '18')
        await input.trigger('keydown.enter')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [[
                { item: 'age', operator: 'eq', value: '18', type: 'number' },
                { item: null, operator: null, value: '', type: 'text' },
            ]],
        ])
    })

    it('updates row input type locally when item changes, without emitting', async () => {
        const wrapper = factory({
            modelValue: [{ item: null, operator: null, value: '' }],
        })

        const selects = wrapper.findAllComponents(SelectField)
        await selects[0]?.vm.$emit('update:modelValue', 'age')

        const input = wrapper.findComponent(InputField)
        expect(input.props('type')).toBe('number')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('filters operators based on input type', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '30', type: 'number' },
                { item: 'status', operator: 'eq', value: 'active', type: 'text' },
            ],
        })

        const selects = wrapper.findAllComponents(SelectField)
        
        // Number type row should only show 'eq' and 'gt' (not 'gt' since it has number in applicableTypes)
        const numberRowOperators = selects[1]?.props('options') as SelectOption[]
        expect(numberRowOperators).toEqual([
            { value: 'eq', text: 'Equals', applicableTypes: ['text', 'number', 'date'] },
            { value: 'gt', text: 'Greater than', applicableTypes: ['number', 'date'] },
        ])

        // Text type row should only show 'eq' (not 'gt' since text is not in applicableTypes)
        const textRowOperators = selects[3]?.props('options') as SelectOption[]
        expect(textRowOperators).toEqual([
            { value: 'eq', text: 'Equals', applicableTypes: ['text', 'number', 'date'] },
        ])
    })

    it('adds a new rule when clicking the plus icon button on the last row', async () => {
        const wrapper = factory({
            modelValue: [{ item: 'age', operator: 'eq', value: '30' }],
        })

        const rowButtons = wrapper.findAllComponents(ActionIconButton)
        await rowButtons[0]?.vm.$emit('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [[
                { item: 'age', operator: 'eq', value: '30' },
                { item: null, operator: null, value: '', type: 'text' },
            ]],
        ])
    })

    it('handles row action icon button for remove and add', async () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '30' },
                { item: 'status', operator: 'eq', value: 'active' },
            ],
        })

        const rowButtons = wrapper.findAllComponents(ActionIconButton)
        await rowButtons[0]?.vm.$emit('click')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
            [{ item: 'status', operator: 'eq', value: 'active' }],
        ])

        const remainingButton = wrapper.findAllComponents(ActionIconButton)[0]
        await remainingButton?.vm.$emit('click')

        expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([
            [
                { item: 'status', operator: 'eq', value: 'active' },
                { item: null, operator: null, value: '', type: 'text' },
            ],
        ])
    })

    it('adds a new rule when pressing Enter in the last row value input', async () => {
        const wrapper = factory({
            modelValue: [{ item: 'age', operator: 'eq', value: '30' }],
        })

        const inputs = wrapper.findAllComponents(InputField)
        await inputs[0]?.trigger('keydown.enter')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [[
                { item: 'age', operator: 'eq', value: '30' },
                { item: null, operator: null, value: '', type: 'text' },
            ]],
        ])
    })

    it('commits without adding a rule when pressing Enter in a non-last row value input', async () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '30' },
                { item: 'status', operator: 'eq', value: 'active' },
            ],
        })

        const inputs = wrapper.findAllComponents(InputField)
        await inputs[0]?.trigger('keydown.enter')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [[
                { item: 'age', operator: 'eq', value: '30' },
                { item: 'status', operator: 'eq', value: 'active' },
            ]],
        ])
    })

    it('does not add a rule when pressing Enter and field is disabled', async () => {
        const wrapper = factory({
            modelValue: [{ item: 'age', operator: 'eq', value: '30' }],
            disabled: true,
        })

        const inputs = wrapper.findAllComponents(InputField)
        await inputs[0]?.trigger('keydown.enter')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not add a rule when maxRules is reached using add action', async () => {
        const wrapper = factory({
            modelValue: [{ item: 'age', operator: 'eq', value: '30' }],
            maxRules: 1,
        })

        const rowButtons = wrapper.findAllComponents(ActionIconButton)
        expect(rowButtons[0]?.props('disabled')).toBe(true)

        await rowButtons[0]?.vm.$emit('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not add a rule when maxRules is reached using Enter key', async () => {
        const wrapper = factory({
            modelValue: [{ item: 'age', operator: 'eq', value: '30' }],
            maxRules: 1,
        })

        const inputs = wrapper.findAllComponents(InputField)
        await inputs[0]?.trigger('keydown.enter')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('renders error text and emits update:error in blur mode when modelValue changes', async () => {
        const validator = vi.fn().mockReturnValue('Invalid rules')
        const wrapper = factory({
            modelValue: [{ item: null, operator: null, value: '' }],
            required: true,
            validator,
            error: 'Invalid rules',
        })

        const helpText = wrapper.find('p')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Invalid rules')

        await wrapper.setProps({
            modelValue: [{ item: 'age', operator: 'eq', value: '18' }],
        })

        expect(validator).toHaveBeenCalledWith([{ item: 'age', operator: 'eq', value: '18' }])
        expect(wrapper.emitted('update:error')).toEqual([['Invalid rules']])
    })

    it('forwards aria labels to row fields and action buttons', () => {
        const wrapper = factory({
            modelValue: [
                { item: 'age', operator: 'eq', value: '10' },
                { item: 'status', operator: 'eq', value: 'active' },
            ],
        })

        const selects = wrapper.findAllComponents(SelectField)
        const input = wrapper.findComponent(InputField)
        const rowButtons = wrapper.findAllComponents(ActionIconButton)

        expect(selects[0]?.props('ariaLabel')).toBe('Rule item 1')
        expect(selects[1]?.props('ariaLabel')).toBe('Rule operator 1')
        expect(input.props('ariaLabel')).toBe('Rule value 1')

        expect(rowButtons[0]?.props('ariaLabel')).toBe('Remove rule')
        expect(rowButtons[1]?.props('ariaLabel')).toBe('Add rule')
    })

    it('passes transparentInputs to SelectField and InputField children as transparent', () => {
        const wrapper = factory({ transparentInputs: true })

        wrapper.findAllComponents(SelectField).forEach(field => {
            expect(field.props('transparent')).toBe(true)
        })
        wrapper.findAllComponents(InputField).forEach(field => {
            expect(field.props('transparent')).toBe(true)
        })
    })

    it('passes transparent false by default to child fields', () => {
        const wrapper = factory()

        wrapper.findAllComponents(SelectField).forEach(field => {
            expect(field.props('transparent')).toBe(false)
        })
        wrapper.findAllComponents(InputField).forEach(field => {
            expect(field.props('transparent')).toBe(false)
        })
    })

    describe('sorting', () => {
        const threeRowsModelValue = [
            { item: 'age', operator: 'eq', value: '10' },
            { item: 'status', operator: 'eq', value: 'active' },
            { item: 'city', operator: 'eq', value: 'ny' },
        ]

        // 3 sortable rows (age, status, city) + 1 trailing add-row, so a drag
        // can move a row across more than one position.
        const fourRowsModelValue = [
            { item: 'age', operator: 'eq', value: '10' },
            { item: 'status', operator: 'eq', value: 'active' },
            { item: 'city', operator: 'eq', value: 'ny' },
            { item: null, operator: null, value: '' },
        ]

        const findMoveButtons = (wrapper: ReturnType<typeof factory>, ariaLabel: string) =>
            wrapper.findAllComponents(ActionIconButton).filter(btn => btn.props('ariaLabel') === ariaLabel)

        it('renders no sorting controls when sortingType is none (default)', () => {
            const wrapper = factory({
                modelValue: [
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'status', operator: 'eq', value: 'active' },
                ],
            })

            expect(findMoveButtons(wrapper, 'Move rule up')).toHaveLength(0)
            expect(findMoveButtons(wrapper, 'Move rule down')).toHaveLength(0)
            expect(wrapper.find('[draggable]').exists()).toBe(false)
        })

        it('renders up/down buttons only for sortable rows when sortingType is buttons', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.BUTTONS,
                modelValue: threeRowsModelValue,
            })

            // 2 sortable rows (trailing add-row excluded) x 2 (desktop + mobile) = 4
            expect(findMoveButtons(wrapper, 'Move rule up')).toHaveLength(4)
            expect(findMoveButtons(wrapper, 'Move rule down')).toHaveLength(4)
        })

        it('does not render sorting controls for the trailing add-row', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.BUTTONS,
                modelValue: [{ item: 'age', operator: 'eq', value: '10' }],
            })

            expect(findMoveButtons(wrapper, 'Move rule up')).toHaveLength(0)
            expect(findMoveButtons(wrapper, 'Move rule down')).toHaveLength(0)
        })

        it('disables move-up on the first sortable row and move-down on the last sortable row', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.BUTTONS,
                modelValue: threeRowsModelValue,
            })

            const moveUpButtons = findMoveButtons(wrapper, 'Move rule up')
            const moveDownButtons = findMoveButtons(wrapper, 'Move rule down')

            expect(moveUpButtons.filter(btn => btn.props('disabled') === true)).toHaveLength(2)
            expect(moveUpButtons.filter(btn => btn.props('disabled') === false)).toHaveLength(2)
            expect(moveDownButtons.filter(btn => btn.props('disabled') === true)).toHaveLength(2)
            expect(moveDownButtons.filter(btn => btn.props('disabled') === false)).toHaveLength(2)
        })

        it('emits update:modelValue with reordered rules when clicking move down', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.BUTTONS,
                modelValue: threeRowsModelValue,
            })

            const moveDownButtons = findMoveButtons(wrapper, 'Move rule down')
            await moveDownButtons[0]?.vm.$emit('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[
                    { item: 'status', operator: 'eq', value: 'active' },
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'city', operator: 'eq', value: 'ny' },
                ]],
            ])
        })

        it('emits update:modelValue with reordered rules when clicking move up', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.BUTTONS,
                modelValue: threeRowsModelValue,
            })

            const moveUpButtons = findMoveButtons(wrapper, 'Move rule up')
            // moveUpButtons order is [row0-desktop, row0-mobile, row1-desktop, row1-mobile]
            await moveUpButtons[2]?.vm.$emit('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[
                    { item: 'status', operator: 'eq', value: 'active' },
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'city', operator: 'eq', value: 'ny' },
                ]],
            ])
        })

        it('disables move up/down buttons when field is disabled', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.BUTTONS,
                disabled: true,
                modelValue: threeRowsModelValue,
            })

            const moveButtons = [
                ...findMoveButtons(wrapper, 'Move rule up'),
                ...findMoveButtons(wrapper, 'Move rule down'),
            ]

            expect(moveButtons.length).toBeGreaterThan(0)
            moveButtons.forEach(btn => expect(btn.props('disabled')).toBe(true))
        })

        it('renders a draggable handle only on sortable rows when sortingType is drag', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: [
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'status', operator: 'eq', value: 'active' },
                ],
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder rule"]')
            expect(handles).toHaveLength(1)
            expect(handles[0]?.attributes('draggable')).toBe('true')
        })

        it('does not allow dragging the handle when field is disabled', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                disabled: true,
                modelValue: [
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'status', operator: 'eq', value: 'active' },
                ],
            })

            const handle = wrapper.find('button[aria-label="Drag to reorder rule"]')
            expect(handle.attributes('draggable')).toBe('false')
        })

        it('does not render a placeholder row without an active drag', () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: threeRowsModelValue,
            })

            expect(wrapper.find('.border-dashed').exists()).toBe(false)
        })

        it('renders a dashed placeholder row at the drag-over position', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: threeRowsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder rule"]')
            const rows = wrapper.findAll('.grid')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[0]?.trigger('dragstart', { dataTransfer })
            await rows[1]?.trigger('dragover', { dataTransfer })

            expect(wrapper.find('.border-dashed').exists()).toBe(true)
        })

        it('reorders when dragging a row down across multiple rows and dropping on a later row', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: fourRowsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder rule"]')
            const rows = wrapper.findAll('.grid')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            // Drag row 0 (age) down, hovering row 2 (city) - two positions away.
            await handles[0]?.trigger('dragstart', { dataTransfer })
            await rows[2]?.trigger('dragover', { dataTransfer })
            await rows[2]?.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[
                    { item: 'status', operator: 'eq', value: 'active' },
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'city', operator: 'eq', value: 'ny' },
                    { item: null, operator: null, value: '' },
                ]],
            ])
        })

        it('reorders when dragging a row up across multiple rows and dropping on an earlier row', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: fourRowsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder rule"]')
            const rows = wrapper.findAll('.grid')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            // Drag row 2 (city) up, hovering row 0 (age) - two positions away.
            await handles[2]?.trigger('dragstart', { dataTransfer })
            await rows[0]?.trigger('dragover', { dataTransfer })
            await rows[0]?.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[
                    { item: 'city', operator: 'eq', value: 'ny' },
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'status', operator: 'eq', value: 'active' },
                    { item: null, operator: null, value: '' },
                ]],
            ])
        })

        it('reorders when the drop lands on the placeholder itself, not just the row', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: fourRowsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder rule"]')
            const rows = wrapper.findAll('.grid')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[0]?.trigger('dragstart', { dataTransfer })
            await rows[2]?.trigger('dragover', { dataTransfer })

            const placeholder = wrapper.find('.border-dashed')
            expect(placeholder.exists()).toBe(true)

            // The mouse can end up over the placeholder (which now occupies
            // the layout space above the hovered row) instead of the row
            // itself - it must accept dragover/drop the same way the row does.
            await placeholder.trigger('dragover', { dataTransfer })
            await placeholder.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[
                    { item: 'status', operator: 'eq', value: 'active' },
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'city', operator: 'eq', value: 'ny' },
                    { item: null, operator: null, value: '' },
                ]],
            ])
        })

        it('reorders via ArrowUp/ArrowDown when the drag handle is focused', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                modelValue: threeRowsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder rule"]')

            await handles[1]?.trigger('keydown', { key: 'ArrowUp' })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[
                    { item: 'status', operator: 'eq', value: 'active' },
                    { item: 'age', operator: 'eq', value: '10' },
                    { item: 'city', operator: 'eq', value: 'ny' },
                ]],
            ])
        })

        it('does not reorder via keyboard when the field is disabled', async () => {
            const wrapper = factory({
                sortingType: RulesFieldSortingType.DRAG,
                disabled: true,
                modelValue: threeRowsModelValue,
            })

            const handle = wrapper.find('button[aria-label="Drag to reorder rule"]')
            await handle.trigger('keydown', { key: 'ArrowDown' })

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })
})
