import { mount } from '@vue/test-utils'
import TableOfContentsSidebar from '@/components/navigation/table-of-contents/TableOfContentsSidebar.vue'
import TableOfContents from '@/components/navigation/table-of-contents/TableOfContents.vue'
import type { TOCLink } from '@/models/types/tableOfContent'

const mockLinks: TOCLink[] = [
    { id: 'sec-1', text: 'Section 1', depth: 1, children: [] },
    { id: 'sec-2', text: 'Section 2', depth: 1, children: [] },
]

describe('TableOfContentsSidebar', () => {
    it('renders TableOfContents with passed props', () => {
        const wrapper = mount(TableOfContentsSidebar, {
            props: {
                title: 'On this page',
                links: mockLinks,
            },
        })

        const toc = wrapper.findComponent(TableOfContents)

        expect(toc.exists()).toBe(true)
        expect(toc.props('title')).toBe('On this page')
        expect(toc.props('links')).toEqual(mockLinks)
    })
})
