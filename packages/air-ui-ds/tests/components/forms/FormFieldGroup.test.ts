import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import FormFieldGroup from '~/components/forms/FormFieldGroup.vue'

const factory = (options = {}): VueWrapper => {
    return mount(FormFieldGroup, {
        slots: {
            default: '<div data-test="slot">Field content</div>'
        },
        ...options
    })
}

describe('FormFieldGroup.vue', () => {
    it.concurrent('renders default title and default heading tag', () => {
        const wrapper = factory()

        const heading = wrapper.find('h3')

        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('Group title')
    })

    it.concurrent('renders provided title', () => {
        const wrapper = factory({
            props: {
                title: 'User Info'
            }
        })

        expect(wrapper.find('h3').text()).toBe('User Info')
    })

    it.concurrent('renders slot content', () => {
        const wrapper = factory()

        expect(wrapper.find('[data-test="slot"]').exists()).toBe(true)
        expect(wrapper.text()).toContain('Field content')
    })

    it.concurrent('applies titleClass when provided', () => {
        const wrapper = factory({
            props: {
                titleClass: 'text-red-500'
            }
        })

        const heading = wrapper.find('h3')

        expect(heading.classes()).toContain('text-red-500')
    })

    it.concurrent('renders correct heading tag when headingTag prop is provided', () => {
        const tags = ['h1', 'h2', 'h4', 'h5', 'h6'] as const

        tags.forEach(tag => {
            const wrapper = factory({
                props: {
                    headingTag: tag
                }
            })

            expect(wrapper.find(tag).exists()).toBe(true)
        })
    })

    it('falls back to default heading when invalid headingTag is passed', () => {
        const wrapper = factory({
            props: {
                headingTag: 'invalid-tag'
            }
        })

        expect(wrapper.find('h3').exists()).toBe(true)
    })

    it.concurrent('renders static container classes', () => {
        const wrapper = factory()

        expect(wrapper.classes()).toEqual(
            expect.arrayContaining([
                'flex',
                'flex-col',
                'gap-4',
                'mt-2'
            ])
        )
    })

    it.concurrent('renders static heading classes', () => {
        const wrapper = factory()

        const heading = wrapper.find('h3')

        expect(heading.classes()).toEqual(
            expect.arrayContaining([
                'font-semibold',
                'text-text-neutral-subtle'
            ])
        )
    })
})
