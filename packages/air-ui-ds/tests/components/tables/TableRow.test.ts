import { mount, type VueWrapper } from '@vue/test-utils'
import TableRow from '@/components/tables/TableRow.vue'

type Props = {
    isHoverable?: boolean
}

const factory = (props?: Props, slots?: Record<string, string>): VueWrapper => {
    return mount(TableRow, {
        props,
        slots
    })
}

describe('TableRow', () => {
    it('mounts properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory(undefined, {
            default: '<td>Row Content</td>'
        })
        expect(wrapper.html()).toContain('<td>Row Content</td>')
    })

    it('does not apply hover class when isHoverable is false', () => {
        const wrapper = factory({ isHoverable: false })
        expect(wrapper.classes()).not.toContain('hover:bg-background-neutral-subtlest')
    })

    it('applies hover class when isHoverable is true', () => {
        const wrapper = factory({ isHoverable: true })
        expect(wrapper.classes()).toContain('hover:bg-background-neutral-subtlest')
    })
})
