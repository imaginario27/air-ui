import { mount, flushPromises } from '@vue/test-utils'
import TreeView from '~/components/tree-views/TreeView.vue'
import { TreeViewSelectionMode, TreeViewDropPosition } from '@/models/enums/tree-view'
import { SortOrder } from '@/models/enums/order'
import type { TreeViewNode } from '@/models/types/treeView'

const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
    { value: 'readme', label: 'README.md', disabled: true },
]

const factory = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) => {
    return mount(TreeView, {
        props: { nodes, ...props },
        slots,
        attachTo: document.body,
    })
}

const items = (wrapper: ReturnType<typeof factory>) => wrapper.findAll('[data-testid="tree-view-item"]')
const item = (wrapper: ReturnType<typeof factory>, value: string) => wrapper.find(`[data-value="${value}"]`)
// The more-actions menu is only mounted on a hovered / focused / active row
const arm = async (wrapper: ReturnType<typeof factory>, ...rowValues: string[]) => {
    for (const value of rowValues) {
        await item(wrapper, value).trigger('mouseenter')
    }
}
const values = (wrapper: ReturnType<typeof factory>) => items(wrapper).map(row => row.attributes('data-value'))

describe('TreeView', () => {
    describe('rendering', () => {
        it('renders only the root level when nothing is expanded', () => {
            const wrapper = factory()

            expect(wrapper.find('[role="tree"]').exists()).toBe(true)
            expect(values(wrapper)).toEqual(['src', 'package', 'readme'])
        })

        it('renders the children of expanded branches with level, size and position', () => {
            const wrapper = factory({ expandedValue: ['src'] })

            expect(values(wrapper)).toEqual(['src', 'app', 'index', 'package', 'readme'])
            expect(item(wrapper, 'src').attributes('aria-expanded')).toBe('true')
            expect(item(wrapper, 'src').attributes('aria-level')).toBe('1')
            expect(item(wrapper, 'index').attributes('aria-level')).toBe('2')
            expect(item(wrapper, 'index').attributes('aria-setsize')).toBe('2')
            expect(item(wrapper, 'index').attributes('aria-posinset')).toBe('2')
        })

        it('only marks branches with aria-expanded', () => {
            const wrapper = factory()

            expect(item(wrapper, 'src').attributes('aria-expanded')).toBe('false')
            expect(item(wrapper, 'package').attributes('aria-expanded')).toBeUndefined()
        })

        it('uses the aria label on the tree', () => {
            expect(factory({ ariaLabel: 'Files' }).find('[role="tree"]').attributes('aria-label')).toBe('Files')
        })

        it('renders folder and file icons by default and custom icons when provided', () => {
            const wrapper = factory({
                expandedValue: ['src'],
                nodes: [{ value: 'a', label: 'a', icon: 'mdi:star', children: [{ value: 'b', label: 'b' }] }, ...nodes],
            })

            expect(item(wrapper, 'a').html()).toContain('mdi:star')
            expect(item(wrapper, 'src').html()).toContain('mdi:folder-open-outline')
            expect(item(wrapper, 'package').html()).toContain('mdi:file-outline')
        })

        it('hides the node icons when showIcons is false', () => {
            const wrapper = factory({ showIcons: false })

            expect(item(wrapper, 'package').html()).not.toContain('mdi:file-outline')
        })

        it('renders one indent guide per level and none when disabled', () => {
            const guides = (props = {}) => item(factory({ expandedValue: ['src'], ...props }), 'app')
                .findAll('[data-testid="tree-view-indent-guide"]')

            expect(guides()).toHaveLength(1)
            expect(guides({ showIndentGuides: false })).toHaveLength(0)
        })

        it('renders the label slot with the node and state', () => {
            const wrapper = factory({}, {
                label: '<template #label="{ node, isBranch }"><b data-testid="custom">{{ node.label }}-{{ isBranch }}</b></template>',
            })

            expect(wrapper.findAll('[data-testid="custom"]').map(el => el.text())).toContain('src-true')
        })
    })

    describe('expand and collapse', () => {
        it('expands a branch on click and emits update:expandedValue', async () => {
            const wrapper = factory()

            await item(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['src']])
            expect(values(wrapper)).toContain('app')
        })

        it('collapses an expanded branch on click', async () => {
            const wrapper = factory({ expandedValue: ['src'] })

            await item(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([[]])
        })

        it('selects without toggling when expandOnClick is false, and still toggles with the chevron', async () => {
            const wrapper = factory({ expandOnClick: false })

            await item(wrapper, 'src').trigger('click')
            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
            expect(wrapper.emitted('update:selectedValue')?.[0]).toEqual([['src']])

            await item(wrapper, 'src').find('span.shrink-0').trigger('click')
            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['src']])
        })
    })

    describe('active folder', () => {
        const labelClasses = (wrapper: ReturnType<typeof factory>, value: string) => {
            return item(wrapper, value).find('[data-testid="tree-view-label"]').classes()
        }
        const active = 'text-text-primary-brand-on-soft-bg'

        it('is not active until a folder is opened', () => {
            const wrapper = factory({ expandedValue: ['src'] })

            expect(labelClasses(wrapper, 'src')).not.toContain(active)
        })

        it('follows the last opened folder and colors only its icon and label, not the chevron', async () => {
            const wrapper = factory({ nodes: [...nodes, { value: 'docs', label: 'docs', children: [{ value: 'guide', label: 'guide' }] }] })

            await item(wrapper, 'src').trigger('click')
            expect(labelClasses(wrapper, 'src')).toContain(active)

            await item(wrapper, 'docs').trigger('click')
            expect(labelClasses(wrapper, 'docs')).toContain(active)
            expect(labelClasses(wrapper, 'src')).not.toContain(active)

            const docs = item(wrapper, 'docs')
            expect(docs.html()).toContain('text-icon-primary-brand-on-soft-bg')
            expect(docs.find('span.shrink-0').html()).not.toContain('primary-brand')
        })

        it('does not depend on the folder being selected', async () => {
            const wrapper = factory({ expandOnClick: false })

            await item(wrapper, 'src').trigger('click')
            expect(labelClasses(wrapper, 'src')).not.toContain(active)

            await item(wrapper, 'src').find('span.shrink-0').trigger('click')
            expect(labelClasses(wrapper, 'src')).toContain(active)
        })

        it('is lost when the folder is closed', async () => {
            const wrapper = factory()

            await item(wrapper, 'src').trigger('click')
            await item(wrapper, 'src').trigger('click')

            expect(labelClasses(wrapper, 'src')).not.toContain(active)
        })
    })

    describe('color', () => {
        it.each([
            ['primary-brand', 'text-text-primary-brand-on-soft-bg', 'text-icon-primary-brand-on-soft-bg'],
            ['secondary-brand', 'text-text-secondary-brand-on-soft-bg', 'text-icon-secondary-brand-default'],
            ['neutral', 'font-semibold', 'text-icon-default'],
        ])('applies the %s color to the active node', (color, labelClass, iconClass) => {
            const wrapper = factory({ color, selectedValue: ['package'] })
            const row = item(wrapper, 'package')

            expect(row.find('[data-testid="tree-view-label"]').classes()).toContain(labelClass)
            expect(row.html()).toContain(iconClass)
        })
    })

    describe('more actions', () => {
        const items = [{ text: 'Rename' }, { text: 'Delete' }]

        const actions = (wrapper: ReturnType<typeof factory>, value: string) => {
            return item(wrapper, value).find('[data-testid="tree-view-more-actions"]')
        }

        it('does not render the button without moreActionsItems', () => {
            expect(factory().find('[data-testid="tree-view-more-actions"]').exists()).toBe(false)
        })

        it('renders the same menu on every enabled node when given a list', async () => {
            const wrapper = factory({ moreActionsItems: items, expandedValue: ['src'] })

            expect(wrapper.findAll('[data-testid="tree-view-more-actions"]')).toHaveLength(4)

            await arm(wrapper, 'app')
            const menus = wrapper.findAllComponents({ name: 'DropdownMenu' })
            expect(menus).toHaveLength(1)
            expect(menus[0]!.props('items')).toEqual(items)
        })

        it('resolves the menu per node when given a function, receiving the node, branch state and level', async () => {
            const resolver = vi.fn((node: TreeViewNode, details: { isBranch: boolean }) => {
                return details.isBranch ? [{ text: 'New file' }] : node.value === 'package' ? [{ text: 'Open' }] : []
            })
            const wrapper = factory({ moreActionsItems: resolver, expandedValue: ['src'] })

            expect(actions(wrapper, 'src').exists()).toBe(true)
            expect(actions(wrapper, 'package').exists()).toBe(true)
            expect(actions(wrapper, 'app').exists()).toBe(false)
            expect(resolver).toHaveBeenCalledWith(expect.objectContaining({ value: 'app' }), { isBranch: false, level: 1 })
            expect(resolver).toHaveBeenCalledWith(expect.objectContaining({ value: 'src' }), { isBranch: true, level: 0 })

            await arm(wrapper, 'src')
            expect(wrapper.findComponent({ name: 'DropdownMenu' }).props('items')).toEqual([{ text: 'New file' }])

            await arm(wrapper, 'package')
            expect(wrapper.findComponent({ name: 'DropdownMenu' }).props('items')).toEqual([{ text: 'Open' }])
        })

        it('reveals the button on row hover and focus and keeps it hidden otherwise', () => {
            const classes = actions(factory({ moreActionsItems: items }), 'src').classes()

            expect(classes).toContain('opacity-0')
            expect(classes).toContain('group-hover:opacity-100')
            expect(classes).toContain('group-focus-within:opacity-100')
        })

        it('does not render the button on disabled nodes or when the tree is disabled', () => {
            expect(actions(factory({ moreActionsItems: items }), 'readme').exists()).toBe(false)
            expect(actions(factory({ moreActionsItems: items, disabled: true }), 'src').exists()).toBe(false)
        })

        it('uses the custom aria label', async () => {
            const wrapper = factory({ moreActionsItems: items, moreActionsAriaLabel: 'Folder actions' })

            await arm(wrapper, 'src')

            expect(wrapper.find('[aria-label="Folder actions"]').exists()).toBe(true)
        })

        it('does not select or expand the row when the button area is clicked', async () => {
            const wrapper = factory({ moreActionsItems: items })

            await actions(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:selectedValue')).toBeUndefined()
            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
        })

        it('does not trigger tree keyboard navigation from inside the actions area', async () => {
            const wrapper = factory({ moreActionsItems: items })

            await actions(wrapper, 'src').trigger('keydown', { key: 'ArrowRight' })

            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
        })

        it('passes the offset and position to the dropdown menu', async () => {
            const wrapper = factory({ moreActionsItems: items, moreActionsPositionYOffset: 8 })

            await arm(wrapper, 'src')
            const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })

            expect(dropdown.props('positionYOffset')).toBe(8)
            expect(dropdown.props('position')).toBe('bottom-right')
        })

        it('runs the callback of a clicked more-actions item without selecting the row', async () => {
            const rename = vi.fn()
            const remove = vi.fn()
            const wrapper = factory({
                nodes: [{ value: 'src', label: 'src' }],
                moreActionsItems: [
                    { text: 'Rename', callback: rename },
                    { text: 'Delete', callback: remove },
                ],
            })

            await arm(wrapper, 'src')
            await wrapper.find('[aria-label="More options"]').trigger('click')
            await flushPromises()

            const menuItem = Array.from(document.body.querySelectorAll<HTMLElement>('[data-dropdown-menu-panel] *'))
                .find(element => element.children.length === 0 && element.textContent?.trim() === 'Rename')
            expect(menuItem).toBeDefined()

            menuItem!.click()
            await flushPromises()

            expect(rename).toHaveBeenCalledTimes(1)
            expect(remove).not.toHaveBeenCalled()
            expect(wrapper.emitted('update:selectedValue')).toBeUndefined()
        })

        it('flips the dropdown above the row when there is no room below', async () => {
            const wrapper = factory({ moreActionsItems: items })
            const row = item(wrapper, 'src').element
            const spy = vi.spyOn(row, 'getBoundingClientRect').mockReturnValue({ top: 700, bottom: 732 } as DOMRect)
            vi.stubGlobal('innerHeight', 740)

            await arm(wrapper, 'src')

            expect(wrapper.findComponent({ name: 'DropdownMenu' }).props('position')).toBe('top-right')

            spy.mockRestore()
            vi.unstubAllGlobals()
        })
    })

    describe('transition', () => {
        const mountWithTransition = () => mount(TreeView, {
            props: { nodes },
            attachTo: document.body,
            global: { stubs: { TransitionGroup: false } },
        })

        afterEach(() => {
            delete (HTMLElement.prototype as Partial<HTMLElement>).animate
        })

        it('grows the rows in when a folder opens and shrinks them out when it closes', async () => {
            const animate = vi.fn(() => ({}) as Animation)
            HTMLElement.prototype.animate = animate
            const wrapper = mountWithTransition()

            await item(wrapper, 'src').trigger('click')
            await flushPromises()

            expect(animate).toHaveBeenCalledTimes(2)
            expect(animate.mock.calls[0]![0]).toEqual([
                { height: '0px', opacity: 0 },
                { height: '0px', opacity: 1 },
            ])
            expect(animate.mock.calls[0]![1]).toMatchObject({ duration: 180, fill: 'none' })

            animate.mockClear()
            await item(wrapper, 'src').trigger('click')
            await flushPromises()

            expect(animate).toHaveBeenCalledTimes(2)
            expect(animate.mock.calls[0]![0]).toEqual([
                { height: '0px', opacity: 1 },
                { height: '0px', opacity: 0 },
            ])
            expect(animate.mock.calls[0]![1]).toMatchObject({ fill: 'forwards' })
        })

        it('does not animate when the user prefers reduced motion', async () => {
            const animate = vi.fn(() => ({}) as Animation)
            HTMLElement.prototype.animate = animate
            vi.stubGlobal('matchMedia', () => ({ matches: true }))
            const wrapper = mountWithTransition()

            await item(wrapper, 'src').trigger('click')
            await flushPromises()

            expect(animate).not.toHaveBeenCalled()
            expect(values(wrapper)).toContain('app')

            vi.unstubAllGlobals()
        })

        it('still shows and hides rows when the animation API is not available', async () => {
            // The test environment ships its own Element.animate, so shadow it with nothing
            ;(HTMLElement.prototype as Partial<HTMLElement>).animate = undefined
            const wrapper = mountWithTransition()

            await item(wrapper, 'src').trigger('click')
            await flushPromises()
            expect(values(wrapper)).toContain('app')

            await item(wrapper, 'src').trigger('click')
            await flushPromises()
            expect(values(wrapper)).not.toContain('app')
        })
    })

    describe('accordion', () => {
        const nested: TreeViewNode[] = [
            {
                value: 'a',
                label: 'a',
                children: [
                    { value: 'a1', label: 'a1', children: [{ value: 'a1x', label: 'a1x', children: [{ value: 'a1x1', label: 'a1x1' }] }] },
                    { value: 'a2', label: 'a2', children: [{ value: 'a2x', label: 'a2x' }] },
                ],
            },
            { value: 'b', label: 'b', children: [{ value: 'b1', label: 'b1' }] },
        ]

        it('keeps several nested folders open by default', async () => {
            const wrapper = factory({ nodes: nested, expandedValue: ['a', 'a1'] })

            await item(wrapper, 'a2').trigger('click')

            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['a', 'a1', 'a2']])
        })

        it('closes the open sibling folders and their descendants when opening a nested folder', async () => {
            const wrapper = factory({ nodes: nested, isAccordion: true, expandedValue: ['a', 'a1', 'a1x'] })

            await item(wrapper, 'a2').trigger('click')

            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['a', 'a2']])
        })

        it('also keeps a single root level folder open, closing what is open inside the others', async () => {
            const wrapper = factory({ nodes: nested, isAccordion: true, expandedValue: ['a', 'a1'] })

            await item(wrapper, 'b').trigger('click')

            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['b']])
        })

        it('does not change anything when collapsing a folder', async () => {
            const wrapper = factory({ nodes: nested, isAccordion: true, expandedValue: ['a', 'a1'] })

            await item(wrapper, 'a1').trigger('click')

            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['a']])
        })
    })

    describe('selection', () => {
        it('replaces the selection in single mode', async () => {
            const wrapper = factory({ selectedValue: ['src'] })

            await item(wrapper, 'package').trigger('click')

            expect(wrapper.emitted('update:selectedValue')?.[0]).toEqual([['package']])
        })

        it('replaces the selection on a plain click in multiple mode', async () => {
            const wrapper = factory({ selectionMode: TreeViewSelectionMode.MULTIPLE, selectedValue: ['package'] })

            await item(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:selectedValue')?.[0]).toEqual([['src']])
            expect(wrapper.find('[role="tree"]').attributes('aria-multiselectable')).toBe('true')
        })

        it('toggles values with Ctrl / Cmd + click in multiple mode', async () => {
            const wrapper = factory({ selectionMode: TreeViewSelectionMode.MULTIPLE, selectedValue: ['package'] })

            await item(wrapper, 'src').trigger('click', { ctrlKey: true })
            await item(wrapper, 'package').trigger('click', { metaKey: true })

            expect(wrapper.emitted('update:selectedValue')?.[0]).toEqual([['package', 'src']])
            expect(wrapper.emitted('update:selectedValue')?.[1]).toEqual([['src']])
            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
        })

        it('selects the range from the last clicked node with Shift + click', async () => {
            const wrapper = factory({ selectionMode: TreeViewSelectionMode.MULTIPLE, expandedValue: ['src'] })

            await item(wrapper, 'app').trigger('click')
            await item(wrapper, 'package').trigger('click', { shiftKey: true })

            expect(wrapper.emitted('update:selectedValue')?.at(-1)).toEqual([['app', 'index', 'package']])
        })

        it('selects every enabled visible node with Ctrl + A in multiple mode', async () => {
            const wrapper = factory({ selectionMode: TreeViewSelectionMode.MULTIPLE })

            await item(wrapper, 'src').trigger('focus')
            await item(wrapper, 'src').trigger('keydown', { key: 'a', ctrlKey: true })

            expect(wrapper.emitted('update:selectedValue')?.at(-1)).toEqual([['src', 'package']])
        })

        it('marks selected rows with aria-selected', () => {
            const wrapper = factory({ selectedValue: ['package'] })

            expect(item(wrapper, 'package').attributes('aria-selected')).toBe('true')
            expect(item(wrapper, 'src').attributes('aria-selected')).toBe('false')
        })

        it('colors only the icon and the label of a selected file, with no active background', () => {
            const wrapper = factory({ expandedValue: ['src'], selectedValue: ['app'] })
            const row = item(wrapper, 'app')
            const unselected = item(wrapper, 'index')

            expect(row.find('[data-testid="tree-view-label"]').classes()).toContain('text-text-primary-brand-on-soft-bg')
            expect(row.html()).toContain('text-icon-primary-brand-on-soft-bg')
            expect(unselected.find('[data-testid="tree-view-label"]').classes()).not.toContain('text-text-primary-brand-on-soft-bg')

            // The row itself keeps the default look
            expect(row.classes().some(cls => cls.startsWith('bg-') || cls.startsWith('text-text-'))).toBe(false)
        })

        it('ignores clicks on disabled nodes and when the tree is disabled', async () => {
            const wrapper = factory()
            await item(wrapper, 'readme').trigger('click')
            expect(wrapper.emitted('update:selectedValue')).toBeUndefined()

            const disabled = factory({ disabled: true })
            await item(disabled, 'package').trigger('click')
            expect(disabled.emitted('update:selectedValue')).toBeUndefined()
        })
    })

    describe('checkboxes', () => {
        const checkbox = (wrapper: ReturnType<typeof factory>, value: string) => {
            return item(wrapper, value).find('[role="checkbox"]')
        }

        it('does not render checkboxes by default', () => {
            expect(factory().find('[role="checkbox"]').exists()).toBe(false)
        })

        it('checks every enabled leaf when a branch is checked', async () => {
            const wrapper = factory({ showCheckboxes: true, expandedValue: ['src'] })

            await checkbox(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:checkedValue')?.[0]).toEqual([['app', 'index']])
        })

        it('shows a mixed state on the branch when only some leaves are checked', () => {
            const wrapper = factory({ showCheckboxes: true, expandedValue: ['src'], checkedValue: ['app'] })

            expect(checkbox(wrapper, 'src').attributes('aria-checked')).toBe('mixed')
            expect(checkbox(wrapper, 'app').attributes('aria-checked')).toBe('true')
            expect(checkbox(wrapper, 'index').attributes('aria-checked')).toBe('false')
        })

        it('shows the branch as checked when all its leaves are checked and unchecks them together', async () => {
            const wrapper = factory({ showCheckboxes: true, expandedValue: ['src'], checkedValue: ['app', 'index', 'package'] })

            expect(checkbox(wrapper, 'src').attributes('aria-checked')).toBe('true')

            await checkbox(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:checkedValue')?.[0]).toEqual([['package']])
        })

        it('does not select or expand the row when the checkbox is clicked', async () => {
            const wrapper = factory({ showCheckboxes: true })

            await checkbox(wrapper, 'src').trigger('click')

            expect(wrapper.emitted('update:selectedValue')).toBeUndefined()
            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
        })

        it('disables the checkbox of disabled nodes', () => {
            const wrapper = factory({ showCheckboxes: true })

            expect(item(wrapper, 'readme').find('input').attributes('disabled')).toBeDefined()
        })
    })

    describe('lazy loading', () => {
        const lazyNodes: TreeViewNode[] = [{ value: 'remote', label: 'remote', hasChildren: true }]

        it('loads the children on first expand and renders them', async () => {
            const loadChildren = vi.fn().mockResolvedValue([{ value: 'child', label: 'child' }])
            const wrapper = factory({ nodes: lazyNodes, loadChildren })

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()

            expect(loadChildren).toHaveBeenCalledWith(lazyNodes[0])
            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['remote']])
            expect(values(wrapper)).toEqual(['remote', 'child'])
        })

        it('shows a spinner while the children load', async () => {
            let resolve: (nodes: TreeViewNode[]) => void = () => {}
            const loadChildren = vi.fn(() => new Promise<TreeViewNode[]>(r => { resolve = r }))
            const wrapper = factory({ nodes: lazyNodes, loadChildren })

            await item(wrapper, 'remote').trigger('click')
            expect(wrapper.find('output').exists()).toBe(true)

            resolve([])
            await flushPromises()
            expect(wrapper.find('output').exists()).toBe(false)
        })

        it('does not load twice once loaded', async () => {
            const loadChildren = vi.fn().mockResolvedValue([{ value: 'child', label: 'child' }])
            const wrapper = factory({ nodes: lazyNodes, loadChildren })

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()
            await item(wrapper, 'remote').trigger('click')
            await item(wrapper, 'remote').trigger('click')
            await flushPromises()

            expect(loadChildren).toHaveBeenCalledTimes(1)
        })

        it('emits load-error and stays collapsed when loading fails', async () => {
            const error = new Error('boom')
            const wrapper = factory({ nodes: lazyNodes, loadChildren: vi.fn().mockRejectedValue(error) })

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()

            expect(wrapper.emitted('load-error')?.[0]).toEqual([{ value: 'remote', error }])
            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
            expect(wrapper.find('output').exists()).toBe(false)
        })
    })

    describe('keyboard', () => {
        const press = async (wrapper: ReturnType<typeof factory>, from: string, key: string) => {
            const row = item(wrapper, from)
            await row.trigger('focus')
            await row.trigger('keydown', { key })
            await flushPromises()
        }

        const active = () => document.activeElement?.getAttribute('data-value')

        afterEach(() => {
            document.body.innerHTML = ''
        })

        it('has a single tabbable row', () => {
            const wrapper = factory({ selectedValue: ['package'] })

            expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(1)
            expect(item(wrapper, 'package').attributes('tabindex')).toBe('0')
        })

        it('moves focus with ArrowDown, ArrowUp, Home and End', async () => {
            const wrapper = factory()

            await press(wrapper, 'src', 'ArrowDown')
            expect(active()).toBe('package')

            await press(wrapper, 'package', 'ArrowUp')
            expect(active()).toBe('src')

            await press(wrapper, 'src', 'End')
            expect(active()).toBe('readme')

            await press(wrapper, 'readme', 'Home')
            expect(active()).toBe('src')
        })

        it('expands with ArrowRight, then moves into the first child', async () => {
            const wrapper = factory()

            await press(wrapper, 'src', 'ArrowRight')
            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['src']])

            await press(wrapper, 'src', 'ArrowRight')
            expect(active()).toBe('app')
        })

        it('collapses with ArrowLeft, then moves focus to the parent', async () => {
            const wrapper = factory({ expandedValue: ['src'] })

            await press(wrapper, 'app', 'ArrowLeft')
            expect(active()).toBe('src')

            await press(wrapper, 'src', 'ArrowLeft')
            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([[]])
        })

        it('selects with Enter and Space', async () => {
            const wrapper = factory()

            await press(wrapper, 'package', 'Enter')
            await press(wrapper, 'package', ' ')

            expect(wrapper.emitted('update:selectedValue')).toEqual([[['package']], [['package']]])
        })

        it('toggles the checkbox with Space when checkboxes are shown', async () => {
            const wrapper = factory({ showCheckboxes: true })

            await press(wrapper, 'package', ' ')

            expect(wrapper.emitted('update:checkedValue')?.[0]).toEqual([['package']])
            expect(wrapper.emitted('update:selectedValue')).toBeUndefined()
        })

        it('jumps to the next row matching the typed characters', async () => {
            const wrapper = factory()

            await press(wrapper, 'src', 'r')

            expect(active()).toBe('readme')
        })

        it('ignores keys when disabled', async () => {
            const wrapper = factory({ disabled: true })

            await press(wrapper, 'src', 'ArrowRight')

            expect(wrapper.emitted('update:expandedValue')).toBeUndefined()
        })
    })

    describe('performance', () => {
        it('mounts the more-actions dropdown only on the hovered row', async () => {
            const wrapper = factory({ moreActionsItems: [{ text: 'Open' }], expandedValue: ['src'] })

            expect(wrapper.findAllComponents({ name: 'DropdownMenu' })).toHaveLength(0)

            await arm(wrapper, 'app')
            await arm(wrapper, 'index')

            expect(wrapper.findAllComponents({ name: 'DropdownMenu' })).toHaveLength(1)
        })
    })

    describe('initial expansion', () => {
        it('expands every branch with defaultExpandAll', () => {
            const wrapper = factory({ defaultExpandAll: true })

            expect(values(wrapper)).toEqual(['src', 'app', 'index', 'package', 'readme'])
        })

        it('expands down to defaultExpandedDepth and ignores it when expandedValue is provided', () => {
            const deep: TreeViewNode[] = [
                { value: 'a', label: 'a', children: [{ value: 'b', label: 'b', children: [{ value: 'c', label: 'c' }] }] },
            ]

            expect(values(factory({ nodes: deep, defaultExpandedDepth: 1 }))).toEqual(['a', 'b'])
            expect(values(factory({ nodes: deep, defaultExpandedDepth: 1, expandedValue: ['a', 'b'] }))).toEqual(['a', 'b', 'c'])
        })
    })

    describe('filter', () => {
        it('keeps matching nodes with their ancestors and opens those ancestors', () => {
            const wrapper = factory({ filter: 'INDEX' })

            expect(values(wrapper)).toEqual(['src', 'index'])
            expect(item(wrapper, 'src').attributes('aria-expanded')).toBe('true')
        })

        it('accepts a predicate and renders the empty slot when nothing matches', () => {
            const wrapper = factory({ filter: (node: TreeViewNode) => node.value === 'package' })

            expect(values(wrapper)).toEqual(['package'])

            const empty = factory({ filter: 'zzz' }, { empty: 'Nothing found' })
            expect(empty.find('[data-testid="tree-view-empty"]').text()).toBe('Nothing found')
        })
    })

    describe('slots, size and icons', () => {
        it('renders the icon and trailing slots', () => {
            const wrapper = factory({}, {
                icon: '<template #icon="{ node }"><i data-testid="custom-icon">{{ node.value }}</i></template>',
                trailing: '<template #trailing="{ node }"><b data-testid="custom-trailing">{{ node.value }}</b></template>',
            })

            expect(wrapper.find('[data-testid="custom-icon"]').exists()).toBe(true)
            expect(item(wrapper, 'package').find('[data-testid="custom-trailing"]').text()).toBe('package')
        })

        it('applies the row height of the size', () => {
            expect(item(factory({ size: 'lg' }), 'src').classes()).toContain('h-[40px]')
            expect(item(factory({ size: 'xs' }), 'src').classes()).toContain('h-[24px]')
        })

        it('uses custom icons for files and folders', () => {
            const wrapper = factory({ leafIcon: 'mdi:star', collapsedIcon: 'mdi:plus', expandedIcon: 'mdi:minus', expandedValue: ['src'] })

            expect(item(wrapper, 'package').html()).toContain('mdi:star')
            expect(item(wrapper, 'src').html()).toContain('mdi:minus')
        })
    })

    describe('checkStrictly', () => {
        it('stores each node on its own without cascading', async () => {
            const wrapper = factory({ showCheckboxes: true, checkStrictly: true, expandedValue: ['src'] })

            item(wrapper, 'src').findComponent({ name: 'TriStateCheckbox' }).vm.$emit('update:model-value')
            await flushPromises()

            expect(wrapper.emitted('update:checkedValue')?.[0]).toEqual([['src']])
        })
    })

    describe('public API', () => {
        type Api = {
            expandAll: () => void
            collapseAll: () => void
            expandTo: (value: string) => Promise<void>
            reload: (value: string) => Promise<void>
            startRename: (value: string) => Promise<void>
        }
        const api = (wrapper: ReturnType<typeof factory>) => wrapper.vm as unknown as Api

        it('expands and collapses everything', async () => {
            const wrapper = factory()

            api(wrapper).expandAll()
            await flushPromises()
            expect(wrapper.emitted('update:expandedValue')?.at(-1)).toEqual([['src']])
            expect(values(wrapper)).toContain('app')

            api(wrapper).collapseAll()
            await flushPromises()
            expect(wrapper.emitted('update:expandedValue')?.at(-1)).toEqual([[]])
        })

        it('expands the ancestors of a node with expandTo', async () => {
            const wrapper = factory()

            await api(wrapper).expandTo('app')
            await flushPromises()

            expect(values(wrapper)).toContain('app')
        })

        it('reloads the children of a lazy branch', async () => {
            const loadChildren = vi.fn(async () => [{ value: 'child', label: 'child' }])
            const wrapper = factory({ nodes: [{ value: 'remote', label: 'remote', hasChildren: true }], loadChildren })

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()
            await api(wrapper).reload('remote')
            await flushPromises()

            expect(loadChildren).toHaveBeenCalledTimes(2)
        })

        it('shows an error state on a failed load and retries on the next expand', async () => {
            const loadChildren = vi.fn()
                .mockRejectedValueOnce(new Error('boom'))
                .mockResolvedValueOnce([{ value: 'child', label: 'child' }])
            const wrapper = factory({ nodes: [{ value: 'remote', label: 'remote', hasChildren: true }], loadChildren })

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()
            expect(wrapper.find('[data-testid="tree-view-load-error"]').exists()).toBe(true)

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()
            expect(wrapper.find('[data-testid="tree-view-load-error"]').exists()).toBe(false)
            expect(values(wrapper)).toContain('child')
        })

        describe('rename', () => {
            const menuTexts = async (props: Record<string, unknown>) => {
                const wrapper = factory({ nodes: [{ value: 'a', label: 'a' }], ...props })
                await arm(wrapper, 'a')
                const menu = wrapper.findComponent({ name: 'DropdownMenu' })

                return menu.exists() ? (menu.props('items') as DropdownMenuItem[]).map(entry => entry.text) : []
            }

            it('adds a Rename item to the more actions only when isRenamable and not readOnly', async () => {
                expect(await menuTexts({ isRenamable: true })).toEqual(['Rename'])
                expect(await menuTexts({ isRenamable: true, readOnly: true })).toEqual([])
                expect(await menuTexts({})).toEqual([])
            })

            it('emits rename with the trimmed label on Enter and ignores empty labels', async () => {
                const wrapper = factory({ isRenamable: true })

                await api(wrapper).startRename('package')
                await flushPromises()
                const input = wrapper.find('[data-testid="tree-view-rename-input"]')
                await input.setValue('  main.json  ')
                await input.trigger('keydown', { key: 'Enter' })

                expect(wrapper.emitted('rename')?.[0]).toEqual([
                    { value: 'package', label: 'main.json', previousLabel: 'package.json' },
                ])
                expect(wrapper.find('[data-testid="tree-view-rename-input"]').exists()).toBe(false)

                await api(wrapper).startRename('package')
                await flushPromises()
                await wrapper.find('[data-testid="tree-view-rename-input"]').setValue('   ')
                await wrapper.find('[data-testid="tree-view-rename-input"]').trigger('keydown', { key: 'Enter' })

                expect(wrapper.emitted('rename')).toHaveLength(1)
            })

            it('emits the renamed tree as update:nodes, except for lazy-loaded nodes', async () => {
                const wrapper = factory({ isRenamable: true, expandedValue: ['src'] })

                await api(wrapper).startRename('app')
                await flushPromises()
                const input = wrapper.find('[data-testid="tree-view-rename-input"]')
                await input.setValue('main.tsx')
                await input.trigger('keydown', { key: 'Enter' })

                const renamed = wrapper.emitted('update:nodes')?.[0]?.[0] as TreeViewNode[]
                expect(renamed[0]!.children!.map(node => node.label)).toEqual(['main.tsx', 'index.ts'])
                expect(wrapper.props('nodes')[0]!.children![0]!.label).toBe('app.tsx')

                const loadChildren = vi.fn(async () => [{ value: 'child', label: 'child' }])
                const lazy = factory({
                    nodes: [{ value: 'remote', label: 'remote', hasChildren: true }],
                    loadChildren,
                    isRenamable: true,
                })

                await item(lazy, 'remote').trigger('click')
                await flushPromises()
                await api(lazy).startRename('child')
                await flushPromises()
                await lazy.find('[data-testid="tree-view-rename-input"]').setValue('renamed')
                await lazy.find('[data-testid="tree-view-rename-input"]').trigger('keydown', { key: 'Enter' })

                expect(lazy.emitted('rename')).toHaveLength(1)
                expect(lazy.emitted('update:nodes')).toBeUndefined()
            })

            it('cancels on Escape and does nothing when readOnly', async () => {
                const wrapper = factory({ isRenamable: true })

                await api(wrapper).startRename('package')
                await flushPromises()
                await wrapper.find('[data-testid="tree-view-rename-input"]').trigger('keydown', { key: 'Escape' })
                expect(wrapper.emitted('rename')).toBeUndefined()

                const readOnly = factory({ isRenamable: true, readOnly: true })
                await api(readOnly).startRename('package')
                expect(readOnly.find('[data-testid="tree-view-rename-input"]').exists()).toBe(false)
            })

            it('starts renaming with F2', async () => {
                const wrapper = factory({ isRenamable: true })

                await item(wrapper, 'package').trigger('focus')
                await item(wrapper, 'package').trigger('keydown', { key: 'F2' })
                await flushPromises()

                expect(wrapper.find('[data-testid="tree-view-rename-input"]').exists()).toBe(true)
            })
        })
    })

    describe('reorder', () => {
        const dropOn = async (wrapper: ReturnType<typeof factory>, source: string, target: string, ratio: number) => {
            const targetRow = item(wrapper, target)
            vi.spyOn(targetRow.element, 'getBoundingClientRect').mockReturnValue({ top: 0, height: 100 } as DOMRect)

            await item(wrapper, source).trigger('dragstart')
            await targetRow.trigger('dragover', { clientY: ratio * 100 })
            await targetRow.trigger('drop', { clientY: ratio * 100 })
        }

        it('is not draggable unless isReorderable is set and not readOnly', () => {
            expect(item(factory(), 'package').attributes('draggable')).toBe('false')
            expect(item(factory({ isReorderable: true }), 'package').attributes('draggable')).toBe('true')
            expect(item(factory({ isReorderable: true, readOnly: true }), 'package').attributes('draggable')).toBe('false')
            expect(item(factory({ isReorderable: true }), 'readme').attributes('draggable')).toBe('false')
        })

        it('emits reorder with the drop position and the new parent', async () => {
            const wrapper = factory({ isReorderable: true, expandedValue: ['src'] })

            await dropOn(wrapper, 'package', 'src', 0.5)
            await dropOn(wrapper, 'package', 'index', 0.9)

            expect(wrapper.emitted('reorder')?.[0]).toEqual([
                { value: 'package', targetValue: 'src', position: TreeViewDropPosition.INSIDE, parentValue: 'src' },
            ])
            expect(wrapper.emitted('reorder')?.[1]).toEqual([
                { value: 'package', targetValue: 'index', position: TreeViewDropPosition.AFTER, parentValue: 'src' },
            ])
        })

        it('shows the drop placeholder on the row under the cursor and clears it afterwards', async () => {
            const wrapper = factory({ isReorderable: true, expandedValue: ['src'] })
            const target = item(wrapper, 'index')
            vi.spyOn(target.element, 'getBoundingClientRect').mockReturnValue({ top: 0, height: 100 } as DOMRect)

            await item(wrapper, 'package').trigger('dragstart')
            await target.trigger('dragover', { clientY: 10 })
            expect(target.find('[data-testid="tree-view-drop-indicator"]').classes()).toContain('top-0')

            await target.trigger('dragover', { clientY: 90 })
            expect(target.find('[data-testid="tree-view-drop-indicator"]').classes()).toContain('bottom-0')

            await item(wrapper, 'package').trigger('dragend')
            expect(wrapper.find('[data-testid="tree-view-drop-indicator"]').exists()).toBe(false)
        })

        it('emits the moved tree as update:nodes and opens the folder it was dropped into', async () => {
            const wrapper = factory({ isReorderable: true })

            await dropOn(wrapper, 'package', 'src', 0.5)

            const moved = wrapper.emitted('update:nodes')?.[0]?.[0] as TreeViewNode[]
            expect(moved.map(node => node.value)).toEqual(['src', 'readme'])
            expect(moved[0]!.children!.map(node => node.value)).toEqual(['app', 'index', 'package'])
            expect(wrapper.emitted('update:expandedValue')?.at(-1)).toEqual([['src']])
        })

        it('moves a folder inside another folder and drops into empty folders', async () => {
            const tree: TreeViewNode[] = [
                { value: 'a', label: 'a', children: [{ value: 'a1', label: 'a1' }] },
                { value: 'b', label: 'b', children: [] },
            ]
            const wrapper = factory({ nodes: tree, isReorderable: true })

            await dropOn(wrapper, 'a', 'b', 0.5)

            const moved = wrapper.emitted('update:nodes')?.[0]?.[0] as TreeViewNode[]
            expect(moved).toHaveLength(1)
            expect(moved[0]!.value).toBe('b')
            expect(moved[0]!.children![0]!.children![0]!.value).toBe('a1')
        })

        it('does not emit update:nodes when the move involves lazy-loaded nodes', async () => {
            const loadChildren = vi.fn(async () => [{ value: 'child', label: 'child' }])
            const wrapper = factory({
                nodes: [{ value: 'remote', label: 'remote', hasChildren: true }, { value: 'file', label: 'file' }],
                loadChildren,
                isReorderable: true,
            })

            await item(wrapper, 'remote').trigger('click')
            await flushPromises()
            await dropOn(wrapper, 'child', 'file', 0.9)

            expect(wrapper.emitted('reorder')).toHaveLength(1)
            expect(wrapper.emitted('update:nodes')).toBeUndefined()
        })

        it('keeps the drop placeholder while the pointer stays inside the row and clears it when it leaves', async () => {
            const wrapper = factory({ isReorderable: true, expandedValue: ['src'] })
            const target = item(wrapper, 'index')
            vi.spyOn(target.element, 'getBoundingClientRect')
                .mockReturnValue({ top: 0, bottom: 100, left: 0, right: 200, height: 100 } as DOMRect)

            await item(wrapper, 'package').trigger('dragstart')
            await target.trigger('dragover', { clientX: 50, clientY: 90 })

            // Crossing a child element fires dragleave while the pointer is still inside the row
            await target.trigger('dragleave', { clientX: 50, clientY: 60 })
            expect(target.find('[data-testid="tree-view-drop-indicator"]').exists()).toBe(true)

            await target.trigger('dragleave', { clientX: 50, clientY: 140 })
            expect(target.find('[data-testid="tree-view-drop-indicator"]').exists()).toBe(false)
        })

        it('rejects dropping a node on itself, its descendants or a disabled node', async () => {
            const wrapper = factory({ isReorderable: true, expandedValue: ['src'] })

            await dropOn(wrapper, 'src', 'src', 0.5)
            await dropOn(wrapper, 'src', 'app', 0.5)
            await dropOn(wrapper, 'package', 'readme', 0.5)

            expect(wrapper.emitted('reorder')).toBeUndefined()
        })
    })
    describe('sorting', () => {
        const unsorted: TreeViewNode[] = [
            { value: 'b', label: 'b.txt', meta: { size: 30 } },
            { value: 'a10', label: 'A10.txt', meta: { size: 10 } },
            { value: 'dir', label: 'Zeta', children: [{ value: 'child-b', label: 'b' }, { value: 'child-a', label: 'a' }] },
            { value: 'a2', label: 'a2.txt', meta: { size: 20 } },
        ]

        it('keeps the given order by default', () => {
            expect(values(factory({ nodes: unsorted }))).toEqual(['b', 'a10', 'dir', 'a2'])
        })

        it('sorts labels naturally and case-insensitively, ascending and descending', () => {
            expect(values(factory({ nodes: unsorted, sortOrder: SortOrder.ASC }))).toEqual(['a2', 'a10', 'b', 'dir'])
            expect(values(factory({ nodes: unsorted, sortOrder: SortOrder.DESC }))).toEqual(['dir', 'b', 'a10', 'a2'])
        })

        it('sorts nested levels and numbers aria-posinset after sorting', () => {
            const wrapper = factory({ nodes: unsorted, sortOrder: SortOrder.ASC, expandedValue: ['dir'] })

            expect(values(wrapper)).toEqual(['a2', 'a10', 'b', 'dir', 'child-a', 'child-b'])
            expect(item(wrapper, 'a10').attributes('aria-posinset')).toBe('2')
            expect(item(wrapper, 'child-a').attributes('aria-posinset')).toBe('1')
        })

        it('puts folders first and keeps the order inside each group', () => {
            expect(values(factory({ nodes: unsorted, foldersFirst: true }))).toEqual(['dir', 'b', 'a10', 'a2'])
            expect(values(factory({ nodes: unsorted, foldersFirst: true, sortOrder: SortOrder.ASC })))
                .toEqual(['dir', 'a2', 'a10', 'b'])
        })

        it('uses sortCompare over sortOrder', () => {
            const sortCompare = (a: TreeViewNode, b: TreeViewNode) => Number(a.meta?.size ?? 0) - Number(b.meta?.size ?? 0)

            expect(values(factory({ nodes: unsorted, sortCompare, sortOrder: SortOrder.DESC })))
                .toEqual(['dir', 'a10', 'a2', 'b'])
        })

        it('never changes nodes', () => {
            const wrapper = factory({ nodes: unsorted, sortOrder: SortOrder.ASC })

            expect(wrapper.props('nodes').map((node: TreeViewNode) => node.value)).toEqual(['b', 'a10', 'dir', 'a2'])
        })
    })

    describe('reorder while sorted', () => {
        const tree: TreeViewNode[] = [
            { value: 'docs', label: 'docs', children: [{ value: 'readme', label: 'readme.md' }] },
            { value: 'src', label: 'src', children: [] },
            { value: 'a', label: 'a.txt' },
            { value: 'b', label: 'b.txt' },
        ]

        const drag = async (wrapper: ReturnType<typeof factory>, source: string, target: string, ratio: number) => {
            const targetRow = item(wrapper, target)
            vi.spyOn(targetRow.element, 'getBoundingClientRect').mockReturnValue({ top: 0, height: 100 } as DOMRect)

            await item(wrapper, source).trigger('dragstart')
            await targetRow.trigger('dragover', { clientY: ratio * 100 })
        }

        const sorted = (props: Record<string, unknown> = {}) => {
            return factory({ nodes: tree, isReorderable: true, sortOrder: SortOrder.ASC, ...props })
        }

        it('ignores before and after drops on files', async () => {
            const wrapper = sorted()

            await drag(wrapper, 'a', 'b', 0.9)
            expect(wrapper.find('[data-testid="tree-view-drop-indicator"]').exists()).toBe(false)

            await item(wrapper, 'b').trigger('drop', { clientY: 90 })
            expect(wrapper.emitted('reorder')).toBeUndefined()
        })

        it('treats any pointer position over a folder as a drop inside it, empty folders included', async () => {
            const wrapper = sorted()

            await drag(wrapper, 'a', 'src', 0.1)
            expect(item(wrapper, 'src').classes()).toContain('ring-inset')

            await item(wrapper, 'src').trigger('drop', { clientY: 10 })

            expect(wrapper.emitted('reorder')?.[0]).toEqual([
                { value: 'a', targetValue: 'src', position: TreeViewDropPosition.INSIDE, parentValue: 'src' },
            ])
            const moved = wrapper.emitted('update:nodes')?.[0]?.[0] as TreeViewNode[]
            expect(moved.find(node => node.value === 'src')?.children?.map(node => node.value)).toEqual(['a'])
        })

        it('moves a node into the list of a folder when dropped on one of its files', async () => {
            const wrapper = sorted({ expandedValue: ['docs'] })

            await drag(wrapper, 'a', 'readme', 0.5)

            expect(item(wrapper, 'docs').classes()).toContain('ring-inset')
            expect(wrapper.find('[data-testid="tree-view-drop-indicator"]').exists()).toBe(false)

            await item(wrapper, 'readme').trigger('drop', { clientY: 50 })

            expect(wrapper.emitted('reorder')?.[0]).toEqual([
                { value: 'a', targetValue: 'readme', position: TreeViewDropPosition.AFTER, parentValue: 'docs' },
            ])
            const moved = wrapper.emitted('update:nodes')?.[0]?.[0] as TreeViewNode[]
            expect(moved.find(node => node.value === 'docs')?.children?.map(node => node.value)).toEqual(['readme', 'a'])
            expect(moved.map(node => node.value)).toEqual(['docs', 'src', 'b'])
        })

        it('moves a node to the root level when dropped on a root file, highlighting the whole list', async () => {
            const wrapper = sorted({ expandedValue: ['docs'] })

            await drag(wrapper, 'readme', 'b', 0.5)

            expect(wrapper.find('[data-testid="tree-view-root"]').classes()).toContain('ring-inset')

            await item(wrapper, 'b').trigger('drop', { clientY: 50 })

            expect(wrapper.emitted('reorder')?.[0]).toEqual([
                { value: 'readme', targetValue: 'b', position: TreeViewDropPosition.AFTER, parentValue: null },
            ])
            const moved = wrapper.emitted('update:nodes')?.[0]?.[0] as TreeViewNode[]
            expect(moved.map(node => node.value)).toEqual(['docs', 'src', 'a', 'b', 'readme'])
            expect(wrapper.find('[data-testid="tree-view-root"]').classes()).not.toContain('ring-inset')
        })

        it('ignores a drop on a file of the list the node already belongs to', async () => {
            const wrapper = sorted({ expandedValue: ['docs'] })

            await drag(wrapper, 'a', 'b', 0.5)

            expect(wrapper.find('[data-testid="tree-view-root"]').classes()).not.toContain('ring-inset')
        })

        it('ignores a drop on the folder the node already lives in', async () => {
            const wrapper = sorted({ expandedValue: ['docs'] })

            await drag(wrapper, 'readme', 'docs', 0.5)

            expect(item(wrapper, 'docs').classes()).not.toContain('ring-inset')
        })

        it('keeps the before and after placeholders when no sort is active', async () => {
            const wrapper = factory({ nodes: tree, isReorderable: true })

            await drag(wrapper, 'a', 'b', 0.9)

            expect(item(wrapper, 'b').find('[data-testid="tree-view-drop-indicator"]').exists()).toBe(true)
        })
    })

    describe('meta', () => {
        it('lets slots read the free-form meta of a node', () => {
            const wrapper = factory({
                nodes: [{ value: 'file', label: 'file.txt', meta: { size: 2048 } }],
            }, {
                trailing: '<template #trailing="{ node }"><span data-testid="size">{{ node.meta?.size }} B</span></template>',
            })

            expect(wrapper.find('[data-testid="size"]').text()).toBe('2048 B')
        })
    })
    describe('double click and rename on click', () => {
        const renameInput = (wrapper: ReturnType<typeof factory>) => wrapper.find('[data-testid="tree-view-rename-input"]')

        afterEach(() => {
            vi.useRealTimers()
        })

        it('emits node-dblclick with the node, but not for disabled nodes', async () => {
            const wrapper = factory()

            await item(wrapper, 'package').trigger('dblclick')
            await item(wrapper, 'readme').trigger('dblclick')

            expect(wrapper.emitted('node-dblclick')).toHaveLength(1)
            expect(wrapper.emitted('node-dblclick')?.[0]).toEqual([{ node: expect.objectContaining({ value: 'package' }) }])
        })

        it('does not toggle a branch back on the second click of a double click', async () => {
            const wrapper = factory()

            await item(wrapper, 'src').trigger('click', { detail: 1 })
            await item(wrapper, 'src').trigger('click', { detail: 2 })

            expect(wrapper.emitted('update:expandedValue')).toHaveLength(1)
            expect(wrapper.emitted('update:expandedValue')?.[0]).toEqual([['src']])
        })

        it('starts a rename when the only selected node is clicked again', async () => {
            vi.useFakeTimers()
            const wrapper = factory({ isRenamable: true, renameOnClick: true, selectedValue: ['package'] })

            await item(wrapper, 'package').trigger('click', { detail: 1 })
            expect(renameInput(wrapper).exists()).toBe(false)

            await vi.advanceTimersByTimeAsync(500)
            await nextTick()

            expect(renameInput(wrapper).exists()).toBe(true)
        })

        it('does not rename on the first click, when the option is off or on a toggling branch', async () => {
            vi.useFakeTimers()

            const unselected = factory({ isRenamable: true, renameOnClick: true })
            await item(unselected, 'package').trigger('click', { detail: 1 })

            const optionOff = factory({ isRenamable: true, selectedValue: ['package'] })
            await item(optionOff, 'package').trigger('click', { detail: 1 })

            const branch = factory({ isRenamable: true, renameOnClick: true, selectedValue: ['src'] })
            await item(branch, 'src').trigger('click', { detail: 1 })

            await vi.advanceTimersByTimeAsync(600)
            await nextTick()

            expect(renameInput(unselected).exists()).toBe(false)
            expect(renameInput(optionOff).exists()).toBe(false)
            expect(renameInput(branch).exists()).toBe(false)
        })

        it('does not rename when a double click follows and emits the double click instead', async () => {
            vi.useFakeTimers()
            const wrapper = factory({ isRenamable: true, renameOnClick: true, selectedValue: ['package'] })

            await item(wrapper, 'package').trigger('click', { detail: 1 })
            await item(wrapper, 'package').trigger('click', { detail: 2 })
            await item(wrapper, 'package').trigger('dblclick')
            await vi.advanceTimersByTimeAsync(600)
            await nextTick()

            expect(renameInput(wrapper).exists()).toBe(false)
            expect(wrapper.emitted('node-dblclick')).toHaveLength(1)
        })

        it('does not rename on click when readOnly', async () => {
            vi.useFakeTimers()
            const wrapper = factory({ isRenamable: true, renameOnClick: true, readOnly: true, selectedValue: ['package'] })

            await item(wrapper, 'package').trigger('click', { detail: 1 })
            await vi.advanceTimersByTimeAsync(600)
            await nextTick()

            expect(renameInput(wrapper).exists()).toBe(false)
        })
    })
})
