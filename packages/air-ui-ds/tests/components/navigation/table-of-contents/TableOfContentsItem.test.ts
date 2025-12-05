import { mount } from '@vue/test-utils'
import TableOfContentsItem from '@/components/navigation/table-of-contents/TableOfContentsItem.vue'
import type { TOCLink } from '@/models/types/tableOfContent'

const factory = (props: any) => {
    return mount(TableOfContentsItem, {
        props,
    })
}

const baseLink: TOCLink = {
    id: 'section-1',
    text: 'Section 1',
    depth: 1,
    children: [],
}

describe('TableOfContentsItem', () => {
    it('renders link with correct href and text', () => {
        const wrapper = factory({
            link: baseLink,
            activeId: null,
        })

        const anchor = wrapper.find('a')
        expect(anchor.attributes('href')).toBe('#section-1')
        expect(anchor.text()).toBe('Section 1')
    })

    it('adds "pl-4" class if depth is not 2', () => {
        const wrapper = factory({
            link: { ...baseLink, depth: 1 },
            activeId: null,
        })

        expect(wrapper.find('a').classes()).toContain('pl-4')
    })

    it('does not add "pl-4" class if depth is 2', () => {
        const wrapper = factory({
            link: { ...baseLink, depth: 2 },
            activeId: null,
        })

        expect(wrapper.find('a').classes()).not.toContain('pl-4')
    })

    it('applies active styling when link.id matches activeId', () => {
        const wrapper = factory({
            link: baseLink,
            activeId: 'section-1',
        })

        const anchor = wrapper.find('a')
        expect(anchor.classes()).toContain('text-text-primary-brand-active')
        expect(anchor.classes()).toContain('font-semibold')
    })

    it('does not apply active styling when link.id does not match activeId', () => {
        const wrapper = factory({
            link: baseLink,
            activeId: 'other-section',
        })

        const anchor = wrapper.find('a')
        expect(anchor.classes()).not.toContain('text-text-primary-brand-active')
        expect(anchor.classes()).not.toContain('font-semibold')
    })

        it('renders child TableOfContentsItem components recursively', () => {
        const wrapper = factory({
            link: {
                ...baseLink,
                children: [
                    {
                        id: 'child-1',
                        text: 'Child 1',
                        depth: 2,
                        children: [],
                    },
                    {
                        id: 'child-2',
                        text: 'Child 2',
                        depth: 2,
                        children: [],
                    },
                ],
            },
            activeId: 'child-1',
        })

        const childComponents = wrapper.findAllComponents(TableOfContentsItem)

        // Only the two child components (not including self)
        expect(childComponents).toHaveLength(2)

        expect(childComponents[0].props('link').id).toBe('child-1')
        expect(childComponents[1].props('link').id).toBe('child-2')
    })


    it('does not render child list if no children exist', () => {
        const wrapper = factory({
            link: baseLink,
            activeId: null,
        })

        expect(wrapper.find('ul').exists()).toBe(false)
    })
})
