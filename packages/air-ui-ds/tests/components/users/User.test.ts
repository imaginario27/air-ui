import { mount } from '@vue/test-utils'
import User from '@/components/users/User.vue'
import { AvatarSize, AvatarShape } from '@/models/enums/avatars'
import { trimText } from '#imports'

const defaultProps = {
    displayName: 'John Doe',
    size: AvatarSize.XS as AvatarSize.XS,
    shape: AvatarShape.CIRCLE,
    isInteractive: false,
    imgUrl: 'https://example.com/avatar.jpg',
}

const factory = (props = {}) => {
    return mount(User, {
        props: {
            ...defaultProps,
            ...props,
        },
    })
}

describe('User.vue', () => {
    it('renders the displayName correctly', () => {
        const wrapper = factory({ displayName: 'Alice' })
        expect(wrapper.text()).toContain('Alice')
    })

    it('trims long displayName to 20 characters', () => {
        const longName = 'AVeryLongDisplayNameThatExceedsTwentyChars'
        const wrapper = factory({ displayName: longName })

        const expectedTrimmed = trimText(longName, 20)
        const renderedText = wrapper.find('span').text()

        expect(renderedText).toBe(expectedTrimmed)
        expect(renderedText.length).toBeLessThanOrEqual(expectedTrimmed.length)
    })

    it('applies interactive classes when isInteractive is true', () => {
        const wrapper = factory({ isInteractive: true })
        expect(wrapper.classes()).toContain('group')
    })

    it('does not apply interactive classes when isInteractive is false', () => {
        const wrapper = factory({ isInteractive: false })
        expect(wrapper.classes()).not.toContain('group')
    })

    it('passes props correctly to Avatar', () => {
        const wrapper = factory({
            displayName: 'Zoe',
            imgUrl: 'https://example.com/zoe.png',
            size: AvatarSize.MD,
            shape: AvatarShape.CIRCLE,
        })

        const avatar = wrapper.findComponent({ name: 'Avatar' })
        expect(avatar.exists()).toBe(true)
        expect(avatar.props('displayName')).toBe('Zoe')
        expect(avatar.props('imgUrl')).toBe('https://example.com/zoe.png')
        expect(avatar.props('size')).toBe(AvatarSize.MD)
        expect(avatar.props('shape')).toBe(AvatarShape.CIRCLE)
    })
})