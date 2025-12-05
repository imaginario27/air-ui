// tests/components/cards/CardFooter.spec.ts
import { mount } from '@vue/test-utils'
import CardFooter from '@/components/cards/CardFooter.vue'

describe('CardFooter.vue', () => {
    it('renders the component properly', () => {
        const wrapper = mount(CardFooter)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mount(CardFooter, {
            slots: {
                default: '<p>Footer Content</p>'
            }
        })
        expect(wrapper.html()).toContain('Footer Content')
    })

    it('renders border by default (hasBorder = true)', () => {
        const wrapper = mount(CardFooter)
        expect(wrapper.classes()).toContain('border-t')
        expect(wrapper.classes()).toContain('border-border-neutral-subtle')
    })

    it('does not render border when hasBorder = false', () => {
        const wrapper = mount(CardFooter, {
            props: {
                hasBorder: false
            }
        })
        expect(wrapper.classes()).not.toContain('border-t')
        expect(wrapper.classes()).not.toContain('border-border-neutral-subtle')
    })
})
