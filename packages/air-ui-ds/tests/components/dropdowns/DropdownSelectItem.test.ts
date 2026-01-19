import { mount } from '@vue/test-utils'
import DropdownSelectItem from '@/components/dropdowns/DropdownSelectItem.vue'
import Icon from '@/components/icons/Icon.vue'
import { SelectType, SelectActiveStyle } from '@/models/enums/selects'

vi.mock('@/assets/images/placeholders/missing-image-placeholder.png', () => ({
    default: '/mocked/missing-image.png'
}))

const factory = (props: Record<string, any> = {}) => {
    return mount(DropdownSelectItem, {
        props,
        global: {
            stubs: {
                Icon
            }
        }
    })
}

describe('DropdownSelectItem.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the provided text', () => {
        const wrapper = factory({ text: 'Test Item' })
        expect(wrapper.text()).toContain('Test Item')
    })

    it('renders an icon when type is ICON', () => {
        const wrapper = factory({
            type: SelectType.ICON,
            icon: 'mdi:check'
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
    })

    it('renders a user component when type is USER', () => {
        const wrapper = factory({
            type: SelectType.USER,
            userDisplayName: 'John Doe'
        })

        expect(wrapper.text()).toContain('John Doe')
    })

    it('renders the image when imgUrl is provided and image loads', () => {
        const wrapper = factory({
            type: SelectType.IMAGE,
            imgUrl: 'https://example.com/image.png',
            alt: 'Test image'
        })

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('https://example.com/image.png')
        expect(img.attributes('alt')).toBe('Test image')
    })

    it('renders fallback image when img fails to load', async () => {
        const wrapper = factory({
            type: SelectType.IMAGE,
            imgUrl: 'broken.png',
            alt: 'Broken'
        })

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)

        await img.trigger('error')
        await wrapper.vm.$nextTick()

        const fallbackImg = wrapper.find('img')
        expect(fallbackImg.attributes('src')).toBe('/mocked/missing-image.png')
        expect(fallbackImg.attributes('alt')).toBe('Broken')
    })

    it('renders fallback image when imgUrl is not provided', () => {
        const wrapper = factory({
            type: SelectType.IMAGE
        })

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('/mocked/missing-image.png')
    })

    it('applies selected styling when isSelected is true and activeStyle is FILL', () => {
        const wrapper = factory({
            isSelected: true,
            activeStyle: SelectActiveStyle.FILL
        })

        expect(wrapper.classes()).toContain('bg-background-primary-brand-active')
    })

    it('renders check icon when isSelected and activeStyle is CHECK', () => {
        const wrapper = factory({
            isSelected: true,
            activeStyle: SelectActiveStyle.CHECK
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
    })

    it('renders as an anchor tag when "to" prop is provided', () => {
        const wrapper = factory({
            to: '/home'
        })

        expect(wrapper.element.tagName).toBe('A')
        expect(wrapper.attributes('href')).toBe('/home')
    })

    it('emits a click event when clicked', async () => {
        const wrapper = factory()
        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
    })
})
