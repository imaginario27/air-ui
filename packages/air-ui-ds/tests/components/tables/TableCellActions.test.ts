import { mount, type VueWrapper } from '@vue/test-utils'
import TableCellActions from '@/components/tables/TableCellActions.vue'

const factory = (options?: {
    slots?: Record<string, string>
}): VueWrapper => {
    return mount(TableCellActions, {
        ...options
    })
}

describe('TableCellActions', () => {
    it('mounts properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory({
            slots: {
                default: '<button>Action</button>'
            }
        })

        expect(wrapper.html()).toContain('<button>Action</button>')
    })

    it('wraps slot content in a div with correct classes', () => {
        const wrapper = factory({
            slots: {
                default: '<span>Icon</span>'
            }
        })

        const div = wrapper.find('div')
        expect(div.exists()).toBe(true)
        expect(div.classes()).toContain('flex')
        expect(div.classes()).toContain('gap-2')
        expect(div.html()).toContain('<span>Icon</span>')
    })

    it('renders inside a <td> element (from TableCell)', () => {
        const wrapper = factory()
        expect(wrapper.element.tagName).toBe('TD')
    })
})
