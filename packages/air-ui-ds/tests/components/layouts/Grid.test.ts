import { mount } from '@vue/test-utils'
import Grid from '@/components/layouts/Grid.vue'

const factory = (props = {}, options = {}) => {
    return mount(Grid, {
        props,
        slots: {
            default: '<div>Grid item</div>'
        },
        ...options
    })
}

describe('Grid.vue', () => {
    it('renders the component correctly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Grid item')
    })

    it('applies default grid classes when no props are provided', () => {
        const wrapper = factory()
        const classList = wrapper.classes().join(' ')
        expect(classList).toContain('grid')
        expect(classList).toContain('gap-6') 
        expect(classList).toContain('w-full')
        expect(classList).toContain('grid-cols-1') // mobileCols default
        expect(classList).toContain('sm:grid-cols-2') // tabletCols default
        expect(classList).toContain('lg:grid-cols-3') // cols default
    })

    it('applies correct grid classes for custom cols, tabletCols, and mobileCols', () => {
        const wrapper = factory({ cols: 4, tabletCols: 3, mobileCols: 2 })
        const classList = wrapper.classes().join(' ')
        expect(classList).toContain('grid-cols-2')
        expect(classList).toContain('sm:grid-cols-3')
        expect(classList).toContain('lg:grid-cols-4')
    })

    it('applies correct grid classes when only mobileCols is set', () => {
        const wrapper = factory({ mobileCols: 2 })
        const classList = wrapper.classes().join(' ')
        expect(classList).toContain('grid-cols-2')
        expect(classList).toContain('sm:grid-cols-2') // default tabletCols
        expect(classList).toContain('lg:grid-cols-3') // default cols
    })

    it('applies correct grid classes when only tabletCols is set', () => {
        const wrapper = factory({ tabletCols: 4 })
        const classList = wrapper.classes().join(' ')
        expect(classList).toContain('grid-cols-1') // default mobileCols
        expect(classList).toContain('sm:grid-cols-4')
        expect(classList).toContain('lg:grid-cols-3') // default cols
    })

    it('applies correct grid classes when only cols is set', () => {
        const wrapper = factory({ cols: 2 })
        const classList = wrapper.classes().join(' ')
        expect(classList).toContain('grid-cols-1') // default mobileCols
        expect(classList).toContain('sm:grid-cols-2') // default tabletCols
        expect(classList).toContain('lg:grid-cols-2')
    })

    it('applies all three grid breakpoints when all props are custom', () => {
        const wrapper = factory({ cols: 6, tabletCols: 4, mobileCols: 2 })
        const classList = wrapper.classes().join(' ')
        expect(classList).toContain('grid-cols-2')
        expect(classList).toContain('sm:grid-cols-4')
        expect(classList).toContain('lg:grid-cols-6')
    })
})
