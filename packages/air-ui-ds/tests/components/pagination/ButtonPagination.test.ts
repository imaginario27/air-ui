import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ButtonPagination from '@/components/pagination/ButtonPagination.vue'

const { useIsMobileSpy } = vi.hoisted(() => ({
    useIsMobileSpy: vi.fn()
}))
vi.mock('@/composables/useIsMobile', () => ({
    useIsMobile: (breakpoint?: unknown) => {
        useIsMobileSpy(breakpoint)
        return { isMobile: ref(false) }
    }
}))

const defaultRowsPerPageOptions = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: '50', value: 50 },
    { text: '100', value: 100 }
]

const factory = (props = {}) => {
    return mount(ButtonPagination, {
        props: {
            modelValue: 2,
            totalItems: 100,
            itemsPerPage: 10,
            rowsPerPageOptions: defaultRowsPerPageOptions,
            ...props
        }
    })
}

describe('ButtonPagination', () => {
    it('forwards mobileBreakpoint to useIsMobile (default 1024)', () => {
        useIsMobileSpy.mockClear()
        factory()
        const breakpointArg = useIsMobileSpy.mock.calls.at(-1)?.[0]
        expect(typeof breakpointArg).toBe('function')
        expect(breakpointArg()).toBe(1024)
    })

    it('forwards a custom mobileBreakpoint to useIsMobile', () => {
        useIsMobileSpy.mockClear()
        factory({ mobileBreakpoint: 1280 })
        const breakpointArg = useIsMobileSpy.mock.calls.at(-1)?.[0]
        expect(typeof breakpointArg).toBe('function')
        expect(breakpointArg()).toBe(1280)
    })

    it('renders default multiple-page text if no custom text is provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Showing 11 to 20')
        expect(wrapper.text()).toContain('of 100 results')
    })

    it('renders custom multiple-page result text when provided', () => {
        const wrapper = factory({
            resultTextMultiplePages: 'Custom from {from} to {to} of {total}'
        })

        expect(wrapper.text()).toContain('Custom from 11 to 20 of 100')
    })

    it('renders custom single-page text when provided', () => {
        const wrapper = factory({
            totalItems: 5,
            itemsPerPage: 10,
            resultTextSinglePage: 'Showing everything at once'
        })

        expect(wrapper.text()).toContain('Showing everything at once')
    })

    it('renders custom single-item text when only one result is present', () => {
        const wrapper = factory({
            totalItems: 1,
            itemsPerPage: 10,
            resultTextSingleItem: 'Just one entry'
        })

        expect(wrapper.text()).toContain('Just one entry')
    })

    it('renders fallback single-page text when not provided', () => {
        const wrapper = factory({
            totalItems: 5,
            itemsPerPage: 10
        })

        expect(wrapper.text()).toContain('Showing 5 results')
    })

    it('does not render pagination nav if totalItems <= itemsPerPage', () => {
        const wrapper = factory({ totalItems: 5 })
        expect(wrapper.find('nav').exists()).toBe(false)
    })

    it('renders pagination nav only if totalItems > itemsPerPage', () => {
        const wrapper = factory({ totalItems: 25, itemsPerPage: 10 })
        expect(wrapper.find('nav').exists()).toBe(true)
    })

    it('emits correct page on next and prev clicks', async () => {
        const wrapper = factory({ modelValue: 3 })

        const buttons = wrapper.findAllComponents({ name: 'PaginationButton' })
        const prev = buttons[0]
        const next = buttons[buttons.length - 1]

        await prev.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toContainEqual([2])

        await next.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toContainEqual([4])
    })

    it('emits page number when a number button is clicked', async () => {
        const wrapper = factory({ modelValue: 4 })
        const pageButtons = wrapper.findAllComponents({ name: 'PaginationButton' })

        const target = pageButtons.find(btn => btn.text() === '5')
        expect(target).toBeTruthy()

        await target?.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toContainEqual([5])
    })

    it('ignores click on ellipsis pagination button', async () => {
        const wrapper = factory({ modelValue: 5, totalItems: 200 })
        const ellipsis = wrapper.findAllComponents({ name: 'PaginationButton' }).find(btn => btn.text() === '...')
        expect(ellipsis).toBeTruthy()

        await ellipsis?.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('disables previous button on first page and next button on last page', () => {
        const wrapperFirst = factory({ modelValue: 1 })
        const wrapperLast = factory({ modelValue: 10, totalItems: 100 })

        const prev = wrapperFirst.findAllComponents({ name: 'PaginationButton' })[0]
        const next = wrapperLast.findAllComponents({ name: 'PaginationButton' }).slice(-1)[0]

        expect(prev.attributes('disabled')).toBeDefined()
        expect(next.attributes('disabled')).toBeDefined()
    })

    it('renders ellipsis when total pages exceed max visible', () => {
        const wrapper = factory({ modelValue: 6, totalItems: 200 })
        const dots = wrapper.findAllComponents({ name: 'PaginationButton' }).filter(btn => btn.text() === '...')
        expect(dots.length).toBeGreaterThan(0)
    })

    it('emits itemsPerPage update and resets modelValue to 1 on change', async () => {
        const wrapper = factory()

        const rowsComponent = wrapper.findAllComponents({ name: 'RowsPerPage' })[0]
        await rowsComponent.vm.$emit('update:modelValue', 25)

        expect(wrapper.emitted('update:modelValue')).toContainEqual([1])
        expect(wrapper.emitted('update:itemsPerPage')).toContainEqual([25])
    })

    it('hides the mobile-position RowsPerPage and shows the desktop one when not mobile', () => {
        const wrapper = factory()

        const rows = wrapper.findAllComponents({ name: 'RowsPerPage' })

        expect(rows.length).toBe(2)
        // First in template = mobile-position, hidden on desktop
        expect(rows[0].classes()).toContain('hidden')
        // Second = desktop-position, visible on desktop
        expect(rows[1].classes()).not.toContain('hidden')
    })

    it('does not render desktop RowsPerPage if showRowsPerPage is false', () => {
        const wrapper = factory({ showRowsPerPage: false })
        const rows = wrapper.findAllComponents({ name: 'RowsPerPage' })

        // Only the always-rendered mobile-position RowsPerPage remains
        expect(rows.length).toBe(1)
    })

    it('applies default aria-labels to previous, next and page buttons', () => {
        const wrapper = factory({ modelValue: 3 })
        const buttons = wrapper.findAllComponents({ name: 'PaginationButton' })

        const prev = buttons[0]
        const next = buttons[buttons.length - 1]
        const pageThree = buttons.find(btn => btn.text() === '3')

        expect(prev.props('ariaLabel')).toBe('Previous page')
        expect(next.props('ariaLabel')).toBe('Next page')
        expect(pageThree?.props('ariaLabel')).toBe('Page 3')
    })

    it('applies custom aria-labels when provided', () => {
        const wrapper = factory({
            modelValue: 3,
            ariaLabelPrevious: 'Go back',
            ariaLabelNext: 'Go forward',
            ariaLabelPage: 'Go to page {page}'
        })
        const buttons = wrapper.findAllComponents({ name: 'PaginationButton' })

        const prev = buttons[0]
        const next = buttons[buttons.length - 1]
        const pageThree = buttons.find(btn => btn.text() === '3')

        expect(prev.props('ariaLabel')).toBe('Go back')
        expect(next.props('ariaLabel')).toBe('Go forward')
        expect(pageThree?.props('ariaLabel')).toBe('Go to page 3')
    })

    it('sets aria-current="page" only on the active page button', () => {
        const wrapper = factory({ modelValue: 3 })
        const buttons = wrapper.findAllComponents({ name: 'PaginationButton' })

        const activePage = buttons.find(btn => btn.text() === '3')
        const inactivePage = buttons.find(btn => btn.text() === '2')

        expect(activePage?.attributes('aria-current')).toBe('page')
        expect(inactivePage?.attributes('aria-current')).toBeUndefined()
    })

    it('falls back to the default aria-label on the ellipsis button', () => {
        const wrapper = factory({ modelValue: 5, totalItems: 200 })
        const ellipsis = wrapper.findAllComponents({ name: 'PaginationButton' }).find(btn => btn.text() === '...')

        expect(ellipsis?.props('ariaLabel')).toBe('Navigation button')
    })
})

describe('ButtonPagination - mobile behavior', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({ isMobile: ref(true) })
        }))
    })

    it('renders reduced page list in mobile view', async () => {
        const { default: ButtonPagination } = await import('@/components/pagination/ButtonPagination.vue')

        const wrapper = mount(ButtonPagination, {
            props: {
                modelValue: 3,
                totalItems: 100,
                itemsPerPage: 10,
                rowsPerPageOptions: defaultRowsPerPageOptions
            }
        })

        const pages = wrapper.findAllComponents({ name: 'PaginationButton' }).filter(btn => btn.text().match(/^\d+$/))
        expect(pages.length).toBeLessThanOrEqual(4)
    })
})
