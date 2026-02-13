import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import DataDetailsFieldGroup from '~/components/forms/DataDetailsFieldGroup.vue'

const factory = (options = {}): VueWrapper => {
    return mount(DataDetailsFieldGroup, {
        slots: {
            default: '<div data-test="slot">Detail group content</div>'
        },
        ...options
    })
}

describe('DataDetailsFieldGroup.vue', () => {
    it.concurrent('renders default title and default heading tag', () => {
        const wrapper = factory()

        const heading = wrapper.find('h3')

        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('Group title')
    })

    it.concurrent('renders custom title when provided', () => {
        const wrapper = factory({
            props: {
                title: 'Details'
            }
        })

        expect(wrapper.find('h3').text()).toBe('Details')
    })

    it.concurrent('renders slot content', () => {
        const wrapper = factory()

        expect(wrapper.find('[data-test="slot"]').exists()).toBe(true)
        expect(wrapper.text()).toContain('Detail group content')
    })

    it.concurrent('applies titleClass when provided', () => {
        const wrapper = factory({
            props: {
                titleClass: 'text-blue-500'
            }
        })

        expect(wrapper.find('h3').classes()).toContain('text-blue-500')
    })

    it.concurrent('renders correct heading tag when valid headingTag is provided', () => {
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

    it.concurrent('falls back to h3 when invalid headingTag is passed', () => {
        const wrapper = factory({
            props: {
                headingTag: 'invalid-tag'
            }
        })

        expect(wrapper.find('h3').exists()).toBe(true)
        expect(wrapper.find('invalid-tag').exists()).toBe(false)
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

        expect(wrapper.find('h3').classes()).toEqual(
            expect.arrayContaining([
                'font-semibold',
                'text-text-neutral-subtle'
            ])
        )
    })
})
