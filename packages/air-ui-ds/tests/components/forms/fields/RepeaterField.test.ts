import { h } from 'vue'
import { mount } from '@vue/test-utils'
import RepeaterField from '~/components/forms/fields/RepeaterField.vue'
import ActionIconButton from '~/components/buttons/ActionIconButton.vue'
import ActionButton from '~/components/buttons/ActionButton.vue'
import { ButtonStyleType } from '~/models/enums/buttons'
import { RepeatingFieldSortingType } from '~/models/enums/formFields'
import { Position } from '@/models/enums/positions'
import { Orientation } from '~/models/enums/orientations'
import { FormValidationMode } from '~/models/enums/formValidations'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const factory = (props: Record<string, unknown> = {}) => {
    return mount(RepeaterField, {
        props: {
            id: 'repeater-field',
            modelValue: [{ name: 'Item 1' }],
            defaultValue: { name: '' },
            ...props,
        },
        slots: {
            default: ({ index }: { index: number }) => h('div', { class: 'row-content' }, `Row ${index + 1}`),
        },
    })
}

describe('RepeaterField.vue', () => {
    it('renders slot content for each item, passing item and index', () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })

        const rows = wrapper.findAll('.row-content')
        expect(rows).toHaveLength(2)
        expect(rows[0]?.text()).toBe('Row 1')
        expect(rows[1]?.text()).toBe('Row 2')
    })

    it('renders arbitrary slot content, not restricted to a fixed layout', () => {
        const wrapper = mount(RepeaterField, {
            props: {
                id: 'repeater-field',
                modelValue: [{ label: 'First' }],
                defaultValue: { label: '' },
            },
            slots: {
                default: ({ item }: { item: { label: string } }) => h('input', { class: 'custom-input', value: item.label }),
            },
        })

        expect(wrapper.find('.custom-input').exists()).toBe(true)
    })

    it('renders a default single item when modelValue is empty', () => {
        const wrapper = factory({ modelValue: [] })

        expect(wrapper.findAll('.row-content')).toHaveLength(1)
    })

    it('renders add action button with default aria label', async () => {
        const wrapper = factory()
        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAllComponents(ActionIconButton)
        expect(buttons[0]?.props('ariaLabel')).toBe('Add item')
    })

    it('renders remove action button with default aria label when multiple items exist', async () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })
        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAllComponents(ActionIconButton)
        expect(buttons).toHaveLength(3)
        const ariaLabels = buttons.map(button => button.props('ariaLabel'))
        expect(ariaLabels).toContain('Remove item')
    })

    it('supports custom aria labels for add/remove actions', async () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
            addItemAriaLabel: 'Add another row',
            removeItemAriaLabel: 'Delete this row',
        })
        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAllComponents(ActionIconButton)
        const ariaLabels = buttons.map(button => button.props('ariaLabel'))
        expect(ariaLabels).toContain('Delete this row')
        expect(ariaLabels).toContain('Add another row')
    })

    it('does not render the remove button when there is a single item', () => {
        const wrapper = factory({ modelValue: [{ name: 'A' }] })

        const ariaLabels = wrapper.findAllComponents(ActionIconButton).map(button => button.props('ariaLabel'))
        expect(ariaLabels).not.toContain('Remove item')
    })

    it('emits update:modelValue with an added item when clicking the add button', async () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }],
            defaultValue: { name: '' },
        })

        const addButton = wrapper.findAllComponents(ActionIconButton)[0]
        await addButton?.vm.$emit('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [[{ name: 'A' }, { name: '' }]],
        ])
    })

    it('emits update:modelValue with the item removed when clicking a remove button', async () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })

        const removeButton = wrapper.findAllComponents(ActionIconButton).find(button => button.props('ariaLabel') === 'Remove item')
        await removeButton?.vm.$emit('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [[{ name: 'B' }]],
        ])
    })

    it('uses neutral outlined style for add and delete soft style for remove', () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })

        const buttons = wrapper.findAllComponents(ActionIconButton)
        const removeButton = buttons.find(button => button.props('ariaLabel') === 'Remove item')
        const addButton = buttons.find(button => button.props('ariaLabel') === 'Add item')

        expect(removeButton?.props('styleType')).toBe(ButtonStyleType.DELETE_SOFT)
        expect(addButton?.props('styleType')).toBe(ButtonStyleType.NEUTRAL_OUTLINED)
    })

    it('disables action buttons when disabled prop is true', () => {
        const wrapper = factory({
            modelValue: [{ name: 'A' }, { name: 'B' }],
            disabled: true,
        })

        wrapper.findAllComponents(ActionIconButton).forEach(button => {
            expect(button.props('disabled')).toBe(true)
        })
    })

    it('exposes the field id to the default slot', () => {
        const receivedIds: unknown[] = []
        mount(RepeaterField, {
            props: {
                id: 'members',
                modelValue: [{ name: 'A' }],
                defaultValue: { name: '' },
            },
            slots: {
                default: ({ id }: { id: string }) => {
                    receivedIds.push(id)
                    return h('div', { class: 'row-content' })
                },
            },
        })

        expect(receivedIds).toEqual(['members'])
    })

    it('renders field label and help text', () => {
        const wrapper = factory({
            label: 'Members',
            helpText: 'Add one or more members',
        })

        const label = wrapper.find('label')
        const helpText = wrapper.find('p')

        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Members')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Add one or more members')
    })

    it('renders help text before the items when helpTextPosition is top', () => {
        const wrapper = factory({
            label: 'Members',
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

    it('applies error styling to the label and renders the error text', () => {
        const wrapper = factory({
            label: 'Members',
            error: 'At least one member is required',
        })

        const label = wrapper.find('label')
        expect(label.classes()).toContain('text-text-error')

        const helpText = wrapper.find('p')
        expect(helpText.text()).toBe('At least one member is required')
    })

    it('renders error text and emits update:error in blur mode when modelValue changes', async () => {
        const validator = vi.fn().mockReturnValue('Invalid members')
        const wrapper = factory({
            modelValue: [{ name: 'A' }],
            required: true,
            validator,
            error: 'Invalid members',
        })

        const helpText = wrapper.find('p')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Invalid members')

        await wrapper.setProps({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })

        expect(validator).toHaveBeenCalledWith([{ name: 'A' }, { name: 'B' }])
        expect(wrapper.emitted('update:error')).toEqual([['Invalid members']])
    })

    it('does not run the validator when required is false', async () => {
        const validator = vi.fn().mockReturnValue('Invalid members')
        const wrapper = factory({
            modelValue: [{ name: 'A' }],
            required: false,
            validator,
        })

        await wrapper.setProps({
            modelValue: [{ name: 'A' }, { name: 'B' }],
        })

        expect(validator).not.toHaveBeenCalled()
        expect(wrapper.emitted('update:error')).toBeUndefined()
    })

    it('applies dragPlaceholderClass to the placeholder root and dragPlaceholderTextClass to its text', async () => {
        const wrapper = factory({
            sortingType: RepeatingFieldSortingType.DRAG,
            modelValue: [{ name: 'A' }, { name: 'B' }, { name: 'C' }],
            dragPlaceholderClass: 'custom-placeholder-root',
            dragPlaceholderTextClass: 'custom-placeholder-text',
        })

        const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
        const rowContainers = wrapper.findAll('.flex.items-start.gap-4')
        const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

        await handles[0]?.trigger('dragstart', { dataTransfer })
        await rowContainers[1]?.trigger('dragover', { dataTransfer })

        const placeholder = wrapper.find('.border-dashed')
        expect(placeholder.classes()).toContain('custom-placeholder-root')

        const placeholderText = placeholder.find('span')
        expect(placeholderText.classes()).toContain('custom-placeholder-text')
    })

    describe('actionsOrientation', () => {
        it('defaults to vertical: icon action buttons hidden on mobile, text buttons shown as the mobile fallback', () => {
            const wrapper = factory({
                modelValue: [{ name: 'A' }, { name: 'B' }],
            })

            const verticalColumn = wrapper.find('.hidden.md\\:flex.flex-col.gap-2')
            expect(verticalColumn.exists()).toBe(true)

            const iconButtons = verticalColumn.findAllComponents(ActionIconButton)
            expect(iconButtons.length).toBeGreaterThan(0)

            const textButtons = wrapper.findAllComponents(ActionButton)
            expect(textButtons.length).toBeGreaterThan(0)
            textButtons.forEach(button => {
                expect(button.element.closest('.md\\:hidden')).not.toBeNull()
            })
        })

        it('shows full-width text action buttons at every breakpoint when horizontal', () => {
            const wrapper = factory({
                actionsOrientation: Orientation.HORIZONTAL,
                modelValue: [{ name: 'A' }, { name: 'B' }],
            })

            expect(wrapper.find('.hidden.md\\:flex.flex-col.gap-2').exists()).toBe(false)

            const textButtons = wrapper.findAllComponents(ActionButton)
            expect(textButtons.length).toBeGreaterThan(0)
            textButtons.forEach(button => {
                expect(button.props('isMobileFullWidth')).toBe(true)
                expect(button.element.closest('.md\\:hidden')).toBeNull()
            })
        })

        it('stacks the horizontal action buttons in a column on mobile', () => {
            const wrapper = factory({
                actionsOrientation: Orientation.HORIZONTAL,
                modelValue: [{ name: 'A' }, { name: 'B' }],
            })

            const row = wrapper.findAllComponents(ActionButton)[0]?.element.parentElement
            expect(row?.classList.contains('flex-col')).toBe(true)
            expect(row?.classList.contains('md:flex-row')).toBe(true)
        })

        it('uses ActionButton (not ActionIconButton) for move up/down in the horizontal row', () => {
            const wrapper = factory({
                actionsOrientation: Orientation.HORIZONTAL,
                sortingType: RepeatingFieldSortingType.BUTTONS,
                modelValue: [{ name: 'A' }, { name: 'B' }],
                moveUpButtonText: 'Move up',
                moveDownButtonText: 'Move down',
            })

            const texts = wrapper.findAllComponents(ActionButton).map(button => button.props('text'))
            expect(texts).toContain('Move up')
            expect(texts).toContain('Move down')
        })

        it('uses addButtonText and removeButtonText for the text action buttons', () => {
            const wrapper = factory({
                actionsOrientation: Orientation.HORIZONTAL,
                modelValue: [{ name: 'A' }, { name: 'B' }],
                addButtonText: 'Add row',
                removeButtonText: 'Remove row',
            })

            const texts = wrapper.findAllComponents(ActionButton).map(button => button.props('text'))
            expect(texts).toContain('Add row')
            expect(texts).toContain('Remove row')
        })
    })

    describe('sorting', () => {
        const threeItemsModelValue = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]

        // Move controls render as an icon-only ActionIconButton in the desktop
        // vertical column, and as a text ActionButton in the horizontal/mobile row.
        const findMoveButtons = (wrapper: ReturnType<typeof factory>, ariaLabel: string, text: string) => [
            ...wrapper.findAllComponents(ActionIconButton).filter(btn => btn.props('ariaLabel') === ariaLabel),
            ...wrapper.findAllComponents(ActionButton).filter(btn => btn.props('text') === text),
        ]

        it('renders no sorting controls when sortingType is none (default)', () => {
            const wrapper = factory({ modelValue: threeItemsModelValue })

            expect(findMoveButtons(wrapper, 'Move item up', 'Move up')).toHaveLength(0)
            expect(findMoveButtons(wrapper, 'Move item down', 'Move down')).toHaveLength(0)
            expect(wrapper.find('[draggable]').exists()).toBe(false)
        })

        it('renders up/down buttons for every item when sortingType is buttons', () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.BUTTONS,
                modelValue: threeItemsModelValue,
            })

            // 3 items x 2 (desktop vertical column + mobile fallback row) = 6
            expect(findMoveButtons(wrapper, 'Move item up', 'Move up')).toHaveLength(6)
            expect(findMoveButtons(wrapper, 'Move item down', 'Move down')).toHaveLength(6)
        })

        it('disables move-up on the first item and move-down on the last item', () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.BUTTONS,
                modelValue: threeItemsModelValue,
            })

            const moveUpButtons = findMoveButtons(wrapper, 'Move item up', 'Move up')
            const moveDownButtons = findMoveButtons(wrapper, 'Move item down', 'Move down')

            expect(moveUpButtons.filter(btn => btn.props('disabled') === true)).toHaveLength(2)
            expect(moveUpButtons.filter(btn => btn.props('disabled') === false)).toHaveLength(4)
            expect(moveDownButtons.filter(btn => btn.props('disabled') === true)).toHaveLength(2)
            expect(moveDownButtons.filter(btn => btn.props('disabled') === false)).toHaveLength(4)
        })

        it('emits update:modelValue with reordered items when clicking move down', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.BUTTONS,
                modelValue: threeItemsModelValue,
            })

            const moveDownButtons = findMoveButtons(wrapper, 'Move item down', 'Move down')
            await moveDownButtons[0]?.vm.$emit('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'B' }, { name: 'A' }, { name: 'C' }]],
            ])
        })

        it('emits update:modelValue with reordered items when clicking move up', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.BUTTONS,
                modelValue: threeItemsModelValue,
            })

            // findMoveButtons concatenates all desktop ActionIconButton matches first
            // (one per row), then all mobile/horizontal ActionButton matches (one per
            // row) — so index 1 is row 1's desktop move-up button.
            const moveUpButtons = findMoveButtons(wrapper, 'Move item up', 'Move up')
            await moveUpButtons[1]?.vm.$emit('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'B' }, { name: 'A' }, { name: 'C' }]],
            ])
        })

        it('disables move up/down buttons when field is disabled', () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.BUTTONS,
                disabled: true,
                modelValue: threeItemsModelValue,
            })

            const moveButtons = [
                ...findMoveButtons(wrapper, 'Move item up', 'Move up'),
                ...findMoveButtons(wrapper, 'Move item down', 'Move down'),
            ]

            expect(moveButtons.length).toBeGreaterThan(0)
            moveButtons.forEach(btn => expect(btn.props('disabled')).toBe(true))
        })

        it('renders a draggable handle for every item when sortingType is drag', () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: [{ name: 'A' }, { name: 'B' }],
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            expect(handles).toHaveLength(2)
            expect(handles[0]?.attributes('draggable')).toBe('true')
        })

        it('does not allow dragging the handle when field is disabled', () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                disabled: true,
                modelValue: [{ name: 'A' }, { name: 'B' }],
            })

            const handle = wrapper.find('button[aria-label="Drag to reorder item"]')
            expect(handle.attributes('draggable')).toBe('false')
        })

        it('does not render a placeholder row without an active drag', () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: threeItemsModelValue,
            })

            expect(wrapper.find('.border-dashed').exists()).toBe(false)
        })

        it('renders a dashed placeholder row at the drag-over position', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: threeItemsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            const rowContainers = wrapper.findAll('.flex.items-start.gap-4')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[0]?.trigger('dragstart', { dataTransfer })
            await rowContainers[1]?.trigger('dragover', { dataTransfer })

            expect(wrapper.find('.border-dashed').exists()).toBe(true)
        })

        it('reorders when dragging an item down and dropping on a later item', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: threeItemsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            const rowContainers = wrapper.findAll('.flex.items-start.gap-4')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[0]?.trigger('dragstart', { dataTransfer })
            await rowContainers[2]?.trigger('dragover', { dataTransfer })
            await rowContainers[2]?.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'B' }, { name: 'A' }, { name: 'C' }]],
            ])
        })

        it('reorders when dragging an item up and dropping on an earlier item', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: threeItemsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            const rowContainers = wrapper.findAll('.flex.items-start.gap-4')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[2]?.trigger('dragstart', { dataTransfer })
            await rowContainers[0]?.trigger('dragover', { dataTransfer })
            await rowContainers[0]?.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'C' }, { name: 'A' }, { name: 'B' }]],
            ])
        })

        it('drops an item into the last position via the trailing drop zone', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: threeItemsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[0]?.trigger('dragstart', { dataTransfer })

            const trailingDropZone = wrapper.findAll('.w-full.flex.flex-col.gap-4 > div').at(-1)
            await trailingDropZone?.trigger('dragover', { dataTransfer })
            await trailingDropZone?.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'B' }, { name: 'C' }, { name: 'A' }]],
            ])
        })

        it('swaps two items via drag, including into the last position', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: [{ name: 'A' }, { name: 'B' }],
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            const rowContainers = wrapper.findAll('.flex.items-start.gap-4')
            const dataTransfer = { setData: vi.fn(), effectAllowed: '' }

            await handles[0]?.trigger('dragstart', { dataTransfer })

            const trailingDropZone = wrapper.findAll('.w-full.flex.flex-col.gap-4 > div').at(-1)
            await rowContainers[1]?.trigger('dragover', { dataTransfer })
            await trailingDropZone?.trigger('dragover', { dataTransfer })
            await trailingDropZone?.trigger('drop', { dataTransfer })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'B' }, { name: 'A' }]],
            ])
        })

        it('reorders via ArrowUp/ArrowDown when the drag handle is focused', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                modelValue: threeItemsModelValue,
            })

            const handles = wrapper.findAll('button[aria-label="Drag to reorder item"]')
            await handles[1]?.trigger('keydown', { key: 'ArrowUp' })

            expect(wrapper.emitted('update:modelValue')).toEqual([
                [[{ name: 'B' }, { name: 'A' }, { name: 'C' }]],
            ])
        })

        it('does not reorder via keyboard when the field is disabled', async () => {
            const wrapper = factory({
                sortingType: RepeatingFieldSortingType.DRAG,
                disabled: true,
                modelValue: threeItemsModelValue,
            })

            const handle = wrapper.find('button[aria-label="Drag to reorder item"]')
            await handle.trigger('keydown', { key: 'ArrowDown' })

            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
    })
})
