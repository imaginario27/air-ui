// tests/components/cards/specific/TestimonialCard.spec.ts
import { mount } from '@vue/test-utils'
import TestimonialCard from '@/components/cards/specific/TestimonialCard.vue'
import { RatingItemColor } from '@/models/enums/rating'

const factory = (props = {}, slots = {}) => {
    return mount(TestimonialCard, {
        props: {
            displayName: 'Test User',
            role: 'Developer',
            imgUrl: '/img.jpg',
            ...props
        },
        slots
    })
}

describe('TestimonialCard.vue', () => {
    it('renders with default props', () => {
        const wrapper = factory()

        expect(wrapper.find('p.text-sm').text()).toBe('Text')

        const rating = wrapper.findComponent({ name: 'Rating' })
        expect(rating.exists()).toBe(true)
        expect(rating.props('modelValue')).toBe(0)
        expect(rating.props('color')).toBe(RatingItemColor.GOLD)

        const author = wrapper.findComponent({ name: 'Author' })
        expect(author.exists()).toBe(true)

        expect(wrapper.findComponent({ name: 'CardFooter' }).exists()).toBe(false)
    })

    it('renders custom text, rating, and star color', () => {
        const wrapper = factory({
            text: 'Fantastic support!',
            ratingValue: 5,
            ratingStarColor: RatingItemColor.PRIMARY_BRAND
        })

        expect(wrapper.find('p.text-sm').text()).toBe('Fantastic support!')

        const rating = wrapper.findComponent({ name: 'Rating' })
        expect(rating.props()).toMatchObject({
            modelValue: 5,
            color: RatingItemColor.PRIMARY_BRAND
        })
    })

    it('renders Author in CardFooter when isDivided is true', () => {
        const wrapper = factory({ isDivided: true })

        const footer = wrapper.findComponent({ name: 'CardFooter' })
        expect(footer.exists()).toBe(true)

        if (footer.exists()) {
            const authorInFooter = footer.findComponent({ name: 'Author' })
            expect(authorInFooter.exists()).toBe(true)
        }

        const cardBody = wrapper.findComponent({ name: 'CardBody' })
        if (cardBody.exists()) {
            const authorInBody = cardBody.findComponent({ name: 'Author' })
            expect(authorInBody.exists()).toBe(false)
        }
    })

    it('does not render CardFooter when isDivided is false', () => {
        const wrapper = factory({ isDivided: false })

        const footer = wrapper.findComponent({ name: 'CardFooter' })
        expect(footer.exists()).toBe(false)

        const cardBody = wrapper.findComponent({ name: 'CardBody' })
        if (cardBody.exists()) {
            const authorInBody = cardBody.findComponent({ name: 'Author' })
            expect(authorInBody.exists()).toBe(true)
        }
    })
})
