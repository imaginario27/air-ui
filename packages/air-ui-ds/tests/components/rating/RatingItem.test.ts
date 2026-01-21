import { mount } from '@vue/test-utils'
import RatingItem from '~/components/rating/RatingItem.vue'

type FactoryOptions = {
    icon?: string
    size?: string
    color?: string
    isInteractive?: boolean
}

const defaultProps = {
    icon: 'mdi:star-outline',
    size: 'sm',
    color: 'gold',
    isInteractive: false
}

const factory = (options: FactoryOptions = {}) => {
    return mount(RatingItem, {
        props: {
            ...defaultProps,
            ...options
        }
    })
}

describe('RatingItem', () => {
    it('renders with default props', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:star-outline')
        expect(icon.classes()).toContain('w-[20px]')
        expect(icon.classes()).toContain('!text-icon-rating')
        expect(icon.classes()).not.toContain('hover:cursor-pointer')
    })

    it('renders custom icon when provided', () => {
        const wrapper = factory({ icon: 'mdi:heart' })
        expect(wrapper.findComponent({ name: 'Icon' }).props('name')).toBe('mdi:heart')
    })

    it('applies correct size class based on size prop', () => {
        const sizeMap: Record<string, string> = {
            sm: 'w-[20px]',
            md: 'w-[24px]',
            lg: 'w-[32px]',
            xl: 'w-[40px]',
            xxl: 'w-[48px]'
        }

        for (const [size, className] of Object.entries(sizeMap)) {
            const wrapper = factory({ size })
            expect(wrapper.findComponent({ name: 'Icon' }).classes()).toContain(className)
        }
    })

    it('adds hover class when isInteractive is true', () => {
        const wrapper = factory({ isInteractive: true })
        expect(wrapper.findComponent({ name: 'Icon' }).classes()).toContain('hover:cursor-pointer')
    })
})
