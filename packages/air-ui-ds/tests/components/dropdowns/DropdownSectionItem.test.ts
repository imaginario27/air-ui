import { mount } from '@vue/test-utils'
import DropdownSectionItem from '@/components/dropdowns/DropdownSectionItem.vue'
import Icon from '@/components/icons/Icon.vue'

const factory = (props: Record<string, any> = {}) => {
    return mount(DropdownSectionItem, {
        props,
        global: {
            stubs: {
                Icon,
            },
        },
    })
}

describe('DropdownSectionItem.vue', () => {
    it('renders section title text', () => {
        const wrapper = factory({ text: 'Section A' })
        expect(wrapper.text()).toContain('Section A')
    })

    it('renders icon only when icon prop is provided', () => {
        const withIcon = factory({ icon: 'mdi:folder' })
        expect(withIcon.findComponent(Icon).exists()).toBe(true)

        const withoutIcon = factory()
        expect(withoutIcon.findComponent(Icon).exists()).toBe(false)
    })

    it('applies non-hover section styles and bottom separator', () => {
        const wrapper = factory()
        const classList = wrapper.classes()

        expect(classList).toContain('text-text-neutral-subtle')
        expect(classList).toContain('font-semibold')
        expect(classList).toContain('border-b')
        expect(classList).toContain('border-border-default')
    })
})
