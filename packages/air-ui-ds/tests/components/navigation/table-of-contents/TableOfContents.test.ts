import { mount } from '@vue/test-utils'
import TableOfContents from '@/components/navigation/table-of-contents/TableOfContents.vue'
import TableOfContentsItem from '@/components/navigation/table-of-contents/TableOfContentsItem.vue'
import type { TOCLink } from '@/models/types/tableOfContent'

// Mock composable
vi.mock('@/composables/useTableOfContents', () => ({
    useTableOfContents: () => ({ activeId: 'section-1' }),
}))

const mockLinks: TOCLink[] = [
    { id: 'section-1', text: 'Section 1', depth: 2},
    { id: 'section-2', text: 'Section 2', depth: 2 },
]

describe('TableOfContents', () => {
    it('renders the title when provided', () => {
        const wrapper = mount(TableOfContents, {
            props: {
                title: 'Contents',
                links: mockLinks,
            },
        })

        expect(wrapper.text()).toContain('Contents')
    })

    it('does not render title element if not provided', () => {
        const wrapper = mount(TableOfContents, {
            props: {
                links: mockLinks,
            },
        })

        expect(wrapper.find('span.font-semibold').exists()).toBe(false)
    })

    it('renders a TableOfContentsItem for each link', () => {
        const wrapper = mount(TableOfContents, {
            props: {
                links: mockLinks,
            },
        })

        const items = wrapper.findAllComponents(TableOfContentsItem)
        expect(items).toHaveLength(mockLinks.length)

        items.forEach((itemWrapper, index) => {
            expect(itemWrapper.props('link')).toEqual(mockLinks[index])
            expect(itemWrapper.props('activeId')).toBe('section-1')
        })
    })

    it('renders empty list when links prop is empty', () => {
        const wrapper = mount(TableOfContents, {
            props: {
                links: [],
            },
        })

        const items = wrapper.findAllComponents(TableOfContentsItem)
        expect(items).toHaveLength(0)
    })
})
