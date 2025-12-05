import { mount } from '@vue/test-utils'
import List from '@/components/lists/List.vue'
import ListItem from '@/components/lists/ListItem.vue'
import { ListLayout, ListItemSize } from '@/models/enums/lists'

const factory = (props = {}, options = {}) => {
    return mount(List, {
        props,
        ...options
    })
}

describe('List.vue', () => {
    it('renders the component as a <ul>', () => {
        const wrapper = factory()
        expect(wrapper.element.tagName).toBe('UL')
    })

    describe('when default slot is used', () => {
        const slotFactory = (props = {}) =>
            factory(props, {
                slots: {
                    default: '<li>Item 1</li><li>Item 2</li>'
                }
            })

        it('renders slot content instead of items prop', () => {
            const wrapper = slotFactory()
            const items = wrapper.findAll('li')
            expect(items).toHaveLength(2)
            expect(items[0].text()).toBe('Item 1')
            expect(items[1].text()).toBe('Item 2')
        })
    })

    describe('when default slot is not used', () => {
        it('renders fallback items using ListItem', () => {
            const wrapper = factory({ items: ['Alpha', 'Beta'] })
            const items = wrapper.findAllComponents(ListItem)
            expect(items).toHaveLength(2)
            expect(items[0].text()).toContain('Alpha')
            expect(items[1].text()).toContain('Beta')
        })

        it('passes icon props correctly to ListItem', () => {
            const wrapper = factory({
                listItemIcon: 'check',
                listItemIconClass: 'custom-icon',
                listItemSize: ListItemSize.MD,
                spaced: true
            })
            const listItem = wrapper.findComponent(ListItem)
            expect(listItem.props()).toMatchObject({
                icon: 'check',
                iconClass: 'custom-icon',
                size: ListItemSize.MD,
                spaced: true
            })
        })
    })

    it('does not have separator classes by default', () => {
        const wrapper = factory()
        const ul = wrapper.find('ul')
        expect(ul.classes()).not.toContain('divide-y')
        expect(ul.classes()).not.toContain('border-y')
    })

    it('adds separator classes when hasSeparator is true', () => {
        const wrapper = factory({ hasSeparator: true })
        const ul = wrapper.find('ul')
        expect(ul.classes()).toContain('divide-y')
        expect(ul.classes()).toContain('border-y')
        expect(ul.classes()).toContain('divide-border-neutral-subtle')
        expect(ul.classes()).toContain('border-border-neutral-subtle')
    })

    it('applies grid layout classes when layout is GRID', () => {
        const wrapper = factory({
            layout: ListLayout.GRID,
            cols: 3,
            tabletCols: 2,
            mobileCols: 1
        })
        const ul = wrapper.find('ul')
        const classList = ul.classes().join(' ')

        expect(classList).toContain('grid')
        expect(classList).toContain('grid-cols-1')
        expect(classList).toContain('sm:grid-cols-2')
        expect(classList).toContain('lg:grid-cols-3')
        expect(classList).toContain('gap-6')
    })

    it('applies default tabletCols when not specified', () => {
        const wrapper = factory({
            layout: ListLayout.GRID,
            cols: 4,
            mobileCols: 2
        })
        const classList = wrapper.find('ul').classes().join(' ')
        expect(classList).toContain('grid-cols-2') // mobile
        expect(classList).toContain('sm:grid-cols-2') // default tabletCols
        expect(classList).toContain('lg:grid-cols-4') // custom cols
    })

    it('does not apply grid classes when layout is LIST', () => {
        const wrapper = factory({ layout: ListLayout.LIST })
        const classList = wrapper.find('ul').classes()
        expect(classList).not.toContain('grid')
        expect(classList.some(c => c.startsWith('grid-cols-'))).toBe(false)
    })
})
