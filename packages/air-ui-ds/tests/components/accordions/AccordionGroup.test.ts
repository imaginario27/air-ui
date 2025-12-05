import { mount } from '@vue/test-utils'
import AccordionGroup from '@/components/accordions/AccordionGroup.vue'
import Accordion from '@/components/accordions/Accordion.vue'
import { OrderPosition } from '@/models/enums/order'

const defaultItems = [
    { id: 1, title: 'Item 1', content: 'Content 1', group: 'Group A' },
    { id: 2, title: 'Item 2', content: 'Content 2', group: 'Group B' },
    { id: 3, title: 'Item 3', content: 'Content 3' } // goes to default group
]

const factory = (props?: Partial<InstanceType<typeof AccordionGroup>['$props']>) => {
    return mount(AccordionGroup, {
        props: {
            items: defaultItems,
            ...props
        },
        global: {
            components: {
                Accordion
            }
        }
    })
}

describe('AccordionGroup (integration)', () => {
    it('renders correct number of accordion groups', () => {
        const wrapper = factory()
        const groups = wrapper.findAll('.accordion-group')
        expect(groups).toHaveLength(3)
    })

    it('renders correct group headers with default group at the start', () => {
        const wrapper = factory({
            defaultGroupPosition: OrderPosition.START
        })

        const headers = wrapper.findAll('h3') // default titleTag = 'h3'
        expect(headers).toHaveLength(3)

        expect(headers[0].text()).toBe('Group title')
        expect(headers[1].text()).toBe('Group A')
        expect(headers[2].text()).toBe('Group B')
    })

    it('renders correct group headers with default group at the end', () => {
        const wrapper = factory({
            defaultGroupPosition: OrderPosition.END
        })

        const headers = wrapper.findAll('h3')
        expect(headers).toHaveLength(3)

        expect(headers[0].text()).toBe('Group A')
        expect(headers[1].text()).toBe('Group B')
        expect(headers[2].text()).toBe('Group title')
    })

    it('supports custom heading tag via titleTag prop', () => {
        const wrapper = factory({ titleTag: 'h5' })
        const headers = wrapper.findAll('h5')

        expect(headers).toHaveLength(3)
        headers.forEach(header => {
            expect(header.text()).toBeTruthy()
        })
    })

    it('applies the provided titleCustomClass to group headers', () => {
        const customClass = 'text-blue-600'
        const wrapper = factory({ titleCustomClass: customClass })
        const headers = wrapper.findAll('h3')
        headers.forEach(header => {
            expect(header.classes()).toContain(customClass)
        })
    })

    it('applies mt-4 to all but the first group header', () => {
        const wrapper = factory()
        const headers = wrapper.findAll('h3')

        expect(headers[0].classes()).not.toContain('mt-4')
        expect(headers[1].classes()).toContain('mt-4')
        expect(headers[2].classes()).toContain('mt-4')
    })

    it('renders one Accordion component per group with correct props', () => {
        const wrapper = factory({ defaultGroupPosition: OrderPosition.END })
        const accordions = wrapper.findAllComponents(Accordion)
        expect(accordions).toHaveLength(3)

        const itemsPerGroup = accordions.map(acc => acc.props('items'))

        expect(itemsPerGroup).toContainEqual([
            { id: 1, title: 'Item 1', content: 'Content 1', group: 'Group A' }
        ])
        expect(itemsPerGroup).toContainEqual([
            { id: 2, title: 'Item 2', content: 'Content 2', group: 'Group B' }
        ])
        expect(itemsPerGroup).toContainEqual([
            { id: 3, title: 'Item 3', content: 'Content 3' }
        ])
    })

    it('renders nothing if items array is empty', () => {
        const wrapper = factory({ items: [] })

        expect(wrapper.find('.accordion-group').exists()).toBe(false)
        expect(wrapper.find('div').exists()).toBe(false)
        expect(wrapper.html()).toContain('<!--v-if-->')
    })
})
