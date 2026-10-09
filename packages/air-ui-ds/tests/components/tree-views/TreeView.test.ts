import { mount, flushPromises } from '@vue/test-utils'
import TreeView from '~/components/tree-views/TreeView.vue'
import { TreeViewSelectionMode } from '@/models/enums/tree-view'
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

        it('renders the same menu on every enabled node when given a list', () => {
            const wrapper = factory({ moreActionsItems: items, expandedValue: ['src'] })

            expect(wrapper.findAll('[aria-label="More options"]')).toHaveLength(4)
            wrapper.findAllComponents({ name: 'DropdownMenu' }).forEach(dropdown => {
                expect(dropdown.props('items')).toEqual(items)
            })
        })

        it('resolves the menu per node when given a function, receiving the node, branch state and level', () => {
            const resolver = vi.fn((node: TreeViewNode, details: { isBranch: boolean }) => {
                return details.isBranch ? [{ text: 'New file' }] : node.value === 'package' ? [{ text: 'Open' }] : []
            })
            const wrapper = factory({ moreActionsItems: resolver, expandedValue: ['src'] })

            expect(actions(wrapper, 'src').exists()).toBe(true)
            expect(actions(wrapper, 'package').exists()).toBe(true)
            expect(actions(wrapper, 'app').exists()).toBe(false)
            expect(resolver).toHaveBeenCalledWith(expect.objectContaining({ value: 'app' }), { isBranch: false, level: 1 })
            expect(resolver).toHaveBeenCalledWith(expect.objectContaining({ value: 'src' }), { isBranch: true, level: 0 })

            const menus = wrapper.findAllComponents({ name: 'DropdownMenu' }).map(dropdown => dropdown.props('items'))
            expect(menus).toEqual([[{ text: 'New file' }], [{ text: 'Open' }]])
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

        it('uses the custom aria label', () => {
            const wrapper = factory({ moreActionsItems: items, moreActionsAriaLabel: 'Folder actions' })

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

        it('passes the offset and position to the dropdown menu', () => {
            const wrapper = factory({ moreActionsItems: items, moreActionsPositionYOffset: 8 })
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

            await actions(wrapper, 'src').trigger('mouseenter')

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

        it('toggles values in multiple mode', async () => {
            const wrapper = factory({ selectionMode: TreeViewSelectionMode.MULTIPLE, selectedValue: ['package'] })

            await item(wrapper, 'src').trigger('click')
            await item(wrapper, 'package').trigger('click')

            expect(wrapper.emitted('update:selectedValue')?.[0]).toEqual([['package', 'src']])
            expect(wrapper.emitted('update:selectedValue')?.[1]).toEqual([['src']])
            expect(wrapper.find('[role="tree"]').attributes('aria-multiselectable')).toBe('true')
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
})
