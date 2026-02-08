import { mount } from '@vue/test-utils'
import TableOfContentsItem from '@/components/navigation/table-of-contents/TableOfContentsItem.vue'
import type { TOCLink } from '@/models/types/tableOfContent'

const baseLink: TOCLink = {
    id: 'section-1',
    text: 'Section 1',
    depth: 1,
    children: [],
}

const factory = (props: { link: TOCLink; activeId?: string | null }) => {
    return mount(TableOfContentsItem, {
        props,
    })
}

describe('TableOfContentsItem', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('renders anchor with correct text and href', () => {
        const wrapper = factory({ link: baseLink, activeId: null })
        const anchor = wrapper.find('a')

        expect(anchor.text()).toBe('Section 1')
        expect(anchor.attributes('href')).toBe('#')
    })

    it('adds "pl-4" class when depth is not 2', () => {
        const wrapper = factory({ link: { ...baseLink, depth: 1 }, activeId: null })

        expect(wrapper.find('a').classes()).toContain('pl-4')
    })

    it('omits "pl-4" class when depth is 2', () => {
        const wrapper = factory({ link: { ...baseLink, depth: 2 }, activeId: null })

        expect(wrapper.find('a').classes()).not.toContain('pl-4')
    })

    it('applies active classes when link.id matches activeId', () => {
        const wrapper = factory({ link: baseLink, activeId: 'section-1' })
        const anchor = wrapper.find('a')

        expect(anchor.classes()).toContain('text-text-primary-brand-active')
        expect(anchor.classes()).toContain('font-semibold')
    })

    it('does not apply active classes when link.id does not match activeId', () => {
        const wrapper = factory({ link: baseLink, activeId: 'other-id' })
        const anchor = wrapper.find('a')

        expect(anchor.classes()).not.toContain('text-text-primary-brand-active')
        expect(anchor.classes()).not.toContain('font-semibold')
    })

    it('renders nested TableOfContentsItem components when children exist', () => {
        const wrapper = factory({
            link: {
                ...baseLink,
                children: [
                    { id: 'child-1', text: 'Child 1', depth: 2, children: [] },
                    { id: 'child-2', text: 'Child 2', depth: 2, children: [] },
                ],
            },
            activeId: 'child-1',
        })

        const items = wrapper.findAllComponents(TableOfContentsItem)
        expect(items).toHaveLength(2)

        expect(items[0].props('link').id).toBe('child-1')
        expect(items[1].props('link').id).toBe('child-2')
    })

    it('emits "itemClick" when anchor is clicked', async () => {
        const wrapper = factory({ link: baseLink, activeId: null })

        await wrapper.find('a').trigger('click')

        expect(wrapper.emitted('itemClick')).toBeTruthy()
    })

    it('emits "itemClick" when child TableOfContentsItem emits it', async () => {
        const wrapper = factory({
            link: {
                ...baseLink,
                children: [
                    { id: 'child-1', text: 'Child 1', depth: 2, children: [] },
                ],
            },
            activeId: null,
        })

        const child = wrapper.findComponent(TableOfContentsItem)
        await child.vm.$emit('itemClick')

        expect(wrapper.emitted('itemClick')).toBeTruthy()
    })

    it('does not render children list when children array is empty', () => {
        const wrapper = factory({ link: baseLink, activeId: null })

        expect(wrapper.find('ul').exists()).toBe(false)
    })

    it('scrolls to element and updates URL on anchor click', async () => {
        const scrollIntoView = vi.fn()
        const mockElement = { scrollIntoView }
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement)
        vi.spyOn(history, 'replaceState').mockImplementation(() => {})

        const wrapper = factory({ link: baseLink, activeId: null })

        await wrapper.find('a').trigger('click')

        expect(document.getElementById).toHaveBeenCalledWith('section-1')
        expect(scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start',
        })
        expect(history.replaceState).toHaveBeenCalledWith(history.state, '', '#section-1')
    })

    it('does not throw when clicked element is not found in DOM', async () => {
        vi.spyOn(document, 'getElementById').mockReturnValue(null)

        const wrapper = factory({ link: baseLink, activeId: null })

        await expect(wrapper.find('a').trigger('click')).resolves.not.toThrow()
    })
})
