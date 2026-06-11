import { mount } from '@vue/test-utils'
import SimplePagination from '@/components/pagination/SimplePagination.vue'

const factory = (props = {}) => {
    return mount(SimplePagination, {
        props: {
            modelValue: 2,
            totalItems: 50,
            itemsPerPage: 10,
            ...props
        }
    })
}

describe('SimplePagination', () => {
    it('renders default multiple pages text correctly', () => {
        const wrapper = factory()
        const summary = wrapper.find('p.text-sm')
        expect(summary.exists()).toBe(true)
        expect(summary.text()).toBe('Showing 11 to 20 of 50 results')
    })

    it('renders custom resultTextMultiplePages if provided', () => {
        const wrapper = factory({
            resultTextMultiplePages: 'Page {from}–{to} of {total} entries'
        })
        const summary = wrapper.find('p.text-sm')
        expect(summary.text()).toBe('Page 11–20 of 50 entries')
    })

    it('renders custom resultTextSingleItem when totalItems is 1', () => {
        const wrapper = factory({
            modelValue: 1,
            totalItems: 1,
            itemsPerPage: 10,
            resultTextSingleItem: 'Only {total} record found'
        })
        const summary = wrapper.find('p.text-sm')
        expect(summary.text()).toBe('Only 1 record found')
    })

    it('renders custom resultTextSinglePage when totalItems fit on one page', () => {
        const wrapper = factory({
            modelValue: 1,
            totalItems: 5,
            itemsPerPage: 10,
            resultTextSinglePage: 'Displaying all {total} items'
        })
        const summary = wrapper.find('p.text-sm')
        expect(summary.text()).toBe('Displaying all 5 items')
    })

    it('disables previous button on first page', () => {
        const wrapper = factory({ modelValue: 1 })
        const prev = wrapper.findAllComponents({ name: 'ActionIconButton' })[0]
        expect(prev.props('disabled')).toBe(true)
    })

    it('disables next button on last page', () => {
        const wrapper = factory({ modelValue: 5 }) // 50 items / 10 per page = 5 pages
        const next = wrapper.findAllComponents({ name: 'ActionIconButton' })[1]
        expect(next.props('disabled')).toBe(true)
    })

    it('emits update:modelValue on previous button click', async () => {
        const wrapper = factory({ modelValue: 3 })
        const prev = wrapper.findAllComponents({ name: 'ActionIconButton' })[0]

        await prev.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toContainEqual([2])
    })

    it('emits update:modelValue on next button click', async () => {
        const wrapper = factory({ modelValue: 3 })
        const next = wrapper.findAllComponents({ name: 'ActionIconButton' })[1]

        await next.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toContainEqual([4])
    })

    it('does not emit when clicking previous on first page', async () => {
        const wrapper = factory({ modelValue: 1 })
        const prev = wrapper.findAllComponents({ name: 'ActionIconButton' })[0]

        await prev.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not emit when clicking next on last page', async () => {
        const wrapper = factory({ modelValue: 5 }) // last page
        const next = wrapper.findAllComponents({ name: 'ActionIconButton' })[1]

        await next.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('uses default aria labels on pagination buttons', () => {
        const wrapper = factory()
        const [prev, next] = wrapper.findAllComponents({ name: 'ActionIconButton' })
        expect(prev.props('ariaLabel')).toBe('Previous page')
        expect(next.props('ariaLabel')).toBe('Next page')
    })

    it('forwards custom aria labels to pagination buttons', () => {
        const wrapper = factory({
            previousPageAriaLabel: 'Página anterior',
            nextPageAriaLabel: 'Página siguiente',
        })
        const [prev, next] = wrapper.findAllComponents({ name: 'ActionIconButton' })
        expect(prev.props('ariaLabel')).toBe('Página anterior')
        expect(next.props('ariaLabel')).toBe('Página siguiente')
    })
})
