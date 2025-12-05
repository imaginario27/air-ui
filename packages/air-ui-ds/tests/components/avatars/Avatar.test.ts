import { mount } from '@vue/test-utils'
import Avatar from '@/components/avatars/Avatar.vue'

const factory = (props?: Record<string, any>) => {
    return mount(Avatar, {
        props
    })
}

describe('Avatar.vue', () => {
    it('renders initials from displayName', () => {
        const wrapper = factory({ displayName: 'John Doe' })
        expect(wrapper.find('span').text()).toBe('JD')
    })

    it('renders initials for single-word displayName', () => {
        const wrapper = factory({ displayName: 'Plato' })
        expect(wrapper.find('span').text()).toBe('P')
    })

    it('renders an image when imgUrl is provided', () => {
        const wrapper = factory({
            imgUrl: 'https://example.com/avatar.jpg',
            displayName: 'John Doe'
        })

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
        expect(wrapper.find('span').exists()).toBe(false)
    })

    it('falls back to initials when image fails to load', async () => {
        const wrapper = factory({
            imgUrl: 'invalid-url',
            displayName: 'John Doe'
        })

        await wrapper.find('img').trigger('error')

        expect(wrapper.find('span').exists()).toBe(true)
        expect(wrapper.find('span').text()).toBe('JD')
    })

    it('applies shape class based on shape prop', () => {
        const wrapper = factory({ shape: 'square' })
        expect(wrapper.classes()).toContain('rounded-md')
    })

    it('applies size class based on size prop', () => {
        const wrapper = factory({ size: 'xl' })
        expect(wrapper.classes()).toContain('w-[48px]')
        expect(wrapper.classes()).toContain('h-[48px]')
    })

    it('applies border class when hasBorder is true', () => {
        const wrapper = factory({ hasBorder: true, size: 'md' })
        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('border-2')
    })

    it('applies hover and interactive classes when isInteractive is true', () => {
        const wrapper = factory({ isInteractive: true, size: 'xxl' })
        expect(wrapper.classes()).toContain('hover:border-2')
        expect(wrapper.classes()).toContain('cursor-pointer')
    })
})
